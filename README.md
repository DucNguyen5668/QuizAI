# QuizSpace

Web luyện đề độc lập cho mọi môn học, xây dựng bằng React + Vite. Giao diện responsive cho máy tính, máy tính bảng và điện thoại, hỗ trợ sáng/tối.

## Tính năng

- **Tổng quan:** bộ đề gần đây, thống kê thư viện, tiếp tục vị trí học lần trước.
- **Đề của tôi:** tìm kiếm, sắp xếp, luyện tập, lưu trữ, khôi phục và xóa bộ đề.
- **Tạo bộ đề:** tự nhập câu hỏi (hỗ trợ nhiều đáp án) hoặc tạo/trích xuất câu hỏi từ tài liệu với Groq/Gemini.
- **Kho lưu trữ:** PRM393 là bộ sưu tập gồm 14 chủ đề và 9 đề thi; giữ nguyên 993 câu hỏi và tiến độ cũ.
- **Luyện tập:** một câu mỗi lần, giải thích đáp án, bản đồ câu hỏi, tự lưu, làm lại và xuất JSON.

Dữ liệu và tiến độ lưu bằng IndexedDB trên trình duyệt hiện tại. Tạo đề thủ công và luyện bộ đề đã tải không cần API AI. Tạo đề từ tài liệu cần API key của nhà cung cấp được chọn; OCR chỉ tải khi xử lý ảnh. API scraper diễn đàn chỉ xuất hiện trong môi trường phát triển.

## Chạy cục bộ

Yêu cầu Node.js 18 trở lên (Node.js 22 phù hợp các thư viện xử lý tài liệu hiện tại).

```bash
npm ci
npm run dev
```

Mở địa chỉ được Vite in ra, mặc định `http://127.0.0.1:3000`. Có thể truyền `-- --host 0.0.0.0` để thử trên điện thoại cùng mạng LAN.

```bash
npm test
npm run build
npm run preview
```

Kiểm thử trình duyệt sử dụng Chrome cục bộ, không truy cập profile thật của người dùng:

```bash
npm run preview -- --port 4173
npm run test:browser
```

Đặt `CHROME_PATH` nếu Chrome nằm ở đường dẫn khác; đặt `QUIZSPACE_TEST_URL` nếu dùng port khác. Screenshot và kết quả được ghi vào `artifacts/` (không đưa vào Git).

## Kiến trúc và tương thích dữ liệu

- Trang đầu chỉ đọc metadata, không tải ngân hàng PRM393 hay công cụ nhập tài liệu.
- Các bộ câu hỏi PRM393 nằm trong `public/data/archives/prm393/`, tải từng bộ khi mở và được lưu lại vào IndexedDB.
- Giữ tên database `PRM393QuizDB` để nâng cấp tại chỗ từ schema v1 sang v2, bảo toàn bộ đề, câu trả lời và cài đặt cũ.
- `src/data/archiveCatalog.json` chứa metadata của bộ sưu tập; `src/data/questions.json` giữ dữ liệu gốc để đối chiếu.
- `CreateQuiz`, `DocumentImport`, PDF/Word và OCR được tải theo nhu cầu. Giao diện dùng font hệ thống và SVG cục bộ.

Các tài liệu PRM393, slide và trang HTML cũ vẫn được giữ làm tài liệu nguồn. Ứng dụng chính tại `index.html` sử dụng thương hiệu và điều hướng QuizSpace.
