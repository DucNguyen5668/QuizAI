/**
 * Gemini API client — Vision (image→text) + optional text fallback
 * Groq is used for MCQ generation; Gemini Vision is used for image extraction.
 *
 * Free tier limits:
 *   Gemini: 5–10 req/min depending on model
 *   Groq:  ~30 req/min (much higher)
 */

import { callGroq, GROQ_MODELS } from "./groqClient.js";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_VISION_MODEL = "gemini-flash-latest";

/**
 * Safe document character limits per provider/model.
 * Prompt = system instructions (~800 chars) + document chunk + output buffer.
 * Leave generous margin so we never hit TPM limits.
 *
 * Groq quality (llama-3.3-70b): 12k TPM  → max ~3500 chars of doc text
 * Groq fast   (llama-3.1-8b) : 20k TPM  → max ~7000 chars of doc text
 * Gemini flash                : 1M tokens → no practical limit
 */
const DOC_CHUNK_CHARS = {
  groq_quality: 3500,
  groq_fast:    7000,
  gemini:       20000,
}; // supports multimodal

/* ─── Rate limiter ────────────────────────────────────────────────────── */

/**
 * Simple token-bucket rate limiter to respect Gemini free tier (5 req/min)
 * Adds a delay between requests so we don't hit 429.
 */
class RateLimiter {
  constructor(requestsPerMinute = 5) {
    this.minInterval = (60 / requestsPerMinute) * 1000; // ms between requests
    this.lastCall = 0;
  }

  async wait() {
    const now = Date.now();
    const elapsed = now - this.lastCall;
    const wait = Math.max(0, this.minInterval - elapsed);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    this.lastCall = Date.now();
  }
}

// Shared rate limiter for Gemini Vision (5 req/min free tier)
const geminiVisionLimiter = new RateLimiter(4); // 4/min to be safe

/* ─── Gemini Vision — extract text from image ─────────────────────────── */

/**
 * Extract text/content from an image using Gemini Vision API.
 * Automatically rate-limited to respect free tier (5 req/min).
 *
 * @param {string} base64Data  - base64 image data (no data URL prefix)
 * @param {string} mimeType    - 'image/png' | 'image/jpeg'
 * @param {string} apiKey      - Gemini API key
 * @returns {Promise<string>}  - extracted text content
 */
export async function extractTextFromImage(base64Data, mimeType, apiKey) {
  // Wait for rate limiter slot
  await geminiVisionLimiter.wait();

  const url = `${GEMINI_BASE}/${GEMINI_VISION_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{
      parts: [
        {
          inline_data: { mime_type: mimeType, data: base64Data },
        },
        {
          text: `Please extract and describe ALL content from this image in detail. This is educational material (lecture slide, textbook page, diagram, notes, etc.).

Extract:
1. All text content (headings, paragraphs, bullet points, code)
2. Describe any diagrams, charts, tables with their data
3. Any formulas or equations
4. Labels on figures/illustrations

Return as structured plain text for quiz question generation. Be comprehensive.`,
        },
      ],
    }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 4096 },
  };

  let attempts = 0;
  while (attempts < 4) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 429) {
        // Rate limited: parse retry-after or wait 65 seconds
        const err = await response.json().catch(() => ({}));
        const retryMsg = err?.error?.message || "";
        const retryMatch = retryMsg.match(/retry in (\d+(?:\.\d+)?)s/i);
        const waitSec = retryMatch ? parseFloat(retryMatch[1]) + 2 : 65;
        console.warn(`Gemini 429 — waiting ${waitSec}s before retry...`);
        await new Promise((r) => setTimeout(r, waitSec * 1000));
        attempts++;
        continue;
      }

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          `Gemini Vision error ${response.status}: ${err?.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Gemini Vision returned empty response");
      return text;
    } catch (err) {
      if (err.message.includes("429") || err.message.includes("quota")) {
        attempts++;
        if (attempts >= 4) throw err;
        await new Promise((r) => setTimeout(r, 65000));
      } else {
        throw err;
      }
    }
  }

  throw new Error("Gemini Vision: exceeded retry limit after rate limiting");
}

/* ─── Question generation ─────────────────────────────────────────────── */

/**
 * Build MCQ generation prompt.
 * @param {string} documentText  - full extracted text
 * @param {string} docLanguage
 * @param {string} topicTitle
 * @param {number} questionCount
 * @param {number} maxDocChars   - max chars of document to include in prompt
 * @param {string} mode          - 'generate' or 'extract'
 */
export function buildQuizPrompt(documentText, docLanguage, topicTitle, questionCount = 25, maxDocChars = 3500, mode = "generate") {
  // Slice BEFORE inserting into template string
  const docSlice = documentText.slice(0, maxDocChars);

  if (mode === "extract") {
    return `You are an expert data parser. The document below contains an existing multiple-choice exam (or a list of questions).
Your task is to EXTRACT the questions exactly as they appear.

DOCUMENT TITLE: "${topicTitle}"

DOCUMENT CONTENT:
${docSlice}

REQUIREMENTS:
1. Extract ALL multiple-choice questions found in the text. Make sure to extract EVERY SINGLE ONE, do not skip any.
2. DO NOT invent, rephrase, or change the wording of the questions or options. Keep them EXACTLY as in the source.
3. Solve each question to provide the correct answer(s) (A, B, C, or D). If a question requires multiple answers (e.g., "Select two"), provide them as a comma-separated string in the "ans" field (e.g., "A,B").
4. Provide a detailed explanation ("why" field) for the correct answer(s) IN VIETNAMESE.
5. If you cannot find any questions in this text chunk, just return an empty array [].

RESPONSE FORMAT — Return ONLY a valid JSON array, no markdown:
[
  {
    "stem": "Exact question text from document...",
    "opts": {"A": "...", "B": "...", "C": "...", "D": "..."},
    "ans": "A,B",
    "why": "Giải thích tiếng Việt tại sao A và B đúng."
  }
]

Extract all questions now:`;
  }

  return `You are an expert educational content creator. Based on the document below, generate exactly ${questionCount} multiple-choice questions (MCQ).

DOCUMENT TITLE: "${topicTitle}"

DOCUMENT CONTENT:
${docSlice}

REQUIREMENTS:
1. Questions MUST be in the SAME language as the document (detected: ${docLanguage})
2. Explanations ("why" field) MUST always be in Vietnamese
3. Generate exactly ${questionCount} diverse questions
4. Each question: exactly 4 options (A, B, C, D). If the question requires multiple answers, specify them in the "ans" field as a comma-separated string (e.g., "A,C").
5. Vary question types: recall, comprehension, application, analysis
6. Do NOT repeat the same question twice

RESPONSE FORMAT — Return ONLY a valid JSON array, no markdown:
[
  {
    "stem": "Question?",
    "opts": {"A": "...", "B": "...", "C": "...", "D": "..."},
    "ans": "A,C",
    "why": "Giải thích tiếng Việt tại sao đúng."
  }
]

Generate exactly ${questionCount} questions now:`;
}

/**
 * Parse LLM JSON response into question array
 */
export function parseGeminiResponse(responseText) {
  let cleaned = responseText.trim();
  // Strip markdown code fences
  cleaned = cleaned.replace(/^```(?:json)?\s*/im, "").replace(/\s*```\s*$/m, "");
  // Find JSON array
  const start = cleaned.indexOf("[");
  let end = cleaned.lastIndexOf("]");
  
  // Xử lý trường hợp Gemini bị ngắt cụt (hit maxOutputTokens) giữa chừng
  if (start !== -1 && end === -1) {
    const lastBrace = cleaned.lastIndexOf("}");
    if (lastBrace > start) {
      console.warn("JSON bị ngắt cụt, đang thử tự động sửa...");
      cleaned = cleaned.slice(0, lastBrace + 1) + "]";
      end = cleaned.length - 1;
    }
  }

  if (start === -1 || end === -1) {
    console.error("Gemini Response parsing failed. Raw response:", responseText);
    const snippet = responseText.slice(0, 150).replace(/\n/g, " ");
    throw new Error(`Không tìm thấy mảng JSON hợp lệ. AI phản hồi: "${snippet}..."`);
  }
  cleaned = cleaned.slice(start, end + 1);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Fix common JSON mistakes
    cleaned = cleaned
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .replace(/[\u0000-\u001F\u007F]/g, " "); // remove control chars
    parsed = JSON.parse(cleaned);
  }

  if (!Array.isArray(parsed)) throw new Error("Response is not a JSON array");

  return parsed.filter(validateQ).map((q, idx) => ({
    id: `custom-${Date.now()}-${idx}`,
    n: idx + 1,
    bs: false,
    stem: q.stem || q.question || "",
    opts: {
      A: q.opts?.A || q.options?.A || "",
      B: q.opts?.B || q.options?.B || "",
      C: q.opts?.C || q.options?.C || "",
      D: q.opts?.D || q.options?.D || "",
    },
    ans: Array.from(new Set((q.ans || q.answer || q.correct || "A").toString().toUpperCase().match(/[A-D]/g) || ["A"])).sort().join(","),
    why: q.why || q.explanation || q.explain || "(Chưa có giải thích)",
  }));
}

function validateQ(q) {
  if (!q || typeof q !== "object") return false;
  const stem = q.stem || q.question || "";
  const opts = q.opts || q.options || {};
  const ansStr = (q.ans || q.answer || q.correct || "").toString().toUpperCase();
  const validAnsMatches = ansStr.match(/[A-D]/g) || [];
  return (
    stem.trim().length > 5 &&
    opts.A && opts.B && opts.C && opts.D &&
    validAnsMatches.length > 0
  );
}

/**
 * Generate MCQ questions for ONE exam in a SINGLE API call.
 *
 * Strategy: 
 *   - Attempt to generate all `totalQuestions` (e.g. 50) in ONE request.
 *   - Uses a sliding text window (textChunkStart..textChunkEnd) so callers
 *     can rotate through the full document across multiple exams.
 *   - On 413 (too large): auto-halve the doc chunk, rebuild prompt, retry.
 *   - On 429 (rate limit): parse "try again in Xs", sleep exactly that long, retry.
 *   - Max 5 rate-limit retries, 4 error retries before giving up.
 *
 * @param {Object} opts
 * @param {string}   opts.documentText   - full extracted text (all images merged)
 * @param {string}   opts.docLanguage    - detected language code
 * @param {string}   opts.topicTitle     - document/topic title
 * @param {string}   opts.provider       - 'groq' | 'gemini'
 * @param {string}   opts.geminiKey
 * @param {string}   opts.groqKey
 * @param {string}   opts.apiKey         - backward-compat alias for geminiKey
 * @param {number}   opts.totalQuestions - how many questions to generate (default 50)
 * @param {number}   opts.textChunkStart - char offset to start reading from (for sliding window)
 * @param {number}   opts.textChunkEnd   - char offset to stop reading (for sliding window)
 * @param {Function} opts.onProgress     - callback(message: string)
 * @returns {Promise<Question[]>}
 */
export async function generateQuestionsWithGemini({
  documentText,
  docLanguage,
  topicTitle,
  provider    = "groq",
  geminiKey,
  groqKey,
  apiKey,
  totalQuestions  = 50,
  textChunkStart  = 0,
  textChunkEnd    = undefined, // undefined = auto
  onProgress,
  _isBatch = false,
  mode = "generate"
}) {
  const gKey = geminiKey || apiKey || "";
  const rKey = groqKey   || "";
  let maxDocChars = provider === "groq" ? 4500 : 20000;
  if (mode === "extract" && provider === "gemini") {
    maxDocChars = 8000; // Chia nhỏ chunk hơn để tránh bị ngắt cụt JSON khi server quá tải
  }

  // ── Auto-batching for Extract Mode ────────────────────────────────────
  if (mode === "extract" && !_isBatch) {
    let allQuestions = [];
    const fullLen = documentText.length;
    let bStart = 0;
    let chunkIndex = 0;
    
    // Dùng chunk an toàn hơn để tránh bị ngắt cụt JSON và giảm tỷ lệ miss câu
    // - Gemini: 8000 ký tự (khoảng 15-20 câu). Đừng để lớn quá (như 25k) vì AI sẽ bị "lười" và sinh thiếu câu hỏi.
    // - Groq: 4500 ký tự (giới hạn TPM của Groq).
    const safeChunkSize = provider === "groq" ? 4500 : 8000;
    const estimatedBatches = Math.ceil(fullLen / safeChunkSize);
    
    while (bStart < fullLen) {
      let bEnd = Math.min(fullLen, bStart + safeChunkSize);
      
      // Tìm điểm cắt an toàn (ngắt dòng) để không cắt ngang giữa 1 câu hỏi
      if (bEnd < fullLen) {
        let safeEnd = documentText.lastIndexOf('\n\n', bEnd);
        if (safeEnd <= bStart) {
          safeEnd = documentText.lastIndexOf('\n', bEnd);
        }
        if (safeEnd > bStart) {
          bEnd = safeEnd;
        }
      }
      
      chunkIndex++;
      onProgress?.(`📝 Đang trích xuất phần ${chunkIndex}/${estimatedBatches} (${provider.toUpperCase()})...`);
      
      try {
        const batchResult = await generateQuestionsWithGemini({
          documentText, docLanguage, topicTitle, provider, geminiKey, groqKey, apiKey,
          textChunkStart: bStart,
          textChunkEnd: bEnd,
          onProgress: () => {},
          _isBatch: true,
          mode: "extract"
        });
        allQuestions = allQuestions.concat(batchResult);
      } catch (e) {
        console.error("Lỗi khi trích xuất chunk " + chunkIndex, e);
        throw new Error(`Lỗi ở phần ${chunkIndex}/${estimatedBatches}: ${e.message}`);
      }
      
      bStart = bEnd; // Tiếp tục chunk tiếp theo
    }
    
    return allQuestions.map((q, idx) => ({ ...q, id: `custom-${Date.now()}-${idx}`, n: idx + 1 }));
  }

  // ── Auto-batching to bypass maxOutputTokens limit (Generate Mode) ─────
  const BATCH_SIZE = 25;
  if (totalQuestions > BATCH_SIZE && !_isBatch && mode === "generate") {
    const batches = Math.ceil(totalQuestions / BATCH_SIZE);
    let allQuestions = [];
    const windowEnd = textChunkEnd ?? Math.min(documentText.length, textChunkStart + maxDocChars);
    const charsPerBatch = Math.floor((windowEnd - textChunkStart) / batches);

    for (let i = 0; i < batches; i++) {
      const batchCount = (i === batches - 1) ? (totalQuestions - allQuestions.length) : BATCH_SIZE;
      if (batchCount <= 0) break;
      
      const bStart = textChunkStart + (i * charsPerBatch);
      const bEnd = (i === batches - 1) ? windowEnd : (bStart + charsPerBatch);
      
      onProgress?.(`📝 Đang sinh câu ${allQuestions.length + 1}-${allQuestions.length + batchCount} / ${totalQuestions} (${provider.toUpperCase()})...`);
      
      const batchResult = await generateQuestionsWithGemini({
        documentText, docLanguage, topicTitle, provider, geminiKey, groqKey, apiKey,
        totalQuestions: batchCount,
        textChunkStart: bStart,
        textChunkEnd: bEnd,
        onProgress: () => {}, // suppress inner progress
        _isBatch: true
      });
      
      allQuestions = allQuestions.concat(batchResult);
    }
    
    // Remap final IDs
    return allQuestions.map((q, idx) => ({
      ...q,
      id: `custom-${Date.now()}-${idx}`,
      n:  idx + 1,
    }));
  }

  // ── Safe initial doc size ────────────────────────────────────────────
  // Groq llama-3.3-70b: 12k TPM.
  // A 50-question prompt = ~800 chars overhead + doc + output (50q × ~120 chars ≈ 6000 tokens out)
  // → Leave ~6000 tokens for input = ~4500 chars safe for Vietnamese/mixed text
  // We start at 4500 and auto-shrink on 413.

  // Honour caller-specified window; fall back to auto
  const windowEnd   = textChunkEnd ?? Math.min(documentText.length, textChunkStart + maxDocChars);
  let   textChunk   = documentText.slice(textChunkStart, windowEnd).slice(0, maxDocChars);

  const callFn = (prompt) =>
    provider === "groq"
      ? callGroq(prompt, rKey, "quality")   // always use quality model for 50-q prompt
      : callGeminiText(prompt, gKey);

  // ── Single-shot with auto-retry ──────────────────────────────────────
  let attempts        = 0;
  let rateLimitRetries = 0;
  const MAX_ATTEMPTS   = 4;
  const MAX_RL_RETRIES = 6;

  while (true) {
    const prompt = buildQuizPrompt(textChunk, docLanguage, topicTitle, totalQuestions, maxDocChars, mode);
    if (mode === "extract") {
      onProgress?.(`📝 Đang trích xuất câu hỏi từ văn bản... (${provider.toUpperCase()})`);
    } else {
      onProgress?.(`📝 Đang sinh ${totalQuestions} câu hỏi... (${provider.toUpperCase()})`);
    }

    try {
      const responseText = await callFn(prompt);
      const questions    = parseGeminiResponse(responseText);

      // Remap IDs and numbers
      const finalQuestions = mode === "extract" ? questions : questions.slice(0, totalQuestions);
      return finalQuestions.map((q, idx) => ({
        ...q,
        id: `custom-${Date.now()}-${idx}`,
        n:  idx + 1,
      }));

    } catch (err) {
      const msg = err.message || "";

      // ── 413: Prompt too large → halve doc chunk, retry immediately ───
      if (err.status === 413 || msg.includes("413")) {
        maxDocChars = Math.max(800, Math.floor(maxDocChars * 0.6));
        textChunk   = documentText.slice(textChunkStart, textChunkStart + maxDocChars);
        onProgress?.(`⚠️ Prompt quá lớn → tự giảm nội dung xuống ${maxDocChars} ký tự và thử lại...`);
        attempts++;
        if (attempts >= MAX_ATTEMPTS) throw new Error(`Prompt vẫn quá lớn sau ${MAX_ATTEMPTS} lần giảm.`);
        continue;
      }

      // ── 429: Rate limit → parse wait time, sleep, retry ─────────────
      if (err.status === 429 || msg.includes("429")) {
        rateLimitRetries++;
        if (rateLimitRetries > MAX_RL_RETRIES) {
          throw new Error(
            `${provider.toUpperCase()} Rate Limit: đã thử lại ${MAX_RL_RETRIES} lần nhưng vẫn bị chặn.\n` +
            `Gợi ý: Đổi sang API Key khác, hoặc đợi một lúc.\nLỗi gốc: ${msg}`
          );
        }

        // Parse "Please try again in 8.08s" / "1m2.5s" / "2m" etc.
        let waitSec = 20;
        const hrM  = msg.match(/(\d+)\s*h/i);
        const minM = msg.match(/(\d+)\s*m(?!s)/i);  // minutes, not ms
        const secM = msg.match(/(\d+(?:\.\d+)?)\s*s/i);
        if (hrM || minM || secM) {
          waitSec = 0;
          if (hrM)  waitSec += parseFloat(hrM[1])  * 3600;
          if (minM) waitSec += parseFloat(minM[1])  * 60;
          if (secM) waitSec += parseFloat(secM[1]);
        }
        waitSec = Math.min(waitSec + 3, 300); // cap at 5 min, add 3s buffer

        onProgress?.(
          `⏳ ${provider.toUpperCase()} Rate Limit (429) — Tự động chờ ${waitSec.toFixed(0)}s ` +
          `(lần ${rateLimitRetries}/${MAX_RL_RETRIES})...`
        );
        await new Promise((r) => setTimeout(r, waitSec * 1000));
        continue;
      }

      // ── Other errors → retry with backoff ────────────────────────────
      attempts++;
      if (attempts >= MAX_ATTEMPTS) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempts));
    }
  }
}

/* ─── Gemini text (fallback) ──────────────────────────────────────────── */


async function callGeminiText(prompt, apiKey) {
  const url = `${GEMINI_BASE}/gemini-flash-latest:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
  };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Gemini error ${response.status}: ${err?.error?.message || response.statusText}`);
  }
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

/* ─── Key validation ──────────────────────────────────────────────────── */

export async function testApiKey(apiKey) {
  try {
    const url = `${GEMINI_BASE}/gemini-flash-latest:generateContent?key=${apiKey}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hi" }] }],
        generationConfig: { maxOutputTokens: 5 },
      }),
    });
    return r.ok;
  } catch { return false; }
}
