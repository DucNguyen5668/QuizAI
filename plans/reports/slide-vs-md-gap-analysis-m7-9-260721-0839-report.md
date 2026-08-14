# GAP ANALYSIS + BỔ SUNG — MODULE 7,8,9

Đối chiếu SLIDE (M7 25 slides, M8 24 slides, M9 24 slides) với File A (lý thuyết `PRM393_On_Thi_Full.md` M7 dòng 525–584, M8 585–655, M9 656–709 + Phụ lục A A1–A17) và File B (ngân hàng câu hỏi `PRM393_Ngan_Hang_Cau_Hoi.md` M7 32 câu, M8 40 câu, M9 35 câu).

---

## PHẦN 0 — Tóm tắt gap (theo module)

### Module 7 — Forms & Validation
- **Nhóm input widget ngoài ô chữ** (Slide 4): `Checkbox`, `Switch`, `Radio`, `DropdownButton`/`DropdownButtonFormField`, `showDatePicker`/`showTimePicker` — File A/B **không** cover.
- **Ẩn/hiện mật khẩu** (toggle `obscureText` bằng `suffixIcon`) (Slide 22) — không cover.
- **Validation bất đồng bộ** (Slide 19–20): validator đồng bộ không await được → check async ngoài validator + disable nút + spinner — không cover.
- **Confirm password so với biến state** (Slide 12) + **ẩn bàn phím bằng GestureDetector khi chạm ngoài** (Slide 17) — File A chỉ có `unfocus()`, thiếu pattern GestureDetector; confirm-vs-state chưa nêu.

### Module 8 — Networking & JSON
- **Parse JSON nặng chặn UI thread → `compute()`/isolate** (Slide 21 pitfall "blocking the UI thread with heavy parsing") — File A/B **không** cover (gap rõ nhất của M8).
- **Service layer + tiêm `http.Client`** (`ApiService({http.Client? client}) : client = client ?? http.Client()`) (Slide 18–19) — File B chỉ có layering chung (Q40), thiếu pattern DI-để-test cụ thể.
- **Cập nhật list sau POST: re-fetch vs optimistic update** + **retry bằng `setState()` ép FutureBuilder chạy lại** (Slide 16, 20) — không cover.

### Module 9 — Local Storage
- **Lưu bằng file JSON (dart:io + path_provider)** (Slide 4, 10): các loại thư mục (`Documents`/`Support`/`Temporary`), `File.writeAsString`/`readAsString`, path_provider chỉ trả path — File A chỉ chạm phần export (9.4), thiếu chi tiết đọc + directory types.
- **SQLite vs SQFlite** (Slide 14–15): engine C vs plugin Flutter, "F"=Flutter, **không chạy Web** — File A/B **không** cover (khái niệm hay hỏi).
- **SharedPreferences theo môi trường** (Slide 7): Web → `localStorage`; DartPad → `FakePrefs` mock — không cover.
- **SQL cho sqflite** (Slide 17): `WHERE` vs `HAVING`, `GROUP BY`, `ORDER BY`, `LIMIT/OFFSET` phân trang — File A chỉ có `orderBy`.

Không có module nào "không gap". Các mục đã cover kỹ (GlobalKey, validator null=hợp lệ, 500 không ném exception, SocketException, FutureBuilder future-in-build, sqflite return types, SharedPreferences 5 kiểu/isolate race, ConflictAlgorithm, caching) → **KHÔNG** đề xuất lại.

---

## PHẦN 1 — Nội dung chèn vào PRM393_On_Thi_Full.md (ready-to-paste)

### (Module 7) — chèn sau khối "Focus & bàn phím" (khoảng dòng 581, trước `---`)

```markdown
## 7.5 Nhóm input widget ngoài ô chữ

| Widget | Dùng khi | Callback / thuộc tính chốt |
|---|---|---|
| `Checkbox` / `CheckboxListTile` | Bật/tắt 1 lựa chọn | `value`, `onChanged` |
| `Switch` / `SwitchListTile` | Bật/tắt kiểu công tắc | `value`, `onChanged` |
| `Radio` / `RadioListTile` | Chọn **1 trong nhiều** | các radio cùng nhóm chung **`groupValue`**, khác `value` |
| `DropdownButton` | Chọn từ danh sách (không validate) | `value`, `items`, `onChanged` |
| `DropdownButtonFormField` | Dropdown **có validation trong Form** | thêm `validator` |
| `showDatePicker` / `showTimePicker` | Chọn ngày/giờ qua dialog | **async, trả Future** → phải `await` |

```dart
RadioListTile<String>(
  value: 'male', groupValue: _gender,
  onChanged: (v) => setState(() => _gender = v),
);

DropdownButtonFormField<String>(
  value: _selected,
  items: ['A', 'B'].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
  onChanged: (v) => setState(() => _selected = v),
  validator: (v) => v == null ? 'Chọn một mục' : null,   // dùng được trong Form
);

final picked = await showDatePicker(               // await — không đặt vào cây widget
  context: context, initialDate: DateTime.now(),
  firstDate: DateTime(2000), lastDate: DateTime(2100),
);
```

**Bẫy đề thi:**
- Radio cùng nhóm **phải chung `groupValue`**; nếu mỗi radio một `groupValue` riêng thì không chọn được như nhóm.
- Muốn dropdown có `validator` trong `Form` → dùng **`DropdownButtonFormField`**, không phải `DropdownButton`.
- `showDatePicker`/`showTimePicker` là **hàm async trả Future**, không phải widget đặt trong `build`.

## 7.6 Ẩn / hiện mật khẩu

```dart
bool _hide = true;
TextFormField(
  obscureText: _hide,
  decoration: InputDecoration(
    suffixIcon: IconButton(
      icon: Icon(_hide ? Icons.visibility : Icons.visibility_off),
      onPressed: () => setState(() => _hide = !_hide),   // đảo cờ + rebuild
    ),
  ),
);
```
**Bẫy đề thi:** không có property `showPassword`/`secure`; ẩn/hiện là do **đảo `obscureText`** bằng `setState`.

## 7.7 Validation bất đồng bộ (async check) + trạng thái nút

- `validator` của `TextFormField` **đồng bộ** — phải trả `String?` ngay, **KHÔNG `await` được**. Muốn kiểm tra "email đã tồn tại?" trên server → làm **ngoài** validator, trong hàm submit.
- Trình tự: validate cục bộ → `setState(() => _isChecking = true)` → `await` gọi API/`Future.delayed` → xử lý kết quả → `_isChecking = false`.

```dart
ElevatedButton(
  onPressed: _isChecking ? null : _submit,        // disable khi đang chờ → chống double-submit
  child: _isChecking
      ? const CircularProgressIndicator(strokeWidth: 2)
      : const Text('Create account'),
);
```
**Bẫy đề thi:** đặt lời gọi async **bên trong `validator`** → không hoạt động (validator không chờ Future).

## 7.8 Confirm password & ẩn bàn phím khi chạm ngoài

- Confirm password: so sánh với **biến state** (`_password`) đang giữ, **không** đọc trực tiếp controller khác trong validator (dễ lệch do thứ tự build).
- Ẩn bàn phím khi chạm vùng trống: bọc thân màn hình bằng `GestureDetector`.

```dart
GestureDetector(
  onTap: () => FocusScope.of(context).unfocus(),   // chạm ngoài → ẩn bàn phím
  child: Form(...),
);
```
```

### (Module 8) — chèn cuối Module 8 (sau khối 8.4, khoảng dòng 652, trước `---`)

```markdown
## 8.5 Parse JSON nặng — đừng chặn UI thread

- `jsonDecode` + `.map(...)` cho danh sách hàng nghìn phần tử chạy trên **UI isolate** → giật/khựng khung hình.
- Giải pháp: parse ở **isolate nền** bằng `compute(fn, arg)` (trả Future).

```dart
// Hàm parse phải là TOP-LEVEL hoặc STATIC
List<Post> _parsePosts(String body) =>
    (jsonDecode(body) as List).map((e) => Post.fromJson(e)).toList();

final posts = await compute(_parsePosts, response.body);   // parse ở isolate khác
```
**Bẫy đề thi:** hàm truyền cho `compute` phải **top-level/static** — truyền closure hay method thường sẽ lỗi (isolate không chia sẻ bộ nhớ).

## 8.6 Service Layer + tiêm http.Client (để test được)

```dart
class ApiService {
  final http.Client client;
  ApiService({http.Client? client}) : client = client ?? http.Client();  // tiêm mock, mặc định tạo thật

  Future<List<Post>> fetchPosts() async {
    final res = await client.get(Uri.parse('.../posts'));
    if (res.statusCode != 200) throw Exception('Failed');
    return (jsonDecode(res.body) as List).map((e) => Post.fromJson(e)).toList();
  }
}
```
- Tách logic mạng khỏi widget → UI gọn, tái sử dụng nhiều màn hình.
- Cho phép **tiêm `MockClient`** trong unit test (không gọi mạng thật).

## 8.7 Cập nhật danh sách sau POST & Retry

| Cách | Mô tả | Đánh đổi |
|---|---|---|
| **Re-fetch** | POST xong gọi lại `fetchPosts()` | Chuẩn với server, tốn 1 request |
| **Optimistic update** | Thêm item vào list **ngay** (giả định thành công), rollback nếu lỗi | Mượt hơn, phức tạp hơn |

- Nút **Retry** khi lỗi thường dùng `setState(() {})` (kèm gán lại `_future = fetchPosts()`) để ép `FutureBuilder` rebuild và chạy lại request.
```

### (Module 9) — chèn cuối Module 9 (sau 9.4, khoảng dòng 706, trước `---`)

```markdown
## 9.5 Lưu bằng file JSON (dart:io + path_provider)

Cách lưu **thứ hai** (giữa SharedPreferences và SQLite): ghi cả cấu trúc thành **1 file JSON**.

```dart
import 'dart:io';
import 'dart:convert';
import 'package:path_provider/path_provider.dart';

Future<File> _notesFile() async {
  final dir = await getApplicationDocumentsDirectory();     // path_provider chỉ TRẢ path
  return File('${dir.path}/notes.json');
}

await (await _notesFile()).writeAsString(jsonEncode(list)); // GHI (dart:io File)
final text = await (await _notesFile()).readAsString();     // ĐỌC
final data = jsonDecode(text) as List;
```

| Hàm `path_provider` | Đặc điểm |
|---|---|
| `getApplicationDocumentsDirectory()` | Bền vững, dữ liệu người dùng, được backup |
| `getApplicationSupportDirectory()` | Bền vững, dữ liệu app (ẩn với user) |
| `getTemporaryDirectory()` | **Cache tạm** — OS có thể **xoá bất cứ lúc nào** |
| `getExternalStorageDirectory()` | Android-only, bộ nhớ ngoài |

**Bẫy đề thi:** `path_provider` **chỉ trả đường dẫn**, không đọc/ghi. Đọc/ghi là việc của `dart:io File` (`writeAsString`, `readAsString`, `exists`, `delete`). Bản `...Sync` chặn luồng → ưu tiên async.

## 9.6 SQLite vs SQFlite (khái niệm hay hỏi)

| | **SQLite** | **sqflite** |
|---|---|---|
| Là gì | **Engine** CSDL quan hệ nhúng (viết bằng C) | **Plugin Flutter** (Dart + native) bọc quanh SQLite |
| Vai trò | Lưu & truy vấn dữ liệu cục bộ | Cầu nối Flutter → SQLite |
| "F" | — | = **Flutter** (SQLite *for* Flutter) |

**Bẫy đề thi:** `sqflite` **không chạy trên Flutter Web** (trình duyệt không có engine SQLite native). sqflite là **plugin**, không phải bản thân database. Web muốn SQL-like → `sembast_web`/Hive/IndexedDB.

## 9.7 SharedPreferences theo môi trường

| Môi trường | Hỗ trợ? | Ghi chú |
|---|---|---|
| Android / iOS | ✅ | XML / NSUserDefaults — bền vững |
| Flutter Web | ✅ | Ánh xạ sang **`localStorage`** của trình duyệt |
| DartPad (Flutter) | ❌ | Không có native → phải mock **`FakePrefs`** |
| DartPad (Dart thuần) | ❌ | Không plugin, không widget |

**Bẫy đề thi:** trên Web, SharedPreferences **vẫn dùng được** nhưng lưu ở `localStorage`, không phải file XML.

## 9.8 SQL cho sqflite (mệnh đề SELECT & phân trang)

```sql
SELECT category, COUNT(*) FROM notes
WHERE done = 0                       -- lọc DÒNG
GROUP BY category HAVING COUNT(*) > 1 -- HAVING lọc NHÓM (sau GROUP BY)
ORDER BY createdAt DESC              -- sắp xếp
LIMIT 20 OFFSET 40;                  -- phân trang: bỏ 40, lấy 20 (trang 3)
```
- `WHERE` lọc **dòng**; `HAVING` lọc **nhóm**.
- `LIMIT`/`OFFSET` = phân trang danh sách dài trên mobile.
- `db.query()` có tham số tương ứng: `columns`, `where` + `whereArgs`, `groupBy`, `having`, `orderBy`, `limit`, `offset`.

**Bẫy đề thi:** sắp xếp trong `query()` dùng tham số **`orderBy`** (không phải `sort`/`sortBy`).
```

---

## PHẦN 2 — Câu hỏi chèn vào PRM393_Ngan_Hang_Cau_Hoi.md (ready-to-paste)

### (Module 7) — chèn trước dòng `### ĐÁP ÁN M7` (dòng 1278), hoặc thêm khối riêng "Câu hỏi bổ sung M7"

```markdown
**M7-BS-1.** Which widget lets a dropdown selection participate in `Form` validation?
A. `DropdownButton`
B. `DropdownButtonFormField`
C. `PopupMenuButton`
D. `DropdownMenu`

**M7-BS-2.** For a group of radio buttons where only one may be selected, all radios must share the same:
A. `value`  B. `groupValue`  C. `key`  D. `controller`

**M7-BS-3.** What does `showDatePicker` return?
A. A `DateTime` directly (synchronous)
B. A `Future<DateTime?>` that must be awaited
C. A widget to insert into the tree
D. `void`

**M7-BS-4.** Which is the correct way to implement a show/hide password toggle?
A. Set a property `showPassword: true`
B. Flip a bool bound to `obscureText` inside `setState`, via a `suffixIcon` `IconButton`
C. Use a separate `TextField`
D. `keyboardType: TextInputType.visiblePassword`

**M7-BS-5.** Why can't you check "is this email already taken on the server" inside a `TextFormField` validator?
A. Validators are synchronous and must return `String?` immediately — they cannot `await`
B. Validators run on a background isolate
C. Validators only run once
D. It is allowed and recommended

**M7-BS-6.** During an async availability check triggered on submit, the submit button should be:
A. Left enabled so the user can retry
B. Disabled and show a spinner to prevent double submits
C. Removed from the widget tree
D. Replaced by plain `Text`

**M7-BS-7.** In a confirm-password validator, the recommended comparison target is:
A. The password **state variable** held by the widget
B. The other `TextEditingController` read directly inside the validator
C. A value from `SharedPreferences`
D. The server

**M7-BS-8.** Which pattern hides the keyboard when the user taps outside any field?
A. Wrap the body in `GestureDetector(onTap: () => FocusScope.of(context).unfocus())`
B. Call `Navigator.pop()`
C. Set `obscureText: true`
D. Insert a `Spacer`

**M7-BS-9.** Which widget pair is intended for boolean on/off choices?
A. `Checkbox` / `Switch`
B. `DropdownButton` / `Radio`
C. `Slider` / `Stepper`
D. `TextField` / `TextFormField`

### ĐÁP ÁN M7-BS
M7-BS-1-B · M7-BS-2-B · M7-BS-3-B · M7-BS-4-B · M7-BS-5-A · M7-BS-6-B · M7-BS-7-A · M7-BS-8-A · M7-BS-9-A

**Giải thích các câu dễ sai:**
- **M7-BS-1:** `DropdownButton` KHÔNG có `validator`; muốn validate trong Form phải dùng `DropdownButtonFormField`.
- **M7-BS-2:** Radio cùng nhóm chung `groupValue`; đây là điểm hay nhầm với `value`.
- **M7-BS-3:** `showDatePicker`/`showTimePicker` là hàm **async trả Future**, không phải widget.
- **M7-BS-5:** Validator đồng bộ → check server phải làm ngoài validator (trong hàm submit).
- **M7-BS-7:** So sánh với biến state, không đọc controller khác trong validator.
```

### (Module 8) — chèn trước `### ĐÁP ÁN M8` (dòng 1472)

```markdown
**M8-BS-1.** Parsing a very large JSON list on the main isolate can freeze the UI. The idiomatic fix is:
A. Use `compute()` to parse on a background isolate
B. Wrap the parse in `setState`
C. Convert the widget to `StatelessWidget`
D. Increase the request timeout

**M8-BS-2.** A function passed to `compute()` must be:
A. A top-level or static function
B. An anonymous closure that captures state
C. An instance method
D. A `build()` method

**M8-BS-3.** Why inject an `http.Client` into an `ApiService` through its constructor?
A. So a mock client can be supplied in unit tests
B. It is required for the code to compile
C. It enables HTTP caching automatically
D. To avoid importing the `http` package

**M8-BS-4.** What does `ApiService({http.Client? client}) : client = client ?? http.Client();` do?
A. Uses the injected client if provided, otherwise creates a default one
B. Always creates a brand-new client
C. Leaves the client null
D. Throws if no client is given

**M8-BS-5.** Adding a newly-created item to the list immediately after POST, before the server confirms, is called:
A. Optimistic update
B. Exponential backoff
C. Stale-while-revalidate
D. Lazy loading

**M8-BS-6.** A common way to make a "Retry" button re-run a `FutureBuilder`'s request is:
A. Call `setState(() {})` (re-assigning the future) so the widget rebuilds and the future runs again
B. Call `dispose()`
C. Restart the whole app
D. Mark the `FutureBuilder` as `const`

### ĐÁP ÁN M8-BS
M8-BS-1-A · M8-BS-2-A · M8-BS-3-A · M8-BS-4-A · M8-BS-5-A · M8-BS-6-A

**Giải thích các câu dễ sai:**
- **M8-BS-1, M8-BS-2:** Parse nặng → `compute()` (isolate nền); hàm parse phải **top-level/static**, không dùng closure/method thường.
- **M8-BS-4:** `client ?? http.Client()` = "có mock thì dùng mock, không thì tạo client thật" — nền tảng để test.
- **M8-BS-5:** Optimistic update = cập nhật UI trước khi server xác nhận (khác re-fetch).
```

### (Module 9) — chèn trước `### ĐÁP ÁN M9` (dòng 1645)

```markdown
**M9-BS-1.** Which package only provides a file-system path (it does NOT read/write)?
A. `path_provider`  B. `dart:io`  C. `dart:convert`  D. `sqflite`

**M9-BS-2.** Which directory may be cleared by the OS at any time?
A. `getTemporaryDirectory()`
B. `getApplicationDocumentsDirectory()`
C. `getApplicationSupportDirectory()`
D. `getExternalStorageDirectory()`

**M9-BS-3.** Which call writes a JSON string to a local file?
A. `File(path).writeAsString(jsonString)`
B. `prefs.setString(key, jsonString)`
C. `db.insert('t', map)`
D. `jsonEncode(list)`

**M9-BS-4.** What is the relationship between SQLite and sqflite?
A. SQLite is the C database engine; sqflite is a Flutter plugin wrapping it
B. They are the same thing
C. sqflite is the engine and SQLite is the plugin
D. sqflite replaces SQLite with a NoSQL store

**M9-BS-5.** Why doesn't sqflite work on Flutter Web?
A. There is no native SQLite engine in the browser
B. The browser has no JavaScript
C. sqflite is deprecated
D. The web cannot store any data

**M9-BS-6.** On Flutter Web, `SharedPreferences` stores data in:
A. The browser's `localStorage`
B. An XML file
C. An SQLite database
D. HTTP cookies

**M9-BS-7.** In DartPad (Flutter mode), why must `SharedPreferences` be replaced by a `FakePrefs` mock?
A. Plugins with native code are not supported, so the real plugin is unavailable
B. Because it is faster
C. Because DartPad has no Dart runtime
D. Because `FakePrefs` persists data permanently

**M9-BS-8.** Which SQL clause filters GROUPS (after `GROUP BY`), not individual rows?
A. `HAVING`  B. `WHERE`  C. `ORDER BY`  D. `LIMIT`

**M9-BS-9.** Which clauses implement pagination for a long list?
A. `LIMIT` and `OFFSET`
B. `GROUP BY` and `HAVING`
C. `SELECT` and `FROM`
D. `WHERE` and `AND`

**M9-BS-10.** In `db.query()`, results are sorted using the parameter:
A. `orderBy`  B. `sort`  C. `sortBy`  D. `arrange`

### ĐÁP ÁN M9-BS
M9-BS-1-A · M9-BS-2-A · M9-BS-3-A · M9-BS-4-A · M9-BS-5-A · M9-BS-6-A · M9-BS-7-A · M9-BS-8-A · M9-BS-9-A · M9-BS-10-A

**Giải thích các câu dễ sai:**
- **M9-BS-1:** `path_provider` chỉ trả **đường dẫn**; đọc/ghi là `dart:io File`.
- **M9-BS-2:** `getTemporaryDirectory()` là cache tạm — OS xoá được; đừng để dữ liệu quan trọng ở đó.
- **M9-BS-4, M9-BS-5:** SQLite = engine C; sqflite = plugin Flutter bọc quanh → **không có engine native trên Web**.
- **M9-BS-6:** Web vẫn dùng được SharedPreferences nhưng lưu ở `localStorage`, không phải XML.
- **M9-BS-8:** `WHERE` lọc dòng, `HAVING` lọc nhóm — rất hay đảo.
```

---

**Status:** DONE
**Summary:** Tìm được ~13 nhóm gap thi-được (M7: 4 — input widgets/show-hide password/async validation/confirm-vs-state+GestureDetector; M8: 3 — compute() parse nền/ApiService DI/optimistic-update+retry; M9: 4 — file JSON+path_provider directory types/SQLite-vs-SQFlite+no-web/SharedPreferences theo môi trường/SQL clauses+pagination). Soạn 8 mục lý thuyết tiếng Việt ready-to-paste cho File A và **25 câu trắc nghiệm bổ sung** (M7-BS 9 câu, M8-BS 6 câu, M9-BS 10 câu) + đáp án + giải thích cho File B. Không đề xuất trùng với Phụ lục A (đã né GlobalKey, RegExp, sqflite return types, caching, exception mạng, SharedPreferences isolate/5-kiểu).
**Concerns:** Một số mục UI thuần xuất hiện trong demo (`Dismissible` swipe-to-delete, `CheckboxListTile`, Navigator push detail-screen) không đưa vào vì thuộc phạm vi Module 5/6, không phải trọng tâm M7-9; nếu muốn cover toàn diện demo có thể bổ sung sau.
