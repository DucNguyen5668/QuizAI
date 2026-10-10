/**
 * QuizSpace — IndexedDB database.
 *
 * Schema:
 *   sections      — preset & exam sections (seeded from questions.json)
 *   questions     — individual questions belonging to a section
 *   customSections — AI-generated sections from user documents
 *   customQuestions — questions belonging to custom sections
 *   progress      — per-question answers & revealed state
 *   settings      — key/value store (theme, active section, api keys, etc.)
 */
import Dexie from "dexie";

// Keep the original database name so existing questions, keys and progress survive.
const db = new Dexie("PRM393QuizDB");

db.version(1).stores({
  // Preset sections (seeded once from the bundled JSON)
  sections: "id, kind, title",

  // Preset questions — compound index on sectionId for fast section queries
  questions: "id, sectionId, n",

  // Custom sections created by AI
  customSections: "id, kind, title, source, createdAt",

  // Custom questions
  customQuestions: "id, sectionId, n",

  // User progress: answers + revealed state
  //   key = questionId, stores { questionId, answer, revealed, timestamp }
  progress: "questionId",

  // Generic key-value settings
  //   key = setting name, stores { key, value }
  settings: "key",
});

db.version(2).stores({
  sections: "id, kind, title, collectionId, archived",
  questions: "id, sectionId, n",
  customSections: "id, kind, title, source, createdAt, archived",
  customQuestions: "id, sectionId, n",
  progress: "questionId",
  settings: "key",
}).upgrade(async (tx) => {
  for (const [sectionTable, questionTable, preset] of [
    ["sections", "questions", true],
    ["customSections", "customQuestions", false],
  ]) {
    const sections = await tx.table(sectionTable).toArray();
    for (const section of sections) {
      const questionCount = await tx.table(questionTable).where("sectionId").equals(section.id).count();
      await tx.table(sectionTable).update(section.id, {
        questionCount,
        archived: preset ? 1 : 0,
        ...(preset ? { collectionId: "prm393" } : {}),
      });
    }
  }
});

export default db;
