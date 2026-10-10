import { lazy, Suspense, useState } from "react";
import Icon from "./Icon";

const DocumentImport = lazy(() => import("./DocumentImport"));
const labels = ["A", "B", "C", "D"];
const blank = () => ({ key: crypto.randomUUID(), stem: "", opts: { A: "", B: "", C: "", D: "" }, ans: "A", why: "" });

export default function CreateQuiz({ onSave }) {
  const [mode, setMode] = useState("manual");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState(() => [blank()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key, field, value) {
    setQuestions((qs) => qs.map((q) => q.key === key ? { ...q, [field]: value } : q));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!title.trim()) { setError("Hãy đặt tên cho bộ đề."); return; }
    const invalid = questions.findIndex((q) => !q.stem.trim() || labels.some((l) => !q.opts[l].trim()) || !q.ans);
    if (invalid >= 0) { setError(`Câu ${invalid + 1} cần nội dung, đủ 4 lựa chọn và ít nhất một đáp án đúng.`); return; }
    setSaving(true);
    const id = `quiz-${crypto.randomUUID()}`;
    try {
      await onSave([{ id, title: title.trim(), subject: subject.trim(), chip: subject.trim() || "Tự tạo", kind: "manual", source: subject.trim() || "Tự nhập câu hỏi", createdAt: new Date().toISOString(), questions: questions.map((q, i) => ({ id: `${id}-${i + 1}`, n: i + 1, stem: q.stem.trim(), opts: Object.fromEntries(labels.map((l) => [l, q.opts[l].trim()])), ans: q.ans, why: q.why.trim() })) }]);
    } catch (err) { setError(`Chưa lưu được bộ đề: ${err.message}`); setSaving(false); }
  }

  return <>
    <div className="page-heading"><div><p className="eyebrow">KHÔNG GIAN CỦA BẠN</p><h1>Tạo bộ đề mới</h1><p>Cho bất kỳ môn học nào, theo cách phù hợp với bạn.</p></div></div>
    <div className="create-tabs" aria-label="Cách tạo đề"><button type="button" className={mode === "manual" ? "active" : ""} onClick={() => setMode("manual")}><Icon name="file" /> Tự nhập câu hỏi <span>Không cần AI</span></button><button type="button" className={mode === "document" ? "active" : ""} onClick={() => setMode("document")}><Icon name="spark" /> Tạo từ tài liệu <span>Với trợ lý AI</span></button></div>
    {mode === "document" ? <Suspense fallback={<div className="loading-panel" role="status">Đang tải công cụ nhập tài liệu…</div>}><DocumentImport onSectionsGenerated={onSave} /></Suspense> : <form className="manual-form" onSubmit={submit}>
      <div className="panel form-basics"><div><label htmlFor="quiz-title">Tên bộ đề <span className="required">*</span></label><input id="quiz-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ví dụ: Tiếng Anh — Unit 1" maxLength={160} required /></div><div><label htmlFor="quiz-subject">Môn học / chủ đề</label><input id="quiz-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ví dụ: Tiếng Anh" maxLength={80} /></div></div>
      {questions.map((q, index) => <fieldset className="panel editor-question" key={q.key}><legend>Câu hỏi {index + 1}</legend><div className="editor-top"><span className="badge">CÂU {String(index + 1).padStart(2, "0")}</span>{questions.length > 1 && <button className="icon-button danger" type="button" aria-label={`Xóa câu ${index + 1}`} onClick={() => setQuestions((qs) => qs.filter((x) => x.key !== q.key))}><Icon name="trash" size={18} /></button>}</div><label htmlFor={`stem-${q.key}`}>Nội dung câu hỏi</label><textarea id={`stem-${q.key}`} value={q.stem} onChange={(e) => update(q.key, "stem", e.target.value)} placeholder="Nhập câu hỏi của bạn…" rows={3} required /><p className="field-hint">Chạm vào chữ cái để chọn đáp án đúng. Có thể chọn nhiều đáp án.</p><div className="editor-options">{labels.map((l) => <div key={l}><button type="button" className={`answer-selector ${q.ans.split(",").includes(l) ? "active" : ""}`} aria-label={`Đáp án đúng ${l} cho câu ${index + 1}`} aria-pressed={q.ans.split(",").includes(l)} onClick={() => update(q.key, "ans", (q.ans.split(",").includes(l) ? q.ans.split(",").filter((a) => a !== l) : [...q.ans.split(",").filter(Boolean), l]).sort().join(","))}>{l}</button><input aria-label={`Lựa chọn ${l} của câu ${index + 1}`} value={q.opts[l]} onChange={(e) => update(q.key, "opts", { ...q.opts, [l]: e.target.value })} placeholder={`Nội dung đáp án ${l}`} required /></div>)}</div><label htmlFor={`why-${q.key}`}>Giải thích <span className="optional">(tùy chọn)</span></label><textarea id={`why-${q.key}`} value={q.why} onChange={(e) => update(q.key, "why", e.target.value)} rows={2} placeholder="Vì sao đáp án này đúng?" /></fieldset>)}
      {error && <div className="error-banner" role="alert">{error}</div>}
      <div className="editor-actions"><button className="secondary-button" type="button" onClick={() => setQuestions((qs) => [...qs, blank()])}><Icon name="plus" size={18} /> Thêm câu hỏi</button><button className="primary-button" type="submit" disabled={saving}><Icon name="check" size={18} />{saving ? "Đang lưu…" : `Lưu bộ đề · ${questions.length} câu`}</button></div>
    </form>}
  </>;
}
