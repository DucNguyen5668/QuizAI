/**
 * PRM393 Quiz — Data Service
 *
 * High-level CRUD + seed operations over IndexedDB (Dexie).
 * This module completely replaces all localStorage usage and the
 * direct JSON import that was previously in App.jsx.
 */
import db from "./db";
import presetData from "./questions.json";

/* ════════════════════════════════════════════════════════════════════════
 * SEEDING — one-time import of bundled questions.json into IndexedDB
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * Seeds preset sections + questions from the bundled JSON file.
 * Runs only once (detected via a settings flag).
 */
export async function seedPresetData() {
  const flag = await db.settings.get("seeded");
  if (flag?.value === true) return; // already seeded

  await db.transaction("rw", db.sections, db.questions, db.settings, async () => {
    // Clear old data in case of partial seed
    await db.sections.clear();
    await db.questions.clear();

    const sectionRows = [];
    const questionRows = [];

    for (const section of presetData.sections) {
      sectionRows.push({
        id: section.id,
        kind: section.kind,
        chip: section.chip,
        title: section.title,
      });

      for (const q of section.questions) {
        questionRows.push({
          id: q.id,
          sectionId: section.id,
          n: q.n,
          bs: q.bs,
          stem: q.stem,
          opts: q.opts,
          ans: q.ans,
          why: q.why,
        });
      }
    }

    await db.sections.bulkPut(sectionRows);
    await db.questions.bulkPut(questionRows);
    await db.settings.put({ key: "seeded", value: true });
  });
}

/**
 * Migrate existing localStorage data into IndexedDB (one-time).
 * Preserves user progress, custom sections, theme, and API keys.
 */
export async function migrateFromLocalStorage() {
  const migrated = await db.settings.get("ls_migrated");
  if (migrated?.value === true) return;

  await db.transaction(
    "rw",
    db.customSections,
    db.customQuestions,
    db.progress,
    db.settings,
    async () => {
      // ── Migrate progress ──────────────────────────────────────
      try {
        const raw = localStorage.getItem("prm393_progress_v2");
        if (raw) {
          const saved = JSON.parse(raw);
          const rows = [];

          if (saved?.ans && typeof saved.ans === "object") {
            for (const [qid, answer] of Object.entries(saved.ans)) {
              rows.push({ questionId: qid, answer, revealed: false });
            }
          }
          if (saved?.revealed && typeof saved.revealed === "object") {
            for (const qid of Object.keys(saved.revealed)) {
              const existing = rows.find((r) => r.questionId === qid);
              if (existing) {
                existing.revealed = true;
              } else {
                rows.push({ questionId: qid, answer: null, revealed: true });
              }
            }
          }
          if (rows.length) await db.progress.bulkPut(rows);

          // Save active section info
          if (Number.isInteger(saved?.sec)) {
            await db.settings.put({ key: "sectionIndex", value: saved.sec });
          }
          if (saved?.tab) {
            await db.settings.put({ key: "activeTab", value: saved.tab });
          }
        }
      } catch {
        /* ignore parse errors */
      }

      // ── Migrate custom sections ───────────────────────────────
      try {
        const raw = localStorage.getItem("prm393_custom_sections");
        if (raw) {
          const sections = JSON.parse(raw);
          if (Array.isArray(sections)) {
            for (const section of sections) {
              const questions = section.questions || [];
              await db.customSections.put({
                id: section.id,
                kind: section.kind || "custom",
                chip: section.chip,
                title: section.title,
                source: section.source || null,
                createdAt: section.createdAt || new Date().toISOString(),
              });

              const qRows = questions.map((q) => ({
                id: q.id,
                sectionId: section.id,
                n: q.n,
                bs: q.bs || false,
                stem: q.stem,
                opts: q.opts,
                ans: q.ans,
                why: q.why || "",
              }));
              if (qRows.length) await db.customQuestions.bulkPut(qRows);
            }
          }
        }
      } catch {
        /* ignore */
      }

      // ── Migrate theme ─────────────────────────────────────────
      try {
        const theme = localStorage.getItem("prm393_theme");
        if (theme === "light" || theme === "dark") {
          await db.settings.put({ key: "theme", value: theme });
        }
      } catch {
        /* ignore */
      }

      // ── Migrate API keys & provider ───────────────────────────
      for (const lsKey of ["prm393_gemini_key", "prm393_groq_key", "prm393_provider"]) {
        try {
          const val = localStorage.getItem(lsKey);
          if (val) {
            const settingKey = lsKey.replace("prm393_", "");
            await db.settings.put({ key: settingKey, value: val });
          }
        } catch {
          /* ignore */
        }
      }

      await db.settings.put({ key: "ls_migrated", value: true });
    }
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * INITIALIZATION — call this once at app startup
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * Initialize the database: seed preset data + migrate localStorage.
 * Safe to call multiple times (both operations are idempotent).
 */
export async function initDB() {
  await seedPresetData();
  await migrateFromLocalStorage();
}

/* ════════════════════════════════════════════════════════════════════════
 * SECTIONS — read preset sections
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * Get all preset sections with their questions attached.
 * Returns the same shape as the old quizData.sections array.
 */
export async function getPresetSections() {
  const sections = await db.sections.toArray();
  const allQuestions = await db.questions.toArray();

  // Group questions by sectionId
  const bySection = {};
  for (const q of allQuestions) {
    if (!bySection[q.sectionId]) bySection[q.sectionId] = [];
    bySection[q.sectionId].push(q);
  }

  return sections.map((s) => ({
    ...s,
    questions: (bySection[s.id] || []).sort((a, b) => a.n - b.n),
  }));
}

/* ════════════════════════════════════════════════════════════════════════
 * CUSTOM SECTIONS — AI-generated sections
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * Get all custom sections with their questions.
 */
export async function getCustomSections() {
  const sections = await db.customSections.orderBy("createdAt").toArray();
  const allQ = await db.customQuestions.toArray();

  const bySection = {};
  for (const q of allQ) {
    if (!bySection[q.sectionId]) bySection[q.sectionId] = [];
    bySection[q.sectionId].push(q);
  }

  return sections.map((s) => ({
    ...s,
    questions: (bySection[s.id] || []).sort((a, b) => a.n - b.n),
  }));
}

/**
 * Save one or more AI-generated sections (with their questions).
 * @param {Array} sections — array of { id, kind, chip, title, questions, source, createdAt }
 */
export async function saveCustomSections(sections) {
  await db.transaction("rw", db.customSections, db.customQuestions, async () => {
    for (const section of sections) {
      const questions = section.questions || [];
      await db.customSections.put({
        id: section.id,
        kind: section.kind || "custom",
        chip: section.chip,
        title: section.title,
        source: section.source || null,
        createdAt: section.createdAt || new Date().toISOString(),
      });

      const qRows = questions.map((q) => ({
        id: q.id,
        sectionId: section.id,
        n: q.n,
        bs: q.bs || false,
        stem: q.stem,
        opts: q.opts,
        ans: q.ans,
        why: q.why || "",
      }));
      if (qRows.length) await db.customQuestions.bulkPut(qRows);
    }
  });
}

/**
 * Delete all custom sections and their questions.
 */
export async function clearAllCustomSections() {
  await db.transaction("rw", db.customSections, db.customQuestions, async () => {
    await db.customSections.clear();
    await db.customQuestions.clear();
  });
}

/**
 * Delete a single custom section and its questions.
 * @param {string} sectionId
 */
export async function deleteCustomSection(sectionId) {
  await db.transaction("rw", db.customSections, db.customQuestions, async () => {
    await db.customSections.delete(sectionId);
    await db.customQuestions.where("sectionId").equals(sectionId).delete();
  });
}

/* ════════════════════════════════════════════════════════════════════════
 * PROGRESS — answers & revealed state
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * Get all progress as two maps: { answers: {qid: answer}, revealed: {qid: true} }
 */
export async function getProgress() {
  const rows = await db.progress.toArray();
  const answers = {};
  const revealed = {};

  for (const row of rows) {
    if (row.answer) answers[row.questionId] = row.answer;
    if (row.revealed) revealed[row.questionId] = true;
  }

  return { answers, revealed };
}

/**
 * Save an answer for a question.
 */
export async function saveAnswer(questionId, answer) {
  const existing = await db.progress.get(questionId);
  await db.progress.put({
    questionId,
    answer,
    revealed: existing?.revealed || false,
  });
}

/**
 * Mark a question as revealed (show answer without selecting).
 */
export async function saveRevealed(questionId) {
  const existing = await db.progress.get(questionId);
  await db.progress.put({
    questionId,
    answer: existing?.answer || null,
    revealed: true,
  });
}

/**
 * Reveal all unanswered questions in a section.
 * @param {Array} questionIds — list of question IDs in the section
 * @param {Object} currentAnswers — current answers map
 */
export async function revealAllInSection(questionIds, currentAnswers) {
  await db.transaction("rw", db.progress, async () => {
    for (const qid of questionIds) {
      if (!currentAnswers[qid]) {
        const existing = await db.progress.get(qid);
        await db.progress.put({
          questionId: qid,
          answer: existing?.answer || null,
          revealed: true,
        });
      }
    }
  });
}

/**
 * Reset progress for all questions in a section.
 * @param {Array} questionIds — list of question IDs to reset
 */
export async function resetSectionProgress(questionIds) {
  await db.transaction("rw", db.progress, async () => {
    await db.progress.bulkDelete(questionIds);
  });
}

/* ════════════════════════════════════════════════════════════════════════
 * SETTINGS — generic key/value store
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * Get a setting value.
 * @returns {*} The value, or defaultValue if not found.
 */
export async function getSetting(key, defaultValue = null) {
  const row = await db.settings.get(key);
  return row?.value ?? defaultValue;
}

/**
 * Set a setting value.
 */
export async function setSetting(key, value) {
  await db.settings.put({ key, value });
}

/* ════════════════════════════════════════════════════════════════════════
 * EXPORT / IMPORT — backup & restore
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * Export all data as a JSON object (for backup).
 */
export async function exportAllData() {
  const [sections, questions, customSections, customQuestions, progress, settings] =
    await Promise.all([
      db.sections.toArray(),
      db.questions.toArray(),
      db.customSections.toArray(),
      db.customQuestions.toArray(),
      db.progress.toArray(),
      db.settings.toArray(),
    ]);

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    sections,
    questions,
    customSections,
    customQuestions,
    progress,
    settings,
  };
}

/**
 * Import data from a backup JSON (replaces all data).
 */
export async function importAllData(data) {
  if (!data || data.version !== 1) {
    throw new Error("Dữ liệu không hợp lệ hoặc phiên bản không tương thích.");
  }

  await db.transaction(
    "rw",
    db.sections,
    db.questions,
    db.customSections,
    db.customQuestions,
    db.progress,
    db.settings,
    async () => {
      await db.sections.clear();
      await db.questions.clear();
      await db.customSections.clear();
      await db.customQuestions.clear();
      await db.progress.clear();
      await db.settings.clear();

      if (data.sections?.length) await db.sections.bulkPut(data.sections);
      if (data.questions?.length) await db.questions.bulkPut(data.questions);
      if (data.customSections?.length) await db.customSections.bulkPut(data.customSections);
      if (data.customQuestions?.length) await db.customQuestions.bulkPut(data.customQuestions);
      if (data.progress?.length) await db.progress.bulkPut(data.progress);
      if (data.settings?.length) await db.settings.bulkPut(data.settings);
    }
  );
}
