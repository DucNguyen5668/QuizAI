import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getStats, questionStatus, toggleAnswer, formatText } from "../src/utils/quiz.js";

const single = { id: "single", ans: "B", opts: { A: "a", B: "b", C: "c", D: "d" } };
const multiple = { id: "multi", ans: "D,B", opts: single.opts };

test("a single-choice answer locks and scores against the actual answer", () => {
  assert.equal(toggleAnswer(single, "", "B"), "B");
  assert.equal(questionStatus(single, "B").isCorrect, true);
  assert.equal(toggleAnswer(single, "B", "A"), "B");
  assert.equal(questionStatus(single, "A").isCorrect, false);
});

test("multiple-choice scoring ignores answer order and waits for all choices", () => {
  const first = toggleAnswer(multiple, "", "D");
  assert.equal(questionStatus(multiple, first).answered, false);
  assert.equal(toggleAnswer(multiple, first, "D"), "");
  const complete = toggleAnswer(multiple, first, "B");
  assert.equal(complete, "B,D");
  assert.equal(questionStatus(multiple, complete).isCorrect, true);
  assert.equal(toggleAnswer(multiple, complete, "A"), complete);
});

test("viewing an answer does not count as answering correctly", () => {
  assert.equal(questionStatus(single, "", true).locked, true);
  assert.equal(toggleAnswer(single, "", "B", true), "");
  assert.deepEqual(getStats([single, multiple], { single: "B", multi: "D" }), { answered: 1, correct: 1, total: 2 });
});

test("a missing answer cannot silently become option A", () => {
  assert.equal(questionStatus({ ...single, ans: "" }, "A").isCorrect, false);
  assert.equal(questionStatus({ ...single, ans: "" }, "A").answered, false);
});

test("question formatting escapes executable HTML while preserving inline code", () => {
  const rendered = formatText('<img src=x onerror="alert(1)"> **bold** `code`');
  assert.ok(!rendered.includes("<img"));
  assert.ok(rendered.includes("&lt;img"));
  assert.ok(rendered.includes("<strong>bold</strong>"));
  assert.ok(rendered.includes("<code>code</code>"));
});

test("archived PRM393 files preserve every original question and identifier", () => {
  const original = JSON.parse(fs.readFileSync(new URL("../src/data/questions.json", import.meta.url), "utf8"));
  const catalog = JSON.parse(fs.readFileSync(new URL("../src/data/archiveCatalog.json", import.meta.url), "utf8"));
  assert.equal(catalog.length, original.sections.length);
  for (const section of original.sections) {
    const archived = JSON.parse(fs.readFileSync(new URL(`../public/data/archives/prm393/${section.id}.json`, import.meta.url), "utf8"));
    assert.deepEqual(archived, section.questions);
    assert.equal(catalog.find((s) => s.id === section.id).questionCount, archived.length);
  }
});
