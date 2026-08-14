/**
 * Document parser - handles .txt, .md, .pdf, .docx, .png, .jpg, .jpeg files
 * and extracts clean text content for question generation
 */

/** Image MIME types mapping */
const IMAGE_MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };

/**
 * Check if file is an image
 */
export function isImageFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  return ext in IMAGE_MIME;
}

/**
 * Get MIME type for image file
 */
export function getImageMime(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  return IMAGE_MIME[ext] || "image/jpeg";
}

/**
 * Parse uploaded file and return plain text content
 */
export async function parseFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();

  switch (ext) {
    case "txt":
    case "md":
      return await parseTextFile(file);
    case "pdf":
      return await parsePdfFile(file);
    case "docx":
    case "doc":
      return await parseDocxFile(file);
    case "png":
    case "jpg":
    case "jpeg":
    case "webp":
      // Images are handled separately via Vision API — return a sentinel
      return null;
    default:
      throw new Error(`Định dạng file ".${ext}" chưa được hỗ trợ. Vui lòng dùng .txt, .md, .pdf, .docx, .png, .jpg`);
  }
}

/**
 * Read image file as base64 string (without data URL prefix)
 */
export async function readImageAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // e.target.result is "data:image/png;base64,XXXXX"
      const base64 = e.target.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error(`Không thể đọc ảnh ${file.name}`));
    reader.readAsDataURL(file);
  });
}

/**
 * Read image file as object URL for preview thumbnail
 */
export function createImagePreviewUrl(file) {
  return URL.createObjectURL(file);
}

/**
 * Parse plain text / Markdown file
 */
async function parseTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("Không thể đọc file text"));
    reader.readAsText(file, "utf-8");
  });
}

/**
 * Parse PDF file using pdf.js
 */
async function parsePdfFile(file) {
  const arrayBuffer = await file.arrayBuffer();

  // Dynamic import to avoid bundling issues
  const pdfjsLib = await import("pdfjs-dist");
  
  // Set worker - use CDN worker to avoid bundler issues
  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }

  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => item.str)
      .join(" ")
      .replace(/\s+/g, " ");
    fullText += pageText + "\n\n";
  }

  return fullText.trim();
}

/**
 * Parse DOCX file using mammoth
 */
async function parseDocxFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const mammoth = await import("mammoth");
  
  const result = await mammoth.extractRawText({ arrayBuffer });
  
  if (result.messages && result.messages.length > 0) {
    console.warn("Mammoth warnings:", result.messages);
  }
  
  return result.value.trim();
}

/**
 * Detect language of text (simple heuristic)
 */
export function detectLanguage(text) {
  const sample = text.slice(0, 500).toLowerCase();
  
  // Vietnamese-specific characters
  const viChars = (sample.match(/[àáâãèéêìíòóôõùúýăđơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/gi) || []).length;
  
  // English: high ratio of common English words
  const enWords = (sample.match(/\b(the|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|must|shall|can|a|an|and|or|but|if|then|else|for|in|on|at|to|of|with|by|from|as|this|that|these|those|it|its|which|who|what|where|when|how|why)\b/gi) || []).length;
  
  if (viChars > 10) return "Vietnamese";
  if (enWords > 20) return "English";
  return "English"; // default
}

/**
 * Get file size display string
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Truncate text to max length while keeping complete sentences
 */
export function truncateText(text, maxChars = 30000) {
  if (text.length <= maxChars) return text;
  const truncated = text.slice(0, maxChars);
  const lastPeriod = Math.max(
    truncated.lastIndexOf(". "),
    truncated.lastIndexOf(".\n"),
    truncated.lastIndexOf("! "),
    truncated.lastIndexOf("? ")
  );
  return lastPeriod > maxChars * 0.8 ? truncated.slice(0, lastPeriod + 1) : truncated;
}
