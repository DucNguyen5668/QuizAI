export function answerLabels(value) {
  return String(value || "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean).sort();
}

export function questionStatus(question, selectedAnswer, revealed) {
  const correct = answerLabels(question.ans);
  const selected = answerLabels(selectedAnswer);
  const answered = correct.length > 0 && selected.length >= correct.length;
  return {
    correct,
    selected,
    answered,
    locked: Boolean(revealed || answered),
    isCorrect: answered && selected.join(",") === correct.join(","),
  };
}

export function getStats(questions, answers) {
  return questions.reduce((stats, q) => {
    const status = questionStatus(q, answers[q.id]);
    if (status.answered) stats.answered++;
    if (status.isCorrect) stats.correct++;
    return stats;
  }, { answered: 0, correct: 0, total: questions.length });
}

export function toggleAnswer(question, current, label, revealed) {
  const status = questionStatus(question, current, revealed);
  if (status.locked || !question.opts[label]) return current || "";
  const next = status.selected.includes(label)
    ? status.selected.filter((s) => s !== label)
    : [...status.selected, label];
  return next.sort().join(",");
}

export function formatText(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replace(/```(?:\w+)?\n?([\s\S]*?)```/g, (_, code) => `<pre>${code.replace(/^\n+|\n+$/g, "")}</pre>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}
