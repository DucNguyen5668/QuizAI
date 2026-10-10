import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const base = process.env.QUIZSPACE_TEST_URL || "http://127.0.0.1:4173";
const artifacts = path.resolve("artifacts");
await fs.mkdir(artifacts, { recursive: true });
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await puppeteer.launch({ executablePath, headless: true, userDataDir: path.join(artifacts, "browser-profile"), args: ["--no-first-run", "--disable-background-networking"] });
const errors = [];
const checks = [];
const pass = (name) => { checks.push(name); console.log(`PASS ${name}`); };

async function clickText(page, text, exact = false) {
  await page.waitForFunction((label, strict) => [...document.querySelectorAll("button")].some((el) => el.getClientRects().length && (strict ? el.textContent.trim() === label : el.textContent.includes(label))), {}, text, exact);
  await page.evaluate((label, strict) => {
    const button = [...document.querySelectorAll("button")].find((el) => el.getClientRects().length && (strict ? el.textContent.trim() === label : el.textContent.includes(label)));
    button.click();
  }, text, exact);
}
async function ready(page) { await page.waitForSelector(".sidebar", { timeout: 15000 }); }
async function click(page, selector) {
  await page.waitForSelector(selector);
  await page.$eval(selector, (element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.click(selector);
}
async function noOverflow(page, name) {
  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  assert.ok(dimensions.document <= dimensions.viewport + 1, `${name}: horizontal overflow ${JSON.stringify(dimensions)}`);
}
async function fillQuestion(page, index, stem, options) {
  const fieldsets = await page.$$(".editor-question");
  const textarea = await fieldsets[index].$("textarea");
  await textarea.type(stem);
  const inputs = await fieldsets[index].$$(".editor-options input");
  for (let i = 0; i < inputs.length; i++) await inputs[i].type(options[i]);
}

try {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("dialog", (dialog) => dialog.accept());
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await ready(page);
  assert.ok(!requests.some((url) => /tesseract|questions-|archives\/prm393\/.*\.json|fonts\.google/.test(url)), "Startup downloaded deferred data or external resources");
  assert.ok(!requests.some((url) => /DocumentImport|CreateQuiz|\/pdf-/.test(url)), "Startup downloaded creation/parsing tools");
  assert.equal(requests.filter((url) => /\/assets\/.*\.js(?:\?|$)/.test(url)).length, 1, "Startup downloaded extra JavaScript chunks");
  await noOverflow(page, "desktop home");
  await page.screenshot({ path: path.join(artifacts, "quizspace-desktop.png"), fullPage: true });
  pass("homepage loads without PRM393 questions, AI tools, OCR or remote fonts");

  for (const width of [320, 375, 390, 768, 1024]) {
    await page.setViewport({ width, height: 844, deviceScaleFactor: 1 });
    await noOverflow(page, `home ${width}px`);
  }
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.screenshot({ path: path.join(artifacts, "quizspace-mobile.png"), fullPage: true });
  pass("homepage responsive at 320, 375, 390, 768 and 1024 pixels");

  await clickText(page, "Kho lưu trữ", true);
  await page.waitForSelector(".collection-card");
  await click(page, ".collection-card");
  await page.waitForFunction(() => document.querySelectorAll(".quiz-tile").length === 23);
  await noOverflow(page, "mobile archive");
  await clickText(page, "Luyện tập", true);
  await page.waitForSelector(".question-card");
  const questionFiles = requests.filter((url) => /archives\/prm393\/.*\.json/.test(url));
  assert.equal(questionFiles.length, 1);
  assert.ok(questionFiles[0].endsWith("/M1.json"));
  assert.equal(await page.$$eval(".question-card", (els) => els.length), 1);
  await click(page, ".options button:nth-child(2)");
  await page.waitForSelector(".explanation");
  await page.waitForFunction(() => document.querySelector(".save-indicator").textContent.includes("Đã lưu"));
  await clickText(page, "Câu tiếp");
  await noOverflow(page, "mobile quiz");
  await clickText(page, "Bản đồ câu hỏi");
  await page.waitForSelector(".question-map.map-open");
  await noOverflow(page, "mobile question map");
  await page.screenshot({ path: path.join(artifacts, "quizspace-mobile-map.png"), fullPage: true });
  await click(page, ".mobile-map-close");
  await page.reload({ waitUntil: "networkidle0" });
  await ready(page);
  await clickText(page, "TIẾP TỤC LẦN HỌC GẦN NHẤT");
  await page.waitForFunction(() => document.querySelector(".question-number")?.textContent.includes("02"));
  await clickText(page, "Câu trước");
  await page.waitForSelector(".option.correct");
  pass("archive loads one section; single question rendering, answer persistence and resume work");

  await clickText(page, "Tạo đề", true);
  await page.waitForSelector("#quiz-title");
  await page.type("#quiz-title", "Kiến thức tổng quát — Bộ đề của tôi");
  await page.type("#quiz-subject", "Kiến thức tổng quát");
  await fillQuestion(page, 0, "Một tuần có bao nhiêu ngày?", ["5", "7", "8", "10"]);
  await click(page, ".answer-selector:nth-child(1)");
  await click(page, 'button[aria-label="Đáp án đúng B cho câu 1"]');
  await clickText(page, "Thêm câu hỏi");
  await fillQuestion(page, 1, "Chọn hai số chẵn.", ["2", "3", "4", "5"]);
  await click(page, 'button[aria-label="Đáp án đúng C cho câu 2"]');
  await noOverflow(page, "mobile manual editor");
  await clickText(page, "Lưu bộ đề");
  await page.waitForSelector(".question-card");
  await page.waitForFunction(() => document.querySelector("h1").textContent.includes("Kiến thức tổng quát"));
  await click(page, ".options button:nth-child(2)");
  await page.waitForSelector(".option.correct");
  await clickText(page, "Câu tiếp");
  await click(page, ".options button:nth-child(1)");
  assert.equal(await page.$(".explanation"), null, "Multiple-choice question scored before all choices");
  await click(page, ".options button:nth-child(1)");
  await click(page, ".options button:nth-child(3)");
  await click(page, ".options button:nth-child(1)");
  await page.waitForSelector(".completion-card");
  assert.ok(await page.$eval(".completion-card", (el) => el.textContent.includes("Đúng 2/2")));
  await page.waitForFunction(() => document.querySelector(".save-indicator").textContent.includes("Đã lưu"));
  await page.screenshot({ path: path.join(artifacts, "quizspace-mobile-quiz.png"), fullPage: true });
  pass("manual multi-subject creation and single/multiple-choice scoring work without API keys");

  await clickText(page, "Đề của tôi", true);
  await page.waitForSelector(".quiz-tile");
  const search = 'input[aria-label="Tìm bộ đề"]';
  await page.type(search, "không tồn tại");
  await page.waitForSelector(".empty-state");
  await click(page, 'button[aria-label="Xóa tìm kiếm"]');
  await page.waitForSelector(".quiz-tile");
  await click(page, 'button[title="Đưa vào kho lưu trữ"]');
  await page.waitForSelector(".empty-state");
  await clickText(page, "Kho lưu trữ", true);
  await page.waitForSelector(".quiz-tile");
  await click(page, 'button[title="Đưa về Đề của tôi"]');
  await page.waitForFunction(() => document.querySelectorAll(".quiz-tile").length === 0);
  await clickText(page, "Đề của tôi", true);
  await page.waitForSelector(".quiz-tile");
  await click(page, 'button[title="Xóa bộ đề"]');
  await page.waitForSelector(".empty-state");
  const leftover = await page.evaluate(() => new Promise((resolve, reject) => {
    const request = indexedDB.open("PRM393QuizDB");
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("progress");
      const query = tx.objectStore("progress").getAll();
      query.onsuccess = () => { resolve(query.result.filter((row) => row.questionId.startsWith("quiz-")).length); db.close(); };
    };
  }));
  assert.equal(leftover, 0);
  pass("library search, archive, restore and deletion clean up question progress");

  await clickText(page, "Tạo đề", true);
  await page.waitForSelector(".create-tabs");
  await clickText(page, "Tạo từ tài liệu");
  await page.waitForSelector(".doc-import");
  assert.equal(await page.$(".doc-btn.primary"), null, "Development-only scraper appeared in production");
  assert.ok(!requests.some((url) => /tesseract/.test(url)), "Opening the document panel loaded OCR early");
  await noOverflow(page, "mobile document import");
  await page.screenshot({ path: path.join(artifacts, "quizspace-mobile-import.png"), fullPage: true });
  await clickText(page, "Tạo 3 đề");
  await page.waitForSelector(".gen-status.error");
  pass("document creation panel works on mobile, validates input and defers OCR");

  await page.setViewport({ width: 1440, height: 1080 });
  await clickText(page, "Tổng quan", true);
  await click(page, 'button[aria-label="Chuyển sang giao diện tối"]');
  await page.waitForFunction(() => document.documentElement.dataset.theme === "dark");
  await noOverflow(page, "dark home");
  await page.screenshot({ path: path.join(artifacts, "quizspace-dark.png"), fullPage: true });
  pass("dark theme renders and persists");
  await context.close();

  const migrationContext = await browser.createBrowserContext();
  const migratedPage = await migrationContext.newPage();
  migratedPage.on("pageerror", (error) => errors.push(error.message));
  await migratedPage.setRequestInterception(true);
  migratedPage.on("request", (request) => request.url().endsWith("/__fixture") ? request.respond({ contentType: "text/html", body: "<!doctype html><title>Migration fixture</title>" }) : request.continue());
  await migratedPage.goto(`${base}/__fixture`);
  const original = JSON.parse(await fs.readFile("src/data/questions.json", "utf8"));
  await migratedPage.evaluate((fixture) => new Promise((resolve, reject) => {
    const request = indexedDB.open("PRM393QuizDB", 10);
    request.onupgradeneeded = () => {
      const db = request.result;
      const specs = { sections: ["id", "kind", "title"], questions: ["id", "sectionId", "n"], customSections: ["id", "kind", "title", "source", "createdAt"], customQuestions: ["id", "sectionId", "n"], progress: ["questionId"], settings: ["key"] };
      for (const [name, [keyPath, ...indexes]] of Object.entries(specs)) {
        const store = db.createObjectStore(name, { keyPath });
        for (const index of indexes) store.createIndex(index, index);
      }
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction([...db.objectStoreNames], "readwrite");
      for (const section of fixture.sections) {
        const { questions, ...metadata } = section;
        tx.objectStore("sections").put(metadata);
        for (const question of questions) tx.objectStore("questions").put({ ...question, sectionId: section.id });
      }
      tx.objectStore("customSections").put({ id: "legacy-custom", title: "Bộ đề cũ của tôi", kind: "custom", createdAt: "2026-08-01T00:00:00Z" });
      tx.objectStore("customQuestions").put({ id: "legacy-q", sectionId: "legacy-custom", n: 1, stem: "Câu hỏi đã có", opts: { A: "Đúng", B: "Sai" }, ans: "A", why: "Tiến độ được giữ lại." });
      tx.objectStore("progress").put({ questionId: "M1-1", answer: "B", revealed: false });
      tx.objectStore("progress").put({ questionId: "legacy-q", answer: "A", revealed: false });
      tx.objectStore("settings").put({ key: "seeded", value: true });
      tx.objectStore("settings").put({ key: "ls_migrated", value: true });
      tx.objectStore("settings").put({ key: "theme", value: "light" });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => reject(tx.error);
    };
  }), original);
  await migratedPage.goto(base, { waitUntil: "networkidle0" });
  await ready(migratedPage);
  await clickText(migratedPage, "Đề của tôi");
  await migratedPage.waitForFunction(() => document.querySelectorAll(".quiz-tile").length === 1);
  await clickText(migratedPage, "Luyện tập", true);
  await migratedPage.waitForSelector(".option.correct");
  await clickText(migratedPage, "Kho lưu trữ", true);
  await click(migratedPage, ".collection-card");
  await migratedPage.waitForFunction(() => document.querySelectorAll(".quiz-tile").length === 23);
  await clickText(migratedPage, "Luyện tập", true);
  await migratedPage.waitForSelector(".option.correct");
  const migrated = await migratedPage.evaluate(() => new Promise((resolve) => {
    const request = indexedDB.open("PRM393QuizDB");
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(["sections", "questions", "customQuestions"]);
      const sectionRequest = tx.objectStore("sections").get("M1");
      const countRequest = tx.objectStore("questions").count();
      const customRequest = tx.objectStore("customQuestions").count();
      tx.oncomplete = () => { resolve({ version: db.version, section: sectionRequest.result, count: countRequest.result, custom: customRequest.result }); db.close(); };
    };
  }));
  assert.equal(migrated.version, 20);
  assert.equal(migrated.section.archived, 1);
  assert.equal(migrated.section.questionCount, 40);
  assert.equal(migrated.count, original.sections.reduce((n, s) => n + s.questions.length, 0));
  assert.equal(migrated.custom, 1);
  await noOverflow(migratedPage, "migrated desktop quiz");
  await migratedPage.screenshot({ path: path.join(artifacts, "quizspace-desktop-quiz.png"), fullPage: true });
  pass("database v1 upgrades without losing PRM393, custom questions or existing answers");
  await migrationContext.close();

  assert.deepEqual(errors, [], "Browser JavaScript errors");
  await fs.writeFile(path.join(artifacts, "smoke-results.json"), JSON.stringify({ checks, errors, screenshots: 7 }, null, 2));
  console.log(`Completed ${checks.length} browser checks with no JavaScript errors.`);
} finally { await browser.close(); }
