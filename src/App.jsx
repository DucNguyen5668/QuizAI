import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import DocumentImport from "./components/DocumentImport";
import {
  initDB,
  getPresetSections,
  getCustomSections as fetchCustomSections,
  saveCustomSections as persistCustomSections,
  clearAllCustomSections as clearCustomDB,
  deleteCustomSection as deleteCustomSectionDB,
  getProgress,
  saveAnswer,
  saveRevealed,
  revealAllInSection,
  resetSectionProgress,
  getSetting,
  setSetting,
} from "./data/dataService";

const OPTION_LABELS = ["A", "B", "C", "D"];

/* ─── statistics ─────────────────────────────────────────────────────── */
function getStats(section, answers) {
  return section.questions.reduce(
    (stats, question) => {
      const selected = answers[question.id];
      if (selected) {
        const reqLen = question.ans ? question.ans.split(",").length : 1;
        const selLen = selected.split(",").length;
        if (selLen >= reqLen) {
          stats.answered += 1;
          if (selected === question.ans) stats.correct += 1;
        }
      }
      return stats;
    },
    { answered: 0, correct: 0, total: section.questions.length }
  );
}

/* ─── text formatting ─────────────────────────────────────────────────── */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatText(value) {
  return escapeHtml(value)
    .replace(
      /```(?:\w+)?\n?([\s\S]*?)```/g,
      (_, code) => `<pre>${code.replace(/^\n+|\n+$/g, "")}</pre>`
    )
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}

function FormattedText({ children, className = "" }) {
  return (
    <span
      className={`formatted-text ${className}`}
      dangerouslySetInnerHTML={{ __html: formatText(children) }}
    />
  );
}

/* ─── QuestionCard ────────────────────────────────────────────────────── */
function QuestionCard({ question, index, selectedAnswer, isRevealed, onChoose, onReveal }) {
  const correctAnsArray = question.ans ? question.ans.split(",") : ["A"];
  const maxAnswers = correctAnsArray.length;
  const selectedArray = selectedAnswer ? selectedAnswer.split(",") : [];
  
  const isLocked = Boolean(isRevealed || (selectedArray.length > 0 && selectedArray.length >= maxAnswers));
  const isWarning = question.why?.startsWith("⚠️");

  return (
    <article className="question-card">
      <div className="question-heading">
        <span className={`question-number ${question.bs ? "bonus" : ""}`}>
          {question.bs ? "BS " : ""}Câu {index + 1}
        </span>
        <FormattedText className="question-stem">{question.stem}</FormattedText>
      </div>

      <div className="options">
        {OPTION_LABELS.filter((label) => question.opts[label]).map((label) => {
          const isSelected = selectedArray.includes(label);
          const isCorrectOption = correctAnsArray.includes(label);
          
          const isCorrect = isLocked && isCorrectOption;
          const isWrong = isLocked && isSelected && !isCorrectOption;
          const isSelecting = !isLocked && isSelected;

          return (
            <button
              className={["option", isCorrect ? "correct" : "", isWrong ? "wrong" : "", isSelecting ? "selected" : ""]
                .filter(Boolean)
                .join(" ")}
              disabled={isLocked}
              key={label}
              onClick={() => onChoose(question.id, label)}
              type="button"
            >
              <span className="option-label">{label}</span>
              <FormattedText className="option-content">{question.opts[label]}</FormattedText>
            </button>
          );
        })}
      </div>

      {isLocked && (
        <div className={`explanation ${isWarning ? "warning" : ""}`}>
          <strong>Đáp án {question.ans}.</strong>{" "}
          <FormattedText>{question.why || "(chưa có giải thích)"}</FormattedText>
        </div>
      )}

      {!isLocked && (
        <button className="reveal-button" onClick={() => onReveal(question.id)} type="button">
          Hiện đáp án
        </button>
      )}
    </article>
  );
}

/* ─── Custom section nav badge ─────────────────────────────────────────────────── */
function CustomSectionActions({ onClearAll, onDeleteCurrent, hasMultiple }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {onDeleteCurrent && (
        <button
          className="utility-button danger-button"
          onClick={() => {
            if (window.confirm("Xóa đề này?")) onDeleteCurrent();
          }}
          type="button"
          title="Xóa đề hiện tại"
        >
          🗑 Xóa đề này
        </button>
      )}
      {hasMultiple && (
        <button
          className="utility-button danger-button"
          onClick={() => {
            if (window.confirm("Xóa tất cả đề đã tạo từ tài liệu?")) onClearAll();
          }}
          type="button"
          title="Xóa tất cả đề tùy chỉnh"
        >
          🗑 Xóa tất cả
        </button>
      )}
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  /* ── DB loading state ───────────────────────────────────────────────── */
  const [dbReady, setDbReady] = useState(false);

  /* ── Data state ─────────────────────────────────────────────────────── */
  const [presetSections, setPresetSections] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  /* ── UI state ───────────────────────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState("preset");
  const [showImport, setShowImport] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [customSectionIndex, setCustomSectionIndex] = useState(0);
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Ref to track whether auto-save debounce is needed
  const saveTimerRef = useRef(null);

  /* ── Initialize database ────────────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      await initDB();
      if (cancelled) return;

      // Load all data from IndexedDB
      const [preset, custom, prog, savedTheme, savedTab, savedSecIdx] = await Promise.all([
        getPresetSections(),
        fetchCustomSections(),
        getProgress(),
        getSetting("theme"),
        getSetting("activeTab", "preset"),
        getSetting("sectionIndex", 0),
      ]);

      if (cancelled) return;

      setPresetSections(preset);
      setCustomSections(custom);
      setAnswers(prog.answers);
      setRevealed(prog.revealed);

      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
      setActiveTab(savedTab === "custom" ? "custom" : "preset");
      setActiveSectionIndex(
        Math.min(Math.max(Number(savedSecIdx) || 0, 0), Math.max(preset.length - 1, 0))
      );

      setDbReady(true);
    }

    boot();
    return () => { cancelled = true; };
  }, []);

  /* Determine active section */
  const presetSection = presetSections[activeSectionIndex];
  const customSection = customSections[customSectionIndex];
  const activeSection = activeTab === "preset" ? presetSection : customSection;

  const activeStats = useMemo(
    () => (activeSection ? getStats(activeSection, answers) : { answered: 0, correct: 0, total: 0 }),
    [activeSection, answers]
  );
  const bonusCount = useMemo(
    () => (activeSection?.questions.filter((q) => q.bs).length ?? 0),
    [activeSection]
  );
  const progressPercent = activeStats.total
    ? (activeStats.answered / activeStats.total) * 100
    : 0;

  /* Sync theme */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (dbReady) setSetting("theme", theme);
  }, [theme, dbReady]);

  /* Auto-save UI navigation state (debounced) */
  useEffect(() => {
    if (!dbReady) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setSetting("sectionIndex", activeSectionIndex);
      setSetting("activeTab", activeTab);
    }, 200);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [activeSectionIndex, activeTab, dbReady]);

  /* Handlers */
  const changePresetSection = useCallback((idx) => {
    setActiveSectionIndex(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const changeCustomSection = useCallback((idx) => {
    setCustomSectionIndex(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function chooseAnswer(questionId, answer) {
    if (revealed[questionId]) return;

    const q = activeSection?.questions.find((x) => x.id === questionId);
    if (!q) return;

    const correctAnsArray = q.ans ? q.ans.split(",") : ["A"];
    const maxAnswers = correctAnsArray.length;

    setAnswers((cur) => {
      let currentSel = cur[questionId] ? cur[questionId].split(",") : [];

      if (currentSel.includes(answer)) {
        if (currentSel.length >= maxAnswers) return cur; // already locked
        currentSel = currentSel.filter((a) => a !== answer);
      } else {
        if (currentSel.length < maxAnswers) {
          currentSel.push(answer);
        } else {
          return cur; // already locked
        }
      }

      currentSel.sort();
      const newAnswerStr = currentSel.join(",");
      
      saveAnswer(questionId, newAnswerStr);
      return { ...cur, [questionId]: newAnswerStr };
    });
  }

  function revealAnswer(questionId) {
    setRevealed((cur) => ({ ...cur, [questionId]: true }));
    // Persist to IndexedDB
    saveRevealed(questionId);
  }

  function revealAllAnswers() {
    if (!activeSection) return;
    setRevealed((cur) => {
      const next = { ...cur };
      activeSection.questions.forEach((q) => { if (!answers[q.id]) next[q.id] = true; });
      return next;
    });
    // Persist to IndexedDB
    const qids = activeSection.questions.map((q) => q.id);
    revealAllInSection(qids, answers);
  }

  function resetActiveSection() {
    if (!activeSection) return;
    const ok = window.confirm(`Xoá kết quả của "${activeSection.title}"?`);
    if (!ok) return;

    const qids = activeSection.questions.map((q) => q.id);

    setAnswers((cur) => {
      const next = { ...cur };
      activeSection.questions.forEach((q) => delete next[q.id]);
      return next;
    });
    setRevealed((cur) => {
      const next = { ...cur };
      activeSection.questions.forEach((q) => delete next[q.id]);
      return next;
    });

    // Persist to IndexedDB
    resetSectionProgress(qids);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSectionsGenerated(newSections) {
    // Save to IndexedDB first
    await persistCustomSections(newSections);
    // Re-fetch to get consistent data
    const updated = await fetchCustomSections();
    setCustomSections(updated);
    setActiveTab("custom");
    setCustomSectionIndex(updated.length - newSections.length); // jump to first new section
    setShowImport(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function clearAllCustomSectionsHandler() {
    await clearCustomDB();
    setCustomSections([]);
    setCustomSectionIndex(0);
    setActiveTab("preset");
  }

  async function deleteCurrentCustomSectionHandler() {
    const section = customSections[customSectionIndex];
    if (!section) return;
    await deleteCustomSectionDB(section.id);
    const updated = await fetchCustomSections();
    setCustomSections(updated);
    // Jump to previous section, or first, or switch tab if none left
    const newIdx = Math.max(0, customSectionIndex - 1);
    setCustomSectionIndex(newIdx);
    if (updated.length === 0) setActiveTab("preset");
  }

  /* ── Loading state ─────────────────────────────────────────────────── */
  if (!dbReady) {
    return (
      <div className="app-shell">
        <div className="loading-screen">
          <div className="loading-spinner">⟳</div>
          <p>Đang khởi tạo cơ sở dữ liệu...</p>
        </div>
      </div>
    );
  }

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="app-shell">
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-row">
            <div className="brand">
              QuizAI <span>Ôn thi trắc nghiệm</span>
            </div>
            <div className="header-actions">
              {/* Only show delete controls when in custom tab — never affects PRM393 */}
              {activeTab === "custom" && customSections.length > 0 && (
                <CustomSectionActions
                  onClearAll={clearAllCustomSectionsHandler}
                  onDeleteCurrent={deleteCurrentCustomSectionHandler}
                  hasMultiple={customSections.length > 1}
                />
              )}
              {activeSection && (
                <>
                  <button className="utility-button" onClick={revealAllAnswers} type="button">
                    Hiện hết đáp án
                  </button>
                  <button className="utility-button" onClick={resetActiveSection} type="button">
                    Làm lại
                  </button>
                </>
              )}
              <button
                aria-label={`Chuyển sang giao diện ${theme === "dark" ? "sáng" : "tối"}`}
                className="theme-button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                title="Đổi giao diện sáng/tối"
                type="button"
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === "preset" ? "active" : ""}`}
              onClick={() => { setActiveTab("preset"); setShowImport(false); }}
              type="button"
              id="tab-preset"
            >
              📚 PRM393
            </button>
            <button
              className={`tab-btn ${activeTab === "custom" ? "active" : ""}`}
              onClick={() => setActiveTab("custom")}
              type="button"
              id="tab-custom"
            >
              ✦ Tài liệu của tôi
              {customSections.length > 0 && (
                <span className="tab-count">{customSections.length}</span>
              )}
            </button>
            <button
              className={`tab-btn import-tab-btn ${showImport ? "active" : ""}`}
              onClick={() => { setShowImport((v) => !v); setActiveTab("custom"); }}
              type="button"
              id="tab-import"
            >
              + Tạo đề mới
            </button>
          </div>

          {/* Section nav */}
          {activeTab === "preset" && !showImport && (
            <nav aria-label="Danh sách module và đề thi" className="section-nav">
              {presetSections.map((section, index) => {
                const sectionStats = getStats(section, answers);
                const isComplete =
                  sectionStats.total > 0 && sectionStats.answered === sectionStats.total;
                return (
                  <span className="nav-item-group" key={section.id}>
                    {index > 0 &&
                      section.kind === "exam" &&
                      presetSections[index - 1].kind !== "exam" && (
                        <span aria-hidden="true" className="nav-separator" />
                      )}
                    <button
                      aria-current={index === activeSectionIndex ? "page" : undefined}
                      className={[
                        "section-button",
                        section.kind === "exam" ? "exam" : "",
                        index === activeSectionIndex ? "active" : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => changePresetSection(index)}
                      title={`${section.title} — đã làm ${sectionStats.answered}/${sectionStats.total}`}
                      type="button"
                    >
                      {section.chip}
                      {isComplete && <span aria-label="Đã hoàn thành" className="complete-dot" />}
                    </button>
                  </span>
                );
              })}
            </nav>
          )}

          {activeTab === "custom" && !showImport && customSections.length > 0 && (
            <nav aria-label="Danh sách đề tùy chỉnh" className="section-nav">
              {customSections.map((section, index) => {
                const sectionStats = getStats(section, answers);
                const isComplete =
                  sectionStats.total > 0 && sectionStats.answered === sectionStats.total;
                return (
                  <button
                    aria-current={index === customSectionIndex ? "page" : undefined}
                    className={[
                      "section-button custom-section-btn",
                      index === customSectionIndex ? "active" : "",
                    ].filter(Boolean).join(" ")}
                    key={section.id}
                    onClick={() => changeCustomSection(index)}
                    title={`${section.title} — đã làm ${sectionStats.answered}/${sectionStats.total}`}
                    type="button"
                  >
                    {section.chip}
                    {isComplete && <span aria-label="Đã hoàn thành" className="complete-dot" />}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Progress bar */}
          {activeSection && (
            <div
              aria-label={`Tiến độ ${Math.round(progressPercent)}%`}
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={Math.round(progressPercent)}
              className="progress-track"
              role="progressbar"
            >
              <span style={{ width: `${progressPercent}%` }} />
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <main className="main-content">
        {/* Document Import Panel */}
        {showImport && (
          <DocumentImport onSectionsGenerated={handleSectionsGenerated} />
        )}

        {/* Empty custom state */}
        {!showImport && activeTab === "custom" && customSections.length === 0 && (
          <div className="empty-custom">
            <div className="empty-icon">✦</div>
            <h2>Chưa có đề nào từ tài liệu</h2>
            <p>Tải tài liệu của bạn lên (PDF, Word, Markdown, Text) và AI sẽ tự động sinh câu hỏi trắc nghiệm.</p>
            <ul className="feature-list">
              <li>📄 Hỗ trợ .pdf, .docx, .md, .txt</li>
              <li>🖼 Hỗ trợ ảnh .png, .jpg — AI Vision đọc nội dung</li>
              <li>🤖 AI sinh câu hỏi chất lượng cao</li>
              <li>📋 Tạo lên đến 10 đề × 50 câu</li>
              <li>💾 Tự động lưu vào IndexedDB</li>
            </ul>
            <button
              className="generate-btn"
              onClick={() => setShowImport(true)}
              type="button"
              id="start-import-btn"
            >
              ✦ Bắt đầu tạo đề từ tài liệu
            </button>
          </div>
        )}

        {/* Quiz content */}
        {!showImport && activeSection && (
          <>
            <section className="section-introduction">
              <p className="eyebrow">
                {activeSection.kind === "exam"
                  ? "Đề thi"
                  : activeSection.kind === "extracted"
                  ? "Đề trích xuất"
                  : activeSection.kind === "custom"
                  ? "Đề AI tạo"
                  : "Nội dung học"}
              </p>
              <h1>{activeSection.title}</h1>
              <div className="section-meta">
                <span>📋 {activeSection.questions.length} câu</span>
                {bonusCount > 0 && <span>✨ {bonusCount} câu bổ sung</span>}
                {activeSection.kind === "custom" && activeSection.source && (
                  <span>📂 {activeSection.source}</span>
                )}
                <span>Tiến độ tự động lưu</span>
              </div>
            </section>

            <section aria-label={activeSection.title} className="question-list">
              {activeSection.questions.map((question, index) => (
                <QuestionCard
                  index={index}
                  isRevealed={Boolean(revealed[question.id])}
                  key={question.id}
                  onChoose={chooseAnswer}
                  onReveal={revealAnswer}
                  question={question}
                  selectedAnswer={answers[question.id]}
                />
              ))}
            </section>
          </>
        )}
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      {activeSection && !showImport && (
        <footer className="status-footer">
          <div className="status-content">
            <span>
              Đã làm {activeStats.answered}/{activeStats.total}
            </span>
            {activeStats.answered > 0 && (
              <strong>
                Đúng {activeStats.correct}/{activeStats.answered} (
                {Math.round((activeStats.correct / activeStats.answered) * 100)}%)
              </strong>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
