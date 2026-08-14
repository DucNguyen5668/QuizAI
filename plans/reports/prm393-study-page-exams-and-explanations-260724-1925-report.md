# PRM393 — Bổ sung giải thích + tab Đề thử (24/07/2026)

## Kết quả

**1. Hoàn tất 579 giải thích cho ngân hàng câu hỏi theo module**
- Nhóm M3–M4 (102 câu) trước đó bị lỗi API weekly-limit → đã viết lại xong (`plans/reports/explanations-group2-m3-m4.json`).
- Nhóm M5–M7 thực ra ĐÃ ghi file thành công từ lần trước (trước đó báo nhầm là fail).
- Tổng: 579/579, không câu nào thiếu giải thích.

**2. Bóc đề mẫu từ `de_mau/` (43 ảnh, OCR bằng Claude vision)**
- Đề thử 1: đủ 50 câu.
- Đề thử 2: 48 câu — **ảnh câu 10 và 11 không có trong thư mục** (file đánh số nhảy từ ảnh Q9 sang Q12).
- Đề gốc KHÔNG có đáp án → đáp án do tự suy luận theo nội dung slide; giải thích viết bằng tiếng Việt.
- Ảnh số 21 và 22 trùng nhau (cùng Q46–48) → đã bỏ trùng.

**3. Tách `prm393-questions.json` thành đề 50 câu**
- 326 câu, kiểm tra trùng bằng cả exact stem lẫn fuzzy (SequenceMatcher > 0.88): **0 câu trùng** — file đã sạch sẵn.
- Không trùng với ngân hàng module (579 câu) và không trùng với đề mẫu.
- Chia: Đề 1–6 (50 câu/đề) + Đề 7 (26 câu).
- Toàn bộ 326 giải thích tiếng Anh → đã dịch sang tiếng Việt.

**4. Trang HTML `PRM393_Hoc_Trac_Nghiem.html`**
- 23 tab: M1–M14 + Đề thử 1, Đề thử 2, Đề 1–7. Tổng 1003 câu.
- **Tiến độ lưu localStorage** (key `prm393_progress_v1`), id câu hỏi cố định → build lại file KHÔNG mất kết quả đã làm.
- Nút "Làm lại phần này" có confirm, chỉ xoá tab hiện tại.
- Chấm điểm/tiến độ riêng từng tab; chấm xanh trên chip khi làm hết tab đó.
- Render code block (```dart) trong đề, theme sáng/tối lưu lại.

**5. `PRM393_Ngan_Hang_Cau_Hoi.md`**
- Thêm 26 khối `<details>` "Giải thích chi tiết từng câu" dưới mỗi bảng đáp án (579 dòng giải thích).
- Phần "Giải thích các câu dễ sai" cũ giữ nguyên. Câu hỏi giữ nguyên 579 marker.
- Script idempotent — chạy lại thay thế chứ không nhân đôi.

## Câu có cảnh báo ⚠️ (10 câu, hiện viền đỏ trong HTML)

| Câu | Lý do |
|---|---|
| DE2-1 | "Guard" vs "Route protection" gần nghĩa — chọn theo tên mẫu thiết kế |
| P-47 | Đáp án đề nói Dart fall-through như C; thực tế Dart báo lỗi compile |
| P-163, 174, 196, 257, 299 | **Đề gốc bị cắt** — thiếu phương án C/D (196/257/299 chỉ còn 2 phương án) |
| P-280, 321, 323 | Đề gốc bị cắt phần thân câu hỏi |

## File

- `PRM393_Hoc_Trac_Nghiem.html` (577 KB, self-contained)
- `PRM393_Ngan_Hang_Cau_Hoi.md` (4555 dòng)
- Script build: scratchpad `parse_bank.py` → `build_exams_data.py` → `generate_html.py`, `add_explanations_to_md.py`

## Câu hỏi chưa giải quyết

1. Câu 10, 11 của Đề thử 2 — có ảnh ở đâu khác không, hay bỏ luôn?
2. 5 câu P-163/174/196/257/299 thiếu phương án C/D — có bản đề gốc đầy đủ để bổ sung không?
3. Đáp án 2 đề mẫu là do suy luận (đề gốc không kèm key) — nếu có đáp án chính thức thì nên đối chiếu lại.
