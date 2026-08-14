# GAP ANALYSIS + BỔ SUNG — MODULE 10, 11, 12

Đối chiếu slide (Module10 Auth/Session/Notifications, Module11 Testing, Module12 Performance+Deployment) với 2 file:
- **File A** = `PRM393_On_Thi_Full.md` (lý thuyết)
- **File B** = `PRM393_Ngan_Hang_Cau_Hoi.md` (ngân hàng câu hỏi)

Đã grep để tránh trùng: 3 cây Widget/Element/RenderObject (đã có ở M4 file A + M5 file B), `Selector`/`context.watch`/`read`/`Consumer` (M14 file B), `ListView.builder` lazy (file A), DevTools jank/Timeline (M11 Q29 file B), Firebase Auth codes + `signInAnonymously` (A10 file A + M10 file B), notifications `cancel/zonedSchedule/payload/timezone` (NOTIFICATION + A1 + A16 file A, M13 file B).

---

## PHẦN 0 — TÓM TẮT GAP (theo module)

### Module 10 — Auth, Session, Notifications
- **JWT structure** (GAP mạnh): 3 phần header.payload.signature, Base64Url **signed nhưng KHÔNG encrypted**, có `exp`, không nhét mật khẩu/bí mật vào payload. Chưa có ở đâu.
- **Access token vs Refresh token** (GAP một phần): file A M10 chỉ nhắc thoáng "refresh token"; chưa có bảng phân biệt vòng đời/nơi lưu/khi hết hạn, chưa có header `Authorization: Bearer`.
- **Google Sign-In (Firebase)** (GAP mạnh): luồng OAuth token → `GoogleAuthProvider.credential` → `signInWithCredential`; cấu hình bắt buộc (SHA-1/SHA-256, `google-services.json` vào `android/app/`, deps `firebase_core/firebase_auth/google_sign_in`, Gradle plugin); bảng lỗi `DEVELOPER_ERROR`, login trả null do thiếu Play Services. Chưa có (A10 chỉ có `signInWithCredential` một dòng).
- **Auth vs Authorization** (GAP nhỏ): định nghĩa "Bạn là ai?" vs "Bạn được làm gì?" — có trong slide 3, chưa có trong 2 file.
- **Session anatomy + Splash auto-login** (GAP nhỏ): session = token + profile + expiry timestamp; luồng Splash kiểm token → Home/Login.
- Notifications: **KHÔNG có gap đáng kể** (đã cover đủ ở file A + M13 file B).

### Module 11 — Testing & Debugging
- **Bao phủ tốt.** Chỉ 2 gap nhỏ:
  - **Testing pyramid** (đáy Unit nhiều → đỉnh Integration ít, kèm lý do chi phí) — file A mới có bảng 3 loại, chưa nêu hình tháp/tỷ lệ.
  - **Arrange-Act-Assert (AAA)** — slide nhấn mạnh STEP Arrange/Act/Assert nhưng 2 file chưa gọi tên pattern này.
- Các mục còn lại (pump/pumpAndSettle, finders, matchers, keys, mock, DevTools, best practices) đã có đủ.

### Module 12 — Performance Optimization & Deployment
- **Deployment/Build & Release: bao phủ tốt** (file A M12 + file B M12 đủ APK/AAB/keystore/version/obfuscate).
- **Performance Optimization: GAP LỚN** — file A M12 chỉ có "Build & Release", file B M12 20 câu **toàn deployment, 0 câu performance**. Các gap:
  - **FPS & frame budget**: 60 FPS→16.6ms, 120 FPS→8ms, jank = drop frame. Chưa có.
  - **Nguyên nhân chậm** (checklist rebuild/heavy build()/ảnh full-res/cây sâu/list kém/GlobalKey khắp nơi). Chưa có.
  - **Kỹ thuật tối ưu**: `const` (góc rebuild), **extract widget**, **cấm việc nặng trong `build()`**, key đúng (`ValueKey` vs `UniqueKey` ép rebuild), `Selector` (góc list), `ListView.builder`. Một phần rải rác, chưa gom theo góc hiệu năng.
  - **DevTools hiệu năng**: CPU Profiler, Memory leak, **Repaint Rainbow**, Rebuild counter, **Profile mode bắt buộc để đo chính xác** (không đo ở Debug). Chưa có (mới có jank timeline).
  - **Tối ưu ảnh**: resize, `precacheImage`, `FadeInImage.assetNetwork`, không decode trong `build()`. Chưa có.
  - **App size**: `flutter build apk --analyze-size` (JSON + tree map), **tree-shaking icons**. Chưa có (file A chỉ có `--split-per-abi`/R8/nén ảnh).
  - **Build modes Debug/Profile/Release** + `flutter run --profile`. Chưa nêu rõ 3 mode.

---

## PHẦN 1 — NỘI DUNG CHÈN VÀO `PRM393_On_Thi_Full.md` (ready-to-paste)

> Chèn tiếp vào **cuối Phụ lục A** (sau mục A17, dòng ~1257). Đánh số tiếp A18–A21.

### (Module 10)

```markdown
## A18. JWT & Token-based Authentication (cấu trúc chi tiết)

**JWT gồm 3 phần** ngăn bởi dấu chấm: `header.payload.signature`

| Phần | Chứa gì |
|---|---|
| **Header** | Thuật toán ký (HS256/RS256) + type |
| **Payload** | Các claim: `sub`/userId, email, role, `exp` (hết hạn), `iat` |
| **Signature** | Ký bằng secret/private key để xác minh toàn vẹn |

- **Base64Url encode + signed (ký) — KHÔNG encrypted (mã hoá)** → ai cũng decode đọc được payload.
- ⇒ **Không để mật khẩu / dữ liệu bí mật trong payload**, chỉ để "identity claims".
- Có `exp` → hết hạn phải xin token mới.

**Access token vs Refresh token:**

| | Access token | Refresh token |
|---|---|---|
| Vòng đời | **Ngắn** (phút–giờ) | **Dài** (ngày–tuần) |
| Gửi kèm mỗi request | Có (`Authorization: Bearer`) | Không |
| Khi hết hạn | Dùng refresh token xin cái mới | Hết → bắt đăng nhập lại |
| Lưu ở đâu | Bộ nhớ / secure storage | **Secure storage** (nhạy cảm hơn) |

```dart
// đính token vào mọi request
final res = await http.get(uri, headers: {
  'Authorization': 'Bearer $accessToken',
});
```

Auth flow high-level: credentials → API → backend verify → trả **JWT** → lưu local → đính token mọi request → session tới khi logout / token hết hạn.

**Authentication vs Authorization:** Authentication = "Bạn là **ai**?" (xác minh danh tính); Authorization = "Bạn được **làm gì**?" (phân quyền). Login là authentication; chặn màn admin là authorization.

**Session** thường gồm: **access token + user profile + token expiry timestamp**. Luồng auto-login: SplashScreen đọc token từ storage → **có token hợp lệ → Home**, **không → Login**.

**Bẫy đề thi:** JWT **signed chứ không encrypted** → payload đọc được, đừng nhét bí mật. JWT có **3** phần (không phải 2). Access token cố tình **ngắn hạn** để giảm cửa sổ rủi ro nếu bị lộ; refresh token cất kỹ nhất.

## A19. Google Sign-In (Firebase) — luồng, cấu hình, lỗi hay gặp

**Luồng:**
1. User tap "Sign in with Google" → bộ chọn tài khoản Google.
2. Google cấp **OAuth tokens** (`idToken` + `accessToken`).
3. Tạo Firebase credential từ 2 token đó.
4. `signInWithCredential(credential)` → Firebase đăng nhập user.
5. Nhận `User` → điều hướng Home. **Firebase lo identity, app chỉ lo UI + điều hướng.**

```dart
final googleUser = await GoogleSignIn().signIn();
final googleAuth = await googleUser!.authentication;
final credential = GoogleAuthProvider.credential(
  idToken: googleAuth.idToken,
  accessToken: googleAuth.accessToken,
);
await FirebaseAuth.instance.signInWithCredential(credential);
// logout: await GoogleSignIn().signOut(); await FirebaseAuth.instance.signOut();
```

**Cấu hình bắt buộc (Android):**
- Tạo Firebase project, thêm Android app đúng **package name**.
- Thêm **SHA-1 + SHA-256** fingerprint.
- Đặt **`google-services.json`** vào **`android/app/`**.
- Deps: `firebase_core`, `firebase_auth`, `google_sign_in`.
- Thêm Gradle plugin **`com.google.gms.google-services`**.
- Bật Google provider trong Firebase Console.

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| Màn Google không hiện | Thiếu SHA-1 | Thêm SHA-1 → rebuild |
| **`DEVELOPER_ERROR`** | **Sai package name** | Khớp package với Firebase |
| Firebase init error | Thiếu `google-services.json` | Đặt vào `android/app/` |
| Crash khi mở app | Thiếu Gradle plugin | Thêm `com.google.gms.google-services` |
| **Login trả `null`** | **Emulator thiếu Play Services** | Dùng emulator có Play Store / máy thật |

**Bẫy đề thi:** `DEVELOPER_ERROR` = sai package name / thiếu SHA-1 (KHÔNG phải lỗi mạng). Login trả `null` trên emulator thường do **thiếu Google Play Services**. `google-services.json` phải nằm trong `android/app/`.
```

### (Module 11)

```markdown
## A20. Testing pyramid & Arrange-Act-Assert (bổ sung Module 11)

**Testing pyramid** (đáy rộng → đỉnh hẹp):
- **Unit (nhiều nhất)** — nhanh, rẻ, ổn định; bắt bug logic sớm.
- **Widget (vừa)** — kiểm UI render + tương tác.
- **Integration (ít nhất)** — chậm, đắt, giòn; chỉ dùng cho **luồng quan trọng**.

**Arrange-Act-Assert (AAA)** — mọi test theo 3 bước:
- **Arrange** — chuẩn bị dữ liệu/môi trường (`final task = Task(...)`, `tester.pumpWidget(...)`).
- **Act** — thực hiện hành động (`task.toggle()`, `tester.tap(...)`, `tester.enterText(...)`).
- **Assert** — kiểm kết quả bằng `expect(...)`.

**Bẫy đề thi:** Integration test **không nên nhiều** (chậm + giòn) — ưu tiên unit. Widget test nên dùng **`Key`** (`find.byKey(Key('taskTextField'))`) để định vị chắc chắn thay vì dựa vào text.
```

### (Module 12 — gồm Performance)

```markdown
## A21. Performance Optimization (Module 12) — phần THIẾU trong "Build & Release"

**FPS & ngân sách frame:**
- Flutter nhắm **60 FPS → 16.6 ms/frame**; máy mới **120 FPS → 8 ms/frame**.
- Vượt ngân sách 1 frame → frame bị **drop** → **jank** (giật). Build + layout + paint phải xong trong ngân sách.
- Rebuild **rẻ nhưng không miễn phí** (cheap but not free).

**Nguyên nhân gây chậm (checklist):**
- Rebuild quá nhiều (state đặt quá cao → cả UI rebuild).
- Chạy logic nặng trong `build()`.
- Ảnh full-resolution decode.
- Cây widget quá sâu.
- Dùng sai `setState` / listener Provider.
- List render không hiệu quả (không dùng `.builder`).
- Thao tác đồng bộ nặng trên UI thread.
- Rải `GlobalKey` khắp nơi.

**Kỹ thuật tối ưu:**
1. **`const`** cho widget tĩnh → Flutter **bỏ qua rebuild** + tiết kiệm bộ nhớ + giúp tree-diffing.
2. **Tách widget con** (extract, VD `TaskTile`) → chỉ tile thay đổi rebuild, cha (ListView) đứng yên.
3. **Không làm việc nặng trong `build()`** — cấm sort, parse JSON, đọc DB, gọi API, tính toán phức tạp. Làm **một lần** khi dữ liệu đổi (ngoài build / initState).
4. **Key đúng chuẩn**: `ValueKey(task.id)` để giữ state khi reorder; tránh **`UniqueKey()` (ép rebuild mỗi frame)**; `GlobalKey` mạnh nhưng **chậm**.
5. **`Selector` / fine-grained** thay `context.watch<T>()` ở đầu widget → rebuild đúng phần cần (xem M14, đây là góc hiệu năng).
6. **`ListView.builder`** cho list dài (lazy — chỉ dựng item nhìn thấy).

```dart
// ❌ Anti-pattern: sort chạy lại mỗi rebuild
Widget build(context) {
  final sorted = tasks..sort();
  ...
}
// ✅ Đúng: sort 1 lần khi dữ liệu đổi, build chỉ hiển thị
```

**DevTools cho hiệu năng:**

| Tool | Dùng để |
|---|---|
| Performance / Timeline | FPS, chi phí render từng frame, tìm **jank** |
| CPU Profiler | Điểm nóng thời gian thực thi |
| Memory | Rò rỉ, cấp phát |
| Widget Inspector | Tìm nguồn rebuild, xem cây widget + constraints |
| **Repaint Rainbow** | Tô màu vùng repaint → phát hiện repaint thừa |
| Rebuild counter (extension) | Đếm số lần rebuild widget |

**Bẫy đề thi:** Đo hiệu năng phải chạy **Profile mode** (`flutter run --profile`), KHÔNG đo ở **Debug** (Debug chậm giả tạo do assert/hot-reload).

**Tối ưu ảnh:**
- **Resize trước khi dùng** — đừng load ảnh 2000px cho thumbnail 48px:
  `Image.asset('assets/x.png', width: 48, height: 48)`.
- **`precacheImage(const AssetImage('assets/x.png'), context)`** nạp trước ảnh hay dùng.
- **`FadeInImage.assetNetwork(placeholder: 'assets/loading.png', image: url)`** cho ảnh mạng (có placeholder, mượt).
- **Không decode ảnh trong `build()`** → decode 1 lần ở `initState` nếu cần.

**Phân tích & giảm dung lượng app:**
```bash
flutter build apk --release
flutter build apk --analyze-size     # xuất JSON + tree map HTML
```
Breakdown gồm: **Dart AOT code**, native libs, assets, đóng góp từng package.
Giảm size: xoá asset thừa, nén ảnh, xoá dependency không dùng, **bật tree-shaking icons** (loại icon Material không dùng).

**Build modes:**

| Mode | Đặc điểm | Dùng khi |
|---|---|---|
| **Debug** | Hot reload, assert bật, có DEBUG banner, chậm | Phát triển |
| **Profile** | Gần release, bỏ overhead debug, đo perf được | **Đo hiệu năng** |
| **Release** | AOT tối ưu, không debug, nhanh nhất | Phát hành |

`flutter run --profile` = chạy gần hiệu năng thật để kiểm tra độ mượt/scroll/build cost trước khi build release.

**Deployment checklist:** xoá debug statements → kiểm icon/splash → dọn asset thừa → tăng `versionCode` → test Profile mode → test APK trên **máy thật** → xem size report (`--analyze-size`) → quét crash.

**Bẫy đề thi:** `--analyze-size` để xem cấu trúc dung lượng; giảm icon = **tree-shaking icons**. `UniqueKey()` trong list = rebuild vô ích **mỗi frame**. Không bao giờ đặt sort/parse/API trong `build()`. Đo perf ở **Profile**, không phải Debug.
```

---

## PHẦN 2 — CÂU HỎI CHÈN VÀO `PRM393_Ngan_Hang_Cau_Hoi.md` (ready-to-paste)

> Chèn khối "BỔ SUNG" vào cuối mỗi module tương ứng (trước dấu `---` kết module). Giữ convention của file: đáp án đúng đặt ở **A**.

### (Module 10) — chèn sau câu 28, trước "### ĐÁP ÁN M10"

```markdown
### BỔ SUNG M10

**M10-BS-1.** How many parts does a JWT have, separated by dots?
A. 3 — header, payload, signature
B. 2 — key and value
C. 1 — a single encrypted blob
D. 4 — header, payload, signature, refresh

**M10-BS-2.** Which is TRUE about a JWT payload?
A. It is Base64Url-encoded and signed but NOT encrypted, so it must not contain secrets
B. It is fully encrypted and unreadable by the client
C. It stores the user's raw password securely
D. It cannot be decoded without the server key

**M10-BS-3.** What is the correct HTTP header to send an access token?
A. `Authorization: Bearer <token>`
B. `Token: <token>`
C. `Cookie: jwt=<token>`
D. `X-Auth-Password: <token>`

**M10-BS-4.** What is the main purpose of a refresh token?
A. Obtain a new access token when the short-lived one expires, without re-login
B. Encrypt the access token
C. Store the user's password
D. Replace the need for HTTPS

**M10-BS-5.** Why is the access token deliberately short-lived?
A. To reduce the risk window if it is leaked
B. To save storage space
C. Because JWTs technically cannot be long
D. To avoid using HTTPS

**M10-BS-6.** In Google Sign-In with Firebase, what is built from the Google tokens before signing in?
A. `GoogleAuthProvider.credential(idToken:, accessToken:)`
B. `FirebaseUser.fromGoogle()`
C. `OAuthToken.build()`
D. `GoogleSignInResult()`

**M10-BS-7.** Which file must be placed in `android/app/` for Firebase on Android?
A. `google-services.json`
B. `firebase.json`
C. `key.properties`
D. `GoogleService-Info.plist`

**M10-BS-8.** A Google Sign-In throws `DEVELOPER_ERROR`. Most likely cause?
A. Wrong package name / missing SHA-1 fingerprint
B. No internet connection
C. The access token expired
D. Missing INTERNET permission

**M10-BS-9.** Google Sign-In returns `null` on an emulator. Most likely cause?
A. The emulator lacks Google Play Services
B. The APK is unsigned
C. Dart null safety is disabled
D. The wrong Flutter version is installed

**M10-BS-10.** Which dependencies are required for Firebase Google Sign-In?
A. `firebase_core`, `firebase_auth`, `google_sign_in`
B. `http`, `provider`
C. `shared_preferences`, `sqflite`
D. `firebase_messaging` only

**M10-BS-11.** A user session typically consists of:
A. Access token, user profile, and token expiry timestamp
B. Only the username
C. The device IMEI
D. The installed app version

**M10-BS-12.** In a SplashScreen auto-login flow, what decides the destination screen?
A. Whether a valid token exists in storage → Home, otherwise Login
B. The device orientation
C. The current theme mode
D. A random choice at startup

**M10-BS-13.** Which is a FORM-level (cross-field) validation rule in a signup form?
A. "Password" and "Confirm password" must match
B. Email must contain '@'
C. Password must be at least 6 characters
D. Name must not be empty

**M10-BS-14.** Authentication vs Authorization — which is correct?
A. Authentication verifies identity ("who are you?"); Authorization controls access ("what may you do?")
B. They are the same thing
C. Authorization happens before Authentication
D. Authentication decides permissions

### ĐÁP ÁN M10-BS
1-A · 2-A · 3-A · 4-A · 5-A · 6-A · 7-A · 8-A · 9-A · 10-A · 11-A · 12-A · 13-A · 14-A

**Giải thích các câu dễ sai:**
- **1, 2:** JWT có **3** phần và **signed chứ không encrypted** → payload decode đọc được, không nhét bí mật.
- **4, 5:** Refresh token dùng để **lấy access token mới**; access token ngắn hạn để **giảm rủi ro lộ**.
- **8, 9:** `DEVELOPER_ERROR` = sai package name / thiếu SHA-1; login `null` trên emulator = thiếu Play Services. Cả hai KHÔNG phải lỗi mạng.
- **13:** Cross-field = so **hai** field (confirm password) — khác rule field-level (một field).
```

### (Module 11) — chèn sau câu 33, trước "### ĐÁP ÁN M11"

```markdown
### BỔ SUNG M11

**M11-BS-1.** Which describes the Flutter testing pyramid?
A. Many unit tests at the base, fewer widget tests, fewest integration tests
B. Many integration tests at the base
C. Equal numbers of each type
D. Only widget tests are needed

**M11-BS-2.** In the Arrange-Act-Assert pattern, what happens in the "Act" step?
A. The operation under test is performed (e.g. `toggle()`, `tap`, `enterText`)
B. Test data and environment are prepared
C. The result is verified with `expect()`
D. The widget is disposed

**M11-BS-3.** Which step of AAA uses `expect(...)`?
A. Assert
B. Arrange
C. Act
D. Setup

**M11-BS-4.** Why should integration tests be used sparingly?
A. They are slow and more brittle; prefer unit and widget tests
B. They cannot test navigation
C. They do not compile in release mode
D. They always require a live server

**M11-BS-5.** Why use `Key`s such as `Key('taskTextField')` in widget tests?
A. To locate a specific widget reliably with `find.byKey`, independent of its text
B. To speed up the app in release mode
C. To encrypt the widget's state
D. Because Dart requires a key on every widget

### ĐÁP ÁN M11-BS
1-A · 2-A · 3-A · 4-A · 5-A

**Giải thích các câu dễ sai:**
- **2 vs 3:** **Act** = thực hiện hành động; **Assert** = kiểm bằng `expect()`. Đừng lẫn hai bước cuối.
- **4:** Integration test chậm + giòn → chỉ cho luồng quan trọng; đáy tháp vẫn là unit test.
```

### (Module 12) — chèn sau câu 20, trước "### ĐÁP ÁN M12"

```markdown
### BỔ SUNG M12 (Performance Optimization)

**M12-BS-1.** Flutter targets 60 FPS. How much time is available to render one frame?
A. ~16.6 ms
B. 60 ms
C. 1 second
D. 100 ms

**M12-BS-2.** On a 120 Hz display, the per-frame budget is about:
A. ~8 ms
B. 16.6 ms
C. 120 ms
D. 33 ms

**M12-BS-3.** What is "jank"?
A. Visible stutter caused by frames that miss their rendering deadline
B. A memory leak
C. A compile-time error
D. A category of unit test

**M12-BS-4.** Which build mode should be used to MEASURE performance accurately?
A. Profile mode
B. Debug mode
C. Debug mode with asserts on
D. Any mode gives the same numbers

**M12-BS-5.** Why should you NOT measure performance in Debug mode?
A. Debug adds asserts and overhead, making it artificially slow and unrepresentative
B. Debug mode has no UI
C. Debug mode cannot run the app
D. Debug mode disables the widget tree

**M12-BS-6.** Which command runs the app in profile mode?
A. `flutter run --profile`
B. `flutter build profile`
C. `flutter profile`
D. `flutter run --measure`

**M12-BS-7.** What does marking a static widget `const` help with?
A. Flutter can skip rebuilding it, reducing work and memory
B. It encrypts the widget
C. It converts it to a StatefulWidget
D. It forces a rebuild every frame

**M12-BS-8.** You must sort a list before displaying it. Where should the sort run?
A. Once when the data changes — never inside `build()`
B. Inside `build()` on every rebuild
C. Inside each list item's constructor
D. During the paint phase

**M12-BS-9.** Which key preserves item state across list reordering?
A. `ValueKey(item.id)`
B. `UniqueKey()`
C. `GlobalKey()` on every item
D. No key at all

**M12-BS-10.** Why is `UniqueKey()` a poor choice for list items?
A. It changes on every build, forcing the widget to be recreated each time
B. It is deprecated
C. It only works on iOS
D. It encrypts the item's state

**M12-BS-11.** Which Provider tool rebuilds only when a specific field changes (ideal for lists)?
A. `Selector`
B. `context.watch` at the top of the whole screen
C. `setState` at the root
D. A `GlobalKey`

**M12-BS-12.** How do you reduce cost for a 48px thumbnail?
A. Set `width`/`height` (resize) instead of loading the full-resolution image
B. Always load the 2000px original
C. Decode it inside `build()`
D. Wrap it in a `GlobalKey`

**M12-BS-13.** Which pre-loads an image so it displays instantly later?
A. `precacheImage(AssetImage('x.png'), context)`
B. `Image.preload()`
C. `cacheImage('x.png')`
D. `loadImage('x.png')`

**M12-BS-14.** Which widget shows a placeholder while a NETWORK image loads?
A. `FadeInImage.assetNetwork(placeholder:, image:)`
B. `Image.network` on its own
C. `AssetImage`
D. `RawImage`

**M12-BS-15.** Where should image decoding NOT happen?
A. Inside `build()`
B. In `initState`
C. In a repository
D. Before `runApp`

**M12-BS-16.** Which command produces an app-size breakdown report?
A. `flutter build apk --analyze-size`
B. `flutter size`
C. `flutter build apk --report`
D. `dart analyze --size`

**M12-BS-17.** What does "tree-shaking icons" do?
A. Removes unused Material icon glyphs to shrink app size
B. Removes unused Dart classes only
C. Animates the app icons
D. Compresses PNG assets

**M12-BS-18.** Which is a genuine cause of jank in student apps?
A. Rebuilding the whole screen and rendering a long list inline without `.builder`
B. Using `const` widgets
C. Extracting list items into their own widgets
D. Using `ListView.builder`

**M12-BS-19.** Which DevTools feature highlights areas being repainted?
A. Repaint Rainbow
B. The Memory tab
C. The Network tab
D. The Logging view

**M12-BS-20.** Extracting a list item into its own widget (e.g. `TaskTile`) helps because:
A. Only the changed tile rebuilds; the parent list stays untouched
B. It reduces the app's download size
C. It disables the widget's state
D. It encrypts the UI

**M12-BS-21.** Which build mode is AOT-optimized and used for the store release?
A. Release
B. Debug
C. Profile
D. Test

### ĐÁP ÁN M12-BS
1-A · 2-A · 3-A · 4-A · 5-A · 6-A · 7-A · 8-A · 9-A · 10-A · 11-A · 12-A · 13-A · 14-A · 15-A · 16-A · 17-A · 18-A · 19-A · 20-A · 21-A

**Giải thích các câu dễ sai:**
- **1, 2:** 60 FPS → 16.6ms/frame; 120 FPS → 8ms/frame. Vượt ngân sách = jank.
- **4, 5, 6:** Đo perf ở **Profile** (`flutter run --profile`), KHÔNG ở Debug (Debug chậm giả tạo).
- **8:** Cấm sort/parse/API trong `build()` — chạy lại mỗi rebuild.
- **9, 10:** `ValueKey` giữ state; `UniqueKey()` ép recreate mỗi frame → phản tác dụng.
- **11:** `Selector` rebuild theo field → hẹp hơn `context.watch` (rebuild cả subtree).
- **15:** Không decode ảnh trong `build()` → decode ở `initState`.
- **16, 17:** `--analyze-size` xem breakdown; tree-shaking icons loại glyph Material thừa.
```

---

**Status:** DONE

**Summary:** Đối chiếu xong slide M10/M11/M12 với cả 2 file. Tổng **~11 nhóm gap**: M10 có 5 (JWT structure, access/refresh token, Google Sign-In config+errors, auth-vs-authz, session+splash), M11 có 2 nhỏ (testing pyramid, AAA), M12 có gap performance LỚN (FPS/frame budget, causes, const/extract/heavy-build/keys/Selector, DevTools perf tools + Profile mode, image optimization, --analyze-size + tree-shaking icons, build modes). Notifications và Deployment/Build-Release đã cover đủ → không gap đáng kể. Đã soạn **PHẦN 1** lý thuyết tiếng Việt (Phụ lục A18–A21, đúng style bảng/```dart/**Bẫy đề thi:**) và **PHẦN 2** tổng **40 câu trắc nghiệm** bổ sung (M10-BS 14 câu, M11-BS 5 câu, M12-BS 21 câu) kèm đáp án + giải thích tiếng Việt câu dễ sai. Đã grep tránh trùng với nội dung đã có (3-tree pipeline M4/M5, Selector/watch/read M14, ListView.builder, DevTools jank M11, Firebase Auth codes A10/M10, notifications A1/A16/M13).

**Concerns:** Đáp án đúng đặt ở vị trí A theo convention sẵn có của file (M10/M12/M13 đều key toàn A) để paste liền mạch; nếu muốn chống đoán mò theo vị trí, có thể xáo trộn lại option trước khi dùng thi thật. Câu M12-BS-11 (Selector) giao thoa với M14 nhưng đặt ở góc hiệu năng list nên không trùng lặp nội dung.
