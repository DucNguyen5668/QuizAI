# Chuyển đổi hệ thống sang QuizSpace

Ngày hoàn thành: 10/10/2026

## Phân tích hệ thống trước thay đổi

- Trang mặc định mở thẳng vào PRM393; thương hiệu và nội dung metadata gắn với một môn học.
- App đọc toàn bộ câu hỏi preset và custom lúc khởi động; danh sách dài render toàn bộ câu hỏi.
- Hàng nút module và các thao tác cố định làm giao diện điện thoại chật, khó theo dõi.
- Công cụ nhập tài liệu được import trực tiếp, Tesseract tải ngay từ HTML dù không dùng OCR.
- Chưa có cách tạo đề bằng tay, chưa có thư viện đề dùng chung với tìm kiếm và trạng thái lưu trữ.
- Khởi tạo và lưu dữ liệu thiếu phản hồi lỗi; việc đổi tên database trực tiếp sẽ làm mất khả năng truy cập dữ liệu cũ.

## Thay đổi đã thực hiện

**Sản phẩm:** đổi tên thành QuizSpace, favicon SVG mới, metadata trung lập; Tổng quan, Đề của tôi, Kho lưu trữ, Tạo đề và Luyện tập. Trang đầu không phụ thuộc PRM393.

**Kho lưu trữ:** đưa PRM393 vào bộ sưu tập gồm 14 chủ đề, 9 đề thi và 993 câu hỏi. Dữ liệu gốc, ID và giải thích giữ nguyên. Bộ đề tự tạo có thể lưu trữ/khôi phục riêng.

**Tạo đề:** bổ sung tự nhập câu hỏi, chủ đề, 4 lựa chọn, một hoặc nhiều đáp án đúng và giải thích. Không cần AI. Luồng tạo/trích xuất từ tài liệu vẫn được giữ; chỉ hiển thị scraper trong chế độ phát triển.

**Luyện tập:** một câu mỗi lần, điều hướng câu trước/tiếp, bản đồ câu hỏi, thống kê đúng/sai, tiếp tục vị trí cũ, làm lại và xuất JSON. Chuẩn hóa thứ tự đáp án nhiều lựa chọn; không tính câu chỉ xem đáp án là trả lời đúng. Lưu dữ liệu theo hàng đợi, có thông báo lỗi và thử lại.

**Giao diện:** bố cục thanh bên trên desktop; điều hướng dưới và bản đồ câu hỏi dạng panel trên mobile. Hỗ trợ safe area, thao tác chạm, focus bàn phím, reduced motion và sáng/tối. Không cần font hoặc hình trang trí từ bên ngoài.

**Hiệu năng:** thư viện chỉ đọc metadata; truy vấn câu hỏi bằng index `sectionId`. PRM393 được chia thành 23 JSON tĩnh, chỉ tải bộ đang mở rồi lưu vào IndexedDB. Các màn tạo đề và nhập tài liệu dùng lazy loading; OCR tải sau khi thật sự xử lý ảnh. QuestionCard và phần định dạng được memo hóa, giảm số node DOM của bài luyện tập.

**Tương thích dữ liệu:** giữ tên IndexedDB `PRM393QuizDB`, nâng schema v1 → v2, bổ sung số câu và trạng thái lưu trữ. Giữ migration localStorage cũ. Xóa bộ đề cũng xóa câu hỏi và tiến độ liên quan. Các slide, tài liệu và HTML PRM393 cũ vẫn nằm trong dự án làm nguồn tham khảo.

## Kiểm chứng

- `npm test`: 6 kiểm tra đạt, gồm chọn một/nhiều đáp án, khóa câu hỏi, thống kê, escape HTML và đối chiếu toàn bộ 993 câu với dữ liệu gốc.
- `npm run build`: thành công. JavaScript trang đầu ~333 KB minified / ~106 KB gzip; CSS chính ~32 KB / ~7 KB gzip. Đây là kích thước tài nguyên, không phải số đo tốc độ trên điện thoại thật.
- `npm run test:browser`: 8 nhóm kiểm tra đạt trong Chrome headless, không có lỗi JavaScript. Gồm startup không tải tài nguyên nặng, responsive 320/375/390/768/1024 px, archive tải một bộ, lưu/tiếp tục, tạo đề thủ công và nhiều đáp án, tìm kiếm/lưu trữ/khôi phục/xóa, import tài liệu và giao diện tối.
- Fixture IndexedDB v1 được nâng lên v2: giữ toàn bộ câu hỏi PRM393, bộ đề tùy chỉnh và đáp án đã có.
- Screenshot và kết quả kiểm tra tại `artifacts/`; cách chạy tại README.

## Giới hạn kiểm chứng

- Chưa gọi API Groq/Gemini thật trong lượt này vì không dùng API key của người dùng. Đã kiểm tra giao diện và validation, giữ pipeline hiện có.
- Word/PDF là các thư viện xử lý tài liệu tải theo nhu cầu; chunk Word hiện vẫn khoảng 503 KB minified và Vite báo cảnh báo kích thước. Chunk này không tải khi mở Tổng quan, thư viện hay làm bài.
- IndexedDB lưu theo trình duyệt/origin, chưa đồng bộ giữa thiết bị. Bộ đề PRM393 chưa tải cần kết nối lần đầu.
- Kiểm tra mobile dùng viewport Chrome, chưa thay thế kiểm tra trực tiếp trên Safari iOS hoặc thiết bị Android thật.
