# Kiểm tra dự án và kế hoạch nâng cấp QuizAI

Ngày kiểm tra: 13/08/2026

## 1. Kết luận nhanh

Dự án đã có luồng hoàn chỉnh ở mức prototype: nhập tài liệu/ảnh, OCR, gọi Groq hoặc Gemini, lưu đề và tiến độ bằng IndexedDB, rồi hiển thị bài trắc nghiệm. Build production thành công.

Tuy nhiên chưa nên coi kết quả sinh/trích xuất là “chính xác 100%”. Hiện tại có các khoảng trống nội dung do cắt/chia văn bản, chưa kiểm tra đủ số lượng và tính hợp lệ của câu hỏi, chưa hỗ trợ PPTX dù thư mục `Slides` chứa PPTX, và scraper có rủi ro đường dẫn/URL nếu được triển khai như một API thật.

## 2. Ma trận lỗi và khoảng trống

| Ưu tiên | Phát hiện | Bằng chứng hiện tại | Ảnh hưởng | Hướng xử lý |
|---|---|---|---|---|
| P0 | Model Groq sắp hết vòng đời | `groqClient.js` hard-code `llama-3.3-70b-versatile` và `llama-3.1-8b-instant`; Groq thông báo developer/free tier ngừng hai model ngày 16/08/2026 | Tạo đề bằng Groq có thể ngừng hoạt động sau 3 ngày | Đưa model vào cấu hình, đổi sang model thay thế được Groq khuyến nghị, thêm kiểm tra `/models` và fallback |
| P0 | Scraper nhận URL và tên thư mục chưa kiểm soát | `page.goto(targetUrl)` và `path.join(publicImagesDir, folderName)` dùng trực tiếp dữ liệu request | Có thể truy cập URL nội bộ hoặc ghi file ra ngoài thư mục dự kiến qua path traversal | Chỉ cho phép HTTPS + hostname đã duyệt; slug hóa tên thư mục; dùng `path.resolve` rồi xác minh vẫn nằm trong `public/images`; giới hạn body/file/số ảnh |
| P0 | UI cam kết độ chính xác không thể bảo đảm | UI ghi “chính xác 100%”, trong khi chế độ extract vẫn yêu cầu AI tự giải câu chưa có đáp án | Tạo kỳ vọng sai; câu/đáp án có thể bị thiếu hoặc suy diễn | Đổi thông điệp thành “giữ nguyên nội dung tối đa, cần duyệt”; thêm màn hình review và chỉ số cảnh báo |
| P1 | Tài liệu bị cắt sau 28.000 ký tự | `DocumentImport.jsx` gọi `truncateText(fullText, 28000)` trước khi batch | Phần cuối tài liệu không bao giờ được đọc; recall giảm rõ rệt | Không cắt toàn cục; chunk toàn tài liệu theo trang/slide/câu hỏi, có overlap và metadata nguồn |
| P1 | Sliding window bỏ sót nhiều đoạn | Mỗi đề Groq chỉ dùng 4.500 ký tự; điểm bắt đầu được rải đều nhưng không phủ kín các khoảng giữa | Comment nói dùng “ALL text” nhưng thực tế còn khoảng trống | Tạo danh sách chunk phủ kín 100%, sau đó phân bổ câu theo chunk/chủ đề |
| P1 | Không bảo đảm đủ số câu | Parser lọc câu lỗi và chỉ `slice(0, totalQuestions)`; không top-up khi model trả thiếu/JSON cụt | Status vẫn báo `N đề × M câu` dù dữ liệu thực tế có thể thiếu | Validate schema + số lượng; retry/top-up phần thiếu; status dùng số đã lưu thực tế |
| P1 | Chuẩn hóa đáp án quá lỏng | Regex `/[A-D]/g` lấy mọi chữ A–D trong chuỗi trả về | Chuỗi giải thích có thể bị hiểu nhầm thành nhiều đáp án | Chỉ chấp nhận mẫu `A`, `A,C`, hoặc mảng enum; loại câu sai schema để retry |
| P1 | Không deduplicate hoặc kiểm chứng grounding | Prompt chỉ yêu cầu không lặp; không có kiểm tra sau sinh và không lưu vị trí nguồn | Nhiều đề có thể trùng câu hoặc chứa chi tiết ngoài tài liệu | Chuẩn hóa stem + similarity; bắt buộc `sourceRef` và `evidence`; bước verify riêng trước khi lưu |
| P1 | Danh sách file không khớp parser | UI nhận `.bmp`, `.tiff`, `.doc`; image map không có BMP/TIFF và Mammoth phù hợp DOCX, không phải DOC nhị phân cũ | File được nhận rồi lỗi lúc xử lý | Chỉ hiển thị định dạng đã test; thêm parser/chuyển đổi thật trước khi bật định dạng |
| P1 | Chưa hỗ trợ PPTX | `ACCEPTED` không có `.pptx`, trong khi nguồn học liệu chính nằm trong `Slides/*.pptx` | Không đáp ứng đúng use case tạo câu hỏi từ slide tải lên | Thêm pipeline PPTX: text + notes + thứ tự slide + ảnh/diagram OCR, giữ `slideNumber` |
| P1 | PDF worker có khả năng sai đường dẫn phiên bản | Code dùng CDN `pdf.worker.min.js`; package `pdfjs-dist@5` cài cục bộ cung cấp `pdf.worker.min.mjs` | PDF có thể lỗi tùy CDN/CSP/mạng | Import worker URL từ package bằng Vite; không phụ thuộc CDN |
| P1 | Nút Hủy không hủy fetch/backoff đang chạy | `cancelRef` chỉ được kiểm tra giữa các bước; request AI và các lần `setTimeout` bên trong client không nhận signal | Người dùng bấm Hủy nhưng request/tài nguyên vẫn tiếp tục | Truyền `AbortSignal` xuyên suốt parse/OCR/fetch/sleep; phân biệt abort với lỗi |
| P1 | Scraper chỉ chạy trong dev server | API nằm trong `configureServer`; không tồn tại trong `vite preview`/hosting tĩnh | UI scraper sẽ 404 ở production | Tách thành backend/serverless endpoint có auth, validation và timeout; hoặc ẩn tính năng trong production |
| P1 | API key lưu plaintext ở IndexedDB | `gemini_key` và `groq_key` được lưu trong bảng settings | Bất kỳ script chạy cùng origin đều có thể đọc key | Với app public: proxy backend và secret phía server; với BYOK local: cho phép không lưu, nút xóa key và cảnh báo rõ |
| P2 | Bundle lớn | Build: main khoảng 502,53 kB, Mammoth chunk khoảng 887,11 kB, PDF chunk khoảng 453,36 kB; `questions.json` khoảng 564,7 kB | Tải/parse JS và seed IndexedDB chậm trên thiết bị yếu | `React.lazy` màn import; tách dữ liệu theo section; fetch/seed theo nhu cầu; đặt performance budget |
| P2 | IndexedDB đọc toàn bảng | `getPresetSections` và `getCustomSections` gọi `toArray()` cho toàn bộ questions rồi group trong JS | Tốn RAM/CPU khi ngân hàng tăng | Query theo index `sectionId`, phân trang/virtualize danh sách câu hỏi |
| P2 | Rò object URL preview | Cleanup mount dùng closure `previews` ban đầu; file trùng tên vẫn có thể tạo URL mới nhưng không dùng | RAM tăng sau nhiều lượt import ảnh | Dùng ref theo dõi URL hiện tại; chỉ tạo URL sau dedupe; revoke khi thay/xóa/unmount |
| P2 | Báo lỗi file không hỗ trợ bị xóa ngay | `addFiles` đặt lỗi cho file xấu rồi gọi `setError(null)` ở cuối | Người dùng không thấy lý do file bị bỏ qua | Chỉ clear lỗi trước validate hoặc giữ danh sách cảnh báo riêng |
| P2 | Tải hàng loạt ảnh scraper không giới hạn | `Promise.all` fetch toàn bộ ảnh cùng lúc | Spike RAM/network, dễ treo tab | Giới hạn concurrency 3–4, kích thước/tổng dung lượng và số ảnh |
| P2 | Thiếu bắt lỗi DB và test tự động | `boot()`/các lời gọi save không có xử lý lỗi hiển thị; package chưa có `test`/`lint` | Lỗi quota/IndexedDB có thể thành rejection im lặng; regression khó phát hiện | Error boundary + toast retry; Vitest/RTL và Playwright smoke tests |

Nguồn vòng đời model: [Groq model deprecations](https://console.groq.com/docs/deprecations), [Groq supported models](https://console.groq.com/docs/models). PDF.js hiện phân phối worker dạng `.mjs`: [PDF.js Getting Started](https://mozilla.github.io/pdf.js/getting_started/).

## 3. Kế hoạch nâng cấp

### Giai đoạn 0 — Khôi phục độ tin cậy (0,5–1 ngày)

- Thay model Groq sắp ngừng, đưa model/rate limit vào cấu hình và thêm fallback.
- Sửa thông điệp “100%”, báo số câu thực tế thay vì số yêu cầu.
- Đồng bộ danh sách file với parser; tạm tắt `.doc`, `.bmp`, `.tiff` nếu chưa có test.
- Khóa scraper: allowlist host, kiểm tra path, giới hạn request; ẩn scraper khỏi production cho đến khi có backend.
- Sửa PDF worker sang asset `.mjs` cục bộ.

Tiêu chí nghiệm thu: Groq/Gemini smoke test thành công; file không hỗ trợ báo đúng; PDF text-based mẫu đọc được offline; scraper không thoát `public/images` với `../`.

### Giai đoạn 1 — Nâng độ chính xác import và sinh câu hỏi (2–4 ngày)

- Thiết kế schema `Document -> Segment -> Question`, mỗi segment có `sourceId`, `page/slide`, text và checksum.
- Thêm PPTX extraction cho text, notes và thứ tự slide; ảnh/diagram đi qua OCR riêng.
- Chunk toàn bộ tài liệu theo ranh giới ngữ nghĩa, overlap 10–15%, không truncate toàn cục.
- Dùng structured output/JSON schema; temperature thấp; validate enum đáp án, đủ 4 lựa chọn, đủ số câu.
- Deduplicate bằng normalized text + similarity; bắt buộc evidence/sourceRef.
- Thêm màn review: sửa/xóa/duyệt câu trước khi đưa vào ngân hàng.

Tiêu chí nghiệm thu trên bộ mẫu cố định: extraction recall ≥ 95%; câu có sourceRef = 100%; schema-valid = 100%; duplicate ≤ 3%; không tuyên bố đáp án chắc chắn khi thiếu bằng chứng.

### Giai đoạn 2 — Hiệu năng và khả năng hủy (1–2 ngày)

- Lazy-load `DocumentImport`, Mammoth, PDF.js, OCR và chỉ tải khi dùng.
- Tách `questions.json` theo section hoặc chuyển thành dữ liệu fetch theo nhu cầu; seed có `dataVersion`.
- Truy vấn IndexedDB theo `sectionId`, render danh sách dài bằng virtualization.
- Truyền `AbortController` xuyên suốt và giới hạn concurrency download/OCR.
- Đặt budget: initial JS gzip < 150 kB; không có chunk ứng dụng > 500 kB; thao tác chuyển section p95 < 100 ms trên dữ liệu hiện tại.

### Giai đoạn 3 — Kiểm thử và vận hành (1–2 ngày)

- Unit test: chunk coverage, parser JSON, đáp án nhiều lựa chọn, dedupe, file validation.
- Integration test: mock 429/413/JSON cụt/abort/IndexedDB quota.
- E2E: TXT, DOCX, PDF, PPTX, ảnh OCR; tạo đề, reload, làm bài, xóa đề.
- Dataset đánh giá thủ công có đáp án chuẩn; theo dõi recall, accuracy, duplicate rate, latency và lỗi theo provider/model.

## 4. Thứ tự thực hiện khuyến nghị

1. Làm Giai đoạn 0 trước ngày 16/08/2026 vì phụ thuộc model Groq.
2. Làm schema nguồn + PPTX + chunk coverage trước khi tối ưu prompt nhỏ lẻ.
3. Chỉ sau khi có bộ đánh giá chuẩn mới so sánh model/prompt và tuyên bố tăng độ chính xác.
4. Tối ưu bundle sau khi ranh giới module/parser ổn định để tránh làm lại code splitting.

## 5. Thay đổi nhỏ đã hoàn thành trong lần kiểm tra này

- Đã sao chép `images/logo/Neuroplasticity.jpg` vào `public/images/logo/Neuroplasticity.jpg`.
- Đã khai báo favicon JPEG trong `index.html` tại `/images/logo/Neuroplasticity.jpg`.
- Build production thành công; file logo có trong `dist/images/logo` và giữ nguyên SHA-256 so với nguồn.

