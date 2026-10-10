import { useState, useRef, useCallback, useEffect } from "react";
import {
  parseFile,
  detectLanguage,
  formatFileSize,
  truncateText,
  isImageFile,
  createImagePreviewUrl,
} from "../utils/documentParser";
import { generateQuestionsWithGemini } from "../utils/geminiClient";
import { batchOCR, estimateOCRTime, terminateOCR } from "../utils/ocrProcessor";
import { getSetting, setSetting } from "../data/dataService";
import "./document-import.css";

/* ─── Constants ───────────────────────────────────────────────────────── */
const ACCEPTED = ".txt,.md,.pdf,.docx,.png,.jpg,.jpeg,.webp";
const ALLOWED_EXTS = [
  ".txt", ".md", ".pdf", ".docx",
  ".png", ".jpg", ".jpeg", ".webp",
];

/* ─── FileChip ────────────────────────────────────────────────────────── */
function FileChip({ file, previewUrl, onRemove }) {
  const isImg = isImageFile(file);
  const ext = file.name.split(".").pop().toUpperCase();
  return (
    <div className={`file-chip ${isImg ? "file-chip-image" : ""}`}>
      {isImg && previewUrl
        ? <img src={previewUrl} alt={file.name} className="file-chip-thumb" />
        : <span className="file-chip-icon">{fileIcon(file.name)}</span>
      }
      <div className="file-chip-info">
        <span className="file-chip-name">{file.name}</span>
        <span className="file-chip-meta">
          {isImg ? "🖼 Ảnh · OCR" : ext} · {formatFileSize(file.size)}
        </span>
      </div>
      <button
        className="file-chip-remove"
        onClick={(e) => { e.stopPropagation(); onRemove(file.name); }}
        type="button"
        aria-label={`Xóa ${file.name}`}
      >×</button>
    </div>
  );
}

/* ─── Provider Selector ───────────────────────────────────────────────── */
function ProviderSelector({ provider, onChange }) {
  return (
    <div className="provider-row">
      <button
        id="provider-groq"
        className={`provider-btn ${provider === "groq" ? "active" : ""}`}
        onClick={() => onChange("groq")}
        type="button"
      >
        <span className="provider-logo">⚡</span>
        <span>
          <strong>Groq</strong>
          <small>Tạo câu hỏi từ tài liệu</small>
        </span>
        {provider === "groq" && <span className="provider-check">✓</span>}
      </button>
      <button
        id="provider-gemini"
        className={`provider-btn ${provider === "gemini" ? "active" : ""}`}
        onClick={() => onChange("gemini")}
        type="button"
      >
        <span className="provider-logo">✦</span>
        <span>
          <strong>Gemini</strong>
          <small>Trích xuất & tạo câu hỏi</small>
        </span>
        {provider === "gemini" && <span className="provider-check">✓</span>}
      </button>
    </div>
  );
}

/* ─── OCR Progress Bar ────────────────────────────────────────────────── */
function OCRProgress({ current, total, file, msg, pct }) {
  return (
    <div className="ocr-progress-box">
      <div className="ocr-progress-header">
        <span className="ocr-icon">🔍</span>
        <span className="ocr-msg">{msg}</span>
      </div>
      {total > 0 && (
        <>
          <div className="ocr-bar-track">
            <div className="ocr-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="ocr-stats">
            <span>{current}/{total} ảnh</span>
            <span>{pct}%</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */
export default function DocumentImport({ onSectionsGenerated }) {
  const [provider, setProvider] = useState("groq");
  const [geminiKey, setGeminiKey] = useState("");
  const [groqKey,   setGroqKey]   = useState("");
  const [showGKey,  setShowGKey]  = useState(false);
  const [showRKey,  setShowRKey]  = useState(false);

  const [files,     setFiles]     = useState([]);
  const [previews,  setPreviews]  = useState({});
  const [pasteText, setPasteText] = useState("");
  const [topicTitle,setTopicTitle]= useState("");
  const [isDragging,setIsDragging]= useState(false);
  const [examCount, setExamCount] = useState(3);
  const [questionsPerExam, setQuestionsPerExam] = useState(50);
  const [mode, setMode] = useState("generate"); // "generate" | "extract"

  // Scraper state
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeFolder, setScrapeFolder] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState("");

  // Status state
  const [phase,     setPhase]     = useState(null); // null | 'ocr' | 'gen' | 'done' | 'error'
  const [statusMsg, setStatusMsg] = useState("");
  const [ocrState,  setOcrState]  = useState(null); // { current, total, file, pct }
  const [genProgress, setGenProgress] = useState(0);
  const [error,     setError]     = useState(null);

  const fileInputRef = useRef();
  const cancelRef    = useRef(false);
  const filesRef = useRef([]);
  const previewsRef = useRef({});
  const hydratedRef = useRef(false);

  // Load saved keys and provider from IndexedDB on mount
  useEffect(() => {
    (async () => {
      const [savedProvider, savedGemini, savedGroq] = await Promise.all([
        getSetting("provider", "groq"),
        getSetting("gemini_key", ""),
        getSetting("groq_key", ""),
      ]);
      hydratedRef.current = true;
      setProvider(savedProvider || "groq");
      setGeminiKey(savedGemini || "");
      setGroqKey(savedGroq || "");
    })();
  }, []);

  // Persist provider changes to IndexedDB
  useEffect(() => { if (hydratedRef.current) setSetting("provider", provider).catch(() => {}); }, [provider]);

  // Cleanup previews & terminate OCR worker on unmount
  useEffect(() => {
    return () => {
      cancelRef.current = true;
      Object.values(previewsRef.current).forEach(URL.revokeObjectURL);
      terminateOCR();
    };
  }, []); // eslint-disable-line

  /* ── Drop zone ─────────────────────────────────────────────────────── */
  const onDrop      = useCallback((e) => { e.preventDefault(); setIsDragging(false); addFiles(Array.from(e.dataTransfer.files)); }, []);
  const onDragOver  = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);

  function addFiles(newFiles) {
    const valid = newFiles.filter((f) => ALLOWED_EXTS.some((ext) => f.name.toLowerCase().endsWith(ext)));
    const bad   = newFiles.filter((f) => !ALLOWED_EXTS.some((ext) => f.name.toLowerCase().endsWith(ext)));
    const names = new Set(filesRef.current.map((f) => f.name));
    const unique = valid.filter((f) => { if (names.has(f.name)) return false; names.add(f.name); return true; });
    filesRef.current = [...filesRef.current, ...unique];
    setFiles(filesRef.current);
    const newPrev = {};
    unique.filter(isImageFile).forEach((f) => { newPrev[f.name] = createImagePreviewUrl(f); });
    previewsRef.current = { ...previewsRef.current, ...newPrev };
    setPreviews(previewsRef.current);
    setError(bad.length ? `Không hỗ trợ: ${bad.map((f) => f.name).join(", ")}` : null);
  }

  function removeFile(name) {
    filesRef.current = filesRef.current.filter((f) => f.name !== name);
    setFiles(filesRef.current);
    const next = { ...previewsRef.current };
    if (next[name]) URL.revokeObjectURL(next[name]);
    delete next[name];
    previewsRef.current = next;
    setPreviews(next);
  }

  /* ── Validation ────────────────────────────────────────────────────── */
  function validate() {
    const gKey = geminiKey.trim();
    const rKey = groqKey.trim();
    const hasContent = files.length > 0 || pasteText.trim().length > 50;
    if (!hasContent) return "Vui lòng tải file/ảnh hoặc dán nội dung (≥ 50 ký tự).";
    if (provider === "groq"   && !rKey) return "Vui lòng nhập Groq API key.";
    if (provider === "gemini" && !gKey) return "Vui lòng nhập Gemini API key.";
    return null;
  }

  /* ── Main generation ───────────────────────────────────────────────── */
  async function handleGenerate() {
    const validErr = validate();
    if (validErr) { setError(validErr); return; }

    const gKey = geminiKey.trim();
    const rKey = groqKey.trim();
    setSetting("gemini_key", gKey);
    setSetting("groq_key",   rKey);
    setError(null);
    cancelRef.current = false;

    try {
      let fullText = pasteText.trim();
      let docName  = topicTitle.trim() || "Tài liệu tùy chỉnh";

      const imgFiles = files.filter(isImageFile);
      const docFiles = files.filter((f) => !isImageFile(f));

      // ── 1. Parse text documents ──────────────────────────────────────
      for (const f of docFiles) {
        setPhase("ocr");
        setStatusMsg(`📄 Đọc ${f.name}...`);
        const text = await parseFile(f);
        if (text) fullText = [fullText, text].filter(Boolean).join("\n\n---\n\n");
      }

      // ── 2. OCR images (Tesseract.js — no API key!) ───────────────────
      if (imgFiles.length > 0) {
        setPhase("ocr");
        setOcrState({ current: 0, total: imgFiles.length, file: "", pct: 0 });
        setStatusMsg(`🔍 Tesseract.js OCR — ${imgFiles.length} ảnh (không cần API key)`);

        const ocrText = await batchOCR(imgFiles, (state) => {
          if (cancelRef.current) throw new Error("Đã hủy");
          setOcrState(state);
          setStatusMsg(state.msg);
        });

        if (ocrText) fullText = [fullText, ocrText].filter(Boolean).join("\n\n---\n\n");
      }

      if (!fullText.trim()) throw new Error("Không thể trích xuất nội dung từ tài liệu.");

      if (!topicTitle.trim() && files.length > 0) {
        docName = files[0].name.replace(/\.[^.]+$/, "");
      }

      const lang      = detectLanguage(fullText);
      const textForAI = truncateText(fullText, 28000);
      const charCount = textForAI.length.toLocaleString("vi-VN");

      setPhase("gen");
      setOcrState(null);
      setStatusMsg(`✅ Trích xuất ${charCount} ký tự. Đang tạo câu hỏi...`);
      setGenProgress(0);

      // ── 3. Generate exam sets via Groq / Gemini ──────────────────────
      // Sliding window: each exam reads a different portion of the document.
      // This ensures variety and uses ALL the text extracted from images.
      const GROQ_CHUNK_SIZE  = 4500;  // chars per exam slice (safe for 12k TPM)
      const GEMINI_CHUNK_SIZE = 20000; // chars per exam slice (no practical limit)
      const chunkSize        = provider === "groq" ? GROQ_CHUNK_SIZE : GEMINI_CHUNK_SIZE;
      const totalDocLen      = textForAI.length;

      const allSections = [];
      const loopCount = mode === "extract" ? 1 : examCount;

      for (let i = 0; i < loopCount; i++) {
        if (cancelRef.current) throw new Error("Đã hủy");

        // Slide the window evenly across the full document for generate mode
        const windowStart = mode === "extract" ? 0 : Math.floor((i / loopCount) * Math.max(0, totalDocLen - chunkSize));
        const windowEnd   = mode === "extract" ? totalDocLen : Math.min(totalDocLen, windowStart + chunkSize);

        if (mode === "extract") {
          setStatusMsg(`📝 Đang trích xuất toàn bộ câu hỏi gốc từ tài liệu...`);
        } else {
          setStatusMsg(`📝 Đề ${i + 1}/${loopCount} — ${questionsPerExam} câu · ký tự ${windowStart.toLocaleString("vi-VN")}→${windowEnd.toLocaleString("vi-VN")}...`);
        }
        setGenProgress(i / loopCount);

        const questions = await generateQuestionsWithGemini({
          documentText:   textForAI,
          docLanguage:    lang,
          topicTitle:     docName,
          provider,
          geminiKey:      gKey,
          groqKey:        rKey,
          totalQuestions: mode === "extract" ? 0 : questionsPerExam,
          textChunkStart: windowStart,
          textChunkEnd:   windowEnd,
          mode:           mode,
          onProgress: (msg) => {
            setStatusMsg(msg);
            setGenProgress((i + 0.5) / examCount);
          },
        });

        const sectionChip  = mode === "extract" ? `Đề gốc` : `Đề ${i + 1}`;
        const sectionTitle = mode === "extract"
          ? `${docName} — Đề gốc (${questions.length} câu)`
          : `${docName} — Đề ${i + 1}`;
        const sectionKind  = mode === "extract" ? "extracted" : "custom";

        allSections.push({
          id:        `custom-${Date.now()}-${i}`,
          kind:      sectionKind,
          chip:      sectionChip,
          title:     sectionTitle,
          questions,
          source:    docName,
          createdAt: new Date().toISOString(),
        });

        // Groq TPM cool-down between exams (each 50-question call uses ~8k–10k tokens)
        // Must wait ~35s for token bucket to refill before next exam call.
        if (cancelRef.current) throw new Error("Đã hủy");
        if (provider === "groq" && i < loopCount - 1) {
          if (cancelRef.current) throw new Error("Đã hủy");
          const cooldown = 35;
          for (let s = cooldown; s > 0; s--) {
            if (cancelRef.current) throw new Error("Đã hủy");
            setStatusMsg(`⏳ Chờ hồi Token Groq: ${s}s trước khi tạo Đề ${i + 2}...`);
            await new Promise((r) => setTimeout(r, 1000));
          }
        }
      }

      setPhase("done");
      setGenProgress(1);
      if (mode === "extract") {
        const total = allSections.reduce((sum, s) => sum + (s.questions?.length || 0), 0);
        setStatusMsg(`✅ Hoàn thành! Đã trích xuất ${total} câu hỏi gốc.`);
      } else {
        const total = allSections.reduce((sum, s) => sum + s.questions.length, 0);
        setStatusMsg(`✅ Hoàn thành! ${allSections.length} đề · ${total} câu hỏi`);
      }
      if (cancelRef.current) throw new Error("Đã hủy");
      await onSectionsGenerated(allSections);
    } catch (err) {
      if (err.message === "Đã hủy") {
        setPhase(null);
        setStatusMsg("");
      } else {
        console.error(err);
        setPhase("error");
        setError(`❌ ${err.message}`);
      }
    }
  }

  function handleCancel() {
    cancelRef.current = true;
    terminateOCR();
    setPhase(null);
    setOcrState(null);
    setStatusMsg("");
  }

  /* ── Scraper Handler ───────────────────────────────────────────────── */
  const handleScrape = async () => {
    if (!scrapeUrl || !scrapeFolder) return;
    setIsScraping(true);
    setScrapeStatus("🚀 Đang khởi động trình duyệt ngầm...");
    
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: scrapeUrl, folderName: scrapeFolder })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Lỗi không xác định từ API");
      if (data.success && data.files) {
        setScrapeStatus(`✅ Tải thành công ${data.files.length} ảnh! Đang nạp vào khung...`);
        
        // Fetch each URL and create a File object
        const downloadedFiles = await Promise.all(data.files.map(async (url) => {
          const r = await fetch(url);
          const blob = await r.blob();
          const filename = url.split('/').pop();
          return new File([blob], filename, { type: blob.type });
        }));
        
        // Nạp vào state files hiện tại
        addFiles(downloadedFiles);
        setScrapeStatus(`🎉 Đã nạp xong ${downloadedFiles.length} ảnh! Hãy ấn nút Tạo đề.`);
      }
    } catch (err) {
      setScrapeStatus(`❌ Lỗi tải ảnh: ${err.message}`);
    } finally {
      setIsScraping(false);
    }
  };

  /* ── Derived values ────────────────────────────────────────────────── */
  const imgCount   = files.filter(isImageFile).length;
  const docCount   = files.filter((f) => !isImageFile(f)).length;
  const isRunning  = phase === "ocr" || phase === "gen";
  const ocrEst     = imgCount > 0 ? estimateOCRTime(imgCount) : null;

  /* ── Render ────────────────────────────────────────────────────────── */
  return (
    <div className="doc-import">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="doc-import-header">
        <div className="doc-import-title">
          <span className="doc-import-icon">✦</span>
          <div>
            <h2>Sinh câu hỏi từ tài liệu</h2>
            <p>Tải lên tài liệu hoặc ảnh — AI sinh {examCount} đề × {questionsPerExam} câu</p>
          </div>
        </div>
      </div>

      {/* ── AI Provider ────────────────────────────────────────────── */}
      <div className="doc-section">
        <label className="doc-label">🤖 AI sinh câu hỏi</label>
        <ProviderSelector provider={provider} onChange={setProvider} />
        <p className="doc-hint">
          {provider === "groq"
            ? "Groq — tạo câu hỏi từ nội dung tài liệu."
            : "Gemini — trích xuất và tạo câu hỏi từ tài liệu."}
          {" "}Ảnh được xử lý bằng <strong>Tesseract.js OCR</strong> ngay trên trình duyệt — không cần API key.
        </p>
      </div>

      {/* ── API Keys ───────────────────────────────────────────────── */}
      <div className="doc-section key-section">
        <div className="key-block">
          <label className="doc-label key-label" htmlFor="groq-api-key">
            ⚡ Groq API Key
            {provider === "groq"
              ? <span className="key-required-badge">Bắt buộc</span>
              : <span className="key-optional-badge">Tùy chọn</span>
            }
          </label>
          <div className="api-key-row">
            <input
              id="groq-api-key"
              className="doc-input api-key-input"
              type={showRKey ? "text" : "password"}
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="gsk_..."
            />
            <button className="key-toggle-btn" aria-label={showRKey ? "Ẩn Groq API key" : "Hiện Groq API key"} onClick={() => setShowRKey((v) => !v)} type="button">
              {showRKey ? "🙈" : "👁"}
            </button>
            {groqKey && <span className="key-status-badge">✓</span>}
          </div>
          <p className="doc-hint">
            <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">console.groq.com</a>
          </p>
        </div>

        <div className="key-block">
          <label className="doc-label key-label" htmlFor="gemini-api-key">
            ✦ Gemini API Key
            {provider === "gemini"
              ? <span className="key-required-badge">Bắt buộc</span>
              : <span className="key-optional-badge">Tùy chọn</span>
            }
          </label>
          <div className="api-key-row">
            <input
              id="gemini-api-key"
              className="doc-input api-key-input"
              type={showGKey ? "text" : "password"}
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AQ...."
            />
            <button className="key-toggle-btn" aria-label={showGKey ? "Ẩn Gemini API key" : "Hiện Gemini API key"} onClick={() => setShowGKey((v) => !v)} type="button">
              {showGKey ? "🙈" : "👁"}
            </button>
            {geminiKey && <span className="key-status-badge">✓</span>}
          </div>
          <p className="doc-hint">
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">aistudio.google.com</a>
          </p>
        </div>
      </div>

      {/* ── Topic title ────────────────────────────────────────────── */}
      <div className="doc-section">
        <label className="doc-label" htmlFor="doc-title">📝 Tiêu đề chủ đề (tùy chọn)</label>
        <input
          id="doc-title"
          className="doc-input"
          type="text"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
          placeholder="Ví dụ: Tiếng Anh, Mạng máy tính, Sinh học…"
        />
      </div>

      {/* ── Auto Scraper ───────────────────────────────────────────── */}
      {import.meta.env.DEV && <div className="doc-section">
        <label className="doc-label">📥 Tải ảnh từ diễn đàn</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input 
            type="text" 
            className="doc-input" 
            placeholder="Link bài viết (VD: https://fuoverflow.com/...)"
            value={scrapeUrl}
            onChange={e => setScrapeUrl(e.target.value)}
          />
          <input 
            type="text" 
            className="doc-input" 
            placeholder="Tên thư mục lưu ảnh (VD: De_Toan_01)"
            style={{ width: '250px' }}
            value={scrapeFolder}
            onChange={e => setScrapeFolder(e.target.value)}
          />
        </div>
        <button 
          className="doc-btn primary" 
          onClick={handleScrape}
          disabled={isScraping || !scrapeUrl || !scrapeFolder}
          style={{ width: '100%', padding: '10px' }}
        >
          {isScraping ? "⏳ Đang chạy ngầm (vui lòng chờ 1-2 phút)..." : "Tải Ảnh & Nạp Tự Động"}
        </button>
        {scrapeStatus && <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-dim)' }}>{scrapeStatus}</div>}
      </div>}

      {/* ── Drop zone ──────────────────────────────────────────────── */}
      <div className="doc-section">
        <label className="doc-label">
          📂 Tải file lên
          <span className="doc-label-hint">Tài liệu & Ảnh</span>
        </label>

        <div
          className={`drop-zone ${isDragging ? "dragging" : ""} ${files.length > 0 ? "has-files" : ""}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
        >
          <input
            ref={fileInputRef}
            type="file" multiple accept={ACCEPTED}
            style={{ display: "none" }}
            onChange={(e) => addFiles(Array.from(e.target.files))}
          />

          {files.length === 0 ? (
            <>
              <div className="drop-icon-group">
                <span className="drop-icon-main">📄</span>
                <span className="drop-icon-secondary">🖼</span>
              </div>
              <div className="drop-text">Kéo thả file hoặc ảnh vào đây</div>
              <div className="drop-subtext">hoặc click để chọn</div>
              <div className="drop-formats">
                <span className="fmt-doc">.pdf</span>
                <span className="fmt-doc">.docx</span>
                <span className="fmt-doc">.md</span>
                <span className="fmt-doc">.txt</span>
                <span className="fmt-img">.png</span>
                <span className="fmt-img">.jpg</span>
                <span className="fmt-img">.webp</span>
              </div>
              <div className="drop-vision-badge">
                🔍 Tesseract.js OCR — Quét chữ không cần API key
              </div>
            </>
          ) : (
            <div className="file-list" onClick={(e) => e.stopPropagation()}>
              {imgCount > 0 && (
                <div className="file-group">
                  <div className="file-group-label">
                    🖼 Ảnh ({imgCount}) · Tesseract.js OCR · {ocrEst}
                  </div>
                  <div className="image-grid">
                    {files.filter(isImageFile).map((f) => (
                      <FileChip key={f.name} file={f} previewUrl={previews[f.name]} onRemove={removeFile} />
                    ))}
                  </div>
                </div>
              )}
              {docCount > 0 && (
                <div className="file-group">
                  {imgCount > 0 && <div className="file-group-label">📄 Tài liệu ({docCount})</div>}
                  {files.filter((f) => !isImageFile(f)).map((f) => (
                    <FileChip key={f.name} file={f} previewUrl={null} onRemove={removeFile} />
                  ))}
                </div>
              )}
              <div className="drop-add-more" onClick={() => fileInputRef.current?.click()}>
                + Thêm file hoặc ảnh
              </div>
            </div>
          )}
        </div>

        {/* OCR info badge */}
        {imgCount > 0 && !isRunning && (
          <div className="ocr-info-badge">
            <span>🔍</span>
            <span>
              <strong>{imgCount} ảnh</strong> sẽ được quét chữ bằng{" "}
              <strong>Tesseract.js</strong> ngay trên trình duyệt —{" "}
              <em>không cần API key, không giới hạn, ước tính {ocrEst}</em>.
            </span>
          </div>
        )}
      </div>

      {/* ── OR divider ─────────────────────────────────────────────── */}
      <div className="or-divider"><span>hoặc</span></div>

      {/* ── Paste text ─────────────────────────────────────────────── */}
      <div className="doc-section">
        <label className="doc-label" htmlFor="paste-area">✏️ Dán nội dung trực tiếp</label>
        <textarea
          id="paste-area"
          className="paste-area"
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder="Dán nội dung bài giảng, ghi chú, slides text, giáo trình..."
          rows={6}
        />
        {pasteText && <div className="char-count">{pasteText.length.toLocaleString("vi-VN")} ký tự</div>}
      </div>

      <div className="doc-section">
        <label className="doc-label">📋 Chế độ xử lý</label>
        <div className="exam-count-row" style={{ marginBottom: "16px" }}>
          <button
            className={`exam-count-btn ${mode === "generate" ? "active" : ""}`}
            onClick={() => setMode("generate")}
            type="button"
            style={{ padding: "8px 16px", flex: "1" }}
          >✨ Tạo bộ đề mới (AI tự trộn/đảo)</button>
          
          <button
            className={`exam-count-btn ${mode === "extract" ? "active" : ""}`}
            onClick={() => setMode("extract")}
            type="button"
            style={{ padding: "8px 16px", flex: "1" }}
          >📄 Giữ nguyên đề gốc (Chỉ trích xuất)</button>
        </div>

        {mode === "generate" && (
          <div className="exam-config-grid" style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <div style={{ marginBottom: "8px", fontSize: "14px", color: "var(--text-dim)" }}>Số đề muốn tạo:</div>
              <div className="exam-count-row">
                {[1, 3, 5, 10].map((n) => (
                  <button
                    key={n}
                    className={`exam-count-btn ${examCount === n ? "active" : ""}`}
                    onClick={() => setExamCount(n)}
                    type="button"
                  >{n} đề</button>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ marginBottom: "8px", fontSize: "14px", color: "var(--text-dim)" }}>Số câu mỗi đề:</div>
              <div className="exam-count-row">
                {[30, 50, 60].map((n) => (
                  <button
                    key={n}
                    className={`exam-count-btn ${questionsPerExam === n ? "active" : ""}`}
                    onClick={() => setQuestionsPerExam(n)}
                    type="button"
                  >{n} câu</button>
                ))}
              </div>
            </div>
          </div>
        )}
        {mode === "extract" && (
          <div style={{ fontSize: "14px", color: "var(--text-dim)", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
            💡 <strong>Chế độ Trích xuất:</strong> Giữ nội dung câu hỏi có sẵn trong tài liệu tối đa. Hãy kiểm tra lại câu hỏi và đáp án sau khi xử lý, đặc biệt khi tài liệu gốc chưa có lời giải.
          </div>
        )}
      </div>

      {/* ── Error ──────────────────────────────────────────────────── */}
      {error && (
        <div className="gen-status error">
          <span>{error}</span>
        </div>
      )}

      {/* ── OCR Progress ───────────────────────────────────────────── */}
      {phase === "ocr" && ocrState && (
        <OCRProgress {...ocrState} />
      )}

      {/* ── Full-screen hacker overlay (OCR + Gen) ─────────────────────── */}
      {isRunning && (
        <div className="processing-overlay">
          <div className="processing-overlay-content">
            {/* Multi-ring rainbow spinner */}
            <span className="loading-dot" />

            <div className="processing-overlay-title">
              {phase === "ocr" ? "Tesseract OCR — Đang quét ảnh" : "AI — Đang xử lý"}
            </div>

            <div className="processing-overlay-msg">{statusMsg || "Đang khởi động..."}</div>

            {phase === "gen" && (
              <>
                <div className="processing-overlay-bar-wrap">
                  <div
                    className="processing-overlay-bar"
                    style={{ width: `${Math.round(genProgress * 100)}%` }}
                  />
                </div>
                <div className="processing-overlay-percent">
                  {Math.round(genProgress * 100)}%
                </div>
              </>
            )}

            <button
              className="processing-overlay-cancel"
              onClick={handleCancel}
              type="button"
            >
              ✕ Hủy bỏ
            </button>
          </div>
        </div>
      )}

      {/* ── Success ────────────────────────────────────────────────── */}
      {phase === "done" && (
        <div className="gen-status success">
          <span>{statusMsg}</span>
        </div>
      )}

      {/* ── Buttons ────────────────────────────────────────────────── */}
      <div className="action-row">
        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={isRunning}
          type="button"
          id="generate-questions-btn"
        >
          {isRunning ? (
            <>
              <span className="gen-spinner"><span className="gen-spinner-dot" /></span>
              Đang xử lý...
            </>
          ) : mode === "extract" ? (
            <>
              <span className="sparkle">📄</span> Trích xuất toàn bộ câu hỏi · {provider === "groq" ? "Groq" : "Gemini"}
            </>
          ) : (
            <>
              <span className="sparkle">✦</span> Tạo {examCount} đề × {questionsPerExam} câu · {provider === "groq" ? "Groq" : "Gemini"}
            </>
          )}
        </button>

        {isRunning && (
          <button
            className="cancel-btn"
            onClick={handleCancel}
            type="button"
            id="cancel-btn"
          >
            ✕ Hủy
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function fileIcon(name) {
  const e = name.split(".").pop().toLowerCase();
  return { pdf: "📕", docx: "📘", doc: "📘", md: "📋", txt: "📄" }[e] ?? "📄";
}
