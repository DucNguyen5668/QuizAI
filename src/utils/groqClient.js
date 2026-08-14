/**
 * Groq API client — fast LLM, OpenAI-compatible
 *
 * Model strategy (free tier token limits):
 *   llama-3.3-70b-versatile : 12,000 TPM  — high quality, small chunks only
 *   llama-3.1-8b-instant    : 20,000 TPM  — fast, larger chunks OK
 *   llama3-70b-8192         : 6,000  TPM  — avoid
 *
 * We automatically pick the best model based on prompt token estimate.
 * Rule of thumb: 1 token ≈ 4 chars (English) or 3 chars (Vietnamese).
 */

const GROQ_BASE = "https://api.groq.com/openai/v1";

// Model configs with their safe INPUT token budgets (leaving room for output)
export const GROQ_MODELS = {
  // High quality — use when prompt fits
  quality: {
    id:            "llama-3.3-70b-versatile",
    maxInputChars: 6000,  // ~1500 tokens input → well under 12k TPM
    maxOutputTok:  4096,
  },
  // Fallback — larger context budget
  fast: {
    id:            "llama-3.1-8b-instant",
    maxInputChars: 10000, // ~2500 tokens input → under 20k TPM
    maxOutputTok:  4096,
  },
};

/**
 * Estimate token count from character count (conservative: 1 token per 3 chars)
 */
export function estimateTokens(text) {
  return Math.ceil(text.length / 3);
}

/**
 * Call Groq chat completions API with automatic model selection.
 * Picks quality model when prompt is small enough, falls back to fast model.
 *
 * @param {string} prompt
 * @param {string} apiKey
 * @param {string} [preferredModel]  - 'quality' | 'fast' (default: auto)
 */
export async function callGroq(prompt, apiKey, preferredModel = "auto") {
  // Auto-select model based on prompt size
  let model;
  if (preferredModel === "quality") {
    model = GROQ_MODELS.quality;
  } else if (preferredModel === "fast") {
    model = GROQ_MODELS.fast;
  } else {
    // Auto: pick quality if prompt fits, otherwise fast
    model = prompt.length <= GROQ_MODELS.quality.maxInputChars
      ? GROQ_MODELS.quality
      : GROQ_MODELS.fast;
  }

  const response = await fetch(`${GROQ_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model:       model.id,
      messages:    [{ role: "user", content: prompt }],
      max_tokens:  model.maxOutputTok,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || response.statusText;

    // 413 = request too large → caller can retry with smaller chunk
    const e = new Error(`Groq API error ${response.status}: ${msg}`);
    e.status = response.status;
    throw e;
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Groq returned empty response");
  return text;
}

/**
 * Test Groq API key validity
 */
export async function testGroqKey(apiKey) {
  try {
    const r = await fetch(`${GROQ_BASE}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return r.ok;
  } catch {
    return false;
  }
}
