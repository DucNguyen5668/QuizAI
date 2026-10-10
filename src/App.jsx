import { lazy, Suspense, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Icon from "./components/Icon";
import QuestionCard from "./components/QuestionCard";
import { getStats, questionStatus, toggleAnswer } from "./utils/quiz";
import { initDB, getSectionCatalog, getSectionQuestions, getProgress, getSetting, setSetting, saveAnswer, saveRevealed, revealAllInSection, resetSectionProgress, saveCustomSections, deleteCustomSection, setSectionArchived } from "./data/dataService";

const CreateQuiz = lazy(() => import("./components/CreateQuiz"));
const navigation = [{ id: "home", icon: "grid", label: "Tổng quan" }, { id: "library", icon: "book", label: "Đề của tôi" }, { id: "archive", icon: "archive", label: "Kho lưu trữ" }];
const pageTitles = { home: "Tổng quan", library: "Đề của tôi", archive: "Kho lưu trữ", create: "Tạo bộ đề", quiz: "Luyện tập" };
const formatCount = (n) => n.toLocaleString("vi-VN");

function QuizTile({ section, onOpen, onArchive, onDelete }) {
  return <article className="quiz-tile"><div className="tile-top"><span className={`tile-icon ${section.origin === "preset" ? "blue" : ""}`}><Icon name={section.kind === "mod" ? "layers" : "file"} size={23} /></span><span className="badge">{section.origin === "preset" ? "PRM393" : section.kind === "manual" ? "Tự tạo" : section.kind === "extracted" ? "Đề gốc" : "Từ tài liệu"}</span></div><h3>{section.title}</h3><p className="tile-subject">{section.subject || (section.origin === "preset" ? "Flutter & Dart" : section.source || "Chủ đề tự chọn")}</p><div className="tile-meta"><span><Icon name="file" size={15} /> {formatCount(section.questionCount || 0)} câu hỏi</span>{section.createdAt && <span>{new Date(section.createdAt).toLocaleDateString("vi-VN")}</span>}</div><div className="tile-footer"><button className="text-button" onClick={() => onOpen(section)} type="button">Luyện tập <Icon name="arrow" size={17} /></button>{section.origin === "custom" && <div className="tile-actions"><button className="icon-button" type="button" title={section.archived ? "Đưa về Đề của tôi" : "Đưa vào kho lưu trữ"} aria-label={`${section.archived ? "Khôi phục" : "Lưu trữ"} ${section.title}`} onClick={() => onArchive(section)}><Icon name={section.archived ? "book" : "archive"} size={17} /></button><button className="icon-button danger" type="button" aria-label={`Xóa ${section.title}`} title="Xóa bộ đề" onClick={() => onDelete(section)}><Icon name="trash" size={17} /></button></div>}</div></article>;
}

function EmptyState({ filtered, onCreate }) {
  return <div className="empty-state"><span className="empty-symbol"><Icon name={filtered ? "search" : "book"} size={30} /></span><h3>{filtered ? "Chưa tìm thấy bộ đề phù hợp" : "Bộ đề đầu tiên bắt đầu từ bạn"}</h3><p>{filtered ? "Thử tìm bằng tên bộ đề hoặc chủ đề khác." : "Tự nhập câu hỏi hoặc tạo đề từ tài liệu. Mọi môn học đều có một không gian ở đây."}</p>{!filtered && <button className="primary-button" onClick={onCreate} type="button"><Icon name="plus" size={18} /> Tạo bộ đề đầu tiên</button>}</div>;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [catalog, setCatalog] = useState([]);
  const [page, setPage] = useState("home");
  const [collection, setCollection] = useState(false);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [theme, setTheme] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [lastSession, setLastSession] = useState(null);
  const [section, setSection] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved");
  const answersRef = useRef({});
  const revealedRef = useRef({});
  const sectionRef = useRef(null);
  const sessionRef = useRef(null);
  const loadToken = useRef(0);
  const saveQueue = useRef(Promise.resolve());
  const failedSaves = useRef([]);
  const questionArea = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await initDB();
        const [sections, savedTheme, session] = await Promise.all([getSectionCatalog(), getSetting("theme"), getSetting("lastSession")]);
        if (cancelled) return;
        setCatalog(sections);
        if (["light", "dark"].includes(savedTheme)) setTheme(savedTheme);
        setLastSession(session);
        sessionRef.current = session;
        setReady(true);
      } catch (err) { if (!cancelled) setError(`Không thể mở dữ liệu: ${err.message}`); }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#101b18" : "#f7f9f8");
    if (ready) setSetting("theme", theme).catch((err) => setError(`Chưa lưu được giao diện: ${err.message}`));
  }, [theme, ready]);

  const persist = useCallback((operation) => {
    setSaveStatus("saving");
    const pending = saveQueue.current.then(operation);
    saveQueue.current = pending.catch((err) => {
      failedSaves.current.push(operation);
      setSaveStatus("error");
      setError(`Chưa lưu được tiến độ: ${err.message}`);
    });
    pending.then(() => { if (saveQueue.current === currentQueue && !failedSaves.current.length) setSaveStatus("saved"); }, () => {});
    const currentQueue = saveQueue.current;
    return pending;
  }, []);

  useEffect(() => {
    if (!section || quizLoading || page !== "quiz") return;
    const session = { id: section.id, origin: section.origin, questionIndex, title: section.title };
    sessionRef.current = session;
    setLastSession(session);
    setSetting("lastSession", session).catch((err) => setError(`Chưa lưu được vị trí làm bài: ${err.message}`));
  }, [section, questionIndex, quizLoading, page]);

  const activeQuizzes = useMemo(() => catalog.filter((s) => !s.archived), [catalog]);
  const preset = useMemo(() => catalog.filter((s) => s.origin === "preset"), [catalog]);
  const customArchived = useMemo(() => catalog.filter((s) => s.archived && s.origin === "custom"), [catalog]);
  const totalPresetQuestions = preset.reduce((n, s) => n + s.questionCount, 0);
  const stats = useMemo(() => getStats(section?.questions || [], answers), [section, answers]);
  const progress = stats.total ? Math.round(stats.answered / stats.total * 100) : 0;
  const currentQuestion = section?.questions[questionIndex];
  const lastQuiz = catalog.find((s) => s.id === lastSession?.id && s.origin === lastSession?.origin);
  const visibleQuizzes = useMemo(() => {
    const source = page === "archive" ? (collection ? preset : customArchived) : activeQuizzes;
    const query = deferredSearch.trim().toLocaleLowerCase("vi");
    return source.filter((s) => (!query || `${s.title} ${s.subject || ""} ${s.source || ""} ${s.collectionId || ""}`.toLocaleLowerCase("vi").includes(query)) && (filter === "all" || (filter === "module" ? s.kind === "mod" : s.kind !== "mod"))).sort((a, b) => sort === "name" ? a.title.localeCompare(b.title, "vi", { numeric: true }) : sort === "count" ? b.questionCount - a.questionCount : collection ? preset.indexOf(a) - preset.indexOf(b) : (b.createdAt || "").localeCompare(a.createdAt || ""));
  }, [page, collection, preset, customArchived, activeQuizzes, deferredSearch, filter, sort]);

  function navigate(nextPage) {
    loadToken.current++;
    setPage(nextPage);
    setSearch("");
    setFilter("all");
    setCollection(false);
    setShowMap(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  async function openQuiz(metadata, resume = true) {
    const token = ++loadToken.current;
    setPage("quiz");
    setQuizLoading(true);
    setShowMap(false);
    if (!failedSaves.current.length) setError("");
    setSection(null);
    sectionRef.current = null;
    try {
      await saveQueue.current;
      const questions = await getSectionQuestions(metadata);
      const prog = await getProgress(questions.map((q) => q.id));
      if (token !== loadToken.current) return;
      const nextSection = { ...metadata, questions };
      sectionRef.current = nextSection;
      setSection(nextSection);
      answersRef.current = prog.answers;
      revealedRef.current = prog.revealed;
      setAnswers(prog.answers);
      setRevealed(prog.revealed);
      const saved = sessionRef.current;
      setQuestionIndex(resume && saved?.id === metadata.id && saved.origin === metadata.origin ? Math.min(Math.max(saved.questionIndex || 0, 0), Math.max(questions.length - 1, 0)) : 0);
      setQuizLoading(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) { if (token === loadToken.current) { setQuizLoading(false); setError(`Không thể tải bộ đề: ${err.message}`); } }
  }

  const choose = useCallback((id, label) => {
    const q = sectionRef.current?.questions.find((x) => x.id === id);
    if (!q) return;
    const next = toggleAnswer(q, answersRef.current[id], label, revealedRef.current[id]);
    if (next === (answersRef.current[id] || "")) return;
    answersRef.current = { ...answersRef.current, [id]: next };
    setAnswers(answersRef.current);
    persist(() => saveAnswer(id, next)).catch(() => {});
  }, [persist]);

  const reveal = useCallback((id) => {
    revealedRef.current = { ...revealedRef.current, [id]: true };
    setRevealed(revealedRef.current);
    persist(() => saveRevealed(id)).catch(() => {});
  }, [persist]);

  function jumpTo(index) {
    setQuestionIndex(index);
    setShowMap(false);
    questionArea.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  useEffect(() => {
    if (page !== "quiz" || !section) return;
    function onKey(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(event.target.tagName) || event.target.isContentEditable) return;
      if (event.key === "ArrowRight") { event.preventDefault(); setQuestionIndex((i) => Math.min(i + 1, section.questions.length - 1)); }
      if (event.key === "ArrowLeft") { event.preventDefault(); setQuestionIndex((i) => Math.max(i - 1, 0)); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, section]);

  async function handleSave(newSections) {
    await saveCustomSections(newSections);
    const updated = await getSectionCatalog();
    setCatalog(updated);
    const first = updated.find((s) => s.id === newSections[0]?.id && s.origin === "custom");
    if (first) await openQuiz(first, false);
    else navigate("library");
  }

  async function archiveQuiz(quiz) {
    try { await setSectionArchived(quiz.id, !quiz.archived); setCatalog(await getSectionCatalog()); }
    catch (err) { setError(`Chưa lưu trữ được bộ đề: ${err.message}`); }
  }

  async function deleteQuiz(quiz) {
    if (!window.confirm(`Xóa bộ đề “${quiz.title}” và tiến độ của bộ đề này?`)) return;
    try { await saveQueue.current; await deleteCustomSection(quiz.id); setCatalog(await getSectionCatalog()); if (lastSession?.id === quiz.id) { setLastSession(null); sessionRef.current = null; await setSetting("lastSession", null); } }
    catch (err) { setError(`Chưa xóa được bộ đề: ${err.message}`); }
  }

  function resetQuiz() {
    if (!window.confirm(`Làm lại “${section.title}”? Tiến độ của bộ đề này sẽ được đặt lại.`)) return;
    const ids = section.questions.map((q) => q.id);
    answersRef.current = {};
    revealedRef.current = {};
    setAnswers({}); setRevealed({}); setQuestionIndex(0);
    persist(() => resetSectionProgress(ids)).catch(() => {});
  }

  function revealAll() {
    const ids = section.questions.map((q) => q.id);
    revealedRef.current = Object.fromEntries(ids.map((id) => [id, true]));
    setRevealed(revealedRef.current);
    persist(() => revealAllInSection(ids)).catch(() => {});
  }

  function exportQuiz() {
    const { origin, archived, ...data } = section;
    const url = URL.createObjectURL(new Blob([JSON.stringify({ sections: [data] }, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url; link.download = `quizspace-${section.id}.json`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const tile = (quiz) => <QuizTile key={`${quiz.origin}-${quiz.id}`} section={quiz} onOpen={openQuiz} onArchive={archiveQuiz} onDelete={deleteQuiz} />;
  const createButton = <button className="primary-button" onClick={() => navigate("create")} type="button"><Icon name="plus" size={18} /> Tạo bộ đề mới</button>;
  const collectionCard = <button className="collection-card" onClick={() => { setCollection(true); setSearch(""); setFilter("all"); setPage("archive"); }} type="button"><span className="collection-icon"><Icon name="layers" size={30} /></span><div className="collection-info"><div className="collection-title"><h3>PRM393</h3><span className="badge">BỘ SƯU TẬP</span></div><p>Lập trình di động với Flutter & Dart</p><div className="collection-meta"><span>{preset.filter((s) => s.kind === "mod").length} chủ đề</span><span>{preset.filter((s) => s.kind === "exam").length} đề thi</span><span>{formatCount(totalPresetQuestions)} câu hỏi</span></div></div><span className="collection-open">Mở bộ sưu tập <Icon name="arrow" size={18} /></span></button>;

  if (!ready) return <div className="boot-screen"><div className="brand-mark">Q</div><h1>QuizSpace</h1>{error ? <><p role="alert">{error}</p><button className="primary-button" onClick={() => window.location.reload()} type="button">Thử lại</button></> : <><span className="loading-dot" /><p>Đang mở không gian học tập…</p></>}</div>;

  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Đến nội dung chính</a>
    <aside className="sidebar"><button className="brand" type="button" onClick={() => navigate("home")} aria-label="QuizSpace — về Tổng quan"><span className="brand-mark">Q<span /></span><span>QuizSpace<small>KHÔNG GIAN LUYỆN ĐỀ</small></span></button><div className="sidebar-workspace"><span className="workspace-avatar"><Icon name="book" size={18} /></span><div>Không gian cá nhân<small>Học theo cách của bạn</small></div></div><p className="nav-caption">KHÔNG GIAN HỌC TẬP</p><nav aria-label="Điều hướng chính">{navigation.map((item) => <button key={item.id} type="button" className={`nav-button ${page === item.id || (page === "quiz" && item.id === (section?.archived ? "archive" : "library")) ? "active" : ""}`} aria-current={page === item.id ? "page" : undefined} onClick={() => navigate(item.id)}><Icon name={item.icon} size={19} /><span>{item.label}</span>{item.id === "library" && activeQuizzes.length > 0 && <span className="nav-count">{activeQuizzes.length}</span>}</button>)}</nav><div className="sidebar-create">{createButton}</div><div className="sidebar-note"><span className="note-icon"><Icon name="spark" size={22} /></span><h3>Mỗi ngày, một bước tiến.</h3><p>Một vài câu hỏi hôm nay.<br />Thêm tự tin cho ngày mai.</p></div><div className="sidebar-footer"><Icon name="shield" size={16} /><span>Tiến độ lưu trên thiết bị này</span></div></aside>
    <div className="workspace"><header className="topbar"><div className="breadcrumb"><Icon name="grid" size={17} /><span>Không gian học tập</span><Icon name="chevron" size={13} /><strong>{pageTitles[page]}</strong></div><div className="topbar-actions"><span className="personal-tag"><span /> Sẵn sàng học tập</span><button className="icon-button theme-button" type="button" aria-label={`Chuyển sang giao diện ${theme === "light" ? "tối" : "sáng"}`} onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}><Icon name={theme === "light" ? "moon" : "sun"} size={20} /></button></div></header>
      <main className={`main-content ${page === "quiz" ? "quiz-main" : ""}`} id="main-content">
        {error && <div className="error-banner" role="alert"><span>{error}</span><div>{failedSaves.current.length > 0 && <button type="button" onClick={() => { const retries = failedSaves.current; failedSaves.current = []; setError(""); persist(async () => { for (const retry of retries) await retry(); }).catch(() => {}); }}>Thử lưu lại</button>}<button className="icon-button" aria-label="Đóng thông báo" type="button" onClick={() => setError("")}><Icon name="close" size={17} /></button></div></div>}
        {page === "home" && <>
          <div className="page-heading"><div><p className="eyebrow">CHÀO MỪNG ĐẾN QUIZSPACE</p><h1>Hôm nay bạn muốn học gì?</h1><p>Một không gian cho mọi môn học. Một bước gần hơn đến mục tiêu.</p></div>{createButton}</div>
          <section className="welcome-banner"><div className="welcome-copy"><span className="hero-tag"><Icon name="spark" size={15} /> HỌC CHỦ ĐỘNG · TIẾN BỘ MỖI NGÀY</span><h2>Luyện tập hôm nay.<br /><span>Tự tin hơn ngày mai.</span></h2><p>Tạo bộ đề của riêng bạn, luyện từng câu hỏi<br className="desktop-break" /> và hiểu rõ kiến thức qua mỗi đáp án.</p><button className="hero-button" type="button" onClick={() => lastQuiz ? openQuiz(lastQuiz) : navigate("create")}>{lastQuiz ? "Tiếp tục luyện tập" : "Bắt đầu với bộ đề của bạn"}<Icon name="arrow" size={18} /></button></div><div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-sheet"><span className="art-sheet-label">YOUR NEXT CHAPTER</span><div className="art-line long" /><div className="art-line short" /><div className="art-answer"><span>A</span><i /></div><div className="art-answer art-correct"><span><Icon name="check" size={14} /></span><i /><Icon name="check" size={17} /></div><div className="art-answer"><span>C</span><i /></div><div className="art-footer"><span /><span /><span /></div></div><div className="art-note"><span><Icon name="check" size={17} /></span>Hiểu thêm một điều mới</div><span className="art-spark"><Icon name="spark" size={28} /></span></div></section>
          <section className="stats-grid" aria-label="Thống kê thư viện"><div className="stat-card"><span className="stat-icon"><Icon name="book" size={22} /></span><div><p>Bộ đề của bạn</p><strong>{formatCount(activeQuizzes.length)}</strong><span>Sẵn sàng để luyện tập</span></div></div><div className="stat-card"><span className="stat-icon blue"><Icon name="file" size={22} /></span><div><p>Câu hỏi của bạn</p><strong>{formatCount(activeQuizzes.reduce((n, s) => n + (s.questionCount || 0), 0))}</strong><span>Từ những chủ đề bạn chọn</span></div></div><div className="stat-card"><span className="stat-icon amber"><Icon name="archive" size={22} /></span><div><p>Kho lưu trữ</p><strong>{1 + customArchived.length}</strong><span>Bộ sưu tập & bộ đề đã lưu</span></div></div></section>
          {lastQuiz && <button className="resume-card" type="button" onClick={() => openQuiz(lastQuiz)}><span className="resume-icon"><Icon name="clock" size={22} /></span><div><span>TIẾP TỤC LẦN HỌC GẦN NHẤT</span><h3>{lastQuiz.title}</h3><p>Vị trí đã lưu: câu {(lastSession.questionIndex || 0) + 1} / {lastQuiz.questionCount}</p></div><Icon name="arrow" size={21} /></button>}
          <div className="section-heading"><div><h2>Bộ đề gần đây</h2><p>Chọn một bộ đề và bắt đầu theo nhịp của bạn.</p></div><button className="text-button" type="button" onClick={() => navigate("library")}>Xem tất cả <Icon name="arrow" size={16} /></button></div>
          {activeQuizzes.length ? <div className="quiz-grid">{activeQuizzes.slice(0, 3).map(tile)}</div> : <EmptyState onCreate={() => navigate("create")} />}
          <div className="section-heading archive-preview-heading"><div><h2>Khám phá kho lưu trữ</h2><p>Các bộ sưu tập cũ vẫn luôn ở đây khi bạn cần.</p></div><span className="subtle-label">ĐÃ LƯU TRỮ</span></div>{collectionCard}
          <div className="page-footnote">QuizSpace · Học tập theo cách của bạn<span>Tiến độ tự động lưu trên trình duyệt này</span></div>
        </>}
        {(page === "library" || page === "archive") && <>
          {collection && <button className="text-button back-link" type="button" onClick={() => { setCollection(false); setSearch(""); setFilter("all"); }}><Icon name="back" size={16} /> Kho lưu trữ</button>}
          <div className="page-heading"><div><p className="eyebrow">{page === "library" ? "THƯ VIỆN CÁ NHÂN" : "KIẾN THỨC LUÔN Ở ĐÂY"}</p><h1>{collection ? "PRM393 · Flutter & Dart" : pageTitles[page]}</h1><p>{collection ? `${preset.length} bộ câu hỏi · ${formatCount(totalPresetQuestions)} câu hỏi · Giữ nguyên nội dung và tiến độ đã có.` : page === "library" ? "Tất cả bộ đề của bạn, cho bất kỳ môn học nào." : "Lưu lại bộ đề và các bộ sưu tập để sử dụng khi cần."}</p></div>{createButton}</div>
          <div className="library-toolbar"><label className="search-input"><Icon name="search" size={19} /><input aria-label="Tìm bộ đề" placeholder="Tìm tên bộ đề, môn học…" value={search} onChange={(e) => setSearch(e.target.value)} />{search && <button className="icon-button" type="button" aria-label="Xóa tìm kiếm" onClick={() => setSearch("")}><Icon name="close" size={16} /></button>}</label><select aria-label="Sắp xếp bộ đề" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">{collection ? "Thứ tự học tập" : "Mới nhất"}</option><option value="name">Tên A → Z</option><option value="count">Nhiều câu hỏi nhất</option></select></div>
          {collection && <div className="filter-row" aria-label="Lọc bộ câu hỏi">{[{ id: "all", label: "Tất cả" }, { id: "module", label: "Học theo chủ đề" }, { id: "exam", label: "Đề thi" }].map((f) => <button key={f.id} type="button" aria-pressed={filter === f.id} className={filter === f.id ? "active" : ""} onClick={() => setFilter(f.id)}>{f.label}</button>)}</div>}
          {page === "archive" && !collection && (!deferredSearch.trim() || "prm393 flutter dart lập trình di động".includes(deferredSearch.toLocaleLowerCase("vi").trim())) && collectionCard}
          {(page === "library" || collection || customArchived.length > 0 || search) && <><div className="result-count">{visibleQuizzes.length} bộ đề{page === "archive" && !collection ? " đã lưu trữ" : ""}</div>{visibleQuizzes.length ? <div className="quiz-grid">{visibleQuizzes.map(tile)}</div> : <EmptyState filtered={Boolean(search || filter !== "all" || page === "archive")} onCreate={() => navigate("create")} />}</>}
        </>}
        {page === "create" && <Suspense fallback={<div className="loading-panel" role="status">Đang mở công cụ tạo đề…</div>}><CreateQuiz onSave={handleSave} /></Suspense>}
        {page === "quiz" && <>
          <button className="text-button back-link" type="button" onClick={() => navigate(section?.archived ? "archive" : "library")}><Icon name="back" size={17} /> Về {section?.archived ? "kho lưu trữ" : "đề của tôi"}</button>
          {quizLoading ? <div className="loading-panel" role="status"><span className="loading-dot" /> Đang tải bộ câu hỏi…</div> : section && <>
            <div className="page-heading quiz-heading"><div><p className="eyebrow">{section.archived ? "KHO LƯU TRỮ" : "LUYỆN TẬP"}{section.origin === "preset" ? " / PRM393" : ""}</p><h1>{section.title}</h1><p>{stats.total} câu hỏi · Chọn đáp án để xem giải thích</p></div><span className={`save-indicator ${saveStatus === "error" ? "danger" : ""}`} role="status"><Icon name={saveStatus === "saving" ? "clock" : saveStatus === "error" ? "close" : "check"} size={16} />{saveStatus === "saving" ? "Đang lưu…" : saveStatus === "error" ? "Chưa lưu được" : "Đã lưu tiến độ"}</span></div>
            <div className="quiz-layout"><div className="quiz-content" ref={questionArea}>
              <div className="quiz-progress"><div><span>Tiến độ luyện tập</span><strong>{stats.answered}/{stats.total} câu</strong></div><div className="progress-track" role="progressbar" aria-label="Tiến độ trả lời" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div></div>
              {currentQuestion ? <QuestionCard key={currentQuestion.id} question={currentQuestion} index={questionIndex} selectedAnswer={answers[currentQuestion.id]} isRevealed={Boolean(revealed[currentQuestion.id])} onChoose={choose} onReveal={reveal} /> : <div className="empty-state"><h3>Bộ đề này chưa có câu hỏi</h3></div>}
              {currentQuestion && <div className="question-navigation"><button className="secondary-button" type="button" disabled={questionIndex === 0} onClick={() => jumpTo(questionIndex - 1)}><Icon name="back" size={17} /> Câu trước</button><span>{questionIndex + 1} <span>/ {stats.total}</span></span><button className="primary-button" type="button" disabled={questionIndex === stats.total - 1} onClick={() => jumpTo(questionIndex + 1)}>Câu tiếp <Icon name="arrow" size={17} /></button></div>}
              {stats.total > 0 && stats.answered === stats.total && <div className="completion-card" role="status"><span className="stat-icon"><Icon name="check" size={24} /></span><div><h3>Bạn đã hoàn thành bộ đề!</h3><p>Đúng {stats.correct}/{stats.total} câu ({Math.round(stats.correct / stats.total * 100)}%). Xem lại những câu chưa đúng để hiểu sâu hơn.</p></div><button className="secondary-button" type="button" onClick={resetQuiz}>Luyện lại</button></div>}
              <div className="quiz-tip"><Icon name="shield" size={16} /><span>Tiến độ tự lưu. Bạn có thể quay lại bất cứ lúc nào trên trình duyệt này.</span></div>
            </div><aside className={`question-map panel ${showMap ? "map-open" : ""}`} aria-label="Điều hướng câu hỏi"><div className="map-heading"><h2>Bản đồ câu hỏi</h2><button className="icon-button mobile-map-close" type="button" aria-label="Đóng bản đồ câu hỏi" onClick={() => setShowMap(false)}><Icon name="close" size={18} /></button><span className="desktop-map-count">{stats.total} câu</span></div><div className="map-stats"><div><strong>{stats.answered}</strong><span>Đã trả lời</span></div><div><strong>{stats.correct}</strong><span>Đúng</span></div><div><strong>{stats.total - stats.answered}</strong><span>Còn lại</span></div></div><div className="map-grid">{section.questions.map((q, i) => { const status = questionStatus(q, answers[q.id], revealed[q.id]); const state = status.answered ? status.isCorrect ? "correct" : "wrong" : revealed[q.id] ? "revealed" : status.selected.length ? "partial" : ""; return <button key={q.id} type="button" aria-label={`Câu ${i + 1}${status.answered ? status.isCorrect ? ", trả lời đúng" : ", trả lời sai" : revealed[q.id] ? ", đã xem đáp án" : status.selected.length ? ", đang chọn đáp án" : ", chưa trả lời"}`} aria-current={i === questionIndex ? "step" : undefined} className={`${state} ${i === questionIndex ? "current" : ""}`} onClick={() => jumpTo(i)}>{i + 1}</button>; })}</div><div className="map-legend"><span><i className="correct" /> Đúng</span><span><i className="wrong" /> Sai</span><span><i className="revealed" /> Đã xem</span></div><div className="map-tools"><button className="text-button" type="button" onClick={resetQuiz}><Icon name="reset" size={17} /> Làm lại bộ đề</button><button className="text-button" type="button" onClick={revealAll}><Icon name="eye" size={17} /> Xem tất cả đáp án</button><button className="text-button" type="button" onClick={exportQuiz}><Icon name="download" size={17} /> Xuất bộ đề JSON</button></div></aside></div>
            {showMap && <button className="map-backdrop" type="button" aria-label="Đóng bản đồ câu hỏi" onClick={() => setShowMap(false)} />}
            <div className="mobile-quiz-bar"><span><strong>{questionIndex + 1}</strong> / {stats.total} câu</span><button className="secondary-button" type="button" aria-expanded={showMap} onClick={() => setShowMap((v) => !v)}><Icon name="grid" size={17} /> Bản đồ câu hỏi</button></div>
          </>}
        </>}
      </main>
    </div>
    <nav className="mobile-nav" aria-label="Điều hướng trên điện thoại">{[...navigation, { id: "create", label: "Tạo đề", icon: "plus" }].map((item) => <button key={item.id} type="button" aria-current={page === item.id ? "page" : undefined} className={page === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon name={item.icon} size={21} /><span>{item.label}</span></button>)}</nav>
  </div>;
}
