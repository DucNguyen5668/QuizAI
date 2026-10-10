import { memo } from "react";
import Icon from "./Icon";
import { formatText, questionStatus } from "../utils/quiz";

const FormattedText = memo(function FormattedText({ text, className = "" }) {
  return <div className={`formatted-text ${className}`} dangerouslySetInnerHTML={{ __html: formatText(text) }} />;
});

export default memo(function QuestionCard({ question, index, selectedAnswer, isRevealed, onChoose, onReveal }) {
  const status = questionStatus(question, selectedAnswer, isRevealed);
  return (
    <article className="question-card">
      <div className="question-card-top"><span className="question-number">CÂU {String(index + 1).padStart(2, "0")}</span><span className="question-type">{status.correct.length > 1 ? `Chọn ${status.correct.length} đáp án` : "Chọn một đáp án"}{question.bs ? " · Bổ sung" : ""}</span></div>
      <FormattedText className="question-stem" text={question.stem} />
      <div className="options">
        {Object.keys(question.opts).sort().map((label) => {
          const selected = status.selected.includes(label);
          const correct = status.locked && status.correct.includes(label);
          const wrong = status.locked && selected && !correct;
          return <button key={label} type="button" disabled={status.locked} aria-pressed={selected} className={`option ${correct ? "correct" : wrong ? "wrong" : selected ? "selected" : ""}`} onClick={() => onChoose(question.id, label)}><span className="option-label">{label}</span><FormattedText className="option-content" text={question.opts[label]} />{correct && <Icon name="check" size={18} />}{wrong && <Icon name="close" size={18} />}</button>;
        })}
      </div>
      {status.locked ? <div className={`explanation ${question.why?.startsWith("⚠️") ? "warning" : ""}`} role="status"><div className="explanation-title"><Icon name="check" size={17} /> Đáp án: {status.correct.join(", ")}</div><FormattedText text={question.why || "Câu hỏi này chưa có giải thích chi tiết."} /></div> : <button className="text-button reveal-button" onClick={() => onReveal(question.id)} type="button"><Icon name="eye" size={17} /> Xem đáp án và giải thích</button>}
    </article>
  );
});
