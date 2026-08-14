/**
 * OCR Processor — Tesseract.js v5 (CDN UMD build via window.Tesseract)
 *
 * Chạy hoàn toàn trong trình duyệt — WebAssembly + Web Worker.
 * Không cần API key, không rate limit, không mất tiền.
 * Hỗ trợ Tiếng Việt (vie) + Tiếng Anh (eng).
 *
 * NOTE: Tesseract.js được load qua CDN trong index.html (window.Tesseract)
 * để tránh xung đột CommonJS/ESM với Vite bundler.
 */

/** Singleton worker — reused across calls to avoid re-init overhead */
let _worker = null;
let _workerReady = false;

/**
 * Initialize (or reuse) the Tesseract worker.
 * Language packs (~10 MB tổng) được cache trong IndexedDB của trình duyệt.
 *
 * @param {Function} onStatus  callback(msg: string)
 * @returns {Promise<TesseractWorker>}
 */
export async function initOCRWorker(onStatus) {
  if (_worker && _workerReady) return _worker;

  // Make sure CDN script has loaded
  if (!window.Tesseract) {
    throw new Error(
      "Tesseract.js chưa được tải. Vui lòng kiểm tra kết nối internet và thử lại."
    );
  }

  onStatus?.("⬇️ Đang khởi động Tesseract OCR engine...");

  const { createWorker } = window.Tesseract;

  const worker = await createWorker(
    ["vie", "eng"],
    1, // OEM_LSTM_ONLY — Neural net, chính xác nhất
    {
      logger(m) {
        if (!m?.status) return;
        if (m.status === "loading tesseract core") {
          onStatus?.("⬇️ Đang tải OCR engine...");
        } else if (m.status === "loading language traineddata") {
          const pct = Math.round((m.progress ?? 0) * 100);
          onStatus?.(`⬇️ Tải dữ liệu ngôn ngữ (vie+eng)... ${pct}%`);
        } else if (m.status === "initializing api") {
          onStatus?.("🔧 Khởi tạo Tesseract API...");
        } else if (m.status === "recognizing text") {
          // ignore per-page progress here, handled by batchOCR
        }
      },
    }
  );

  _worker = worker;
  _workerReady = true;
  onStatus?.("✅ Tesseract OCR sẵn sàng!");
  return worker;
}

/**
 * OCR một ảnh đơn.
 * @param {File|Blob|string} image
 * @param {TesseractWorker} worker
 * @returns {Promise<string>}
 */
async function ocrOne(image, worker) {
  const { data } = await worker.recognize(image);
  return (data?.text ?? "").trim();
}

/**
 * Batch OCR: xử lý tuần tự toàn bộ mảng ảnh.
 *
 * @param {File[]} imageFiles
 * @param {Function} onProgress  callback({ current, total, file, msg, pct })
 * @returns {Promise<string>}  toàn bộ text đã trích xuất, ngăn cách bởi ---
 */
export async function batchOCR(imageFiles, onProgress) {
  if (!imageFiles.length) return "";

  // Init worker (or reuse if already ready)
  const worker = await initOCRWorker((msg) => {
    onProgress?.({ current: 0, total: imageFiles.length, file: "", msg, pct: 0 });
  });

  const results = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const pct  = Math.round((i / imageFiles.length) * 100);

    onProgress?.({
      current: i + 1,
      total:   imageFiles.length,
      file:    file.name,
      msg:     `🔍 Quét ảnh ${i + 1}/${imageFiles.length}: ${file.name}`,
      pct,
    });

    try {
      const text = await ocrOne(file, worker);
      results.push(
        text
          ? `[Ảnh ${i + 1}: ${file.name}]\n${text}`
          : `[Ảnh ${i + 1}: ${file.name}]\n(Không tìm thấy văn bản trong ảnh này)`
      );
    } catch (err) {
      console.warn(`OCR failed: ${file.name}`, err);
      results.push(`[Ảnh ${i + 1}: ${file.name}]\n(Lỗi quét: ${err.message})`);
    }
  }

  onProgress?.({
    current: imageFiles.length,
    total:   imageFiles.length,
    file:    "",
    msg:     `✅ Quét xong ${imageFiles.length} ảnh!`,
    pct:     100,
  });

  return results.join("\n\n---\n\n");
}

/**
 * Terminate the OCR worker and free memory.
 * Nên gọi khi người dùng hủy hoặc rời khỏi trang.
 */
export async function terminateOCR() {
  if (_worker) {
    await _worker.terminate().catch(() => {});
    _worker      = null;
    _workerReady = false;
  }
}

/**
 * Ước tính thời gian OCR (trung bình 3s/ảnh).
 * @param {number} count
 * @returns {string}
 */
export function estimateOCRTime(count) {
  const total = count * 3; // seconds
  if (total < 60)  return `~${total}s`;
  const mins = Math.ceil(total / 60);
  return `~${mins} phút`;
}
