/**
 * PRM393 Quiz — IndexedDB Database (Dexie.js)
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

export default db;
