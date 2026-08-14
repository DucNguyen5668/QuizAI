# PRM393 — NGÂN HÀNG CÂU HỎI THEO MODULE

> Cách dùng: làm hết câu hỏi của một module → xem đáp án ở cuối module đó → câu nào sai thì quay lại đọc phần lý thuyết tương ứng trong file `PRM393_On_Thi_Full.md`.
>
> Đề bài tiếng Anh (giống đề thi thật), giải thích tiếng Việt.

**Mục lục**
- [M1 – Flutter Overview & Tooling](#m1)
- [M2 – Dart Essentials](#m2)
- [M3 – Advanced Dart (Async + OOP + Generics)](#m3)
- [M4 – UI Fundamentals & Widget Lifecycle](#m4)
- [M5 – Navigation](#m5)
- [M6 – Layout & Responsive](#m6)
- [M7 – Forms & Validation](#m7)
- [M8 – Networking & JSON](#m8)
- [M9 – Local Storage](#m9)
- [M10 – Authentication](#m10)
- [M11 – Testing & Debugging](#m11)
- [M12 – Build & Release](#m12)
- [M13 – Notifications](#m13)
- [M14 – State Management](#m14)
- [★ PHẦN BỔ SUNG TỪ SLIDE (M1–M12, 128 câu)](#m1-bs)

---

<a name="m1"></a>
# MODULE 1 — FLUTTER OVERVIEW & TOOLING

**1.** How does Flutter render its user interface?
A. It maps Flutter widgets to native platform widgets at runtime
B. It draws every pixel itself using its own graphics engine (Skia/Impeller)
C. It renders HTML/CSS inside an embedded WebView
D. It uses the platform's OpenGL widgets directly

**2.** Which language is used to write Flutter applications?
A. Kotlin  B. JavaScript  C. Dart  D. Swift

**3.** Which layer of Flutter's architecture is written in C/C++?
A. Framework  B. Engine  C. Embedder  D. Material library

**4.** What is the entry point of a Flutter application?
A. `lib/app.dart`  B. `android/MainActivity.java`  C. `lib/main.dart` with `void main()`  D. `pubspec.yaml`

**5.** Which file declares dependencies, assets and fonts?
A. `pubspec.lock`  B. `pubspec.yaml`  C. `analysis_options.yaml`  D. `build.gradle`

**6.** What does the caret syntax `^1.2.0` mean in pubspec.yaml?
A. Exactly version 1.2.0
B. Any version >= 1.2.0 and < 2.0.0
C. Any version >= 1.2.0
D. The latest version always

**7.** What is the purpose of `pubspec.lock`?
A. To list development-only dependencies
B. To record the exact resolved versions of all dependencies
C. To lock the app so it cannot be edited
D. To store API keys

**8.** Where should packages needed only during development (e.g. testing tools) be declared?
A. `dependencies`  B. `dev_dependencies`  C. `dependency_overrides`  D. `flutter:`

**9.** Which statement about Hot Reload is TRUE?
A. It restarts the app from `main()`
B. It preserves the current application state
C. It recompiles native Android/iOS code
D. It works in release mode

**10.** A developer changes the value of a global `static const` variable. Why doesn't Hot Reload show the change?
A. Static variables are stored in native memory
B. Hot Reload does not re-run initializers of global/static variables
C. Hot Reload only reloads widget files
D. Static variables require a full rebuild of the APK

**11.** Which action requires a full rebuild (not just hot restart)?
A. Changing a widget's colour
B. Adding a new widget
C. Adding a new native plugin dependency
D. Renaming a Dart variable

**12.** After adding a new image to `assets/` and declaring it in pubspec.yaml, the image still doesn't appear after Hot Reload. Why?
A. Assets are bundled at build time; the app must be restarted/rebuilt
B. Images must be in `lib/` not `assets/`
C. Flutter caches images for 24 hours
D. `Image.asset` does not support PNG

**13.** Which compilation mode does Dart use in debug builds?
A. AOT  B. JIT  C. Interpreted only  D. Transpiled to JavaScript

**14.** Which compilation mode is used in release builds, and why?
A. JIT, to allow hot reload
B. AOT, for faster startup and better runtime performance
C. JIT, because Dart cannot be compiled ahead of time
D. AOT, to enable the debugger

**15.** In which build mode are `assert()` statements executed?
A. Debug only  B. Release only  C. Profile only  D. All modes

**16.** Which build mode should be used to measure real-world performance on a physical device?
A. Debug  B. Profile  C. Release  D. Test

**17.** Which command checks whether the Flutter development environment is correctly configured?
A. `flutter check`  B. `flutter doctor`  C. `flutter verify`  D. `flutter env`

**18.** Which command downloads the dependencies listed in pubspec.yaml?
A. `flutter install`  B. `flutter pub get`  C. `flutter fetch`  D. `dart restore`

**19.** Which command produces the file format required for publishing to Google Play?
A. `flutter build apk`  B. `flutter build appbundle`  C. `flutter build ipa`  D. `flutter build bundle`

**20.** What does `flutter clean` do?
A. Deletes the source code
B. Removes build artefacts and caches
C. Uninstalls the app from the device
D. Formats all Dart files

**21.** Which tool provides a Widget Inspector, timeline and memory profiler?
A. Android Studio Logcat  B. Flutter DevTools  C. Dart Analyzer  D. Gradle

**22.** What is the main advantage of Flutter's own rendering engine over a bridge-based approach?
A. Smaller app size
B. Consistent UI across platforms and no bridge overhead for UI updates
C. It allows writing code in Java
D. It removes the need for a build step

**23.** Which folder contains `AndroidManifest.xml` in a Flutter project?
A. `lib/`  B. `android/app/src/main/`  C. `assets/`  D. `build/`

**24.** Which file is the iOS equivalent used for permissions and URL schemes?
A. `Podfile`  B. `Info.plist`  C. `AppDelegate.swift`  D. `Runner.xcodeproj`

**25.** What is `flutter run --release` used for?
A. Publishing to the store
B. Running the app with AOT compilation and no debugging tools
C. Running unit tests
D. Generating documentation

**26.** Which command formats Dart source files according to style rules?
A. `dart format .`  B. `flutter lint`  C. `dart tidy`  D. `flutter style`

**27.** A YAML file fails to parse. Which is the most likely cause?
A. Using tabs for indentation instead of spaces
B. Using lowercase keys
C. Missing semicolons
D. Comments starting with `#`

**28.** What does `--split-per-abi` do when building an APK?
A. Splits the app into multiple screens
B. Generates separate APKs for each CPU architecture, reducing size
C. Splits Dart code into libraries
D. Enables multidex

### ĐÁP ÁN M1
1-B · 2-C · 3-B · 4-C · 5-B · 6-B · 7-B · 8-B · 9-B · 10-B · 11-C · 12-A · 13-B · 14-B · 15-A · 16-B · 17-B · 18-B · 19-B · 20-B · 21-B · 22-B · 23-B · 24-B · 25-B · 26-A · 27-A · 28-B

**Giải thích các câu dễ sai:**
- **1, 22:** Flutter tự vẽ pixel bằng Skia/Impeller — đây là điểm khác cốt lõi so với React Native (dùng bridge sang native widget).
- **10:** Hot Reload chỉ nạp lại code hàm và rebuild widget tree; initializer của biến static/global chỉ chạy một lần lúc khởi động → phải Hot Restart.
- **12:** File trong `assets/` được đóng gói vào APK **lúc build**. Đây cũng là lý do file `.env` (flutter_dotenv) phải rebuild mới ăn.
- **13, 14:** JIT khi debug (để hot reload được), AOT khi release (nhanh, khởi động tức thì). Nhớ cặp này.
- **16:** Debug mode chạy chậm bất thường nên không dùng để đo hiệu năng; Release thì không có công cụ đo → Profile là đáp án.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M1) — bấm để mở</b></summary>

**1. Đáp án B** — Flutter tự vẽ từng pixel bằng engine đồ họa riêng (Skia/Impeller) nên UI đồng nhất trên mọi nền tảng, không phụ thuộc widget gốc của OS. ≠ A vì Flutter KHÔNG ánh xạ sang native widget (đó là cách của React Native).

**2. Đáp án C** — Flutter dùng ngôn ngữ Dart (do Google phát triển), có thể biên dịch AOT ra mã máy native. Kotlin/Swift là ngôn ngữ native của Android/iOS.

**3. Đáp án B** — Layer Engine viết bằng C/C++ (chứa Skia/Impeller, Dart runtime). Framework viết bằng Dart, còn Embedder là lớp mã theo từng nền tảng.

**4. Đáp án C** — Điểm khởi đầu là file lib/main.dart với hàm void main() — nơi gọi runApp() để bật UI.

**5. Đáp án B** — pubspec.yaml là nơi khai báo dependencies, assets và fonts. ≠ pubspec.lock chỉ ghi lại phiên bản đã khóa.

**6. Đáp án B** — ^1.2.0 (caret) nghĩa là >=1.2.0 và <2.0.0 — cho cập nhật minor/patch nhưng giữ nguyên major theo semver để tránh breaking change.

**7. Đáp án B** — pubspec.lock ghi lại chính xác phiên bản đã resolve của mọi dependency, đảm bảo build tái lập được giống nhau ở mọi máy.

**8. Đáp án B** — Gói chỉ dùng khi phát triển (test, lint, code-gen) khai báo trong dev_dependencies để không bị đóng gói vào bản release.

**9. Đáp án B** — Hot Reload nạp lại code UI nhưng GIỮ NGUYÊN state hiện tại của app. ≠ A vì đó là Hot Restart (khởi động lại từ main, mất state).

**10. Đáp án B** — Hot Reload không chạy lại initializer của biến global/static, nên giá trị mới không được áp dụng; phải hot restart mới thấy thay đổi.

**11. Đáp án C** — Thêm plugin native mới làm thay đổi mã nền tảng (Android/iOS), nên phải build lại toàn bộ; hot reload/restart không đủ.

**12. Đáp án A** — Assets được đóng gói (bundle) tại thời điểm build, nên thêm ảnh mới cần restart/rebuild để gói lại bundle rồi ảnh mới xuất hiện.

**13. Đáp án B** — Bản debug dùng JIT (biên dịch lúc chạy) để hỗ trợ tính năng hot reload nạp code nhanh.

**14. Đáp án B** — Bản release dùng AOT (biên dịch trước ra mã máy native) cho khởi động nhanh và hiệu năng runtime tốt hơn.

**15. Đáp án A** — Lệnh assert() chỉ được thực thi ở chế độ Debug; profile và release đều loại bỏ để không ảnh hưởng hiệu năng.

**16. Đáp án B** — Đo hiệu năng thực tế phải dùng Profile mode: đã biên dịch AOT gần giống release nhưng vẫn giữ công cụ profiling. ≠ Debug (JIT chậm, sai lệch), ≠ Release (thiếu công cụ đo).

**17. Đáp án B** — flutter doctor kiểm tra môi trường phát triển (SDK, Android toolchain, thiết bị...) đã cấu hình đúng chưa.

**18. Đáp án B** — flutter pub get tải về các dependencies được liệt kê trong pubspec.yaml.

**19. Đáp án B** — flutter build appbundle tạo file .aab — định dạng bắt buộc để publish lên Google Play. ≠ apk (dùng để cài trực tiếp/test).

**20. Đáp án B** — flutter clean xóa các artefact build và cache (thư mục build/, .dart_tool) để build lại sạch.

**21. Đáp án B** — Flutter DevTools cung cấp Widget Inspector, timeline và memory profiler để phân tích UI và hiệu năng.

**22. Đáp án B** — Vì tự render, Flutter cho UI đồng nhất trên mọi nền tảng và không tốn overhead của 'bridge' mỗi lần cập nhật UI như kiến trúc cầu nối.

**23. Đáp án B** — AndroidManifest.xml nằm trong thư mục android/app/src/main/ của dự án Flutter.

**24. Đáp án B** — Info.plist là file phía iOS dùng khai báo quyền (permissions) và URL schemes, tương đương vai trò manifest.

**25. Đáp án B** — flutter run --release chạy app với biên dịch AOT và không kèm công cụ debug, để trải nghiệm gần với bản phát hành.

**26. Đáp án A** — dart format . định dạng lại mã nguồn Dart theo quy tắc style chuẩn của ngôn ngữ.

**27. Đáp án A** — YAML không cho dùng dấu tab để thụt lề — chỉ chấp nhận dấu cách; dùng tab sẽ gây lỗi parse.

**28. Đáp án B** — --split-per-abi tạo các APK riêng cho từng kiến trúc CPU (arm64, armeabi...), giúp giảm dung lượng mỗi APK vì mỗi máy chỉ tải phần phù hợp.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m2"></a>
# MODULE 2 — DART ESSENTIALS

**1.** Which statement causes a compile-time error?
A. `final now = DateTime.now();`
B. `const pi = 3.14;`
C. `const now = DateTime.now();`
D. `var x = 10;`

**2.** What is the key difference between `final` and `const`?
A. `final` is for numbers, `const` for strings
B. `final` is set once at runtime; `const` must be known at compile time
C. `const` variables can be reassigned
D. There is no difference

**3.** Given `final list = [1, 2, 3];`, which operation is allowed?
A. `list = [4, 5];`  B. `list.add(4);`  C. Both  D. Neither

**4.** What does the `late` keyword indicate?
A. The variable is nullable
B. The variable will be initialised before it is first used
C. The variable is initialised on a background thread
D. The variable is deprecated

**5.** Which operator safely accesses a member only if the object is not null?
A. `!`  B. `??`  C. `?.`  D. `??=`

**6.** What does `a ?? b` return?
A. `a` if `a` is not null, otherwise `b`
B. `b` always
C. `true` if both are null
D. `a` if `a` is true

**7.** What does the `!` (bang) operator do?
A. Logical NOT on a nullable value
B. Asserts a nullable expression is non-null, throwing at runtime if it is null
C. Converts a value to boolean
D. Marks a variable as required

**8.** Which type is the parent of both `int` and `double`?
A. `Object`  B. `num`  C. `Number`  D. `dynamic`

**9.** What is the difference between `dynamic` and `Object`?
A. `dynamic` disables static type checking; `Object` keeps it
B. `Object` can hold null, `dynamic` cannot
C. They are identical
D. `dynamic` is faster at runtime

**10.** In Dart, which of the following is NOT an object?
A. `int`  B. `bool`  C. A function  D. All of them are objects

**11.** Which parameter type is optional by default?
A. Positional parameters  B. Named parameters  C. Both  D. Neither

**12.** How do you make a named parameter mandatory?
A. Prefix it with `final`
B. Add the `required` keyword
C. Give it no default value
D. Wrap it in square brackets

**13.** What does `nums.map((n) => n * 2)` return?
A. A `List<int>`  B. A lazy `Iterable<int>`  C. A `Set<int>`  D. `void`

**14.** Which method filters elements matching a condition?
A. `map()`  B. `where()`  C. `fold()`  D. `expand()`

**15.** What is the difference between `reduce()` and `fold()`?
A. `fold()` takes an initial value; `reduce()` does not
B. `reduce()` works only on numbers
C. `fold()` returns void
D. They are identical

**16.** What does the cascade operator `..` return?
A. The result of the last method call
B. The original object
C. `void`
D. A copy of the object

**17.** Which is a valid named constructor?
A. `Person.guest() : name = 'Guest';`
B. `named Person.guest();`
C. `constructor guest();`
D. `Person::guest();`

**18.** What is a `factory` constructor used for?
A. To always create a brand-new instance
B. To return an existing instance, a cached object, or a subtype
C. To create static methods
D. To define abstract classes

**19.** Which keyword allows a class to reuse code from multiple classes?
A. `extends`  B. `implements`  C. `with` (mixin)  D. `import`

**20.** What must a class do when it uses `implements`?
A. Nothing extra
B. Implement all members of the interface
C. Call `super()` in its constructor
D. Be abstract

**21.** How many classes can a Dart class `extends`?
A. Exactly one  B. Up to two  C. Unlimited  D. None

**22.** Which is TRUE about abstract classes?
A. They can be instantiated directly
B. They may contain methods without implementations
C. They cannot have constructors
D. They cannot be extended

**23.** What does `Person(this.name, this.age);` do?
A. Declares two fields
B. Assigns constructor parameters directly to instance fields
C. Creates a factory
D. Overrides toString()

**24.** Which annotation marks a method that replaces a parent method?
A. `@required`  B. `@override`  C. `@deprecated`  D. `@immutable`

**25.** What does this print?
```dart
var l = [1, 2, 3];
print([0, ...l, 4]);
```
A. `[0, [1,2,3], 4]`  B. `[0, 1, 2, 3, 4]`  C. Compile error  D. `[0, 4]`

**26.** Which is the correct syntax for a collection-if?
A. `[if (x) 1, 2]`  B. `[x ? 1 : null, 2]`  C. `[if x then 1, 2]`  D. `[when (x) 1, 2]`

**27.** What does `int.tryParse("abc")` return?
A. `0`  B. `null`  C. Throws `FormatException`  D. `-1`

**28.** What is the result of `identical(a, b)` compared with `a == b`?
A. `identical` checks reference equality; `==` checks value equality (if overridden)
B. They are the same
C. `identical` is for strings only
D. `==` checks reference equality only

**29.** Which is a valid getter declaration?
A. `int get age => _age;`
B. `get int age { return _age; }`
C. `int age get() => _age;`
D. `getter age => _age;`

**30.** Which loop syntax is valid in Dart for iterating a List?
A. `for (var item in list) {}`
B. `foreach (item in list) {}`
C. `for item in list:`
D. `loop (list) {}`

**31.** What is a `Set` in Dart?
A. An ordered collection allowing duplicates
B. An unordered collection of unique items
C. A key-value collection
D. An immutable list

**32.** What is the output?
```dart
String? s;
print(s?.length ?? -1);
```
A. `null`  B. `0`  C. `-1`  D. Runtime error

**33.** Which statement about `String` in Dart is TRUE?
A. Strings are mutable
B. Strings are immutable; operations return new strings
C. Strings must use double quotes only
D. String interpolation is not supported

**34.** What does `'Hello $name, you are ${age + 1}'` demonstrate?
A. Concatenation  B. String interpolation  C. Raw strings  D. Templates

**35.** What is the purpose of the `r` prefix in `r'\d{10}'`?
A. Marks the string as a regular expression
B. Makes it a raw string so backslashes are not treated as escapes
C. Makes the string read-only
D. Reverses the string

### ĐÁP ÁN M2
1-C · 2-B · 3-B · 4-B · 5-C · 6-A · 7-B · 8-B · 9-A · 10-D · 11-B · 12-B · 13-B · 14-B · 15-A · 16-B · 17-A · 18-B · 19-C · 20-B · 21-A · 22-B · 23-B · 24-B · 25-B · 26-A · 27-B · 28-A · 29-A · 30-A · 31-B · 32-C · 33-B · 34-B · 35-B

**Giải thích các câu dễ sai:**
- **1:** `DateTime.now()` chỉ biết lúc chạy → không thể là `const`. Đây là câu kinh điển.
- **3:** `final` khoá **tham chiếu**, không khoá nội dung. Muốn bất biến hoàn toàn phải `const [1,2,3]`.
- **10:** Trong Dart **mọi thứ đều là object**, kể cả hàm và `null`.
- **13:** `map`/`where` trả **Iterable lazy** — chưa tính toán gì cho tới khi bị duyệt. Quên `.toList()` là lỗi rất hay gặp.
- **18:** `factory` khác constructor thường ở chỗ **không bắt buộc tạo instance mới** — dùng cho singleton, cache, hoặc `fromJson`.
- **32:** `s` null → `s?.length` cho `null` → `?? -1` trả `-1`.
- **35:** Thiếu `r` thì `\d` bị Dart hiểu là escape sequence → regex sai.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M2) — bấm để mở</b></summary>

**1. Đáp án C** — const cần giá trị biết được lúc biên dịch, nhưng DateTime.now() chỉ có lúc chạy, nên 'const now = DateTime.now()' gây lỗi compile-time. ≠ A vì final chấp nhận giá trị tính lúc runtime.

**2. Đáp án B** — final gán đúng một lần và giá trị có thể xác định lúc runtime; const là hằng thật sự, phải biết giá trị ngay tại compile-time.

**3. Đáp án B** — final chỉ khóa việc gán lại tham chiếu, không khóa nội dung; nên list.add(4) hợp lệ, còn gán lại list = [4,5] thì bị cấm.

**4. Đáp án B** — late báo rằng biến sẽ được khởi tạo trước khi dùng lần đầu (khởi tạo trễ), giúp khai báo non-nullable mà chưa gán giá trị ngay.

**5. Đáp án C** — Toán tử ?. truy cập member một cách an toàn: trả về null nếu đối tượng là null thay vì ném lỗi.

**6. Đáp án A** — a ?? b (null-coalescing) trả về a nếu a khác null, ngược lại trả về b.

**7. Đáp án B** — ! (null assertion / bang) khẳng định biểu thức nullable là non-null, ném lỗi lúc chạy nếu nó thực sự null. ≠ A vì NOT logic là toán tử trên bool.

**8. Đáp án B** — num là lớp cha chung của cả int và double trong Dart.

**9. Đáp án A** — dynamic tắt kiểm tra kiểu tĩnh (cho gọi bất kỳ member, dời lỗi sang runtime); còn Object vẫn giữ kiểm tra kiểu lúc biên dịch.

**10. Đáp án D** — Trong Dart mọi thứ đều là object — kể cả int, bool và function đều là object — nên đáp án đúng là 'tất cả đều là object'.

**11. Đáp án B** — Tham số named là optional theo mặc định (trừ khi thêm required); còn positional thì bắt buộc trừ khi được bọc trong dấu ngoặc vuông.

**12. Đáp án B** — Thêm từ khóa required trước tham số named để bắt buộc bên gọi phải truyền giá trị.

**13. Đáp án B** — map() trả về một Iterable lười (lazy) — chỉ tính toán khi được duyệt, chưa tạo List ngay; muốn ra List phải gọi .toList().

**14. Đáp án B** — where() lọc và giữ lại các phần tử thỏa điều kiện. ≠ map() (biến đổi từng phần tử chứ không lọc).

**15. Đáp án A** — fold() nhận một giá trị khởi tạo và cho phép kết quả có kiểu khác; reduce() không có giá trị khởi tạo và trả về cùng kiểu phần tử.

**16. Đáp án B** — Cascade (..) trả về chính đối tượng gốc (không phải kết quả lời gọi), nên tiện để thực hiện chuỗi thao tác trên cùng một object.

**17. Đáp án A** — Named constructor hợp lệ có dạng ClassName.tên với initializer list: Person.guest() : name = 'Guest';

**18. Đáp án B** — factory không bắt buộc tạo instance mới: có thể trả về instance đã cache, một singleton, hoặc một đối tượng thuộc subtype.

**19. Đáp án C** — with (mixin) cho phép một lớp tái sử dụng code từ nhiều lớp/mixin. ≠ extends (chỉ kế thừa được đúng một lớp).

**20. Đáp án B** — Khi dùng implements, lớp phải tự hiện thực toàn bộ member của interface đó (không kế thừa phần thân sẵn có).

**21. Đáp án A** — Dart chỉ cho extends đúng một lớp (đơn kế thừa); muốn dùng nhiều lớp thì dùng mixin (with).

**22. Đáp án B** — Lớp abstract có thể chứa method chưa có phần thân (chỉ khai báo) và không thể khởi tạo trực tiếp bằng new.

**23. Đáp án B** — Person(this.name, this.age); là cú pháp rút gọn, gán trực tiếp tham số của constructor vào field cùng tên.

**24. Đáp án B** — @override đánh dấu một method đang ghi đè (thay thế) method cùng tên của lớp cha.

**25. Đáp án B** — Toán tử spread (...) trải các phần tử của l vào bên trong literal, nên kết quả là [0, 1, 2, 3, 4] chứ không phải list lồng nhau.

**26. Đáp án A** — Collection-if hợp lệ có dạng [if (x) 1, 2] — chèn phần tử vào literal một cách có điều kiện.

**27. Đáp án B** — int.tryParse('abc') trả về null khi không parse được (an toàn). ≠ int.parse (ném FormatException khi lỗi).

**28. Đáp án A** — identical(a, b) so sánh tham chiếu (có phải cùng một object không); còn == so sánh giá trị nếu lớp có override toán tử ==.

**29. Đáp án A** — Getter hợp lệ có dạng: int get age => _age; (kiểu trả về, từ khóa get, tên, rồi thân).

**30. Đáp án A** — Vòng lặp for-in hợp lệ trong Dart: for (var item in list) {}.

**31. Đáp án B** — Set là tập hợp không có thứ tự và chứa các phần tử duy nhất (không trùng lặp).

**32. Đáp án C** — s là null nên s?.length trả về null, rồi ?? -1 thay null bằng -1, nên in ra -1.

**33. Đáp án B** — String trong Dart là bất biến (immutable); mọi thao tác biến đổi đều trả về một chuỗi mới chứ không sửa chuỗi gốc.

**34. Đáp án B** — Cú pháp '... $name ... ${age + 1}' minh họa string interpolation (nội suy chuỗi): chèn biến bằng $ và biểu thức bằng ${ }.

**35. Đáp án B** — Tiền tố r tạo raw string, khiến ký tự gạch chéo ngược không bị coi là ký tự escape — rất tiện khi viết regex.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m3"></a>
# MODULE 3 — ADVANCED DART (ASYNC + OOP + GENERICS)

**1.** How many threads does a Dart isolate use to execute Dart code?
A. One  B. Two  C. One per CPU core  D. Unlimited

**2.** Which queue has higher priority in Dart's event loop?
A. Event queue  B. Microtask queue  C. They are equal  D. Timer queue

**3.** What is the output?
```dart
print('A');
Future(() => print('B'));
Future.microtask(() => print('C'));
print('D');
```
A. A B C D  B. A D C B  C. A D B C  D. A B D C

**4.** What is the output?
```dart
void main() {
  print(1);
  Future.value(2).then(print);
  scheduleMicrotask(() => print(3));
  Future.delayed(Duration.zero, () => print(4));
  print(5);
}
```
A. 1 5 2 3 4  B. 1 2 3 4 5  C. 1 5 3 2 4  D. 1 5 4 2 3

**5.** How do you achieve true parallelism in Dart?
A. Use `async`/`await`
B. Use `Isolate.spawn()` or `compute()`
C. Use `Future.wait()`
D. Use `Stream.broadcast()`

**6.** How do isolates communicate?
A. Shared memory
B. Message passing via SendPort/ReceivePort
C. Global variables
D. SharedPreferences

**7.** A `Future` represents:
A. Multiple values delivered over time
B. A single value available at some point in the future
C. A background thread
D. A callback queue

**8.** What does a function marked `async` always return?
A. `void`  B. The declared type directly  C. A `Future` of the declared type  D. A `Stream`

**9.** Where can `await` be used?
A. Anywhere  B. Only inside a function marked `async`  C. Only in `main()`  D. Only inside `then()`

**10.** What is wrong with this code?
```dart
void loadData() {
  final data = await fetchData();
}
```
A. `fetchData` must be a Stream
B. `loadData` must be marked `async`
C. `final` should be `var`
D. Nothing is wrong

**11.** Which runs the two futures in parallel?
A. `await f1(); await f2();`
B. `await Future.wait([f1(), f2()]);`
C. `f1().then((_) => f2());`
D. `await f1().then(f2);`

**12.** What does `Future.any([f1, f2])` do?
A. Waits for all futures
B. Completes with the result of the first future to complete
C. Cancels all futures
D. Runs them sequentially

**13.** Which method handles errors when using the `then()` style?
A. `finally()`  B. `catchError()`  C. `rescue()`  D. `onError:` only

**14.** Which block always runs regardless of success or failure?
A. `catch`  B. `finally`  C. `then`  D. `onDone`

**15.** What is the equivalent of `finally` in the `then()` chain?
A. `always()`  B. `whenComplete()`  C. `onDone()`  D. `cleanup()`

**16.** A `Stream` differs from a `Future` because it:
A. Runs on another thread
B. Can emit zero or many values over time
C. Cannot fail
D. Is synchronous

**17.** Which keywords declare an asynchronous generator?
A. `async` + `return`  B. `async*` + `yield`  C. `sync*` + `await`  D. `stream` + `emit`

**18.** How many listeners can a default (single-subscription) Stream have?
A. Unlimited  B. Exactly one  C. Two  D. Zero

**19.** What happens if you listen to a single-subscription Stream twice?
A. Both listeners receive data
B. A `StateError` is thrown
C. The first listener is cancelled
D. Data is duplicated

**20.** What happens to events added to a broadcast StreamController when there are no listeners?
A. They are buffered until a listener appears
B. They are lost
C. An exception is thrown
D. They are stored in memory permanently

**21.** How do you create a stream that supports multiple listeners?
A. `StreamController()`  B. `StreamController.broadcast()`  C. `Stream.multi()`  D. `Stream.shared()`

**22.** Which must be called in `dispose()` to avoid a memory leak?
A. `stream.close()` only
B. `subscription.cancel()` and `controller.close()`
C. `setState()`
D. `Future.wait()`

**23.** What does `await for` do?
A. Waits for a Future
B. Iterates over the values of a Stream asynchronously
C. Creates a loop of Futures
D. Blocks the UI thread

**24.** Which Stream method transforms each event asynchronously?
A. `map()`  B. `asyncMap()`  C. `expand()`  D. `where()`

**25.** What does `distinct()` do on a Stream?
A. Removes all duplicates in the whole stream
B. Skips events equal to the previous event
C. Sorts events
D. Emits only the first event

**26.** What is a `Completer` used for?
A. Completing a widget build
B. Manually creating and completing a Future
C. Closing a Stream
D. Handling errors

**27.** Which correctly limits concurrent API calls to a maximum of 3?
A. `Future.wait(futures, maxConcurrency: 3)`
B. Use the `pool` package or a custom semaphore built with Completers
C. `http.Client(maxConnections: 3)`
D. `Isolate.run(concurrencyLimit: 3)`

**28.** What does `.timeout(Duration(seconds: 5))` do to a Future?
A. Delays it by 5 seconds
B. Throws `TimeoutException` if it does not complete within 5 seconds
C. Retries it after 5 seconds
D. Cancels the HTTP socket

**29.** In `Future.delayed(Duration(seconds: 2), () => 'x')`, when does the callback run?
A. Immediately
B. After the delay, via the event queue
C. On a separate thread
D. Only when awaited

**30.** What problem does the Repository Pattern solve?
A. It speeds up rendering
B. It separates data sources from the UI, making code testable and swappable
C. It replaces state management
D. It handles navigation

**31.** Why is calling `http.get()` directly inside a widget considered bad practice?
A. It is slower
B. It couples UI to the data source and makes unit testing/mocking difficult
C. It causes compile errors
D. It is not allowed by Flutter

**32.** What does this print?
```dart
Future<int> f() async => 1;
void main() async {
  print(f());
  print(await f());
}
```
A. `1` then `1`
B. `Instance of 'Future<int>'` then `1`
C. `1` then `Instance of 'Future<int>'`
D. Compile error

**33.** Which is TRUE about `async`/`await` versus `then()`?
A. `await` blocks the UI thread; `then()` does not
B. They are functionally equivalent; `await` is syntactic sugar that improves readability
C. `then()` cannot handle errors
D. `await` runs code on another isolate

**34.** What happens to an unhandled error inside a Future?
A. It is silently ignored
B. It becomes an unhandled asynchronous exception and may crash/log
C. It is converted to null
D. The Future never completes

**35.** Which is the correct way to run heavy computation without freezing the UI?
A. Wrap it in `async`
B. Use `compute()` or `Isolate.spawn()`
C. Use `Future.delayed()`
D. Use `setState()`

### ĐÁP ÁN M3
1-A · 2-B · 3-B · 4-C · 5-B · 6-B · 7-B · 8-C · 9-B · 10-B · 11-B · 12-B · 13-B · 14-B · 15-B · 16-B · 17-B · 18-B · 19-B · 20-B · 21-B · 22-B · 23-B · 24-B · 25-B · 26-B · 27-B · 28-B · 29-B · 30-B · 31-B · 32-B · 33-B · 34-B · 35-B

**Giải thích các câu dễ sai:**
- **3:** Đồng bộ chạy trước (A, D), rồi **microtask** (C), cuối cùng **event** (B) → A D C B.
- **4:** `1`, `5` đồng bộ. Sau đó microtask theo thứ tự đăng ký: `.then` của `Future.value` đăng ký trước `scheduleMicrotask`... nhưng `Future.value(2).then` được lên lịch **sau** khi Future value hoàn thành, thực tế thứ tự microtask là `3` rồi `2` trong trường hợp này vì `scheduleMicrotask` đưa thẳng vào hàng đợi còn `.then` phải qua một bước. Kết quả: 1 5 3 2 4. *(Câu này khó — nếu gặp dạng này trong đề, nguyên tắc an toàn: đồng bộ → microtask → event.)*
- **5, 35:** `async/await` **không** tạo luồng mới, chỉ nhường quyền cho event loop. Tính toán nặng vẫn treo UI → phải dùng isolate.
- **8:** Hàm `async` trả `Future<T>` kể cả khi `return 1`.
- **11:** Hai `await` liên tiếp là **tuần tự**, tổng thời gian cộng dồn.
- **20:** Đây là khác biệt lớn nhất giữa broadcast và single-subscription: broadcast **không buffer**.
- **27:** `Future.wait` không có tham số giới hạn — bẫy rất hay gặp.
- **32:** In một Future chưa await sẽ ra `Instance of 'Future<int>'`.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M3) — bấm để mở</b></summary>

**1. Đáp án A** — Mỗi isolate chỉ có **1 thread duy nhất** chạy code Dart → không có race condition, không cần lock/mutex. Muốn chạy song song thật thì phải tạo isolate mới. Đây là lý do code nặng làm đơ UI: nó chiếm luôn thread duy nhất của isolate chính.

**2. Đáp án B** — Event loop luôn **vét sạch microtask queue trước**, rồi mới lấy 1 event từ event queue. `scheduleMicrotask`/`Future.microtask` vào microtask queue; `Future()`, `Future.delayed`, I/O, timer vào event queue. Không có 'timer queue' riêng trong mô hình này.

**3. Đáp án B** — Code đồng bộ chạy trước: in `A`, rồi `D`. Sau đó event loop ưu tiên microtask → `C`. Cuối cùng mới tới event queue → `B`. Vậy thứ tự là **A D C B**. Bẫy ở đây: `Future(() => ...)` KHÔNG chạy ngay mà xếp vào event queue.

**4. Đáp án C** — Đồng bộ trước: `1`, `5`. Rồi microtask queue: `scheduleMicrotask(3)` và `Future.value(2).then(...)` — cả hai đều là microtask, nhưng `.then` của `Future.value` được đăng ký SAU khi `scheduleMicrotask` chạy? Không — thứ tự đăng ký là `.then(print)` trước, `scheduleMicrotask` sau, nhưng `Future.value(2)` phải hoàn tất qua 1 microtask rồi mới lên lịch `.then` → nên `3` in trước `2`. Cuối cùng `Future.delayed(Duration.zero)` ở event queue → `4`. Kết quả **1 5 3 2 4**.

**5. Đáp án B** — `async`/`await` chỉ là **bất đồng bộ trên 1 thread** (không song song). Muốn song song thật (dùng nhiều CPU core) phải dùng `Isolate.spawn()` hoặc helper `compute()`. `Future.wait` chỉ chờ nhiều future cùng lúc chứ vẫn 1 thread.

**6. Đáp án B** — Isolate **không chia sẻ bộ nhớ** — mỗi isolate có heap riêng. Chúng chỉ trao đổi qua **message passing** bằng `SendPort`/`ReceivePort` (dữ liệu được copy). Chính vì không share memory nên Dart không cần lock.

**7. Đáp án B** — `Future` = **một giá trị duy nhất** sẽ có trong tương lai (hoặc lỗi). Nhiều giá trị theo thời gian là `Stream`. Future không phải thread — nó chỉ là 'phiếu hẹn' kết quả.

**8. Đáp án C** — Hàm `async` **luôn trả về `Future<T>`**, kể cả khi bạn `return 1` thì kiểu thực tế là `Future<int>`. Nếu khai báo `void` thì thành `Future<void>`. Đây là lý do quên `await` sẽ in ra `Instance of 'Future<int>'`.

**9. Đáp án B** — `await` chỉ hợp lệ **bên trong hàm đánh dấu `async`** (hoặc `async*`). Dùng ở nơi khác là lỗi biên dịch. Từ Dart 2.x, top-level `main()` cũng phải khai báo `async` mới await được.

**10. Đáp án B** — Có `await` mà hàm `loadData()` không khai báo `async` → **lỗi biên dịch**. Sửa: `void loadData() async { ... }`. Đây là lỗi hay gặp nhất khi mới học async.

**11. Đáp án B** — `await f1(); await f2();` là **tuần tự** (tổng thời gian = t1 + t2). `Future.wait([f1(), f2()])` khởi động cả hai rồi mới chờ → **song song về mặt chờ đợi** (tổng ≈ max(t1,t2)). Đây là mẹo tối ưu tốc độ tải dữ liệu nhiều API.

**12. Đáp án B** — `Future.any` hoàn tất với **kết quả của future ĐẦU TIÊN xong** (race). Còn `Future.wait` mới là chờ tất cả. `Future.any` hay dùng cho pattern 'lấy nguồn nào phản hồi nhanh nhất' hoặc kết hợp timeout.

**13. Đáp án B** — Kiểu `.then()` bắt lỗi bằng **`.catchError()`**. Dart không có `.finally()` hay `.rescue()`. (`onError:` là tham số phụ của `then`, không phải phương thức đứng riêng nên không phải đáp án đủ.)

**14. Đáp án B** — `finally` **luôn chạy** dù thành công hay ném lỗi — dùng để dọn dẹp (đóng file, tắt loading spinner). `catch` chỉ chạy khi có lỗi; `then` chỉ chạy khi thành công.

**15. Đáp án B** — Trong chuỗi `.then()`, tương đương `finally` là **`.whenComplete()`** — luôn chạy dù future thành công hay lỗi. `onDone` là của `Stream`, không phải `Future`.

**16. Đáp án B** — Điểm khác cốt lõi: `Future` = **1 giá trị**, `Stream` = **0, 1 hoặc nhiều giá trị theo thời gian**. Stream vẫn chạy trên cùng thread và vẫn có thể lỗi (`onError`).

**17. Đáp án B** — Async generator dùng **`async*` + `yield`** (trả `Stream`). Đối chiếu: `sync*` + `yield` trả `Iterable`; `async` + `return` trả `Future`. Nhớ cặp: async* ↔ Stream, sync* ↔ Iterable.

**18. Đáp án B** — Stream mặc định là **single-subscription** → chỉ **đúng 1 listener**. Muốn nhiều listener phải dùng `.broadcast()`. Đây là nguồn gốc lỗi 'Stream has already been listened to'.

**19. Đáp án B** — Listen lần thứ hai vào single-subscription stream sẽ ném **`StateError`** ('Stream has already been listened to'). Fix: dùng `StreamController.broadcast()` hoặc `stream.asBroadcastStream()`.

**20. Đáp án B** — Broadcast stream **không buffer** — event phát ra khi chưa có listener nào thì **mất luôn**. Ngược lại single-subscription stream có buffer chờ listener đầu tiên. Đây là bẫy hay gặp khi add data trước khi widget kịp listen.

**21. Đáp án B** — Dùng **`StreamController.broadcast()`**. `StreamController()` thường chỉ cho 1 listener. `Stream.multi()`/`Stream.shared()` không phải API đúng ở đây.

**22. Đáp án B** — Trong `dispose()` phải **`subscription.cancel()` VÀ `controller.close()`**. Quên cancel → listener vẫn giữ tham chiếu tới State đã bị hủy → memory leak + lỗi `setState() called after dispose()`.

**23. Đáp án B** — `await for (final x in stream)` **lặp qua từng giá trị của Stream một cách bất đồng bộ**, tạm dừng tại mỗi vòng lặp cho tới khi có event kế tiếp. Nó KHÔNG block UI vì đang ở trong hàm async.

**24. Đáp án B** — `map()` biến đổi **đồng bộ**; **`asyncMap()`** cho phép callback trả về `Future` và chờ nó xong trước khi phát event kế tiếp — dùng khi mỗi item cần gọi API.

**25. Đáp án B** — `distinct()` chỉ **bỏ qua event bằng với event LIỀN TRƯỚC** (so sánh với phần tử trước đó), không phải khử trùng toàn bộ stream. Chuỗi 1,1,2,1 → 1,2,1.

**26. Đáp án B** — `Completer` cho phép **tự tay tạo một Future và quyết định khi nào nó hoàn tất** (`complete()` / `completeError()`). Dùng khi bắc cầu callback-based API sang Future, hoặc xây semaphore.

**27. Đáp án B** — `Future.wait` không có tham số `maxConcurrency`. Muốn giới hạn số request đồng thời phải dùng **package `pool`** hoặc tự viết semaphore bằng `Completer`. Các lựa chọn còn lại là API không tồn tại.

**28. Đáp án B** — `.timeout(d)` ném **`TimeoutException`** nếu Future chưa xong trong khoảng thời gian đó. Lưu ý: nó KHÔNG thực sự hủy công việc bên dưới (socket vẫn có thể chạy tiếp), chỉ là future kết thúc bằng lỗi.

**29. Đáp án B** — Callback của `Future.delayed` được đưa vào **event queue sau khi hết delay**, rồi event loop mới gọi. Nên nó không chạy ngay, cũng không chạy trên thread khác. Với `Duration.zero` thì vẫn xếp sau toàn bộ microtask.

**30. Đáp án B** — Repository Pattern **tách nguồn dữ liệu khỏi UI**: UI gọi `repository.getUsers()` mà không biết dữ liệu đến từ API, cache hay DB. Nhờ đó dễ đổi nguồn và dễ mock khi viết unit test.

**31. Đáp án B** — Gọi `http.get()` thẳng trong widget khiến **UI dính chặt vào tầng dữ liệu**: không thể mock để test, không tái sử dụng, khó đổi nguồn. Nó vẫn chạy được (không lỗi biên dịch) — chỉ là kiến trúc tồi.

**32. Đáp án B** — `print(f())` in **`Instance of 'Future<int>'`** vì chưa await (giá trị chưa có). `print(await f())` mới in `1`. Đây chính là triệu chứng kinh điển của việc quên `await`.

**33. Đáp án B** — `await` **không block UI thread** — nó nhả quyền điều khiển về event loop. `async/await` và `.then()` tương đương về chức năng; `await` chỉ là **cú pháp đường (syntactic sugar)** giúp code dễ đọc, chạy tuần tự trực quan.

**34. Đáp án B** — Lỗi không bắt trong Future trở thành **unhandled asynchronous exception** — bị log ra console, có thể crash app (đặc biệt trong zone/isolate). Nó KHÔNG bị bỏ qua âm thầm và cũng không thành null.

**35. Đáp án B** — Tính toán nặng phải chuyển sang isolate khác bằng **`compute()`** (helper đơn giản) hoặc **`Isolate.spawn()`**. Bọc `async` vô ích vì vẫn chạy trên isolate chính; `Future.delayed` chỉ trì hoãn chứ vẫn làm đơ UI.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m4"></a>
# MODULE 4 — UI FUNDAMENTALS & WIDGET LIFECYCLE

**1.** In Flutter, a Widget is best described as:
A. A mutable object that is repainted directly
B. An immutable description of part of the user interface
C. A native platform view
D. A rendering canvas

**2.** Which three trees does Flutter maintain?
A. Widget, Element, RenderObject
B. Widget, State, Layout
C. View, Controller, Model
D. Widget, Layer, Canvas

**3.** Which tree actually holds the State objects and persists across rebuilds?
A. Widget tree  B. Element tree  C. RenderObject tree  D. Layer tree

**4.** Why is rebuilding widgets considered cheap in Flutter?
A. Widgets are cached on disk
B. Widgets are lightweight configuration objects; Flutter only updates the Elements/RenderObjects that actually changed
C. Rebuilds happen on a background isolate
D. Flutter skips the build phase in release mode

**5.** When should you use a StatelessWidget?
A. When the widget needs to change its own data over time
B. When the widget's appearance depends only on its configuration
C. When you need `initState()`
D. Never; StatefulWidget is always better

**6.** Which method must a StatefulWidget implement?
A. `build()`  B. `createState()`  C. `initState()`  D. `setState()`

**7.** What is the correct order of the State lifecycle?
A. `initState` → `createState` → `build` → `dispose`
B. `createState` → `initState` → `didChangeDependencies` → `build` → `dispose`
C. `build` → `initState` → `dispose`
D. `createState` → `build` → `initState` → `dispose`

**8.** How many times is `initState()` called during a State's lifetime?
A. Once  B. On every rebuild  C. Once per frame  D. Whenever setState is called

**9.** Which method is called when an InheritedWidget the State depends on changes?
A. `initState()`  B. `didChangeDependencies()`  C. `didUpdateWidget()`  D. `deactivate()`

**10.** Which method is called when the parent rebuilds this widget with new configuration?
A. `didUpdateWidget(oldWidget)`  B. `initState()`  C. `reassemble()`  D. `didChangeDependencies()`

**11.** Why should you NOT call `Theme.of(context)` inside `initState()`?
A. `context` does not exist yet
B. The widget is not yet registered as a dependent of the InheritedWidget; use `didChangeDependencies()`
C. It causes a memory leak
D. It is allowed and preferred

**12.** What must be released in `dispose()`?
A. TextEditingController, AnimationController, StreamSubscription, Timer
B. All widgets in the subtree
C. The BuildContext
D. Nothing; Dart's GC handles everything

**13.** Calling `setState()` after the widget has been disposed causes an error. How do you guard against it?
A. `if (mounted) setState(() {});`
B. `try { setState(...) } catch (_) {}`
C. `if (context != null)`
D. Use `WidgetsBinding.instance.addPostFrameCallback` always

**14.** What happens if you call `setState()` inside `build()`?
A. Nothing
B. An infinite rebuild loop / framework error
C. The build is skipped
D. State is reset

**15.** What does `setState()` actually do?
A. Directly repaints the screen
B. Marks the element as dirty so it is rebuilt on the next frame
C. Restarts the app
D. Updates the RenderObject immediately

**16.** What is the primary role of `MaterialApp`?
A. Database initialisation
B. Providing Material Design structure and app-level configuration (theme, routes, localisation)
C. State management for the whole app
D. Replacing Scaffold

**17.** Which widgets are implicitly provided inside `MaterialApp`?
A. Navigator, Theme, MediaQuery, Localizations
B. Scaffold and AppBar
C. Provider and Bloc
D. ListView and GridView

**18.** Calling `Navigator.of(context)` in the same widget that builds `MaterialApp` throws an error. Why?
A. Navigator requires a Scaffold
B. That context is above MaterialApp in the tree, so no Navigator is found; use a child widget or `Builder`
C. Navigator only works in StatefulWidgets
D. MaterialApp disables Navigator

**19.** Which property of Scaffold controls where the FloatingActionButton appears?
A. `fabAlignment`  B. `floatingActionButtonLocation`  C. `buttonPosition`  D. `alignment`

**20.** Which Scaffold property pushes content up when the keyboard appears?
A. `extendBody`  B. `resizeToAvoidBottomInset`  C. `keyboardPadding`  D. `bottomInset`

**21.** How do you show a SnackBar in modern Flutter?
A. `Scaffold.of(context).showSnackBar(...)`
B. `ScaffoldMessenger.of(context).showSnackBar(...)`
C. `SnackBar.show(context)`
D. `showDialog(...)`

**22.** What does `onPressed: null` do to a button?
A. Nothing happens on tap but the button looks enabled
B. The button is rendered in a disabled state
C. It throws an error
D. It hides the button

**23.** Which is the correct choice for a long or infinite list?
A. `ListView(children: [...])`
B. `ListView.builder(itemCount:, itemBuilder:)`
C. `Column(children: [...])`
D. `Wrap`

**24.** Why is `ListView.builder` more efficient?
A. It caches all items in memory
B. It lazily builds only the items currently visible (and a small cache extent)
C. It uses native views
D. It compresses the list

**25.** Which widget adds dividers between list items automatically?
A. `ListView.builder`  B. `ListView.separated`  C. `ListView.custom`  D. `Divider.list`

**26.** Which widget provides a card-like surface with elevation and rounded corners?
A. `Container`  B. `Card`  C. `Material`  D. `Surface`

**27.** In `ListTile`, which property places a widget at the end of the row?
A. `leading`  B. `trailing`  C. `subtitle`  D. `suffix`

**28.** A Checkbox does not change when tapped. What is the most likely cause?
A. `onChanged` is null
B. The new value is not stored via `setState()`
C. The Checkbox is disabled by default
D. Either A or B

**29.** What is "ephemeral state"?
A. State shared across the whole app
B. Local state contained in a single widget, managed with `setState`
C. State persisted to disk
D. State stored on the server

**30.** `showDatePicker()` returns:
A. A `DateTime`  B. A `Future<DateTime?>`  C. `void`  D. A `Stream<DateTime>`

**31.** Why must you null-check the result of `showTimePicker()`?
A. It always returns null on Android
B. The user may cancel the dialog
C. It returns null if the app is in the background
D. Null-safety requires it for all Futures

**32.** How do you read the primary colour defined in the app theme?
A. `Colors.primary`
B. `Theme.of(context).colorScheme.primary`
C. `MaterialApp.theme.primary`
D. `context.primaryColor`

**33.** `Theme.of(context)` works because Theme is:
A. A global variable  B. An InheritedWidget  C. A singleton service  D. A static class

**34.** Which property enables Material 3 styling?
A. `material3: true`  B. `useMaterial3: true`  C. `version: 3`  D. `theme: Material3()`

**35.** What does `ColorScheme.fromSeed(seedColor: Colors.blue)` do?
A. Sets only the primary colour
B. Generates a full harmonised colour scheme from one seed colour
C. Applies a gradient
D. Sets the background colour

**36.** Which widget forces its child to a specific size?
A. `Center`  B. `SizedBox`  C. `Align`  D. `Spacer`

**37.** What is the difference between `padding` and `margin` in a Container?
A. Padding is outside the border, margin inside
B. Padding is inside the border, margin outside
C. They are identical
D. Margin only works in Rows

**38.** Which Container property applies rotation, translation or scaling via a matrix?
A. `decoration`  B. `alignment`  C. `transform`  D. `clipBehavior`

**39.** Why does specifying both `color:` and `decoration:` on a Container throw an assertion error?
A. Colour must be set inside `BoxDecoration`; the two are mutually exclusive
B. Decoration is deprecated
C. Colour is only valid with a child
D. It does not throw an error

**40.** Which key type should be used to preserve state of items in a reorderable list?
A. `GlobalKey`  B. `ValueKey`  C. `UniqueKey`  D. No key is needed

**41.** What is a `GlobalKey`?
A. A key unique within a subtree
B. A key unique across the entire widget tree that gives access to a widget's State or RenderObject
C. A key used only with Form widgets
D. A key based on list index

**42.** What happens if the same `GlobalKey` instance is attached to two widgets at the same time?
A. The second overrides the first
B. Both share state
C. Flutter throws an assertion error because GlobalKeys must be unique
D. Flutter ignores the second silently

**43.** When is `UniqueKey()` useful?
A. To force Flutter to treat a widget as a completely new one
B. To identify items by value
C. To access State from outside
D. To improve performance

**44.** Which widget rebuilds only a portion of the tree when a value changes, avoiding full rebuilds?
A. `Builder` / `ValueListenableBuilder`
B. `Container`
C. `Scaffold`
D. `MaterialApp`

**45.** What is the purpose of the `const` keyword before a widget constructor?
A. It makes the widget immutable at runtime only
B. It allows Flutter to reuse the same instance and skip rebuilding that subtree
C. It disables the widget
D. It has no effect in Flutter

### ĐÁP ÁN M4
1-B · 2-A · 3-B · 4-B · 5-B · 6-B · 7-B · 8-A · 9-B · 10-A · 11-B · 12-A · 13-A · 14-B · 15-B · 16-B · 17-A · 18-B · 19-B · 20-B · 21-B · 22-B · 23-B · 24-B · 25-B · 26-B · 27-B · 28-D · 29-B · 30-B · 31-B · 32-B · 33-B · 34-B · 35-B · 36-B · 37-B · 38-C · 39-A · 40-B · 41-B · 42-C · 43-A · 44-A · 45-B

**Giải thích các câu dễ sai:**
- **1, 3:** Widget **bất biến** và bị vứt đi/tạo lại liên tục. Thứ *sống lâu* và giữ state là **Element**. Đây là câu hỏi lý thuyết hay ra.
- **7:** Nhớ chuỗi: `createState` → `initState` → `didChangeDependencies` → `build` → (`didUpdateWidget` → `build`) → `deactivate` → `dispose`.
- **11:** `initState` chạy trước khi widget đăng ký phụ thuộc InheritedWidget → `Theme.of`, `MediaQuery.of` phải đặt ở `didChangeDependencies`.
- **18:** Lỗi "No Navigator" kinh điển của người mới. Giải pháp: tách widget con hoặc bọc `Builder`.
- **22:** `onPressed: null` = **disabled**, nút xám đi. Muốn "không làm gì" phải viết `onPressed: () {}`.
- **28:** Cả hai nguyên nhân đều đúng — widget dạng controlled cần state + setState.
- **39:** Bẫy Container rất hay ra: `color` và `decoration` không dùng chung.
- **45:** `const` widget giúp Flutter bỏ qua rebuild cả nhánh → tối ưu hiệu năng, hay bị hỏi ở dạng "cách tối ưu rebuild".

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M4) — bấm để mở</b></summary>

**1. Đáp án B** — Widget là **mô tả bất biến (immutable)** của một phần UI — như bản thiết kế, không phải thứ được vẽ trực tiếp. Việc vẽ do RenderObject đảm nhiệm. Chính vì immutable nên Flutter tạo lại widget rất rẻ.

**2. Đáp án A** — Flutter duy trì **3 cây: Widget → Element → RenderObject**. Widget = cấu hình, Element = cầu nối giữ state & vị trí trong cây, RenderObject = layout + vẽ thật.

**3. Đáp án B** — **Element tree** mới là nơi giữ `State` và tồn tại xuyên suốt các lần rebuild. Widget bị vứt đi/tạo mới liên tục; Element được tái sử dụng nếu `runtimeType` và `key` khớp — nhờ đó state không mất.

**4. Đáp án B** — Widget là **object cấu hình siêu nhẹ**; khi rebuild, Flutter so sánh widget mới với cũ và **chỉ cập nhật Element/RenderObject thực sự thay đổi**. Rebuild ≠ repaint toàn màn hình.

**5. Đáp án B** — Dùng `StatelessWidget` khi giao diện **chỉ phụ thuộc vào cấu hình truyền vào** và không tự thay đổi theo thời gian. Cần dữ liệu thay đổi nội bộ hoặc `initState()` thì mới cần StatefulWidget.

**6. Đáp án B** — `StatefulWidget` bắt buộc implement **`createState()`** — trả về đối tượng `State`. `build()`, `initState()`, `setState()` nằm trong class `State`, không nằm trong widget.

**7. Đáp án B** — Vòng đời đúng: **`createState` → `initState` → `didChangeDependencies` → `build` → (`didUpdateWidget`/`setState` → build...) → `dispose`**. `createState` luôn đứng đầu, `dispose` luôn cuối.

**8. Đáp án A** — `initState()` chỉ chạy **đúng 1 lần** trong suốt vòng đời của State (khi State được chèn vào cây). Nơi chạy nhiều lần là `build()`. Vì vậy đặt khởi tạo controller/subscription ở đây.

**9. Đáp án B** — **`didChangeDependencies()`** được gọi khi InheritedWidget mà State phụ thuộc (ví dụ `Theme`, `MediaQuery`, `Provider`) thay đổi. Nó cũng chạy 1 lần ngay sau `initState()`.

**10. Đáp án A** — **`didUpdateWidget(oldWidget)`** chạy khi widget cha rebuild và truyền cấu hình mới xuống cùng vị trí. Đây là nơi so sánh `oldWidget` với `widget` để cập nhật controller/subscription theo tham số mới.

**11. Đáp án B** — Trong `initState()` `context` đã tồn tại, nhưng widget **chưa đăng ký là 'dependent' của InheritedWidget** → truy cập `Theme.of(context)` sẽ lỗi/không nhận cập nhật. Đúng chỗ là **`didChangeDependencies()`** (hoặc trong `build`).

**12. Đáp án A** — `dispose()` phải giải phóng các tài nguyên có vòng đời riêng: **TextEditingController, AnimationController, StreamSubscription, Timer**, focus node... GC của Dart KHÔNG tự dọn được vì chúng vẫn bị listener tham chiếu.

**13. Đáp án A** — Cách chuẩn là kiểm tra cờ **`if (mounted) setState(...)`** — `mounted` cho biết State còn nằm trong cây hay không. Bọc try/catch chỉ giấu lỗi chứ không xử lý đúng nguyên nhân.

**14. Đáp án B** — Gọi `setState()` trong `build()` tạo **vòng lặp rebuild vô hạn** (build → dirty → build...) và Flutter sẽ báo lỗi framework. `build()` phải là hàm thuần, không gây side-effect.

**15. Đáp án B** — `setState()` **không vẽ lại ngay** — nó chỉ **đánh dấu element là 'dirty'** để Flutter rebuild ở frame kế tiếp. Đây là lý do đọc giá trị ngay sau setState vẫn có thể thấy UI cũ.

**16. Đáp án B** — `MaterialApp` cung cấp **khung Material Design và cấu hình cấp ứng dụng**: theme, routes/navigator, localization, title. Nó không quản lý state hay database, và không thay thế Scaffold (Scaffold là khung 1 màn hình).

**17. Đáp án A** — Bên trong `MaterialApp` đã có sẵn **Navigator, Theme, MediaQuery, Localizations** (và Directionality). Nhờ vậy con cháu gọi được `Navigator.of`, `Theme.of`, `MediaQuery.of`. Scaffold/AppBar thì bạn phải tự thêm.

**18. Đáp án B** — `Navigator.of(context)` tìm Navigator bằng cách đi **lên trên** cây từ context đó. Context tại nơi build `MaterialApp` nằm **phía trên** Navigator nên không tìm thấy. Fix: bọc bằng **`Builder`** hoặc tách ra widget con.

**19. Đáp án B** — Thuộc tính đúng là **`floatingActionButtonLocation`** (ví dụ `FloatingActionButtonLocation.centerDocked`). Các tên còn lại không tồn tại trong Scaffold.

**20. Đáp án B** — **`resizeToAvoidBottomInset`** (mặc định `true`) khiến Scaffold co lại/đẩy nội dung lên khi bàn phím hiện ra, tránh che ô nhập. Đặt `false` khi muốn nội dung nằm yên (ví dụ có ảnh nền).

**21. Đáp án B** — Cách hiện đại là **`ScaffoldMessenger.of(context).showSnackBar(...)`**. `Scaffold.of(context).showSnackBar` đã **deprecated** — nó hay lỗi vì context nằm sai vị trí; ScaffoldMessenger còn giữ được SnackBar khi chuyển màn hình.

**22. Đáp án B** — Đặt `onPressed: null` khiến button **chuyển sang trạng thái disabled** (mờ đi, không nhận tap). Đây là cách chuẩn để tắt nút — không cần thuộc tính `enabled` riêng.

**23. Đáp án B** — Danh sách dài/vô hạn phải dùng **`ListView.builder`** với `itemCount` + `itemBuilder` để dựng lazy. `ListView(children: [...])` và `Column` dựng toàn bộ item ngay lập tức → tốn RAM, giật.

**24. Đáp án B** — `ListView.builder` **chỉ dựng những item đang hiển thị** (cộng một ít cache extent) và hủy item đã cuộn khỏi màn hình. Nó không cache tất cả cũng không dùng native view.

**25. Đáp án B** — **`ListView.separated`** nhận thêm `separatorBuilder` để chèn widget ngăn cách (thường là `Divider`) giữa các item. `ListView.builder` thì phải tự thêm Divider trong item.

**26. Đáp án B** — **`Card`** cho sẵn nền Material, bo góc và đổ bóng (`elevation`). `Container` phải tự cấu hình `BoxDecoration`; `Material` là lớp nền tổng quát hơn, không mặc định bo góc/elevation kiểu card.

**27. Đáp án B** — `ListTile` có `leading` (đầu hàng), **`trailing` (cuối hàng)**, `title`, `subtitle`. Không có thuộc tính `suffix`. Trailing hay dùng cho icon mũi tên, checkbox, switch.

**28. Đáp án D** — Checkbox là stateless về mặt hiển thị: nó vẽ theo `value` bạn truyền. Nếu **`onChanged` null** thì nó bị disable; nếu có `onChanged` nhưng **không lưu giá trị mới bằng `setState`** thì UI cũng không đổi. Vì vậy đáp án là **cả A và B**.

**29. Đáp án B** — Ephemeral state (UI state) = **state cục bộ của một widget**, quản lý bằng `setState` — ví dụ tab đang chọn, trạng thái animation. Ngược lại app state cần Provider/Bloc và có thể lưu xuống đĩa/server.

**30. Đáp án B** — `showDatePicker()` trả về **`Future<DateTime?>`** — bất đồng bộ (chờ người dùng chọn) và **nullable** (người dùng có thể bấm Cancel). Vì vậy phải `await` và kiểm tra null.

**31. Đáp án B** — Kết quả có thể là **null khi người dùng hủy dialog** (bấm Cancel hoặc bấm ra ngoài). Không null-check sẽ crash khi gọi thuộc tính trên giá trị null.

**32. Đáp án B** — Đọc theo theme hiện tại: **`Theme.of(context).colorScheme.primary`**. `Colors.primary` không tồn tại; truy cập trực tiếp `MaterialApp.theme` sẽ bỏ qua việc kế thừa/override theme cục bộ.

**33. Đáp án B** — `Theme.of(context)` hoạt động vì `Theme` là một **InheritedWidget** — nó truyền dữ liệu xuống cây và tự động rebuild những widget đã 'đăng ký' phụ thuộc khi theme đổi. Đây cũng là cơ chế của `MediaQuery`, `Provider`.

**34. Đáp án B** — Bật Material 3 bằng **`ThemeData(useMaterial3: true)`**. Các tên khác không tồn tại. (Ở Flutter mới, Material 3 đã là mặc định.)

**35. Đáp án B** — `ColorScheme.fromSeed(seedColor: ...)` **sinh ra toàn bộ bảng màu hài hòa** (primary, secondary, surface, error, cùng các biến thể on*) từ **một màu hạt giống** theo thuật toán Material 3 — không chỉ đặt mỗi màu chính.

**36. Đáp án B** — **`SizedBox(width:, height:, child:)`** ép con về kích thước cụ thể (và cũng dùng để tạo khoảng trống cố định). `Center`/`Align` chỉ định vị; `Spacer` chiếm phần trống linh hoạt trong Flex.

**37. Đáp án B** — **Padding nằm BÊN TRONG viền** (khoảng cách từ viền tới nội dung), **margin nằm BÊN NGOÀI viền** (khoảng cách tới widget khác). Nhớ: padding đẩy nội dung vào, margin đẩy cả hộp ra.

**38. Đáp án C** — **`transform:`** nhận một `Matrix4` để xoay/tịnh tiến/co giãn Container. `decoration` lo nền-viền-bóng, `alignment` căn con, `clipBehavior` cắt phần tràn.

**39. Đáp án A** — Container **không cho đặt đồng thời `color` và `decoration`** vì màu nền phải nằm trong `BoxDecoration(color: ...)`; đặt cả hai gây mâu thuẫn nên Flutter ném assertion error. Fix: bỏ `color:` và đưa màu vào decoration.

**40. Đáp án B** — **`ValueKey`** gắn định danh theo **giá trị/ID của item** nên khi danh sách bị sắp xếp lại, Flutter vẫn nhận ra đúng item và giữ state. `UniqueKey` sinh key mới mỗi lần build → mất state; không key thì Flutter khớp theo vị trí → state nhảy lung tung.

**41. Đáp án B** — **`GlobalKey`** là key **duy nhất trên toàn bộ widget tree**, cho phép truy cập `State`, `BuildContext` hoặc `RenderObject` của widget từ bên ngoài (ví dụ `formKey.currentState!.validate()`). Nó nặng hơn key thường nên chỉ dùng khi thật cần.

**42. Đáp án C** — GlobalKey phải **duy nhất tại mọi thời điểm**; gắn cùng một instance cho hai widget đang cùng tồn tại sẽ khiến Flutter ném **assertion error** ('Multiple widgets used the same GlobalKey').

**43. Đáp án A** — `UniqueKey()` tạo key mới mỗi lần gọi → **buộc Flutter coi đó là widget hoàn toàn mới**, hủy Element/State cũ và dựng lại từ đầu. Hữu ích khi muốn reset state hoặc chạy lại animation.

**44. Đáp án A** — **`Builder` / `ValueListenableBuilder`** khoanh vùng rebuild: chỉ phần cây bên trong builder được dựng lại khi giá trị đổi, thay vì rebuild cả widget cha. Đây là kỹ thuật tối ưu hiệu năng cơ bản.

**45. Đáp án B** — `const` cho phép Flutter **tái sử dụng đúng instance đã tạo lúc compile-time**; khi rebuild, widget const được nhận ra là 'giống hệt' nên **bỏ qua việc dựng lại subtree đó**. Đây là tối ưu hiệu năng rẻ nhất mà hiệu quả nhất.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m5"></a>
# MODULE 5 — NAVIGATION

**1.** Flutter's Navigator manages routes using which data structure?
A. Queue  B. Stack  C. Tree  D. Linked list

**2.** Which method adds a new screen on top of the current one?
A. `Navigator.pop()`  B. `Navigator.push()`  C. `Navigator.add()`  D. `Navigator.open()`

**3.** What does `MaterialPageRoute` provide?
A. Route naming
B. A platform-appropriate transition animation to the new screen
C. State management
D. Deep link handling

**4.** When using `await Navigator.push(...)`, what does the awaited value represent?
A. The BuildContext
B. The value passed to `Navigator.pop(context, value)`
C. The route name
D. The widget that was returned

**5.** How do you return data to the previous screen?
A. `Navigator.pop(context, result)`
B. `Navigator.return(result)`
C. `Navigator.send(result)`
D. Using a global variable only

**6.** Which method replaces the current route so the user cannot go back to it?
A. `push`  B. `pushReplacement`  C. `popAndPush`  D. `pushNamed`

**7.** After a successful login, which navigation method is most appropriate?
A. `push`  B. `pushReplacement` or `pushAndRemoveUntil`  C. `pop`  D. `popUntil`

**8.** Which removes all previous routes from the stack?
A. `Navigator.pushAndRemoveUntil(context, route, (r) => false)`
B. `Navigator.clear()`
C. `Navigator.popAll()`
D. `Navigator.reset()`

**9.** What does `Navigator.popUntil(context, ModalRoute.withName('/home'))` do?
A. Pops routes until reaching the route named '/home'
B. Pops all routes
C. Pushes '/home'
D. Removes '/home'

**10.** How do you check whether it is safe to pop?
A. `Navigator.hasRoute()`  B. `Navigator.canPop(context)`  C. `context.mounted`  D. `route.isFirst`

**11.** What is the purpose of named routes?
A. To manage themes
B. To allow navigation using string route names, declared centrally
C. To eliminate the need for BuildContext
D. To improve rendering speed

**12.** Which property of MaterialApp maps route names to builders?
A. `home`  B. `routes`  C. `navigatorObservers`  D. `pages`

**13.** Declaring both `home:` and a `'/'` entry in `routes:` causes:
A. The home widget to win
B. An assertion error
C. Two screens to render
D. Nothing unusual

**14.** How do you pass arguments with a named route?
A. `pushNamed(context, '/detail', arguments: obj)`
B. `pushNamed(context, '/detail', params: obj)`
C. Through the constructor only
D. Using global state only

**15.** How do you retrieve those arguments in the destination screen?
A. `ModalRoute.of(context)!.settings.arguments`
B. `Navigator.of(context).arguments`
C. `context.arguments`
D. `RouteSettings.get()`

**16.** Which callback handles routes not defined in the `routes` map?
A. `onUnknownRoute`  B. `onGenerateRoute`  C. Both, with `onGenerateRoute` tried first  D. `onError`

**17.** Which is the correct use of `onGenerateRoute`?
A. Building routes dynamically, including parsing arguments and applying guards
B. Generating widget keys
C. Creating the theme
D. Handling HTTP routes

**18.** Which problem was Navigator 2.0 (Router API) designed to solve?
A. Slow animations
B. Declarative route state, deep links and browser URL synchronisation
C. Memory leaks
D. Widget rebuilds

**19.** Which component of Navigator 2.0 converts a URL into app state?
A. RouterDelegate  B. RouteInformationParser  C. BackButtonDispatcher  D. NavigatorObserver

**20.** Which component builds the list of `Page` objects from app state?
A. RouterDelegate  B. RouteInformationParser  C. RouteSettings  D. PageRoute

**21.** Which popular package wraps Navigator 2.0 with a simpler API?
A. provider  B. go_router  C. dio  D. hive

**22.** On Android, deep links are configured in:
A. `Info.plist`  B. `AndroidManifest.xml` using intent-filters  C. `build.gradle`  D. `pubspec.yaml`

**23.** Which categories are required in an intent-filter for a browsable deep link?
A. `DEFAULT` and `BROWSABLE`  B. `LAUNCHER` and `MAIN`  C. `VIEW` only  D. `HOME`

**24.** On iOS, a custom URL scheme is declared using:
A. `CFBundleURLTypes` in Info.plist
B. `AndroidManifest.xml`
C. `Podfile`
D. `main.dart`

**25.** What is the security advantage of App Links / Universal Links over custom URL schemes?
A. They are faster
B. Domain ownership is verified, so other apps cannot hijack the link
C. They work offline
D. They do not require a browser

**26.** Which property of MaterialApp sets the first route shown?
A. `initialRoute`  B. `startRoute`  C. `firstScreen`  D. `defaultRoute`

**27.** Which widget shows a modal dialog?
A. `Navigator.push`  B. `showDialog()`  C. `showModal()`  D. `Dialog.open()`

**28.** How do you close a dialog and return a value?
A. `Navigator.pop(context, value)`  B. `dialog.close(value)`  C. `return value;`  D. `Navigator.dismiss()`

**29.** Which widget intercepts the Android back button?
A. `WillPopScope` / `PopScope`  B. `BackButton`  C. `Navigator.observer`  D. `SystemNavigator`

**30.** Which is the correct way to implement a guarded (auth-protected) route?
A. Check auth state in `onGenerateRoute`, or use a wrapper widget / router redirect
B. Hide the button that navigates there
C. Use `pushReplacement` only
D. It is not possible in Flutter

### ĐÁP ÁN M5
1-B · 2-B · 3-B · 4-B · 5-A · 6-B · 7-B · 8-A · 9-A · 10-B · 11-B · 12-B · 13-B · 14-A · 15-A · 16-C · 17-A · 18-B · 19-B · 20-A · 21-B · 22-B · 23-A · 24-A · 25-B · 26-A · 27-B · 28-A · 29-A · 30-A

**Giải thích các câu dễ sai:**
- **4:** `push` trả `Future<T?>`; giá trị chính là thứ truyền vào `pop`. Nhớ luôn null-check vì user có thể back bằng nút hệ thống.
- **11:** Named route **vẫn cần context**. Muốn điều hướng không context phải dùng `GlobalKey<NavigatorState>` — kỹ thuật riêng.
- **13:** Đây là lỗi assert hay gặp khi vừa để `home:` vừa khai `'/'`.
- **16:** Thứ tự tra cứu: `routes` → `onGenerateRoute` → `onUnknownRoute`.
- **25:** Custom scheme (`myapp://`) không xác minh chủ sở hữu → app khác đăng ký trùng scheme được. App Links/Universal Links dùng https + file xác minh trên domain.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M5) — bấm để mở</b></summary>

**1. Đáp án B** — Navigator dùng cấu trúc Stack (LIFO): push đẩy màn hình lên đỉnh, pop lấy khỏi đỉnh, nên màn hình mở sau cùng luôn hiển thị trước tiên. ≠ Queue vì Queue là FIFO, không đúng với hành vi back.

**2. Đáp án B** — `Navigator.push()` đẩy một route/màn hình mới lên đỉnh stack. ≠ `add`/`open` vì đó không phải API của Navigator.

**3. Đáp án B** — `MaterialPageRoute` bọc màn hình và cung cấp hiệu ứng chuyển cảnh phù hợp nền tảng (slide trên Android, kiểu Cupertino trên iOS). Nó không lo việc đặt tên route hay quản lý state.

**4. Đáp án B** — `push` trả về một `Future`; giá trị await được chính là giá trị truyền vào `Navigator.pop(context, value)` khi màn hình đích đóng lại.

**5. Đáp án A** — Trả dữ liệu về màn hình trước bằng tham số thứ hai của pop: `Navigator.pop(context, result)`; giá trị này khớp với Future mà `push` trả về.

**6. Đáp án B** — `pushReplacement` thay route hiện tại bằng route mới và gỡ route cũ khỏi stack nên không back lại được. ≠ `push` vì push vẫn giữ màn hình cũ để quay lại.

**7. Đáp án B** — Sau đăng nhập cần loại màn hình login khỏi stack: `pushReplacement` (thay một route) hoặc `pushAndRemoveUntil` (xóa nhiều route) để user không back về trang login.

**8. Đáp án A** — `pushAndRemoveUntil(context, route, (r) => false)`: predicate luôn trả false nên mọi route cũ bị gỡ, chỉ còn lại route mới. Các hàm clear/popAll/reset không tồn tại trong Navigator.

**9. Đáp án A** — `popUntil` với `ModalRoute.withName('/home')` liên tục pop cho tới khi gặp route tên `/home` rồi dừng, giữ `/home` lại trên stack.

**10. Đáp án B** — `Navigator.canPop(context)` trả về bool cho biết còn route để pop hay không, giúp tránh pop màn hình gốc gây lỗi.

**11. Đáp án B** — Named routes cho phép điều hướng bằng chuỗi tên được khai báo tập trung (trong `routes`), giúp quản lý và tái sử dụng route dễ hơn.

**12. Đáp án B** — Thuộc tính `routes` của `MaterialApp` là map từ tên route sang builder widget. `home` chỉ đặt màn hình đầu tiên, không map tên route.

**13. Đáp án B** — Cả `home:` và entry `'/'` trong `routes:` đều định nghĩa route gốc nên xung đột, Flutter ném assertion error. Chỉ được dùng một trong hai.

**14. Đáp án A** — Truyền dữ liệu qua named route bằng tham số `arguments`: `pushNamed(context, '/detail', arguments: obj)`. `params` không phải API đúng.

**15. Đáp án A** — Ở màn hình đích lấy dữ liệu qua `ModalRoute.of(context)!.settings.arguments` rồi ép kiểu về loại mong muốn.

**16. Đáp án C** — `onGenerateRoute` được gọi trước cho route không có trong `routes`; nếu nó trả null thì `onUnknownRoute` xử lý như phương án dự phòng, nên cả hai đều tham gia.

**17. Đáp án A** — `onGenerateRoute` dùng để dựng route động: phân tích tên/arguments, áp guard (kiểm tra quyền) rồi trả về route tương ứng.

**18. Đáp án B** — Navigator 2.0 (Router API) sinh ra để quản lý route theo kiểu khai báo (declarative), xử lý deep link và đồng bộ URL trình duyệt trên web.

**19. Đáp án B** — `RouteInformationParser` chuyển URL/route information thành object trạng thái ứng dụng (parse URL thành state).

**20. Đáp án A** — `RouterDelegate` lắng nghe app state và dựng danh sách các `Page` cho Navigator hiển thị (state thành pages). ≠ RouteInformationParser vì parser chỉ đọc URL, không dựng page.

**21. Đáp án B** — `go_router` là package phổ biến bọc Navigator 2.0 với API đơn giản hơn. provider là state management, dio là HTTP client, hive là DB cục bộ.

**22. Đáp án B** — Trên Android, deep link được khai báo trong `AndroidManifest.xml` bằng `intent-filter`. `Info.plist` là của iOS.

**23. Đáp án A** — Intent-filter cho deep link mở từ trình duyệt cần category `DEFAULT` và `BROWSABLE`. `LAUNCHER`/`MAIN` chỉ để hiện icon app ở màn hình chính.

**24. Đáp án A** — Trên iOS khai báo custom URL scheme bằng khóa `CFBundleURLTypes` trong `Info.plist`.

**25. Đáp án B** — App Links/Universal Links xác minh quyền sở hữu domain (qua file assetlinks.json/AASA) nên app khác không thể chiếm link, đó là ưu điểm bảo mật so với custom scheme dễ bị giả mạo.

**26. Đáp án A** — `initialRoute` của `MaterialApp` xác định route đầu tiên hiển thị khi mở app.

**27. Đáp án B** — `showDialog()` hiển thị hộp thoại modal đè lên màn hình. ≠ `Navigator.push` vì push mở màn hình đầy đủ, không phải dialog.

**28. Đáp án A** — Dialog cũng nằm trên Navigator stack; đóng và trả giá trị bằng `Navigator.pop(context, value)`, giá trị này về Future của `showDialog`.

**29. Đáp án A** — `WillPopScope` (hoặc `PopScope` ở bản mới) chặn/điều khiển nút back của Android để xác nhận hoặc ngăn thoát màn hình.

**30. Đáp án A** — Route được bảo vệ: kiểm tra trạng thái đăng nhập trong `onGenerateRoute`, hoặc dùng widget bọc / redirect của router để chuyển hướng nếu chưa xác thực. Ẩn nút không đủ vì vẫn có thể vào bằng deep link.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m6"></a>
# MODULE 6 — LAYOUT & RESPONSIVE DESIGN

**1.** Which sentence describes Flutter's layout algorithm?
A. Sizes go down, constraints go up
B. Constraints go down, sizes go up, parent sets position
C. Every widget decides its own absolute position
D. Layout is computed by the operating system

**2.** In a `Row`, which is the main axis?
A. Vertical  B. Horizontal  C. Depends on textDirection only  D. Both

**3.** In a `Column`, `crossAxisAlignment` controls alignment along which axis?
A. Vertical  B. Horizontal  C. Diagonal  D. Z-axis

**4.** Which `MainAxisAlignment` places no space before the first or after the last child?
A. `spaceAround`  B. `spaceEvenly`  C. `spaceBetween`  D. `center`

**5.** With `spaceAround`, the space at the two ends is:
A. Equal to the space between children
B. Half the space between children
C. Zero
D. Double the space between children

**6.** Which makes all gaps (including edges) equal?
A. `spaceBetween`  B. `spaceAround`  C. `spaceEvenly`  D. `start`

**7.** What does `mainAxisSize: MainAxisSize.min` do?
A. Makes the Row/Column as small as its children
B. Makes it fill the parent
C. Hides overflow
D. Sets minimum width to zero

**8.** What is the key difference between `Flexible` and `Expanded`?
A. Flexible works only in Column, Expanded only in Row
B. `Expanded` is shorthand for `Flexible(fit: FlexFit.tight)`; Flexible can be loose or tight
C. Flexible always forces tight constraints
D. There is no difference

**9.** What does `flex: 2` on an Expanded mean?
A. Two children  B. It receives twice the share of free space compared to `flex: 1`  C. Two pixels  D. Second priority

**10.** Where can `Expanded` be used?
A. Inside any widget
B. Only as a direct child of Row, Column or Flex
C. Only inside Stack
D. Only inside ListView

**11.** What is `Spacer()` equivalent to?
A. `SizedBox()`  B. `Expanded(child: SizedBox())`  C. `Padding`  D. `Divider`

**12.** "RenderFlex overflowed by 32 pixels" means:
A. The device is out of memory
B. Children require more space than the Row/Column has available
C. Too many widgets in the tree
D. An image failed to load

**13.** Which is NOT a valid fix for a horizontal overflow in a Row?
A. Wrap a child in `Expanded`
B. Wrap the Row in `SingleChildScrollView(scrollDirection: Axis.horizontal)`
C. Use `Wrap` instead of `Row`
D. Set `overflow: hidden` on the Row

**14.** Placing a `ListView` directly inside a `Column` throws an unbounded height error. Which fixes it?
A. Wrap the ListView in `Expanded`
B. Set `shrinkWrap: true` on the ListView
C. Give the ListView a fixed height with SizedBox
D. All of the above

**15.** In a `Stack`, which child appears on top?
A. The first  B. The last  C. The largest  D. The one with highest elevation

**16.** Which widget positions a child at exact offsets inside a Stack?
A. `Align`  B. `Positioned`  C. `Offset`  D. `Placed`

**17.** `Positioned` can only be used as a child of:
A. Row  B. Column  C. Stack  D. Container

**18.** Which GridView constructor is simplest when the number of columns is fixed?
A. `GridView.count`  B. `GridView.extent`  C. `GridView.builder`  D. `GridView.custom`

**19.** Which GridView constructor adapts the number of columns to the available width?
A. `GridView.count`  B. `GridView.extent` (or `SliverGridDelegateWithMaxCrossAxisExtent`)  C. `GridView.builder` only  D. `GridView()`

**20.** Which property of the grid delegate controls the width-to-height ratio of each cell?
A. `crossAxisCount`  B. `childAspectRatio`  C. `mainAxisSpacing`  D. `cellRatio`

**21.** Which widget should you use for a 2D scrollable grid with a fixed number of columns?
A. `Table`  B. `Wrap`  C. `GridView.count`  D. `ListView.builder`

**22.** What is the difference between `Wrap` and `Row`?
A. `Wrap` moves children to the next line when space runs out; Row overflows
B. `Wrap` is scrollable
C. `Row` supports spacing, Wrap does not
D. They are the same

**23.** `MediaQuery.of(context).size` returns:
A. The size of the parent widget
B. The size of the screen/window
C. The size of the child
D. The size in physical pixels only

**24.** `LayoutBuilder` gives you:
A. The screen size
B. The constraints passed down by the parent widget
C. The device orientation only
D. The pixel ratio

**25.** For component-level responsiveness, which is preferred?
A. `MediaQuery`  B. `LayoutBuilder`  C. `Builder`  D. `OrientationBuilder`

**26.** Which widget keeps content clear of notches and system bars?
A. `Padding`  B. `SafeArea`  C. `Scaffold`  D. `Container`

**27.** How do you obtain the current orientation?
A. `MediaQuery.of(context).orientation` or `OrientationBuilder`
B. `Device.orientation`
C. `Scaffold.orientation`
D. `Theme.of(context).orientation`

**28.** Which widget scales its child to fit the available space?
A. `FittedBox`  B. `AspectRatio`  C. `Expanded`  D. `Transform`

**29.** Which widget forces a child to a specific width:height ratio?
A. `FittedBox`  B. `AspectRatio`  C. `SizedBox`  D. `FractionallySizedBox`

**30.** A common breakpoint set for responsive design is:
A. <600 mobile, 600–1024 tablet, >1024 desktop
B. <200, 200–400, >400
C. <1000, 1000–2000, >2000
D. There are no conventions

**31.** Which widget gives a child a size relative to its parent (e.g. 50% width)?
A. `FractionallySizedBox`  B. `Expanded`  C. `SizedBox`  D. `Flexible`

**32.** What does `IntrinsicHeight` do, and why should it be used sparingly?
A. It forces children to the same height but is computationally expensive
B. It caches heights
C. It is deprecated
D. It only works in Stack

**33.** Which scroll widget makes a non-scrollable layout scrollable when the keyboard appears?
A. `ListView`  B. `SingleChildScrollView`  C. `PageView`  D. `NestedScrollView`

**34.** What is `shrinkWrap: true` used for on a ListView?
A. Makes the ListView size itself to its content instead of expanding
B. Compresses items
C. Enables lazy loading
D. Hides the scrollbar

**35.** Why is `shrinkWrap: true` discouraged for very long lists?
A. It disables scrolling
B. It forces the list to measure all children, losing the lazy-building performance benefit
C. It causes overflow
D. It breaks the scroll physics

### ĐÁP ÁN M6
1-B · 2-B · 3-B · 4-C · 5-B · 6-C · 7-A · 8-B · 9-B · 10-B · 11-B · 12-B · 13-D · 14-D · 15-B · 16-B · 17-C · 18-A · 19-B · 20-B · 21-C · 22-A · 23-B · 24-B · 25-B · 26-B · 27-A · 28-A · 29-B · 30-A · 31-A · 32-A · 33-B · 34-A · 35-B

**Giải thích các câu dễ sai:**
- **1:** Câu thần chú "Constraints go down. Sizes go up. Parent sets position." — học thuộc, đề hay hỏi nguyên văn.
- **4, 5, 6:** Phân biệt 3 kiểu space: **Between** = không có ở 2 đầu · **Around** = 2 đầu bằng **½** · **Evenly** = tất cả bằng nhau.
- **8:** `Expanded` = `Flexible(fit: tight)`. Cả hai đều dùng được trong **cả Row lẫn Column**.
- **13:** Row **không có** thuộc tính `overflow` → đây là đáp án "không phải cách sửa".
- **23, 24:** MediaQuery = **màn hình**; LayoutBuilder = **không gian cha cấp cho widget này**. Nhầm cặp này là mất điểm.
- **35:** `shrinkWrap` phá vỡ lazy build → chỉ dùng cho list ngắn.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M6) — bấm để mở</b></summary>

**1. Đáp án B** — Thuật toán layout Flutter: cha truyền constraints xuống con, con chọn size trong phạm vi constraints rồi báo lên, cha đặt vị trí cho con. Đúng câu 'Constraints go down, sizes go up, parent sets position'.

**2. Đáp án B** — Trong `Row`, trục chính (main axis) nằm ngang; các con xếp theo chiều ngang.

**3. Đáp án B** — Trong `Column`, main axis là trục dọc nên `crossAxisAlignment` (trục phụ) canh theo chiều ngang.

**4. Đáp án C** — `spaceBetween` chia đều khoảng trống giữa các con nhưng không chừa khoảng trước con đầu và sau con cuối.

**5. Đáp án B** — `spaceAround` cho mỗi con một khoảng trống hai bên bằng nhau; hai con cạnh nhau cộng lại thành khoảng đôi, nên khoảng ở hai đầu bằng nửa khoảng giữa hai con.

**6. Đáp án C** — `spaceEvenly` chia đều tất cả khoảng trống kể cả hai đầu, nên mọi khoảng đều bằng nhau.

**7. Đáp án A** — `mainAxisSize: MainAxisSize.min` khiến Row/Column co lại vừa đúng tổng kích thước các con thay vì chiếm hết không gian cha (mặc định là max).

**8. Đáp án B** — `Expanded` chính là `Flexible(fit: FlexFit.tight)`, bắt con lấp đầy phần được chia; còn `Flexible` mặc định `loose` nên con chỉ lấy không gian cần, và cho phép chọn tight hoặc loose.

**9. Đáp án B** — `flex: 2` nghĩa là con nhận gấp đôi phần không gian trống so với con `flex: 1` (chia theo tỉ lệ hệ số flex).

**10. Đáp án B** — `Expanded` chỉ dùng làm con trực tiếp của `Row`, `Column` hoặc `Flex`; đặt trong widget khác sẽ báo lỗi.

**11. Đáp án B** — `Spacer()` tương đương `Expanded(child: SizedBox())`, tạo khoảng trống co giãn để đẩy các con ra xa nhau.

**12. Đáp án B** — 'RenderFlex overflowed' nghĩa là tổng kích thước các con vượt quá không gian mà Row/Column có, không liên quan bộ nhớ hay số lượng widget.

**13. Đáp án D** — `Row` không có thuộc tính `overflow: hidden` nên đó KHÔNG phải cách sửa hợp lệ. Các cách đúng là bọc con bằng `Expanded`, cuộn ngang bằng SingleChildScrollView, hoặc thay bằng `Wrap`.

**14. Đáp án D** — `ListView` đặt trực tiếp trong `Column` không có chiều cao xác định gây lỗi unbounded height; cả ba cách đều hợp lệ (bọc `Expanded`, đặt `shrinkWrap: true`, hoặc cho chiều cao cố định), nên chọn 'All of the above'.

**15. Đáp án B** — Trong `Stack`, con được vẽ sau (con cuối trong danh sách children) nằm trên cùng, chồng lên các con trước.

**16. Đáp án B** — `Positioned` đặt con tại tọa độ chính xác (top/left/right/bottom) bên trong `Stack`.

**17. Đáp án C** — `Positioned` chỉ hợp lệ khi là con trực tiếp của `Stack`; đặt nơi khác sẽ báo lỗi.

**18. Đáp án A** — `GridView.count` đơn giản nhất khi biết trước số cột cố định, chỉ cần đặt `crossAxisCount`.

**19. Đáp án B** — `GridView.extent` (dùng delegate `SliverGridDelegateWithMaxCrossAxisExtent`) tự tính số cột theo chiều rộng khả dụng, phù hợp responsive.

**20. Đáp án B** — `childAspectRatio` của grid delegate quyết định tỉ lệ rộng:cao của mỗi ô lưới.

**21. Đáp án C** — Lưới cuộn 2D với số cột cố định dùng `GridView.count`. `Table`/`Wrap`/`ListView` không phù hợp cho lưới cuộn nhiều cột.

**22. Đáp án A** — `Wrap` tự xuống dòng khi hết chỗ, còn `Row` không xuống dòng mà bị tràn (overflow).

**23. Đáp án B** — `MediaQuery.of(context).size` trả kích thước màn hình/cửa sổ (theo logical pixels), không phải kích thước cha hay con.

**24. Đáp án B** — `LayoutBuilder` cung cấp constraints mà cha truyền xuống, giúp bố cục theo không gian thực tế của vùng chứa widget.

**25. Đáp án B** — Ở mức component nên dùng `LayoutBuilder` vì nó phản ánh không gian mà cha cấp cho widget đó, không phụ thuộc toàn màn hình như `MediaQuery`.

**26. Đáp án B** — `SafeArea` chèn padding để tránh tai thỏ (notch), status bar và các thanh hệ thống che nội dung.

**27. Đáp án A** — Lấy hướng màn hình qua `MediaQuery.of(context).orientation` hoặc widget `OrientationBuilder`.

**28. Đáp án A** — `FittedBox` co giãn (scale) con vừa với không gian sẵn có.

**29. Đáp án B** — `AspectRatio` ép con giữ đúng tỉ lệ rộng:cao được chỉ định. ≠ FittedBox vì FittedBox scale nội dung chứ không ép tỉ lệ.

**30. Đáp án A** — Bộ breakpoint phổ biến: dưới 600 là mobile, 600 đến 1024 là tablet, trên 1024 là desktop.

**31. Đáp án A** — `FractionallySizedBox` cho con kích thước theo phần trăm của cha (ví dụ widthFactor 0.5 là 50% chiều rộng).

**32. Đáp án A** — `IntrinsicHeight` ép các con cùng chiều cao nhưng phải đo trước kích thước nội dung nên tốn tính toán, do đó dùng hạn chế.

**33. Đáp án B** — `SingleChildScrollView` biến một layout tĩnh thành cuộn được khi bàn phím hiện lên, tránh overflow.

**34. Đáp án A** — `shrinkWrap: true` khiến `ListView` tự co kích thước vừa nội dung thay vì chiếm hết không gian cha.

**35. Đáp án B** — `shrinkWrap: true` bắt list đo toàn bộ con ngay lập tức, mất lợi ích lazy-build nên không nên dùng cho list rất dài (kém hiệu năng).

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m7"></a>
# MODULE 7 — FORMS & VALIDATION

**1.** What is the main difference between `TextField` and `TextFormField`?
A. TextFormField does not support decoration
B. TextFormField supports validation and integrates with `Form`
C. TextField has a controller while TextFormField does not
D. TextField cannot accept input

**2.** What must a `validator` return when the input is valid?
A. `true`  B. `null`  C. An empty string  D. `false`

**3.** What does a validator return when input is invalid?
A. `false`  B. The error message as a String  C. `null`  D. An Exception

**4.** Which key type is required to access a Form's state?
A. `ValueKey`  B. `GlobalKey<FormState>`  C. `UniqueKey`  D. `ObjectKey`

**5.** Which call runs every field's validator?
A. `_formKey.currentState!.validate()`
B. `_formKey.validate()`
C. `Form.validate(context)`
D. `_formKey.currentState!.save()`

**6.** What does `_formKey.currentState!.save()` do?
A. Writes the form to disk
B. Invokes every field's `onSaved` callback
C. Validates the form
D. Submits it to the server

**7.** Which method clears all fields and validation errors?
A. `reset()`  B. `clear()`  C. `dispose()`  D. `refresh()`

**8.** Which `AutovalidateMode` validates only after the user has interacted with a field?
A. `always`  B. `disabled`  C. `onUserInteraction`  D. `onSubmit`

**9.** What is the default `AutovalidateMode`?
A. `always`  B. `disabled`  C. `onUserInteraction`  D. There is no default

**10.** Why must a `TextEditingController` be disposed?
A. To free the memory and listeners it holds, preventing a leak
B. To clear the text
C. It is optional
D. To reset validation

**11.** Where should `controller.dispose()` be called?
A. In `initState()`  B. In `dispose()` of the State  C. In `build()`  D. In `didUpdateWidget()`

**12.** How do you read the current text of a controlled field?
A. `controller.text`  B. `controller.value`  C. `field.text`  D. `controller.getText()`

**13.** Which property hides the typed characters for a password field?
A. `hideText: true`  B. `obscureText: true`  C. `password: true`  D. `secure: true`

**14.** Which property shows an email-optimised keyboard?
A. `keyboardType: TextInputType.emailAddress`
B. `inputType: email`
C. `keyboard: 'email'`
D. `emailMode: true`

**15.** Which property changes the action button in the bottom-right of the keyboard?
A. `textInputAction`  B. `keyboardAction`  C. `submitButton`  D. `actionKey`

**16.** Which decoration property displays a persistent error message?
A. `helperText`  B. `errorText`  C. `hintText`  D. `labelText`

**17.** What is the difference between `labelText` and `hintText`?
A. `labelText` floats above when focused/filled; `hintText` shows only while empty
B. They are identical
C. `hintText` is always visible
D. `labelText` is for errors

**18.** Which restricts input to digits only while typing?
A. `inputFormatters: [FilteringTextInputFormatter.digitsOnly]`
B. `keyboardType: TextInputType.number` alone
C. `validator`
D. `obscureText`

**19.** Why is `keyboardType: TextInputType.number` alone insufficient to guarantee numeric input?
A. It only suggests a keyboard; users can still paste other characters
B. It is deprecated
C. It disables validation
D. It only works on iOS

**20.** Which validator correctly checks for exactly 10 digits?
A. `value!.length == 10 ? null : 'error'`
B. `value!.contains(RegExp(r'[0-9]')) ? null : 'error'`
C. `int.tryParse(value!) != null ? null : 'error'`
D. `RegExp(r'^\d{10}$').hasMatch(value!) ? null : 'error'`

**21.** Why does `RegExp(r'\d{10}')` without anchors give wrong results?
A. It matches any string containing 10 consecutive digits anywhere
B. It throws an error
C. It only matches the first digit
D. It is not valid Dart

**22.** What is the role of `FocusNode`?
A. Controlling and observing the focus state of a field
B. Validating input
C. Formatting text
D. Storing the text value

**23.** How do you move focus to the next field programmatically?
A. `FocusScope.of(context).nextFocus()`
B. `focusNode.next()`
C. `Form.next()`
D. `Navigator.next()`

**24.** How do you dismiss the keyboard?
A. `FocusScope.of(context).unfocus()`
B. `Navigator.pop()`
C. `setState(() {})`
D. `keyboard.hide()`

**25.** Which callback fires when the user presses the keyboard's action button on a TextFormField?
A. `onChanged`  B. `onFieldSubmitted`  C. `onSaved`  D. `onEditingComplete` only

**26.** Which callback fires on every keystroke?
A. `onChanged`  B. `onSaved`  C. `validator`  D. `onFieldSubmitted`

**27.** Which is the correct pattern for a submit button?
```dart
if (_formKey.currentState!.___) { _formKey.currentState!.___; submit(); }
```
A. `validate()` … `save()`
B. `save()` … `validate()`
C. `reset()` … `validate()`
D. `check()` … `store()`

**28.** How can a draft of a form be saved so it survives app restarts?
A. Store field values in SharedPreferences (or a local DB) on change, restore in `initState`
B. Use `const` fields
C. Flutter does it automatically
D. Use a GlobalKey

**29.** Which Scaffold property prevents the keyboard from covering the focused field?
A. `resizeToAvoidBottomInset: true`  B. `extendBody: true`  C. `primary: true`  D. `keyboardAware: true`

**30.** Which widget wraps a form so it can scroll when the keyboard appears?
A. `SingleChildScrollView`  B. `Stack`  C. `Wrap`  D. `Expanded`

**31.** For accessibility, which is important when building forms?
A. Meaningful labels, correct focus traversal order, and sufficient contrast
B. Using only icons
C. Disabling the keyboard
D. Avoiding validation

**32.** Which is TRUE about `FocusNode`?
A. It must be disposed like a controller
B. It is automatically disposed
C. It cannot be created manually
D. It replaces TextEditingController

### ĐÁP ÁN M7
1-B · 2-B · 3-B · 4-B · 5-A · 6-B · 7-A · 8-C · 9-B · 10-A · 11-B · 12-A · 13-B · 14-A · 15-A · 16-B · 17-A · 18-A · 19-A · 20-D · 21-A · 22-A · 23-A · 24-A · 25-B · 26-A · 27-A · 28-A · 29-A · 30-A · 31-A · 32-A

**Giải thích các câu dễ sai:**
- **2, 3:** Rất nhiều bạn chọn ngược: **`null` = hợp lệ**, trả String = báo lỗi. Nhớ "không có gì để nói = không có lỗi".
- **20, 21:** Phải có neo `^...$`. Không neo thì `"abc1234567890"` vẫn khớp.
- **19:** `keyboardType` chỉ gợi ý bàn phím, không chặn được dán/bàn phím vật lý → cần `inputFormatters` + `validator`.
- **32:** `FocusNode` cũng phải dispose, hay bị quên.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M7) — bấm để mở</b></summary>

**1. Đáp án B** — `TextFormField` hỗ trợ `validator` và tích hợp với widget `Form` (validate/save chung), còn `TextField` là ô nhập cơ bản không có validation tích hợp.

**2. Đáp án B** — Khi input hợp lệ, `validator` trả về `null` để báo không có lỗi.

**3. Đáp án B** — Khi input không hợp lệ, `validator` trả về chuỗi (String) thông báo lỗi để hiển thị dưới ô nhập.

**4. Đáp án B** — Muốn truy cập trạng thái của Form cần `GlobalKey<FormState>` gán vào `Form(key: ...)`.

**5. Đáp án A** — `_formKey.currentState!.validate()` chạy validator của mọi field và trả true nếu tất cả hợp lệ.

**6. Đáp án B** — `save()` gọi callback `onSaved` của từng field để lưu giá trị vào biến của bạn; nó không ghi ra đĩa hay gửi server.

**7. Đáp án A** — `reset()` xóa nội dung mọi field và xóa lỗi validation, đưa Form về trạng thái ban đầu.

**8. Đáp án C** — `AutovalidateMode.onUserInteraction` chỉ validate sau khi người dùng đã tương tác với field, tránh báo lỗi ngay khi form vừa mở.

**9. Đáp án B** — Mặc định `AutovalidateMode` là `disabled`, tức chỉ validate khi bạn gọi `validate()` thủ công.

**10. Đáp án A** — Phải `dispose` `TextEditingController` để giải phóng bộ nhớ và các listener nó giữ, tránh rò rỉ (memory leak).

**11. Đáp án B** — Gọi `controller.dispose()` trong `dispose()` của State (giai đoạn widget bị gỡ khỏi cây), không phải trong initState hay build.

**12. Đáp án A** — Đọc nội dung hiện tại của field điều khiển qua `controller.text`.

**13. Đáp án B** — `obscureText: true` ẩn ký tự nhập (hiển thị dạng chấm) cho ô mật khẩu.

**14. Đáp án A** — `keyboardType: TextInputType.emailAddress` hiển thị bàn phím tối ưu cho email (có sẵn @ và dấu chấm).

**15. Đáp án A** — `textInputAction` đổi nút hành động ở góc phải dưới bàn phím (ví dụ next, done, search).

**16. Đáp án B** — `errorText` trong `InputDecoration` hiển thị thông báo lỗi cố định dưới ô nhập. ≠ helperText/hintText vì chúng chỉ là gợi ý, không phải lỗi.

**17. Đáp án A** — `labelText` nổi lên phía trên khi ô được focus hoặc có nội dung, còn `hintText` chỉ hiện gợi ý khi ô đang trống.

**18. Đáp án A** — `inputFormatters: [FilteringTextInputFormatter.digitsOnly]` chặn ký tự không phải số ngay khi gõ. `keyboardType` chỉ gợi ý bàn phím chứ không ép buộc.

**19. Đáp án A** — `keyboardType: TextInputType.number` chỉ gợi ý loại bàn phím; người dùng vẫn có thể dán ký tự khác vào, nên chưa đảm bảo chỉ có số.

**20. Đáp án D** — `RegExp(r'^\d{10}$').hasMatch(value!)` với anchor `^` và `$` đảm bảo chuỗi đúng đúng 10 chữ số. ≠ `length == 10` vì nó không loại được chữ cái.

**21. Đáp án A** — `RegExp(r'\d{10}')` không có anchor sẽ khớp bất kỳ chuỗi nào chứa 10 chữ số liên tiếp ở bất kỳ đâu (ví dụ 'abc0123456789xyz' vẫn khớp), nên cho kết quả sai.

**22. Đáp án A** — `FocusNode` điều khiển và theo dõi trạng thái focus của một field (đang focus hay không, yêu cầu/bỏ focus).

**23. Đáp án A** — Chuyển focus sang field kế tiếp bằng `FocusScope.of(context).nextFocus()`.

**24. Đáp án A** — Ẩn bàn phím bằng `FocusScope.of(context).unfocus()` (bỏ focus khỏi mọi field).

**25. Đáp án B** — `onFieldSubmitted` kích hoạt khi người dùng nhấn nút hành động của bàn phím trên một `TextFormField`.

**26. Đáp án A** — `onChanged` chạy sau mỗi lần gõ phím (mỗi lần nội dung thay đổi).

**27. Đáp án A** — Mẫu nút submit đúng: kiểm tra `validate()` trả true rồi mới `save()` để thu thập dữ liệu, sau đó gửi đi.

**28. Đáp án A** — Lưu bản nháp bền qua lần khởi động lại bằng cách ghi giá trị field vào `SharedPreferences` (hoặc DB cục bộ) khi thay đổi, và phục hồi trong `initState`.

**29. Đáp án A** — `resizeToAvoidBottomInset: true` (mặc định) khiến Scaffold thu nhỏ body khi bàn phím hiện, tránh che field đang focus.

**30. Đáp án A** — `SingleChildScrollView` bọc form giúp cuộn khi bàn phím xuất hiện, tránh overflow và che mất field.

**31. Đáp án A** — Form dễ tiếp cận (accessibility) cần nhãn có ý nghĩa, thứ tự duyệt focus đúng và độ tương phản đủ.

**32. Đáp án A** — `FocusNode` phải được `dispose` giống như controller (nó không tự giải phóng) để tránh rò rỉ tài nguyên.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m8"></a>
# MODULE 8 — NETWORKING & JSON

**1.** Which package is the standard for HTTP requests in Flutter?
A. `dio` only  B. `http`  C. `retrofit`  D. `socket_io`

**2.** Which library provides `jsonEncode` and `jsonDecode`?
A. `dart:io`  B. `dart:convert`  C. `dart:async`  D. `package:json`

**3.** What does `jsonDecode` return for a JSON array of objects?
A. `List<Map<String, dynamic>>` (as `dynamic`)
B. `Map<String, dynamic>`
C. A Dart class instance
D. A String

**4.** Which permission is required on Android for network access?
A. `INTERNET`  B. `NETWORK_STATE`  C. `ACCESS_NETWORK`  D. None

**5.** In which file is that permission declared?
A. `pubspec.yaml`  B. `AndroidManifest.xml`  C. `build.gradle`  D. `main.dart`

**6.** How is a URL passed to `http.get`?
A. As a String  B. As `Uri.parse('...')`  C. As a `URL` object  D. As a Map

**7.** Which status code indicates a successful resource creation?
A. 200  B. 201  C. 204  D. 301

**8.** Which status code means the client is not authenticated?
A. 400  B. 401  C. 403  D. 404

**9.** What is the difference between 401 and 403?
A. 401 = not authenticated; 403 = authenticated but not permitted
B. They are identical
C. 403 means the page does not exist
D. 401 is a server error

**10.** If the server returns 500, what happens to `http.get()`?
A. It throws a SocketException
B. It completes normally; you must check `statusCode` yourself
C. It returns null
D. It retries automatically

**11.** What does a `SocketException` indicate?
A. The server returned 500
B. The device has no connection or the server is unreachable — the socket failed before an HTTP response
C. Malformed JSON
D. An invalid SSL certificate

**12.** Which exception is thrown when `jsonDecode` receives invalid JSON?
A. `FormatException`  B. `SocketException`  C. `TypeError`  D. `HttpException`

**13.** Which exception relates to an invalid SSL certificate?
A. `HandshakeException`  B. `SocketException`  C. `TimeoutException`  D. `TlsError`

**14.** How do you enforce a 10-second limit on a request?
A. `http.get(uri).timeout(Duration(seconds: 10))`
B. `http.get(uri, timeout: 10)`
C. Set it in pubspec.yaml
D. It is not possible

**15.** Which exception does `.timeout()` throw?
A. `TimeoutException`  B. `SocketException`  C. `DeadlineException`  D. `StateError`

**16.** Which is the idiomatic factory constructor pattern for building a model from JSON?
A. `User.fromMap(Map map)` as a static method
B. `factory User.fromJson(Map<String, dynamic> json) => User(...)`
C. `User.deserialize(String jsonString)`
D. `User(json: Map)` as a named constructor

**17.** What is the purpose of `toJson()` on a model?
A. Converting the object into a Map for encoding and sending
B. Parsing JSON
C. Validating data
D. Formatting for display

**18.** Which packages generate serialisation code automatically?
A. `json_serializable` + `build_runner`
B. `provider` + `hive`
C. `http` + `dio`
D. `mockito` + `test`

**19.** Which command runs the code generator?
A. `dart run build_runner build`  B. `flutter generate`  C. `dart compile`  D. `flutter pub codegen`

**20.** How should the structure of an API response be validated against a JSON Schema?
A. Dart's type system does it automatically
B. `json_serializable`'s `@JsonSchema` annotation
C. Use the `json_schema` package to validate the decoded Map before calling `fromJson`
D. It is impossible in Flutter

**21.** Which widget renders UI based on the state of a Future?
A. `StreamBuilder`  B. `FutureBuilder`  C. `AsyncBuilder`  D. `LayoutBuilder`

**22.** Which `ConnectionState` indicates the Future is still running?
A. `none`  B. `waiting`  C. `active`  D. `done`

**23.** How do you detect an error inside a FutureBuilder?
A. `snapshot.hasError` / `snapshot.error`
B. `try/catch` around the builder
C. `snapshot.failed`
D. `snapshot.state == error`

**24.** Why is `future: fetchData()` written directly inside `build()` a bug?
A. It causes a compile error
B. Every rebuild triggers a new API call, potentially in an endless loop
C. It disables caching
D. It is actually recommended

**25.** What is the correct fix?
A. Initialise the future once in `initState()` and store it in a field
B. Use `const` on the FutureBuilder
C. Call `setState` in the builder
D. Use `StreamBuilder` instead

**26.** Which property provides data to a StreamBuilder before the first event arrives?
A. `initialData`  B. `defaultValue`  C. `placeholder`  D. `seed`

**27.** Which is the recommended way to show a loading spinner?
A. `CircularProgressIndicator` while `connectionState == waiting`
B. A blank screen
C. `Text('Loading')` always
D. Blocking the UI thread

**28.** Which is a proper "empty state" check?
A. `!snapshot.hasData || snapshot.data!.isEmpty`
B. `snapshot.data == 0`
C. `snapshot.hasError`
D. `snapshot.connectionState == none`

**29.** What is exponential backoff?
A. Retrying with progressively longer waits (1s, 2s, 4s…)
B. Retrying immediately in a loop
C. Reducing payload size
D. Compressing responses

**30.** Which caching pattern describes: show cached data immediately, then refresh from the API in the background?
A. Read-through  B. Write-through  C. Stale-while-revalidate  D. Cache-aside

**31.** Which pattern only calls the API when the cache is empty?
A. Cache-aside  B. Stale-while-revalidate  C. Write-behind  D. Read-through

**32.** Which package detects network connectivity changes?
A. `connectivity_plus`  B. `http`  C. `path_provider`  D. `shared_preferences`

**33.** Why should a single `http.Client` be reused for multiple requests?
A. It reuses the underlying connection, improving performance
B. It is required by Flutter
C. It enables caching automatically
D. It prevents SocketException

**34.** Which HTTP method is used to fully replace a resource?
A. `GET`  B. `POST`  C. `PUT`  D. `PATCH`

**35.** Which is used for a partial update?
A. `PUT`  B. `PATCH`  C. `POST`  D. `DELETE`

**36.** How do you send a JSON body in a POST request?
A. `body: jsonEncode(map)` with header `Content-Type: application/json`
B. `body: map` directly
C. `params: map`
D. `json: map`

**37.** Where is the bearer token normally placed?
A. In the URL query  B. In the `Authorization` header  C. In the body  D. In a cookie only

**38.** What is the danger of storing an API key in a `.env` asset file?
A. It is bundled into the APK and can be extracted by decompiling
B. It cannot be read at runtime
C. It slows down the app
D. There is no risk

**39.** After editing a `.env` file, why must the app be rebuilt?
A. The file is bundled as a Flutter asset at build time
B. dotenv caches to SharedPreferences
C. It is fetched from the network
D. It uses compile-time constants

**40.** Which is the correct layering to keep networking testable?
A. Widget → Repository → DataSource (http)
B. Widget → http directly
C. http → Widget
D. Repository → Widget → http

### ĐÁP ÁN M8
1-B · 2-B · 3-A · 4-A · 5-B · 6-B · 7-B · 8-B · 9-A · 10-B · 11-B · 12-A · 13-A · 14-A · 15-A · 16-B · 17-A · 18-A · 19-A · 20-C · 21-B · 22-B · 23-A · 24-B · 25-A · 26-A · 27-A · 28-A · 29-A · 30-C · 31-A · 32-A · 33-A · 34-C · 35-B · 36-A · 37-B · 38-A · 39-A · 40-A

**Giải thích các câu dễ sai:**
- **10, 11:** Cặp bẫy quan trọng. **500 không ném exception** (vẫn là response hợp lệ). SocketException là lỗi **trước khi** có response.
- **24, 25:** Lỗi FutureBuilder phổ biến nhất của môn này — gần như chắc chắn có trong đề.
- **30, 31:** Stale-while-revalidate **luôn** gọi API nền; cache-aside **chỉ** gọi khi cache rỗng.
- **38:** `.env` không phải cơ chế bảo mật — chỉ để tách cấu hình. Secret thật phải giữ ở server.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M8) — bấm để mở</b></summary>

**1. Đáp án B** — Package `http` là thư viện chuẩn, chính thức của nhóm Dart/Flutter để gửi request HTTP (GET/POST...). `dio` mạnh nhưng là bên thứ ba (≠ 'chuẩn'), `retrofit` chỉ là lớp generator chạy trên http/dio, còn `socket_io` dành cho realtime websocket chứ không phải REST.

**2. Đáp án B** — `jsonEncode` và `jsonDecode` nằm trong thư viện lõi `dart:convert`. `dart:io` lo file/socket, `dart:async` lo Future/Stream, còn `package:json` không tồn tại như thư viện chuẩn.

**3. Đáp án A** — Một mảng JSON các object sau khi `jsonDecode` trả về `List<dynamic>` mà mỗi phần tử là `Map<String, dynamic>` (kiểu tĩnh là `dynamic`). Nó KHÔNG tự thành instance lớp Dart (phải tự map qua `fromJson`) và cũng không phải một `Map` đơn hay `String`.

**4. Đáp án A** — Truy cập mạng trên Android cần khai báo quyền `INTERNET`. `NETWORK_STATE`/`ACCESS_NETWORK_STATE` chỉ để kiểm tra trạng thái kết nối, không đủ để gọi API.

**5. Đáp án B** — Quyền Android được khai báo trong `AndroidManifest.xml` bằng thẻ `<uses-permission>`. `pubspec.yaml` khai báo dependency Flutter, `build.gradle` cấu hình build chứ không khai quyền runtime này.

**6. Đáp án B** — `http.get` nhận đối tượng `Uri`, nên phải bọc URL bằng `Uri.parse('...')`. Truyền String thẳng sẽ không biên dịch được vì sai kiểu tham số.

**7. Đáp án B** — 201 Created báo tài nguyên đã được tạo thành công (thường trả về sau POST). ≠ 200 (OK chung), ≠ 204 (thành công nhưng không có nội dung), ≠ 301 (chuyển hướng).

**8. Đáp án B** — 401 Unauthorized = client CHƯA xác thực (thiếu/sai token hoặc credential). ≠ 400 (request sai định dạng), ≠ 403 (đã xác thực nhưng không đủ quyền), ≠ 404 (không tìm thấy).

**9. Đáp án A** — 401 = chưa đăng nhập/xác thực (server chưa biết bạn là ai); 403 = đã xác thực nhưng KHÔNG được phép truy cập tài nguyên đó. Đây là điểm phân biệt cốt lõi giữa authentication và authorization.

**10. Đáp án B** — Với mã 500, `http.get()` vẫn hoàn tất bình thường và trả về `Response` — vì server ĐÃ trả lời (chỉ là lỗi phía server). Bạn phải tự kiểm tra `response.statusCode`. Nó không ném SocketException (lỗi đó xảy ra khi socket hỏng trước khi có phản hồi HTTP) và không tự retry.

**11. Đáp án B** — `SocketException` nghĩa là socket thất bại TRƯỚC khi nhận được phản hồi HTTP: máy không có mạng, DNS lỗi, hoặc server không tiếp cận được. Khác lỗi 500 (server đã phản hồi), lỗi JSON (FormatException) hay lỗi chứng chỉ SSL (HandshakeException).

**12. Đáp án A** — `jsonDecode` gặp chuỗi JSON không hợp lệ sẽ ném `FormatException` (lỗi định dạng khi phân tích). SocketException là lỗi mạng, TypeError là ép kiểu sai, HttpException là lỗi tầng HTTP khác.

**13. Đáp án A** — Chứng chỉ SSL/TLS không hợp lệ khi bắt tay bảo mật sẽ ném `HandshakeException`. SocketException là lỗi kết nối chung, TimeoutException là hết giờ, còn `TlsError` không phải kiểu ngoại lệ chuẩn.

**14. Đáp án A** — Giới hạn thời gian bằng cách nối `.timeout(Duration(seconds: 10))` vào Future trả về từ `http.get(uri)`. `http.get` không có tham số `timeout:`, và không cấu hình trong pubspec được.

**15. Đáp án A** — Khi vượt quá thời gian, `.timeout()` ném `TimeoutException`. Các lựa chọn còn lại (SocketException, DeadlineException, StateError) không phải ngoại lệ mà `.timeout()` phát ra.

**16. Đáp án B** — Mẫu chuẩn (idiomatic) là dùng `factory` constructor: `factory User.fromJson(Map<String, dynamic> json) => User(...)`, cho phép trả về object đã dựng từ Map. Các phương án còn lại không đúng quy ước đặt tên/chữ ký thường dùng trong Flutter.

**17. Đáp án A** — `toJson()` làm chiều ngược lại `fromJson`: biến object Dart thành `Map<String, dynamic>` để `jsonEncode` mã hóa rồi gửi lên server (ví dụ trong body POST). Nó không dùng để parse, validate hay format hiển thị.

**18. Đáp án A** — Bộ đôi `json_serializable` (sinh code) + `build_runner` (chạy generator) tự tạo hàm `fromJson`/`toJson`, giúp khỏi viết tay. Các cặp còn lại là state management/storage, networking, hoặc testing.

**19. Đáp án A** — Lệnh chạy bộ sinh code là `dart run build_runner build`. `flutter generate`, `dart compile`, `flutter pub codegen` không phải lệnh chạy code generator này.

**20. Đáp án C** — Dùng package `json_schema` để kiểm tra cấu trúc của `Map` đã decode theo một schema định nghĩa sẵn TRƯỚC khi gọi `fromJson`. Hệ kiểu Dart không tự kiểm tra JSON động, và `@JsonSchema` không phải annotation có thật.

**21. Đáp án B** — `FutureBuilder` dựng UI theo trạng thái của một `Future` (loading/success/error) trong một chỗ. `StreamBuilder` dành cho Stream, còn `AsyncBuilder`/`LayoutBuilder` không phục vụ mục đích này (LayoutBuilder lo kích thước layout).

**22. Đáp án B** — `ConnectionState.waiting` nghĩa là Future đang chạy, chưa xong — đây là lúc hiển thị spinner. `none` = chưa gắn future, `active` chủ yếu cho Stream, `done` = đã hoàn tất.

**23. Đáp án A** — Kiểm tra lỗi trong FutureBuilder bằng `snapshot.hasError` và đọc chi tiết ở `snapshot.error`. Không dùng try/catch quanh builder được (lỗi nằm trong Future, đã được snapshot bắt lại), và `snapshot.failed`/`snapshot.state` không tồn tại.

**24. Đáp án B** — Viết `future: fetchData()` trực tiếp trong `build()` khiến MỖI lần rebuild lại tạo một Future mới → gọi API lại liên tục, có thể thành vòng lặp vô tận. Đây là lỗi kinh điển được cảnh báo trong slide Common Pitfalls.

**25. Đáp án A** — Cách sửa đúng: khởi tạo Future MỘT LẦN trong `initState()` và lưu vào một field (vd `_futurePosts`), rồi truyền field đó cho FutureBuilder. Nhờ vậy rebuild không tạo lại request.

**26. Đáp án A** — `initialData` cung cấp dữ liệu ban đầu cho StreamBuilder (hoặc FutureBuilder) trước khi sự kiện đầu tiên tới, giúp UI có nội dung ngay. `defaultValue`/`placeholder`/`seed` không phải property này.

**27. Đáp án A** — Trong lúc chờ dữ liệu (`connectionState == waiting`), hiển thị `CircularProgressIndicator` để báo đang tải. Màn hình trống, Text('Loading') cố định, hay chặn UI thread đều là UX kém.

**28. Đáp án A** — Trạng thái 'rỗng' đúng là kiểm tra `!snapshot.hasData || snapshot.data!.isEmpty` (không có dữ liệu HOẶC danh sách rỗng). `data == 0` sai kiểu, `hasError` là nhánh lỗi, `connectionState == none` không phải empty state.

**29. Đáp án A** — Exponential backoff = thử lại với thời gian chờ tăng dần theo cấp số nhân (1s, 2s, 4s...) để giảm tải cho server đang lỗi. Khác với retry ngay lập tức trong vòng lặp, giảm payload hay nén dữ liệu.

**30. Đáp án C** — Mẫu 'hiện dữ liệu cache ngay lập tức rồi âm thầm gọi API làm mới nền' chính là stale-while-revalidate — nền tảng của offline-first. ≠ cache-aside (chỉ gọi API khi cache rỗng).

**31. Đáp án A** — Cache-aside (lazy loading): UI hỏi cache trước, chỉ khi cache RỖNG mới gọi API rồi đổ vào cache. Khác stale-while-revalidate luôn gọi API nền dù cache có sẵn dữ liệu.

**32. Đáp án A** — `connectivity_plus` phát hiện thay đổi trạng thái kết nối mạng (wifi/mobile/none). `http` để gọi mạng, `path_provider` lấy đường dẫn, `shared_preferences` lưu key-value.

**33. Đáp án A** — Dùng lại một `http.Client` cho nhiều request giúp tái sử dụng kết nối TCP/HTTP bên dưới (keep-alive) → tăng hiệu năng. Nó không phải bắt buộc, không tự bật cache, cũng không ngăn được SocketException.

**34. Đáp án C** — `PUT` dùng để thay thế TOÀN BỘ tài nguyên. `PATCH` chỉ cập nhật một phần, `POST` tạo mới, `GET` chỉ đọc.

**35. Đáp án B** — `PATCH` dùng cho cập nhật MỘT PHẦN tài nguyên (chỉ gửi các trường thay đổi). PUT thay toàn bộ, POST tạo mới, DELETE xóa.

**36. Đáp án A** — Gửi JSON body: đặt `body: jsonEncode(map)` và thêm header `Content-Type: application/json`. Truyền `map` thẳng sẽ bị mã hóa dạng form-urlencoded, còn `params:`/`json:` không phải tham số của http.post.

**37. Đáp án B** — Bearer token đặt trong header `Authorization` (dạng `Authorization: Bearer <token>`). Để trong query URL dễ bị lộ/log lại, để trong body không đúng chuẩn, cookie-only không phải cách thông thường cho API token.

**38. Đáp án A** — File `.env` được đóng gói (bundle) như một asset vào trong APK; kẻ tấn công có thể decompile APK để trích xuất API key. Vì vậy asset `.env` KHÔNG bảo mật thật sự cho khóa nhạy cảm.

**39. Đáp án A** — `.env` được nhúng như một Flutter asset TẠI THỜI ĐIỂM BUILD, nên sửa file xong phải build lại app để asset mới được đóng gói. Nó không cache vào SharedPreferences, không tải qua mạng, cũng không phải hằng số biên dịch.

**40. Đáp án A** — Phân lớp giúp test được: Widget → Repository → DataSource (http). Repository/DataSource tách networking ra khỏi UI nên có thể mock để unit test. Gọi `http` thẳng trong Widget khiến khó test và khó tái sử dụng.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m9"></a>
# MODULE 9 — LOCAL STORAGE & PERSISTENCE

**1.** What is the correct way to obtain a SharedPreferences instance?
A. `SharedPreferences()`
B. `await SharedPreferences.getInstance()`
C. `SharedPreferences.open()`
D. `SharedPreferences.getDefault()`

**2.** Which method saves an integer?
A. `putInt('key', v)`  B. `saveInt('key', v)`  C. `writeInt('key', v)`  D. `setInt('key', v)`

**3.** Which types can SharedPreferences store?
A. Any object
B. `int`, `double`, `bool`, `String`, `List<String>`
C. Only String
D. Only primitives except double

**4.** How do you persist a custom object in SharedPreferences?
A. Encode it to a JSON String with `jsonEncode` and store the String
B. Pass the object directly to `setObject`
C. It is not possible in any way
D. Use `setMap`

**5.** What does `prefs.getString('missing')` return if the key does not exist?
A. An empty string  B. `null`  C. Throws  D. `'null'`

**6.** Which method removes ALL key-value pairs?
A. `clear()`  B. `removeAll()`  C. `reset()`  D. `deleteAll()`

**7.** Which method removes a single key?
A. `remove(key)`  B. `delete(key)`  C. `erase(key)`  D. `unset(key)`

**8.** Are the `set...` methods synchronous?
A. Yes  B. No, they return `Future<bool>`  C. Only on Android  D. Only for String

**9.** Are the `get...` methods asynchronous?
A. Yes  B. No, they are synchronous once the instance is obtained  C. Only for List  D. Only on iOS

**10.** Two isolates write to SharedPreferences at the same time. What is the risk?
A. A DeadlockException is thrown
B. Race conditions — one write may overwrite the other, as the plugin is not isolate-safe
C. Writes are automatically synchronised
D. File-level locking makes it completely safe

**11.** Why should authentication tokens NOT be stored in SharedPreferences in production?
A. The data is not encrypted and can be read on a rooted/jailbroken device
B. It is too slow
C. It has a 1KB limit
D. It does not persist

**12.** Which package stores sensitive values securely?
A. `flutter_secure_storage`  B. `shared_preferences`  C. `path_provider`  D. `hive`

**13.** Which package provides SQLite access in Flutter?
A. `sqflite`  B. `sqlite3_flutter`  C. `room`  D. `moor_db`

**14.** Which callback creates the initial database schema?
A. `onCreate`  B. `onOpen`  C. `onUpgrade`  D. `onConfigure`

**15.** When is `onUpgrade` called?
A. When the `version` number passed to `openDatabase` is higher than the stored version
B. Every launch
C. When the app is updated on the store
D. Never automatically

**16.** SQLite has no BOOLEAN type. How is a boolean usually stored?
A. As `TEXT` 'true'/'false'  B. As `INTEGER` 0/1  C. As `BLOB`  D. As `REAL`

**17.** How is a DateTime typically stored?
A. As `TEXT` in ISO8601 or `INTEGER` milliseconds since epoch
B. As a native DATE type
C. As `BLOB`
D. It cannot be stored

**18.** What does `db.insert()` return?
A. `Future<int>` — the row id of the inserted row
B. `Future<bool>`
C. `Future<void>`
D. The inserted Map

**19.** What does `db.delete()` return?
A. `Future<int>` — the number of rows deleted
B. `Future<bool>` indicating success
C. The deleted row
D. `Future<void>`

**20.** What does `db.update()` return?
A. The number of rows affected  B. `true`  C. The updated row  D. Nothing

**21.** What does `db.query()` return?
A. `Future<List<Map<String, dynamic>>>`
B. `Future<List<Object>>`
C. A ResultSet
D. A Stream

**22.** Why should you use `where: 'id = ?'` with `whereArgs` instead of string interpolation?
A. It prevents SQL injection and handles escaping
B. It is faster to type
C. It is required by Dart
D. It enables indexing

**23.** Which `ConflictAlgorithm` overwrites an existing row with the same primary key?
A. `replace`  B. `ignore`  C. `abort`  D. `fail`

**24.** Which is the default `ConflictAlgorithm`?
A. `replace`  B. `abort`  C. `ignore`  D. `rollback`

**25.** Which method executes DDL such as CREATE TABLE?
A. `execute()`  B. `query()`  C. `insert()`  D. `rawUpdate()`

**26.** Which package provides a path to the app's documents directory?
A. `path_provider`  B. `path`  C. `file_picker`  D. `dart:io`

**27.** Which function joins path segments safely?
A. `join()` from the `path` package  B. String `+`  C. `Path.combine`  D. `Uri.resolve`

**28.** Which storage option is a NoSQL, key-value store written in pure Dart?
A. Hive  B. sqflite  C. SharedPreferences  D. Firestore

**29.** When is SQLite preferable to SharedPreferences?
A. When data is large, structured, related, or needs querying
B. When storing a single boolean flag
C. When speed is the only concern
D. Never

**30.** Which describes a "last-write-wins" conflict resolution strategy?
A. The most recently updated record overwrites the other
B. Both records are merged
C. The conflict blocks the sync
D. The user always chooses

**31.** A common approach to offline sync marks records with:
A. `isSynced` and `updatedAt` fields
B. A random UUID only
C. A colour code
D. Nothing; sync is automatic

**32.** How would you export local data to a JSON file?
A. Map records to Maps, `jsonEncode` the list, write with `dart:io` `File` to a path from `path_provider`
B. Use `prefs.setStringList`
C. Use `db.export()`
D. It requires a server

**33.** Which is TRUE about database migrations?
A. Increasing `version` and handling `onUpgrade` is required when the schema changes
B. Flutter migrates schemas automatically
C. Migrations only work on Android
D. You must delete the app to change the schema

**34.** Where is SharedPreferences data physically stored on Android?
A. In an XML file in the app's private directory
B. In SQLite
C. In the keychain
D. On the SD card

**35.** Which is a valid reason to choose Hive over sqflite?
A. Very fast key-value access to Dart objects without SQL, and it works on all platforms including web
B. It supports complex SQL joins
C. It is built into Flutter
D. It provides encryption only

### ĐÁP ÁN M9
1-B · 2-D · 3-B · 4-A · 5-B · 6-A · 7-A · 8-B · 9-B · 10-B · 11-A · 12-A · 13-A · 14-A · 15-A · 16-B · 17-A · 18-A · 19-A · 20-A · 21-A · 22-A · 23-A · 24-B · 25-A · 26-A · 27-A · 28-A · 29-A · 30-A · 31-A · 32-A · 33-A · 34-A · 35-A

**Giải thích các câu dễ sai:**
- **2:** `setInt` (Flutter) chứ không `putInt` (Android native Java). Học PRM392 rồi rất dễ chọn nhầm.
- **6:** `clear()` — không có `removeAll/reset/deleteAll`.
- **8, 9:** Ghi là **async**, đọc là **đồng bộ**. Nhớ cặp bất đối xứng này.
- **18, 19, 20:** **insert trả id**, còn **update/delete trả số dòng**. Không có cái nào trả bool.
- **24:** Mặc định là `abort`, không phải `replace`.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M9) — bấm để mở</b></summary>

**1. Đáp án B** — Lấy instance bằng `await SharedPreferences.getInstance()` — đây là hàm bất đồng bộ trả về Future. Không có constructor `SharedPreferences()`, `open()` hay `getDefault()`.

**2. Đáp án D** — Lưu số nguyên bằng `setInt('key', v)`. SharedPreferences dùng tiền tố `set...` (setInt/setBool/setString...), không phải `put/save/write`.

**3. Đáp án B** — SharedPreferences chỉ lưu 5 kiểu nguyên thủy: `int`, `double`, `bool`, `String`, và `List<String>`. Không lưu object tùy ý (phải mã hóa JSON), và có hỗ trợ cả double.

**4. Đáp án A** — Muốn lưu object tùy chỉnh: `jsonEncode` nó thành chuỗi JSON rồi `setString` chuỗi đó (đọc lại thì decode). Không có `setObject`/`setMap`, nên phương án này là cách khả thi duy nhất.

**5. Đáp án B** — `getString('missing')` trả về `null` khi key không tồn tại (các getter khác cũng trả null). Nó không trả chuỗi rỗng, không ném lỗi, cũng không trả chuỗi `'null'`.

**6. Đáp án A** — `clear()` xóa TẤT CẢ cặp key-value. `removeAll`/`reset`/`deleteAll` không phải phương thức của SharedPreferences.

**7. Đáp án A** — `remove(key)` xóa một key cụ thể. `delete`/`erase`/`unset` không tồn tại trong API SharedPreferences.

**8. Đáp án B** — Các phương thức `set...` là bất đồng bộ, trả về `Future<bool>` (true nếu ghi thành công). Chúng không đồng bộ và không phụ thuộc nền tảng.

**9. Đáp án B** — Sau khi đã có instance, các getter `get...` là ĐỒNG BỘ (đọc từ bộ nhớ đã nạp sẵn), trả giá trị ngay không cần await. Chỉ việc lấy instance (getInstance) mới là async.

**10. Đáp án B** — Hai isolate ghi cùng lúc gây race condition — một lần ghi có thể đè lên lần kia vì plugin KHÔNG an toàn giữa các isolate (không khóa file). Không có DeadlockException tự động và không tự đồng bộ hóa.

**11. Đáp án A** — Không lưu token xác thực trong SharedPreferences vì dữ liệu KHÔNG được mã hóa, có thể bị đọc trên thiết bị đã root/jailbreak. Nên dùng `flutter_secure_storage`. Vấn đề không phải tốc độ, giới hạn 1KB hay tính bền vững.

**12. Đáp án A** — `flutter_secure_storage` lưu giá trị nhạy cảm an toàn (Keystore trên Android, Keychain trên iOS, có mã hóa). `shared_preferences` lưu thô, `path_provider` chỉ lấy đường dẫn, `hive` là NoSQL nhưng không tự mã hóa mặc định.

**13. Đáp án A** — `sqflite` là plugin cung cấp SQLite cho Flutter. `sqlite3_flutter`/`room`/`moor_db` không phải tên gói chuẩn dùng trong module này (Room là Android/Kotlin, Moor đã đổi tên thành Drift).

**14. Đáp án A** — Callback `onCreate` chạy khi DB được tạo lần đầu — nơi chạy `CREATE TABLE` để dựng schema ban đầu. `onOpen` chạy mỗi lần mở, `onUpgrade` khi nâng version, `onConfigure` để cấu hình trước khi tạo.

**15. Đáp án A** — `onUpgrade` được gọi khi `version` truyền vào `openDatabase` LỚN HƠN version đang lưu của DB — dùng để migrate schema. Không gọi mỗi lần khởi động, không gắn với việc cập nhật app trên store.

**16. Đáp án B** — SQLite không có kiểu BOOLEAN nên boolean thường lưu dưới dạng `INTEGER` 0/1 (0 = false, 1 = true). Đây cũng là cách demo Todo dùng (`isDone`: 0/1).

**17. Đáp án A** — `DateTime` thường lưu dạng `TEXT` chuẩn ISO8601, hoặc `INTEGER` số mili-giây kể từ epoch. SQLite không có kiểu DATE gốc nên phải quy ước một trong hai cách trên.

**18. Đáp án A** — `db.insert()` trả về `Future<int>` là id của hàng vừa chèn (rowid). Không trả bool, void hay Map.

**19. Đáp án A** — `db.delete()` trả về `Future<int>` là SỐ HÀNG bị xóa. Không trả bool thành/bại, hàng đã xóa hay void.

**20. Đáp án A** — `db.update()` trả về số hàng bị ẢNH HƯỞNG (đã cập nhật). Không trả true, hàng đã cập nhật hay không trả gì.

**21. Đáp án A** — `db.query()` trả về `Future<List<Map<String, dynamic>>>` — mỗi hàng là một Map, cần tự map sang model. Không phải ResultSet hay Stream.

**22. Đáp án A** — Dùng `where: 'id = ?'` kèm `whereArgs` để tham số được bind an toàn, ngăn SQL injection và tự xử lý escape ký tự. Nội suy chuỗi (string interpolation) dễ bị tấn công injection.

**23. Đáp án A** — `ConflictAlgorithm.replace` xóa hàng cũ cùng khóa chính rồi chèn hàng mới (ghi đè). `ignore` bỏ qua, `abort`/`fail` báo lỗi và hủy thao tác.

**24. Đáp án B** — Mặc định là `abort` — khi có xung đột, thao tác bị hủy và ném lỗi (không tự ghi đè). Muốn ghi đè phải chỉ định `replace`.

**25. Đáp án A** — `execute()` chạy các câu DDL/SQL thô như `CREATE TABLE` (không trả về hàng dữ liệu). `query` để đọc, `insert` để chèn hàng, `rawUpdate` cho UPDATE thô.

**26. Đáp án A** — `path_provider` cung cấp đường dẫn tới thư mục tài liệu của app (`getApplicationDocumentsDirectory()`). `path` chỉ nối/xử lý chuỗi đường dẫn, `file_picker` chọn file, `dart:io` đọc/ghi.

**27. Đáp án A** — Hàm `join()` của package `path` nối các đoạn đường dẫn đúng theo separator từng nền tảng (`/` hay `\`). Nối bằng `+` dễ sai separator; `Path.combine`/`Uri.resolve` không phải cách chuẩn ở đây.

**28. Đáp án A** — Hive là kho NoSQL key-value viết thuần Dart, truy cập object rất nhanh, không cần SQL. sqflite là SQL quan hệ, SharedPreferences chỉ key-value đơn giản, Firestore là dịch vụ đám mây.

**29. Đáp án A** — Chọn SQLite khi dữ liệu LỚN, có cấu trúc, có quan hệ, hoặc cần truy vấn/lọc/sắp xếp. Với một cờ boolean đơn thì SharedPreferences hợp hơn; tốc độ không phải tiêu chí duy nhất.

**30. Đáp án A** — 'Last-write-wins' = bản ghi được cập nhật GẦN NHẤT sẽ ghi đè bản kia khi xung đột. Không phải trộn (merge), không chặn sync, cũng không luôn hỏi người dùng.

**31. Đáp án A** — Sync offline thường đánh dấu bản ghi bằng cờ `isSynced` (đã đồng bộ chưa) và `updatedAt` (thời điểm sửa) để biết bản ghi nào cần đẩy lên và giải quyết xung đột. UUID hay mã màu không đủ, và sync không tự động.

**32. Đáp án A** — Xuất dữ liệu: map các bản ghi thành `Map`, `jsonEncode` cả danh sách thành chuỗi, rồi ghi bằng `File` của `dart:io` vào đường dẫn lấy từ `path_provider`. `setStringList`/`db.export()` không phù hợp và không cần server.

**33. Đáp án A** — Khi schema thay đổi, PHẢI tăng `version` và xử lý `onUpgrade` để migrate. Flutter không tự migrate schema; migration chạy trên mọi nền tảng hỗ trợ sqflite; không cần xóa app.

**34. Đáp án A** — Trên Android, SharedPreferences lưu vật lý trong một file XML tại thư mục riêng (private) của app. Không dùng SQLite, keychain hay thẻ SD.

**35. Đáp án A** — Chọn Hive vì truy cập key-value tới object Dart rất nhanh mà không cần SQL, và chạy trên MỌI nền tảng kể cả web (sqflite không chạy web). Hive không hỗ trợ JOIN SQL và không phải thứ built-in của Flutter.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m10"></a>
# MODULE 10 — AUTHENTICATION & USER MANAGEMENT

**1.** Which FirebaseAuth method signs a user in without any credentials?
A. `signInAnonymously()`  B. `signInAsGuest()`  C. `createAnonymousUser()`  D. `guestLogin()`

**2.** Which method registers a new email/password account?
A. `createUserWithEmailAndPassword()`
B. `registerUser()`
C. `signUpWithEmail()`
D. `newAccount()`

**3.** Which method signs in an existing email/password user?
A. `signInWithEmailAndPassword()`  B. `login()`  C. `authenticate()`  D. `signIn()`

**4.** Which error code means the email is already registered with a DIFFERENT sign-in provider?
A. `account-exists-with-different-credential`
B. `email-already-in-use`
C. `credential-already-in-use`
D. `provider-already-linked`

**5.** Which error code occurs when creating a new account with an email that already exists?
A. `email-already-in-use`  B. `account-exists-with-different-credential`  C. `user-not-found`  D. `invalid-email`

**6.** Which error code is thrown when the password is under 6 characters?
A. `weak-password`  B. `invalid-password`  C. `short-password`  D. `password-too-short`

**7.** Which exception type wraps Firebase Auth errors?
A. `FirebaseAuthException`  B. `AuthError`  C. `FirebaseException` only  D. `PlatformException` only

**8.** Which property gives the currently signed-in user (or null)?
A. `FirebaseAuth.instance.currentUser`
B. `FirebaseAuth.user`
C. `Auth.session`
D. `FirebaseAuth.instance.getUser()`

**9.** Which returns a Stream of authentication state changes?
A. `authStateChanges()`  B. `onAuthChanged()`  C. `userStream()`  D. `listenAuth()`

**10.** Which widget pairs naturally with `authStateChanges()`?
A. `StreamBuilder`  B. `FutureBuilder`  C. `LayoutBuilder`  D. `Builder`

**11.** Which method signs the user out?
A. `signOut()`  B. `logout()`  C. `disconnect()`  D. `endSession()`

**12.** Which method sends a password reset email?
A. `sendPasswordResetEmail(email: e)`  B. `resetPassword()`  C. `forgotPassword()`  D. `recoverAccount()`

**13.** Which is the correct navigation call after a successful login?
A. `pushReplacement` or `pushAndRemoveUntil`
B. `push`
C. `pop`
D. `popUntil`

**14.** Why is `push` inappropriate after login?
A. The login screen remains on the stack and the user can navigate back to it
B. It causes a memory leak
C. It is slower
D. It resets the theme

**15.** What is a "guarded route"?
A. A route that checks authentication/authorisation before allowing access
B. A route with an animation
C. A route with a password field
D. A route that cannot be popped

**16.** Which is a valid way to implement route guarding?
A. Check auth state in `onGenerateRoute`, use a wrapper widget, or a router redirect
B. Hide the navigation button only
C. Use `const` routes
D. Disable the back button

**17.** Where should session state (logged in / logged out) live?
A. In an app-level state holder (Provider/InheritedWidget), not in an individual widget
B. In each screen's `setState`
C. In a global mutable variable only
D. In the widget's constructor

**18.** Which storage is appropriate for a token in a production app?
A. `flutter_secure_storage`  B. `SharedPreferences`  C. A global variable  D. A text file in assets

**19.** What should happen when a token expires?
A. Attempt a refresh; if it fails, clear the session and navigate to login
B. Crash the app
C. Ignore it
D. Retry the same token indefinitely

**20.** What does logging out involve?
A. Clearing the token/session and clearing the navigation stack back to login
B. Only calling `pop()`
C. Restarting the device
D. Deleting the database always

**21.** Why is a "mock auth" acceptable for coursework but not production?
A. It does not verify credentials against a real, secure backend
B. It is slower
C. It does not compile in release mode
D. It cannot store tokens

**22.** Which is a security caveat of storing a token in SharedPreferences?
A. It is stored in plain text and readable on a compromised device
B. It expires immediately
C. It is shared with other apps by default
D. It cannot be deleted

**23.** Which method links an additional provider to an existing account?
A. `currentUser.linkWithCredential(credential)`
B. `signInWithCredential()`
C. `mergeAccounts()`
D. `addProvider()`

**24.** Which error occurs when trying to link a provider that is already linked?
A. `provider-already-linked`  B. `credential-already-in-use`  C. `email-already-in-use`  D. `operation-not-allowed`

**25.** Which method triggers a verification email?
A. `currentUser?.sendEmailVerification()`
B. `verifyEmail()`
C. `confirmEmail()`
D. `sendVerification()`

**26.** Which error code appears after too many failed sign-in attempts?
A. `too-many-requests`  B. `rate-limited`  C. `blocked`  D. `quota-exceeded`

**27.** In an app without Firebase, how would you typically authenticate?
A. POST credentials to a REST endpoint, receive a JWT, store it, attach it to subsequent requests
B. Store passwords locally and compare them
C. Use SharedPreferences as the auth server
D. Hard-code credentials in the app

**28.** Why should passwords never be stored on the device?
A. They can be extracted; only short-lived tokens should be persisted
B. They take too much space
C. Dart cannot store them
D. It breaks null safety

### ĐÁP ÁN M10
1-A · 2-A · 3-A · 4-A · 5-A · 6-A · 7-A · 8-A · 9-A · 10-A · 11-A · 12-A · 13-A · 14-A · 15-A · 16-A · 17-A · 18-A · 19-A · 20-A · 21-A · 22-A · 23-A · 24-A · 25-A · 26-A · 27-A · 28-A

**Giải thích các câu dễ sai:**
- **4 vs 5:** Phân biệt bằng **thời điểm**. `email-already-in-use` xảy ra lúc **đăng ký**. `account-exists-with-different-credential` xảy ra lúc **đăng nhập bằng provider khác** với email đã tồn tại.
- **1:** `signInAnonymously()` — ba đáp án còn lại là tên bịa nghe hợp lý.
- **13, 14:** Sau login luôn dùng `pushReplacement`, đây là câu hay ra ở dạng tình huống.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M10) — bấm để mở</b></summary>

**1. Đáp án A** — signInAnonymously() tạo phiên đăng nhập ẩn danh với một UID tạm, không cần email/mật khẩu — đúng nghĩa 'không cần credentials'. Các tên còn lại (signInAsGuest, createAnonymousUser, guestLogin) không tồn tại trong FirebaseAuth.

**2. Đáp án A** — createUserWithEmailAndPassword() là API chuẩn của FirebaseAuth để đăng ký tài khoản mới bằng email + mật khẩu. registerUser/signUpWithEmail/newAccount chỉ là tên bịa, không có trong SDK.

**3. Đáp án A** — signInWithEmailAndPassword() dùng để đăng nhập tài khoản email/mật khẩu ĐÃ tồn tại. ≠ createUserWithEmailAndPassword (dùng để tạo mới); login()/authenticate()/signIn() không phải API Firebase.

**4. Đáp án A** — account-exists-with-different-credential báo email đã đăng ký nhưng qua provider KHÁC (ví dụ đã đăng ký bằng Google, giờ đăng nhập bằng Facebook cùng email). ≠ email-already-in-use vì lỗi đó xảy ra khi tạo tài khoản email mới trùng, không liên quan provider.

**5. Đáp án A** — email-already-in-use là lỗi khi gọi createUserWithEmailAndPassword với email đã tồn tại. ≠ account-exists-with-different-credential (dành cho tình huống trùng email nhưng khác provider đăng nhập).

**6. Đáp án A** — Firebase yêu cầu mật khẩu tối thiểu 6 ký tự; ngắn hơn sẽ ném weak-password. Các mã invalid-password/short-password/password-too-short không tồn tại trong Firebase Auth.

**7. Đáp án A** — Mọi lỗi từ Firebase Auth được gói trong FirebaseAuthException, có thuộc tính .code để phân loại (weak-password, email-already-in-use...). Nhờ đó bạn catch on FirebaseAuthException để xử lý theo mã lỗi.

**8. Đáp án A** — FirebaseAuth.instance.currentUser trả về User đang đăng nhập, hoặc null nếu chưa. Đây là cách kiểm tra trạng thái đăng nhập tức thời (đồng bộ), khác với stream authStateChanges().

**9. Đáp án A** — authStateChanges() trả về Stream<User?> phát ra sự kiện mỗi khi trạng thái đăng nhập thay đổi (login/logout). Dùng để cập nhật UI tự động theo phiên.

**10. Đáp án A** — authStateChanges() là một Stream nên ghép tự nhiên với StreamBuilder để rebuild UI mỗi khi trạng thái auth đổi. ≠ FutureBuilder vì Future chỉ cho một giá trị một lần, không lắng nghe liên tục.

**11. Đáp án A** — signOut() kết thúc phiên đăng nhập hiện tại và xóa currentUser. logout()/disconnect()/endSession() không phải tên method của FirebaseAuth.

**12. Đáp án A** — sendPasswordResetEmail(email: e) gửi email chứa link đặt lại mật khẩu tới địa chỉ đó. Các tên resetPassword/forgotPassword/recoverAccount không có trong SDK.

**13. Đáp án A** — Sau khi đăng nhập nên dùng pushReplacement hoặc pushAndRemoveUntil để thay/xóa màn Login khỏi stack, chặn quay lại. Slide khuyên dùng pushReplacementNamed đúng theo tinh thần này.

**14. Đáp án A** — push() chỉ chồng Home lên trên nên màn Login vẫn còn trong stack, người dùng bấm back sẽ quay lại trang đăng nhập — điều không mong muốn sau khi đã login.

**15. Đáp án A** — Guarded route (route được bảo vệ) là route kiểm tra xác thực/phân quyền trước khi cho truy cập, chuyển hướng về Login nếu chưa đăng nhập. Không liên quan animation hay khóa pop.

**16. Đáp án A** — Có thể chặn route bằng nhiều cách: kiểm tra trạng thái auth trong onGenerateRoute, dùng widget bọc (wrapper), hoặc redirect của router (go_router). Chỉ ẩn nút bấm là không an toàn vì route vẫn truy cập được.

**17. Đáp án A** — Trạng thái phiên (đăng nhập/đăng xuất) nên đặt ở state holder cấp app (Provider/InheritedWidget) để mọi màn hình cùng đọc và phản ứng. Nếu để trong setState của từng màn thì trạng thái bị phân mảnh, khó đồng bộ.

**18. Đáp án A** — Token nhạy cảm nên lưu bằng flutter_secure_storage vì nó mã hóa (Keychain iOS / Keystore Android). ≠ SharedPreferences vì SharedPreferences lưu plaintext, dễ bị đọc trên thiết bị bị root/jailbreak.

**19. Đáp án A** — Khi access token hết hạn, đúng cách là thử refresh để lấy token mới; nếu refresh thất bại thì xóa phiên và điều hướng về Login. Không được crash hay lặp lại token cũ vô hạn.

**20. Đáp án A** — Đăng xuất là xóa token/phiên khỏi bộ nhớ và dọn navigation stack đưa về Login (pushAndRemoveUntil), tránh back lại vùng đã đăng nhập. Chỉ pop() là chưa xóa phiên.

**21. Đáp án A** — Mock auth chấp nhận được trong bài tập vì minh họa đúng luồng, nhưng không dùng thật vì nó không xác thực credential với backend an toàn — ai cũng qua được. Slide 9/12 nói rõ mock chỉ so khớp tài khoản demo.

**22. Đáp án A** — Lưu token trong SharedPreferences là plaintext, có thể bị đọc trên thiết bị bị xâm nhập (root/jailbreak). Vì vậy sản phẩm thật nên dùng secure storage.

**23. Đáp án A** — currentUser.linkWithCredential(credential) gắn thêm một provider (ví dụ Google) vào tài khoản hiện có để đăng nhập nhiều cách. ≠ signInWithCredential (dùng để đăng nhập, không liên kết vào tài khoản đang có).

**24. Đáp án A** — provider-already-linked xảy ra khi cố liên kết một provider đã được gắn vào tài khoản. ≠ credential-already-in-use (credential đó đã thuộc về một tài khoản khác).

**25. Đáp án A** — currentUser?.sendEmailVerification() gửi email xác minh cho người dùng vừa đăng ký. verifyEmail/confirmEmail/sendVerification không phải API của User.

**26. Đáp án A** — Sau quá nhiều lần đăng nhập sai, Firebase chặn tạm và ném too-many-requests (giới hạn tần suất để chống brute-force). Các mã rate-limited/blocked/quota-exceeded không phải mã của Firebase Auth.

**27. Đáp án A** — App không dùng Firebase thường tự xác thực bằng REST: POST credential lên endpoint, nhận về JWT, lưu token rồi đính kèm token vào header cho các request sau. Không bao giờ lưu và tự so mật khẩu tại máy.

**28. Đáp án A** — Mật khẩu không được lưu trên thiết bị vì có thể bị trích xuất; chỉ nên lưu token ngắn hạn (thu hồi được, hết hạn được) để giảm thiệt hại nếu lộ.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m11"></a>
# MODULE 11 — TESTING & DEBUGGING

**1.** Which test type verifies a single function or class in isolation?
A. Unit test  B. Widget test  C. Integration test  D. Golden test

**2.** Which test type renders a widget in a test environment and interacts with it?
A. Unit test  B. Widget test  C. Integration test  D. Smoke test

**3.** Which test type runs the full app on a real device or emulator?
A. Unit test  B. Widget test  C. Integration test  D. Static analysis

**4.** Which is fastest to run?
A. Unit test  B. Widget test  C. Integration test  D. All equal

**5.** Which package provides `testWidgets` and `WidgetTester`?
A. `flutter_test`  B. `test`  C. `mockito`  D. `integration_test`

**6.** Which function declares a widget test?
A. `test()`  B. `testWidgets()`  C. `widgetTest()`  D. `it()`

**7.** Which method renders a widget in a widget test?
A. `tester.pumpWidget(widget)`  B. `tester.render(widget)`  C. `tester.build(widget)`  D. `runApp(widget)`

**8.** What does `tester.pump()` do?
A. Triggers a single frame rebuild
B. Runs all animations to completion
C. Restarts the test
D. Disposes the widget

**9.** What does `tester.pumpAndSettle()` do?
A. Repeatedly pumps frames until no more are scheduled (animations finished)
B. Pumps exactly two frames
C. Waits one second
D. Cancels animations

**10.** Which finder locates a widget by its displayed text?
A. `find.text('Hello')`  B. `find.byLabel('Hello')`  C. `find.string('Hello')`  D. `find.content('Hello')`

**11.** Which finder locates a widget by its runtime type?
A. `find.byType(ElevatedButton)`  B. `find.widget(ElevatedButton)`  C. `find.class(ElevatedButton)`  D. `find.of(ElevatedButton)`

**12.** Which matcher asserts exactly one matching widget?
A. `findsOneWidget`  B. `findsWidgets`  C. `findsNothing`  D. `isNotNull`

**13.** Which matcher asserts no matching widget exists?
A. `findsNothing`  B. `findsZeroWidgets`  C. `isEmpty`  D. `findsNone`

**14.** Which method simulates a tap?
A. `tester.tap(finder)`  B. `tester.click(finder)`  C. `tester.press(finder)`  D. `tester.touch(finder)`

**15.** Which method enters text into a field during a test?
A. `tester.enterText(finder, 'abc')`  B. `tester.type(...)`  C. `tester.input(...)`  D. `tester.setText(...)`

**16.** Why are mocking libraries important in unit tests?
A. To display the UI during unit tests
B. To completely replace writing application logic
C. To automatically fix logic errors
D. To simulate responses from APIs or databases without real connections

**17.** Which is NOT a benefit of mocking?
A. Faster, deterministic tests
B. Ability to simulate errors and edge cases
C. Automatic bug fixing
D. No dependency on network availability

**18.** Which packages are used for mocking in Dart?
A. `mockito` or `mocktail`  B. `provider`  C. `dio`  D. `build_runner` alone

**19.** Which mockito/mocktail call defines a stubbed return value?
A. `when(() => api.fetch()).thenAnswer((_) async => data)`
B. `stub(api.fetch, data)`
C. `mock.returns(data)`
D. `expect(api.fetch, data)`

**20.** Which call asserts a method was invoked?
A. `verify(() => api.fetch()).called(1)`  B. `assert(api.called)`  C. `expectCall(api.fetch)`  D. `check(api.fetch)`

**21.** Which design pattern makes networking code mockable?
A. Repository Pattern (dependency injection of the data source)
B. Singleton
C. Builder
D. Observer

**22.** Which function runs before each test in a group?
A. `setUp()`  B. `before()`  C. `init()`  D. `beforeEach()`

**23.** Which function runs after each test?
A. `tearDown()`  B. `after()`  C. `cleanup()`  D. `dispose()`

**24.** Which groups related tests together?
A. `group()`  B. `describe()`  C. `suite()`  D. `context()`

**25.** Which command runs all tests?
A. `flutter test`  B. `dart run tests`  C. `flutter check`  D. `flutter analyze`

**26.** Which command reports static analysis issues?
A. `dart analyze`  B. `flutter test`  C. `dart format`  D. `flutter doctor`

**27.** In which build mode do `assert()` statements run?
A. Debug only  B. Release only  C. All modes  D. Profile only

**28.** Which tool visualises the widget tree and layout constraints at runtime?
A. Flutter DevTools Widget Inspector
B. Dart Analyzer
C. Gradle
D. Logcat

**29.** Which DevTools tab identifies jank and slow frames?
A. Performance / Timeline  B. Memory  C. Network  D. Logging

**30.** Which flag draws layout boundaries on screen for debugging?
A. `debugPaintSizeEnabled = true`  B. `showLayout = true`  C. `debugMode = true`  D. `paintBounds = true`

**31.** Which prints to the console without being truncated on Android?
A. `debugPrint()`  B. `print()`  C. `log()` only  D. `stdout.write()`

**32.** What is a "flaky" test?
A. A test that passes or fails inconsistently, often due to real network/timing dependencies
B. A test with no assertions
C. A test that is too slow
D. A deprecated test

**33.** Which is a good practice for test coverage?
A. Prioritise business logic and edge cases over trivial getters
B. Aim for 100% at any cost
C. Test only the UI
D. Skip error paths

### ĐÁP ÁN M11
1-A · 2-B · 3-C · 4-A · 5-A · 6-B · 7-A · 8-A · 9-A · 10-A · 11-A · 12-A · 13-A · 14-A · 15-A · 16-D · 17-C · 18-A · 19-A · 20-A · 21-A · 22-A · 23-A · 24-A · 25-A · 26-A · 27-A · 28-A · 29-A · 30-A · 31-A · 32-A · 33-A

**Giải thích các câu dễ sai:**
- **8 vs 9:** `pump()` = **một** frame; `pumpAndSettle()` = pump liên tục **đến khi hết animation**. Test có animation mà chỉ `pump()` thường fail.
- **16, 17:** Mock để **giả lập phụ thuộc bên ngoài**, không phải để thay code hay tự sửa lỗi.
- **21:** Đây là lý do thực dụng nhất của Repository Pattern — không có nó thì gần như không unit test được tầng dữ liệu.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M11) — bấm để mở</b></summary>

**1. Đáp án A** — Unit test kiểm thử một hàm/lớp riêng lẻ (logic) mà không cần UI hay thiết bị. Đây là loại nằm đáy tháp kiểm thử: nhanh, ổn định, rẻ.

**2. Đáp án B** — Widget test dựng (render) một widget trong môi trường test và tương tác với nó (gõ chữ, nhấn nút) để kiểm tra UI. ≠ Unit test vì unit test không dựng UI; ≠ Integration test vì widget test không chạy cả app trên thiết bị.

**3. Đáp án C** — Integration test chạy toàn bộ ứng dụng trên thiết bị/emulator thật để kiểm tra luồng người dùng đầu-cuối. Chậm và tốn kém nhất nên chỉ dùng cho luồng quan trọng.

**4. Đáp án A** — Unit test chạy nhanh nhất vì chỉ kiểm tra logic thuần, không dựng UI cũng không khởi động app — đúng lý do nó nằm đáy tháp kiểm thử (số lượng nhiều nhất).

**5. Đáp án A** — Gói flutter_test cung cấp testWidgets và WidgetTester để viết widget test. ≠ test (chỉ cho unit test Dart thuần), mockito (mocking), integration_test (test tích hợp).

**6. Đáp án B** — testWidgets() khai báo một widget test và cấp WidgetTester để thao tác. ≠ test() dùng cho unit test logic thuần; widgetTest()/it() không tồn tại.

**7. Đáp án A** — tester.pumpWidget(widget) dựng widget vào cây test để bắt đầu kiểm thử. ≠ runApp (dùng trong app thật, không dùng trong test); render/build không phải method của WidgetTester.

**8. Đáp án A** — tester.pump() kích hoạt dựng lại đúng MỘT frame (áp dụng thay đổi state một lần). ≠ pumpAndSettle vốn bơm liên tục cho tới khi hết animation.

**9. Đáp án A** — tester.pumpAndSettle() lặp lại việc bơm frame cho tới khi không còn frame nào được lên lịch, tức chờ animation/chuyển màn hoàn tất. Hữu ích sau khi điều hướng để đích đến render xong.

**10. Đáp án A** — find.text('Hello') tìm widget theo nội dung chữ hiển thị. Các tên find.byLabel/find.string/find.content không phải finder của flutter_test.

**11. Đáp án A** — find.byType(ElevatedButton) định vị widget theo kiểu runtime của nó. find.widget/find.class/find.of không phải finder hợp lệ.

**12. Đáp án A** — findsOneWidget khẳng định có ĐÚNG một widget khớp finder. ≠ findsWidgets (một hoặc nhiều), findsNothing (không có widget nào).

**13. Đáp án A** — findsNothing khẳng định không có widget nào khớp — dùng để kiểm tra một phần tử đã biến mất. findsZeroWidgets/findsNone không tồn tại.

**14. Đáp án A** — tester.tap(finder) mô phỏng cú chạm vào widget được tìm thấy. click/press/touch không phải method của WidgetTester.

**15. Đáp án A** — tester.enterText(finder, 'abc') nhập chữ vào ô nhập trong test. type/input/setText không phải API của WidgetTester.

**16. Đáp án D** — Mocking quan trọng vì cho phép giả lập phản hồi từ API/database mà không cần kết nối thật, giúp test nhanh, ổn định và tách khỏi mạng. Nó không thay việc viết logic, cũng không tự sửa lỗi.

**17. Đáp án C** — Mocking KHÔNG tự sửa lỗi logic — đó không phải lợi ích của nó. Các lợi ích thật: test nhanh và tất định, mô phỏng được lỗi/biên, không phụ thuộc mạng.

**18. Đáp án A** — Dart/Flutter dùng mockito hoặc mocktail để tạo mock. provider (quản lý state), dio (HTTP), build_runner (sinh code) không phải thư viện mocking.

**19. Đáp án A** — when(() => api.fetch()).thenAnswer((_) async => data) định nghĩa giá trị trả về giả (stub) cho lời gọi bất đồng bộ. Cú pháp stub()/returns()/expect() ở đây đều sai.

**20. Đáp án A** — verify(() => api.fetch()).called(1) kiểm chứng method đã được gọi (và gọi bao nhiêu lần). assert/expectCall/check không phải API của mockito/mocktail.

**21. Đáp án A** — Repository Pattern (tiêm phụ thuộc nguồn dữ liệu) giúp thay data source thật bằng mock khi test, nên code mạng trở nên dễ kiểm thử. Singleton/Builder/Observer không nhắm mục tiêu này.

**22. Đáp án A** — setUp() chạy trước MỖI test trong group để chuẩn bị môi trường. before()/init()/beforeEach() không phải API của package test Dart.

**23. Đáp án A** — tearDown() chạy sau MỖI test để dọn dẹp tài nguyên. after()/cleanup()/dispose() không phải hàm của khung test.

**24. Đáp án A** — group() gom các test liên quan thành nhóm để tổ chức và chạy chung setUp/tearDown. describe()/suite()/context() là của framework khác, không phải Dart test.

**25. Đáp án A** — flutter test chạy toàn bộ test trong dự án. flutter analyze là phân tích tĩnh, không chạy test; các lệnh còn lại không tồn tại.

**26. Đáp án A** — dart analyze báo lỗi/cảnh báo phân tích tĩnh (kiểu, lint). ≠ flutter test (chạy test), dart format (định dạng), flutter doctor (kiểm tra môi trường).

**27. Đáp án A** — assert() chỉ chạy ở chế độ Debug; ở Release/Profile chúng bị loại bỏ để không ảnh hưởng hiệu năng. Vì vậy không nên đặt logic bắt buộc trong assert.

**28. Đáp án A** — Widget Inspector của Flutter DevTools trực quan hóa cây widget và ràng buộc layout lúc chạy để gỡ lỗi giao diện. Dart Analyzer/Gradle/Logcat không làm việc này.

**29. Đáp án A** — Tab Performance/Timeline của DevTools hiển thị thời gian dựng từng frame, giúp phát hiện jank và frame chậm. Memory/Network/Logging phục vụ mục đích khác.

**30. Đáp án A** — Đặt debugPaintSizeEnabled = true vẽ đường viền layout lên màn hình để gỡ lỗi bố cục. showLayout/debugMode/paintBounds không phải cờ hợp lệ.

**31. Đáp án A** — debugPrint() in ra console và tự điều tiết (throttle) nên không bị Android cắt bớt như print() với chuỗi dài. Đây là lý do khuyên dùng debugPrint khi log nhiều.

**32. Đáp án A** — Test 'flaky' là test lúc pass lúc fail không ổn định, thường do phụ thuộc mạng/timing thật. Cách khắc phục là mock phụ thuộc và chờ đúng bằng pumpAndSettle.

**33. Đáp án A** — Về coverage nên ưu tiên logic nghiệp vụ và các trường hợp biên thay vì getter tầm thường; chạy theo 100% bằng mọi giá là lãng phí. Không nên bỏ qua nhánh lỗi.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m12"></a>
# MODULE 12 — BUILD & RELEASE

**1.** Which command builds a release APK?
A. `flutter build apk --release`  B. `flutter release`  C. `flutter compile apk`  D. `flutter package`

**2.** Which format does Google Play require?
A. APK  B. Android App Bundle (.aab)  C. IPA  D. ZIP

**3.** Which command produces it?
A. `flutter build appbundle`  B. `flutter build aab`  C. `flutter bundle`  D. `flutter build apk --bundle`

**4.** What does `--split-per-abi` achieve?
A. Separate APKs per CPU architecture, reducing download size
B. Splitting Dart code
C. Enabling multidex
D. Splitting assets

**5.** Which command builds for iOS distribution?
A. `flutter build ipa` (requires macOS + Xcode)
B. `flutter build ios --android`
C. `flutter build apple`
D. `flutter package ios`

**6.** Where is the app version declared?
A. `pubspec.yaml` as `version: 1.0.0+3`
B. `AndroidManifest.xml` only
C. `main.dart`
D. `build.gradle` only

**7.** In `version: 1.0.0+3`, what does `3` represent?
A. The build number / versionCode
B. The patch version
C. The SDK version
D. The number of flavours

**8.** What happens if you upload a build with a build number that is not higher than the previous one?
A. The store rejects it
B. It replaces the old build
C. It is accepted as a beta
D. Nothing

**9.** What is `applicationId` (Android) / Bundle Identifier (iOS)?
A. A unique identifier for the app that cannot be changed after publishing
B. The display name
C. The version string
D. The signing key

**10.** What is required to publish a signed Android release?
A. A keystore and signing configuration in `build.gradle`
B. Only a debug build
C. A Firebase project
D. An Apple developer account

**11.** Which file typically stores keystore credentials, kept out of version control?
A. `key.properties`  B. `pubspec.yaml`  C. `AndroidManifest.xml`  D. `main.dart`

**12.** Which flag obfuscates Dart code in a release build?
A. `--obfuscate --split-debug-info=<dir>`
B. `--minify`
C. `--strip`
D. `--secure`

**13.** Why must `--split-debug-info` be used with `--obfuscate`?
A. To keep the symbol files needed to de-obfuscate future crash reports
B. To reduce build time
C. It is optional and has no effect
D. To enable R8

**14.** Where is the Android app display name configured?
A. `android:label` in AndroidManifest.xml
B. `pubspec.yaml` name field
C. `main.dart` title
D. `MaterialApp.title` only

**15.** Which package generates launcher icons for all platforms?
A. `flutter_launcher_icons`  B. `image`  C. `path_provider`  D. `icons_helper`

**16.** Which is a legitimate way to reduce APK size?
A. `--split-per-abi`, resource shrinking, and compressing assets
B. Removing null safety
C. Disabling AOT
D. Using debug mode

**17.** What is `MaterialApp(debugShowCheckedModeBanner: false)` for?
A. Hiding the "DEBUG" ribbon in debug builds
B. Disabling debug mode
C. Removing asserts
D. Enabling release mode

**18.** In which build mode does the DEBUG banner appear at all?
A. Debug only  B. Release  C. Profile  D. All

**19.** Which permission must be present in the release manifest for a networking app?
A. `INTERNET`  B. `WRITE_EXTERNAL_STORAGE`  C. `CAMERA`  D. None

**20.** Which is TRUE about build flavours?
A. They allow separate configurations (dev/staging/prod) with different app IDs and settings
B. They change the theme only
C. They are an iOS-only concept
D. They replace build modes

### ĐÁP ÁN M12
1-A · 2-B · 3-A · 4-A · 5-A · 6-A · 7-A · 8-A · 9-A · 10-A · 11-A · 12-A · 13-A · 14-A · 15-A · 16-A · 17-A · 18-A · 19-A · 20-A

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M12) — bấm để mở</b></summary>

**1. Đáp án A** — flutter build apk --release biên dịch APK bản phát hành (AOT, tối ưu). Các lệnh flutter release/compile apk/package không tồn tại.

**2. Đáp án B** — Google Play yêu cầu Android App Bundle (.aab) để Play tự tạo APK tối ưu theo từng thiết bị. ≠ APK (Play không còn nhận cho ứng dụng mới); IPA là của iOS.

**3. Đáp án A** — flutter build appbundle tạo tệp .aab để nộp lên Google Play. Các biến thể flutter build aab/bundle/apk --bundle không phải lệnh hợp lệ.

**4. Đáp án A** — --split-per-abi tạo các APK riêng cho từng kiến trúc CPU (arm, arm64, x86), nhờ đó mỗi máy chỉ tải phần phù hợp, giảm dung lượng tải. Nó không tách code Dart hay assets.

**5. Đáp án A** — flutter build ipa tạo bản phân phối cho iOS, đòi hỏi macOS + Xcode. Các lệnh còn lại đều sai cú pháp/không tồn tại.

**6. Đáp án A** — Phiên bản app khai báo trong pubspec.yaml dạng version: 1.0.0+3. Flutter dùng nó để sinh versionName/versionCode cho cả Android lẫn iOS.

**7. Đáp án A** — Trong 1.0.0+3, số sau dấu + (3) là build number, ánh xạ thành versionCode (Android)/build number (iOS). Phần 1.0.0 mới là versionName hiển thị.

**8. Đáp án A** — Store từ chối bản nộp nếu build number không lớn hơn bản trước, vì mỗi lần nộp phải tăng số build để phân biệt. Đây là lý do phải tăng versionCode mỗi lần release.

**9. Đáp án A** — applicationId (Android)/Bundle Identifier (iOS) là định danh duy nhất của app và KHÔNG đổi được sau khi đã phát hành. Nó không phải tên hiển thị hay chuỗi phiên bản.

**10. Đáp án A** — Để phát hành bản Android đã ký cần một keystore và cấu hình signing trong build.gradle. Bản debug không dùng để phát hành; Firebase/Apple account không liên quan việc ký Android.

**11. Đáp án A** — key.properties chứa thông tin keystore (đường dẫn, mật khẩu, alias) và phải để ngoài version control để bảo mật. pubspec.yaml/AndroidManifest.xml/main.dart không giữ credential ký.

**12. Đáp án A** — Cờ --obfuscate --split-debug-info=<dir> làm rối mã Dart trong bản release để chống dịch ngược. --minify/--strip/--secure không phải cờ của Flutter.

**13. Đáp án A** — Phải dùng --split-debug-info kèm --obfuscate để lưu lại tệp symbol, nhờ đó về sau giải mã (de-obfuscate) được các crash report từ mã đã bị rối. Thiếu nó thì crash log thành vô nghĩa.

**14. Đáp án A** — Tên hiển thị của app Android đặt ở android:label trong AndroidManifest.xml. pubspec name là tên package; MaterialApp.title chỉ ảnh hưởng tiêu đề task switcher.

**15. Đáp án A** — Gói flutter_launcher_icons sinh icon khởi chạy cho mọi nền tảng từ một ảnh nguồn. image/path_provider/icons_helper không làm việc này.

**16. Đáp án A** — Cách hợp lệ để giảm dung lượng APK: --split-per-abi, resource shrinking và nén assets. Bỏ null safety/tắt AOT/dùng debug mode đều sai và còn phản tác dụng.

**17. Đáp án A** — debugShowCheckedModeBanner: false ẩn dải ruy-băng 'DEBUG' ở góc trong bản debug. Nó không tắt debug mode hay bỏ assert; ở release banner vốn đã không xuất hiện.

**18. Đáp án A** — Dải banner DEBUG chỉ xuất hiện ở chế độ Debug; Release và Profile không hiển thị nó. Vì thế đặt cờ ẩn banner chỉ có tác dụng trong Debug.

**19. Đáp án A** — App có gọi mạng phải khai báo quyền INTERNET trong manifest release, nếu không request sẽ bị chặn. WRITE_EXTERNAL_STORAGE/CAMERA không cần cho việc gọi mạng.

**20. Đáp án A** — Build flavours cho phép cấu hình riêng cho từng môi trường (dev/staging/prod) với app ID và thiết lập khác nhau. Chúng không chỉ đổi theme, không phải khái niệm riêng iOS, và không thay thế build mode.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m13"></a>
# MODULE 13 — NOTIFICATIONS

**1.** What is the difference between local and push notifications?
A. Local are created by the app itself; push are sent from a server via FCM/APNs
B. Local require internet, push do not
C. They are identical
D. Push only work on iOS

**2.** Which package handles local notifications?
A. `flutter_local_notifications`  B. `firebase_messaging`  C. `awesome_flutter`  D. `notifications`

**3.** Which package handles push notifications via Firebase?
A. `firebase_messaging`  B. `flutter_local_notifications`  C. `firebase_core` only  D. `cloud_firestore`

**4.** Since which Android version are notification channels mandatory?
A. Android 8.0 (API 26)  B. Android 5.0  C. Android 10  D. Android 13

**5.** What is the importance of notification channels?
A. They let users manage and control notification behaviour per category
B. They define the layout of notification cards
C. They determine the priority only
D. They handle delivery to the device

**6.** What happens on Android 8+ if you show a notification without creating a channel?
A. The notification does not appear
B. It appears with default styling
C. The app crashes on launch
D. It is queued until a channel exists

**7.** From which Android version is the runtime `POST_NOTIFICATIONS` permission required?
A. Android 13 (API 33)  B. Android 8  C. Android 11  D. Android 6

**8.** Which method displays a notification immediately?
A. `show()`  B. `display()`  C. `push()`  D. `notify()`

**9.** Which method schedules a notification for a specific time?
A. `zonedSchedule()`  B. `scheduleAt()`  C. `delay()`  D. `setAlarm()`

**10.** Which method cancels a specific notification by its integer id?
A. `cancel(id)`  B. `dismiss(id)`  C. `delete(id)`  D. `remove(id)`

**11.** Which method cancels all notifications?
A. `cancelAll()`  B. `clear()`  C. `removeAll()`  D. `reset()`

**12.** Which callback in `initialize()` fires when the user taps a notification while the app is in the foreground or background?
A. `onDidReceiveNotificationResponse`
B. `onNotificationTap`
C. `onSelectNotification`
D. `onNotificationReceived`

**13.** What is the purpose of the `payload` parameter in `show()`?
A. A String passed back to the app when the user taps the notification, enabling navigation or actions
B. The JSON body sent to Firebase
C. The visual style and colour
D. The Android priority level

**14.** Which class configures Android-specific appearance of a notification?
A. `AndroidNotificationDetails`  B. `AndroidStyle`  C. `NotificationConfig`  D. `AndroidChannelStyle`

**15.** Which class holds both Android and iOS settings for `show()`?
A. `NotificationDetails`  B. `PlatformSettings`  C. `NotificationOptions`  D. `InitializationSettings`

**16.** Which class configures platform initialisation?
A. `InitializationSettings`  B. `NotificationDetails`  C. `AndroidNotificationChannel`  D. `NotificationConfig`

**17.** Which package must be initialised before using `zonedSchedule` with a specific timezone?
A. `timezone` — via `tz.initializeTimeZones()` and `tz.setLocalLocation()`
B. `intl`
C. `path_provider`
D. `connectivity_plus`

**18.** A notification scheduled with a `TZDateTime` in 'America/New_York' fires at the wrong time on a device set to 'Asia/Bangkok'. What is the most likely cause?
A. The timezone package was not initialised before creating the TZDateTime
B. `zonedSchedule` always converts to UTC internally
C. The OS overrides the TZDateTime timezone
D. Cross-timezone scheduling is unsupported

**19.** Which `AndroidScheduleMode` fires exactly even in Doze mode?
A. `exactAllowWhileIdle`  B. `inexact`  C. `normal`  D. `deferred`

**20.** Which permission does Android 12+ require for exact alarms?
A. `SCHEDULE_EXACT_ALARM` / `USE_EXACT_ALARM`
B. `WAKE_LOCK` only
C. `FOREGROUND_SERVICE`
D. None

**21.** Which method returns notifications that are scheduled but not yet delivered?
A. `pendingNotificationRequests()`  B. `getScheduled()`  C. `listPending()`  D. `activeNotifications()`

**22.** Which method returns notifications currently visible in the tray?
A. `getActiveNotifications()`  B. `pendingNotificationRequests()`  C. `getVisible()`  D. `currentNotifications()`

**23.** Which method shows a repeating notification at a fixed interval?
A. `periodicallyShow()`  B. `repeat()`  C. `scheduleRepeating()`  D. `showEvery()`

**24.** In FCM, which handler processes a message while the app is in the foreground?
A. `FirebaseMessaging.onMessage`
B. `onBackgroundMessage`
C. `getInitialMessage()`
D. `onMessageOpenedApp`

**25.** Which handles a message when the app was terminated and is opened via the notification?
A. `getInitialMessage()`  B. `onMessage`  C. `onBackgroundMessage`  D. `onTokenRefresh`

**26.** What is a requirement of the FCM background message handler?
A. It must be a top-level (or static) function annotated with `@pragma('vm:entry-point')`
B. It must be inside a StatefulWidget
C. It must be async only
D. It must not use await

**27.** Which method retrieves the device's FCM registration token?
A. `FirebaseMessaging.instance.getToken()`
B. `FirebaseAuth.instance.getToken()`
C. `getDeviceId()`
D. `FirebaseMessaging.token()`

**28.** On iOS, what must be done before notifications can be shown?
A. Request permission from the user
B. Nothing; iOS shows them by default
C. Create a notification channel
D. Enable background fetch only

**29.** Which of these best explains why the plugin's cancel method is named `cancel`?
A. It maps to Android's `NotificationManager.cancel()`
B. It is a Dart convention
C. It was renamed from `dismiss` recently
D. It cancels the scheduling only

**30.** Which is TRUE about notification importance/priority?
A. It is a property of the channel on Android 8+, set when the channel is created
B. It is set per notification and always overrides the channel
C. It does not exist on Android
D. It is controlled only by the server

### ĐÁP ÁN M13
1-A · 2-A · 3-A · 4-A · 5-A · 6-A · 7-A · 8-A · 9-A · 10-A · 11-A · 12-A · 13-A · 14-A · 15-A · 16-A · 17-A · 18-A · 19-A · 20-A · 21-A · 22-A · 23-A · 24-A · 25-A · 26-A · 27-A · 28-A · 29-A · 30-A

**Giải thích các câu dễ sai:**
- **10, 12:** Hai câu bẫy tên method hay ra nhất. `cancel` (không phải dismiss/delete/remove) và `onDidReceiveNotificationResponse` (không phải onSelectNotification — tên cũ đã bỏ).
- **13:** `payload` là **String** đính kèm, trả lại khi user tap → dùng để điều hướng. Không phải style, không phải priority.
- **17, 18:** Bẫy timezone: quên `tz.initializeTimeZones()` là nguyên nhân số 1 khiến notification nổ sai giờ.
- **30:** Từ Android 8+, importance thuộc về **channel**; người dùng có thể ghi đè và app không cưỡng lại được.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M13) — bấm để mở</b></summary>

**1. Đáp án A** — Notification cục bộ (local) do chính app tạo và lên lịch ngay trên thiết bị, không cần internet hay server; còn push do server gửi tới máy qua FCM (Android) hoặc APNs (iOS). Khác B vì thực tế ngược lại: local KHÔNG cần internet, push mới cần.

**2. Đáp án A** — flutter_local_notifications là plugin chuẩn để tạo và lên lịch thông báo cục bộ. Khác firebase_messaging (chỉ dùng cho push qua FCM).

**3. Đáp án A** — firebase_messaging là plugin xử lý push notification qua Firebase Cloud Messaging. firebase_core chỉ khởi tạo Firebase nên chưa đủ để nhận message.

**4. Đáp án A** — Notification channel bắt buộc từ Android 8.0 (API 26, Oreo); từ phiên bản này mọi thông báo phải gắn với một channel mới hiển thị được.

**5. Đáp án A** — Channel cho phép người dùng bật/tắt và tùy chỉnh hành vi (âm thanh, rung, mức độ quan trọng) theo từng nhóm/loại thông báo ngay trong Settings hệ thống.

**6. Đáp án A** — Trên Android 8+ nếu gọi show mà chưa tạo channel tương ứng, hệ thống bỏ qua và thông báo không hiển thị (không phải crash cũng không xếp hàng chờ).

**7. Đáp án A** — Quyền runtime POST_NOTIFICATIONS bắt buộc phải xin từ Android 13 (API 33); trước đó thông báo được cấp mặc định không cần hỏi.

**8. Đáp án A** — show() hiển thị thông báo ngay lập tức. Khác zonedSchedule() vốn dùng để hẹn giờ cho tương lai.

**9. Đáp án A** — zonedSchedule() lên lịch thông báo vào một thời điểm cụ thể theo múi giờ, nhận tham số là TZDateTime.

**10. Đáp án A** — cancel(id) hủy đúng một thông báo theo id nguyên (int) đã dùng khi tạo nó.

**11. Đáp án A** — cancelAll() hủy toàn bộ thông báo cùng lúc (cả đang hiển thị lẫn đã lên lịch).

**12. Đáp án A** — onDidReceiveNotificationResponse được truyền vào initialize() và kích hoạt khi người dùng chạm vào thông báo (lúc app ở foreground hoặc background). Lưu ý onSelectNotification là tên cũ đã bị thay thế.

**13. Đáp án A** — payload là một String đính kèm, được trả lại cho app khi người dùng chạm thông báo, dùng để điều hướng hoặc thực hiện hành động tương ứng. Nó không phải body gửi cho Firebase hay thông tin về màu sắc/độ ưu tiên.

**14. Đáp án A** — AndroidNotificationDetails cấu hình riêng phần giao diện/hành vi phía Android (channel id-name, icon, importance, priority...).

**15. Đáp án A** — NotificationDetails gói cả AndroidNotificationDetails và DarwinNotificationDetails (iOS) để truyền chung vào show().

**16. Đáp án A** — InitializationSettings gộp cấu hình khởi tạo cho từng nền tảng (Android/iOS) và được truyền vào initialize(). Khác NotificationDetails (dùng cho show).

**17. Đáp án A** — Phải khởi tạo package timezone: gọi tz.initializeTimeZones() rồi tz.setLocalLocation(...) trước khi tạo TZDateTime cho zonedSchedule, nếu không dữ liệu múi giờ sẽ không có.

**18. Đáp án A** — Nguyên nhân phổ biến là chưa gọi tz.initializeTimeZones() trước khi tạo TZDateTime nên cơ sở dữ liệu múi giờ chưa sẵn sàng. Khác B vì zonedSchedule tôn trọng đúng timezone của TZDateTime chứ không tự ép về UTC.

**19. Đáp án A** — exactAllowWhileIdle cho phép báo đúng giờ ngay cả khi thiết bị đang ở chế độ Doze tiết kiệm pin; còn inexact thì OS có thể gộp lại và làm trễ.

**20. Đáp án A** — Từ Android 12 (API 31+) cần quyền SCHEDULE_EXACT_ALARM / USE_EXACT_ALARM để đặt báo/thông báo chính xác thời điểm.

**21. Đáp án A** — pendingNotificationRequests() trả về danh sách các thông báo đã được lên lịch nhưng chưa tới giờ hiển thị.

**22. Đáp án A** — getActiveNotifications() trả về các thông báo hiện đang hiển thị trong khay (tray). Khác pendingNotificationRequests() vốn liệt kê những cái còn chờ, chưa hiện.

**23. Đáp án A** — periodicallyShow() lặp lại thông báo theo chu kỳ cố định (ví dụ mỗi phút/giờ/ngày).

**24. Đáp án A** — FirebaseMessaging.onMessage xử lý message khi app đang mở ở foreground. Khác onMessageOpenedApp (khi người dùng chạm thông báo để mở app từ background).

**25. Đáp án A** — getInitialMessage() lấy message đã dùng để mở app trong khi app trước đó bị tắt hẳn (terminated).

**26. Đáp án A** — Handler nền phải là hàm top-level hoặc static và gắn @pragma('vm:entry-point') để không bị tree-shaking loại bỏ, vì nó chạy trong một isolate riêng tách khỏi UI.

**27. Đáp án A** — FirebaseMessaging.instance.getToken() trả về registration token của thiết bị, để server biết địa chỉ mà gửi push tới đúng máy đó.

**28. Đáp án A** — Trên iOS phải xin quyền người dùng (requestPermission) trước khi hiển thị thông báo; iOS không tự cho phép mặc định và cũng không dùng channel như Android.

**29. Đáp án A** — Tên cancel phản ánh việc plugin ánh xạ trực tiếp tới NotificationManager.cancel() của Android native, chứ không phải quy ước Dart hay đổi tên.

**30. Đáp án A** — Trên Android 8+, importance/priority là thuộc tính của channel, được đặt lúc tạo channel và không thể đổi bằng code sau đó (chỉ người dùng chỉnh được trong Settings), nên đặt per-notification không thể override.

</details>
<!-- /giai-thich-chi-tiet -->

---

<a name="m14"></a>
# MODULE 14 — STATE MANAGEMENT

**1.** What problem does `InheritedWidget` solve?
A. Managing HTTP requests
B. Animation performance
C. Passing data down the widget tree efficiently
D. Navigation between routes

**2.** What is "prop drilling"?
A. Passing data through many intermediate constructors just to reach a deep descendant
B. Rebuilding widgets too often
C. Nesting too many Containers
D. Using too many keys

**3.** Which method registers a widget as a dependent of an InheritedWidget?
A. `context.dependOnInheritedWidgetOfExactType<T>()`
B. `context.find<T>()`
C. `InheritedWidget.of(context)` only
D. `context.read<T>()`

**4.** Which of these is an InheritedWidget under the hood?
A. `Theme`  B. `MediaQuery`  C. `Navigator`  D. All of them

**5.** When an InheritedWidget's data changes, which widgets rebuild?
A. Only those that registered a dependency on it
B. The entire app
C. Only direct children
D. None; you must call setState manually

**6.** What is "ephemeral state"?
A. Local state owned by a single widget, managed with `setState`
B. State shared across screens
C. State stored on a server
D. State persisted to disk

**7.** What is "app state"?
A. State shared across multiple widgets/screens, needing a state-management solution
B. State inside one widget only
C. The build mode
D. The navigation stack

**8.** Which is appropriate for a checkbox's checked value inside one form?
A. `setState` (ephemeral state)  B. Provider  C. BLoC  D. SharedPreferences

**9.** Which class notifies listeners when its data changes?
A. `ChangeNotifier`  B. `StatefulWidget`  C. `InheritedWidget`  D. `StreamController` only

**10.** Which method must be called to notify listeners?
A. `notifyListeners()`  B. `setState()`  C. `update()`  D. `refresh()`

**11.** Which Provider method listens and rebuilds on change?
A. `context.watch<T>()`  B. `context.read<T>()`  C. `context.select` only  D. `Provider.get<T>()`

**12.** Which reads a value once without subscribing to rebuilds?
A. `context.read<T>()`  B. `context.watch<T>()`  C. `Consumer`  D. `Selector`

**13.** Inside an `onPressed` callback, which should you use to call a method on the model?
A. `context.read<T>()`  B. `context.watch<T>()`  C. Either works identically  D. `Provider.of<T>(context)` with listen: true

**14.** Which widget rebuilds only a subtree when a provided value changes?
A. `Consumer<T>`  B. `Builder`  C. `StatefulBuilder`  D. `LayoutBuilder`

**15.** Which rebuilds only when a specific field of the model changes?
A. `Selector<T, R>`  B. `Consumer`  C. `watch`  D. `ChangeNotifierProvider`

**16.** Which architecture uses Events, a Bloc, and States, built on Streams?
A. BLoC  B. MVC  C. MVP  D. Redux only

**17.** Which is Provider built on top of?
A. `InheritedWidget`  B. `StreamBuilder`  C. `GlobalKey`  D. `Isolate`

**18.** Which widget consumes a `ValueNotifier` and rebuilds on change?
A. `ValueListenableBuilder`  B. `FutureBuilder`  C. `AnimatedBuilder` only  D. `Consumer`

**19.** Where should a `ChangeNotifierProvider` normally be placed?
A. Above the widgets that need it — often near the root
B. Inside `build()` of every screen
C. In `main()` outside `runApp`
D. Inside a ListView

**20.** Why should the provider not be created inside `build()`?
A. It would be recreated on every rebuild, losing state
B. It causes a compile error
C. Providers only work in initState
D. It is actually recommended

**21.** Which is a valid reason to choose a state-management package over plain `setState`?
A. State must be shared across many screens and survive navigation
B. The app has one screen
C. To reduce app size
D. `setState` is deprecated

**22.** Which describes the relationship between MVVM (Android) and Provider + Repository (Flutter)?
A. Both separate UI from business logic and data sources
B. They are unrelated
C. MVVM is only for Java
D. Provider replaces the repository

**23.** Which is TRUE about rebuilding performance?
A. Marking widgets `const` and scoping listeners narrowly reduces unnecessary rebuilds
B. Rebuilding always repaints the whole screen
C. `setState` at the root is the most efficient approach
D. Rebuilds cannot be optimised

**24.** In BLoC, what does the UI send to the Bloc?
A. Events  B. States  C. Widgets  D. Streams of widgets

**25.** In BLoC, what does the Bloc emit back to the UI?
A. States  B. Events  C. Futures  D. Contexts

### ĐÁP ÁN M14
1-C · 2-A · 3-A · 4-D · 5-A · 6-A · 7-A · 8-A · 9-A · 10-A · 11-A · 12-A · 13-A · 14-A · 15-A · 16-A · 17-A · 18-A · 19-A · 20-A · 21-A · 22-A · 23-A · 24-A · 25-A

**Giải thích các câu dễ sai:**
- **11, 12, 13:** Nguyên tắc: **`watch` trong `build`**, **`read` trong callback**. Dùng `watch` trong `onPressed` sẽ gây rebuild thừa (và có thể lỗi).
- **4:** `Theme.of`, `MediaQuery.of`, `Navigator.of` — hễ thấy mẫu `X.of(context)` thì gần như chắc chắn đứng sau là InheritedWidget.
- **20:** Tạo provider trong `build()` là lỗi khiến state bị reset liên tục mà rất khó debug.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M14) — bấm để mở</b></summary>

**1. Đáp án C** — InheritedWidget giải quyết việc truyền dữ liệu xuống sâu trong widget tree một cách hiệu quả, tránh phải truyền tay qua từng constructor. Khác Navigation vì đó là việc của Navigator, không liên quan.

**2. Đáp án A** — Prop drilling là phải truyền dữ liệu qua nhiều constructor trung gian không hề dùng tới, chỉ để đưa được nó xuống một widget con nằm sâu.

**3. Đáp án A** — context.dependOnInheritedWidgetOfExactType<T>() đăng ký widget hiện tại làm dependent, để nó tự rebuild khi InheritedWidget đổi dữ liệu; hàm này thường được gọi bên trong of(context).

**4. Đáp án D** — Theme, MediaQuery và Navigator đều cung cấp dữ liệu cho cây con qua cơ chế InheritedWidget và truy cập bằng .of(context), nên đáp án đúng là 'tất cả'.

**5. Đáp án A** — Chỉ những widget đã đăng ký phụ thuộc (qua dependOnInheritedWidgetOfExactType) mới rebuild khi dữ liệu đổi, chứ không phải cả app hay chỉ con trực tiếp.

**6. Đáp án A** — Ephemeral (local) state là state cục bộ chỉ thuộc về một widget duy nhất, quản lý đơn giản bằng setState.

**7. Đáp án A** — App state là state dùng chung giữa nhiều widget/màn hình, cần một giải pháp quản lý state (Provider/BLoC...) chứ không chỉ setState.

**8. Đáp án A** — Giá trị được tick của một checkbox trong một form là state cục bộ, dùng setState là đủ (ephemeral); không cần tới Provider/BLoC/SharedPreferences cho phạm vi nhỏ này.

**9. Đáp án A** — ChangeNotifier giữ dữ liệu và phát tín hiệu cho các listener biết khi dữ liệu thay đổi.

**10. Đáp án A** — Phải gọi notifyListeners() để báo cho các listener rebuild sau khi thay đổi dữ liệu trong ChangeNotifier; setState chỉ dùng trong State của widget, không dùng ở đây.

**11. Đáp án A** — context.watch<T>() lắng nghe và rebuild widget mỗi khi model thay đổi. Khác read() vốn chỉ lấy giá trị mà không lắng nghe.

**12. Đáp án A** — context.read<T>() lấy giá trị một lần và không đăng ký lắng nghe, nên không gây rebuild khi model thay đổi.

**13. Đáp án A** — Trong callback như onPressed, dùng context.read<T>() để gọi phương thức của model; ở đây không cần lắng nghe nên watch() là thừa và không nên dùng.

**14. Đáp án A** — Consumer<T> chỉ rebuild phần cây con nằm trong builder của nó khi giá trị đổi, giúp thu hẹp phạm vi rebuild.

**15. Đáp án A** — Selector<T, R> chỉ rebuild khi một trường cụ thể (R) mà nó chọn của model thay đổi, tối ưu rebuild hơn cả Consumer.

**16. Đáp án A** — BLoC là kiến trúc dùng Events (đầu vào) đưa vào Bloc, Bloc phát ra States (đầu ra), toàn bộ xây trên Streams.

**17. Đáp án A** — Provider được xây dựng dựa trên InheritedWidget nhưng giảm nhiều boilerplate (theo slide Module 5).

**18. Đáp án A** — ValueListenableBuilder lắng nghe một ValueNotifier và rebuild mỗi khi value thay đổi.

**19. Đáp án A** — ChangeNotifierProvider nên đặt phía trên các widget cần dùng, thường gần root, để cả subtree bên dưới đều truy cập được model.

**20. Đáp án A** — Không tạo provider bên trong build() vì mỗi lần rebuild sẽ tạo lại một instance mới, làm mất toàn bộ state đã có.

**21. Đáp án A** — Nên chọn package quản lý state khi state phải chia sẻ qua nhiều màn hình và tồn tại qua điều hướng - điều setState làm không tốt. setState hoàn toàn không bị deprecated.

**22. Đáp án A** — MVVM (Android) và Provider + Repository (Flutter) tương đồng ở chỗ đều tách UI ra khỏi business logic và nguồn dữ liệu; Provider không thay thế repository.

**23. Đáp án A** — Đánh dấu widget là const và giới hạn hẹp phạm vi listener (Consumer/Selector) giúp giảm rebuild thừa, tăng hiệu năng; rebuild không đồng nghĩa vẽ lại cả màn hình.

**24. Đáp án A** — Trong BLoC, UI gửi Events tới Bloc để yêu cầu xử lý một hành động.

**25. Đáp án A** — Bloc phát ngược lại States cho UI để dựng lại giao diện tương ứng với trạng thái mới.

</details>
<!-- /giai-thich-chi-tiet -->

---

# BẢNG TỔNG HỢP: TÊN METHOD DỄ NHẦM (tua nhanh trước giờ thi)

| Việc cần làm | **ĐÚNG** | Bẫy sai hay gặp |
|---|---|---|
| Lấy SharedPreferences | `await SharedPreferences.getInstance()` | `SharedPreferences()`, `.open()`, `.getDefault()` |
| Lưu int | `prefs.setInt()` | `putInt()` (Android native), `saveInt()`, `writeInt()` |
| Xoá toàn bộ prefs | `prefs.clear()` | `removeAll()`, `reset()`, `deleteAll()` |
| Huỷ 1 notification | `plugin.cancel(id)` | `dismiss()`, `delete()`, `remove()` |
| Huỷ hết notification | `plugin.cancelAll()` | `clear()`, `removeAll()` |
| Hiện notification | `plugin.show()` | `display()`, `push()`, `notify()` |
| Hẹn giờ notification | `plugin.zonedSchedule()` | `schedule()` (cũ), `scheduleAt()` |
| Callback tap noti | `onDidReceiveNotificationResponse` | `onSelectNotification` (cũ), `onNotificationTap` |
| Đăng nhập ẩn danh | `signInAnonymously()` | `signInAsGuest()`, `guestLogin()` |
| Đăng ký email | `createUserWithEmailAndPassword()` | `registerUser()`, `signUpWithEmail()` |
| Vị trí FAB | `floatingActionButtonLocation` | `fabAlignment`, `buttonPosition` |
| Xoay/scale Container | `transform` (Matrix4) | `rotate`, `decoration` |
| Validate form | `_formKey.currentState!.validate()` | `_formKey.validate()` |
| Chạy onSaved | `_formKey.currentState!.save()` | `submit()`, `store()` |
| Chuyển focus | `FocusScope.of(context).nextFocus()` | `focusNode.next()` |
| Ẩn bàn phím | `FocusScope.of(context).unfocus()` | `keyboard.hide()` |
| Hiện SnackBar | `ScaffoldMessenger.of(context).showSnackBar()` | `Scaffold.of(context).showSnackBar()` (đã bỏ) |
| Lấy arguments route | `ModalRoute.of(context)!.settings.arguments` | `Navigator.of(context).arguments` |
| Xoá sạch stack | `pushAndRemoveUntil(..., (r) => false)` | `Navigator.clear()`, `popAll()` |
| Tạo model từ JSON | `factory X.fromJson(Map json)` | static `fromMap`, named constructor |
| Chạy code generator | `dart run build_runner build` | `flutter generate` |
| Timeout Future | `.timeout(Duration(...))` | tham số `timeout:` của http |
| Giới hạn concurrency | package `pool` / semaphore + Completer | `Future.wait(maxConcurrency:)` |

# KIỂU TRẢ VỀ DỄ NHẦM

| Hàm | Trả về |
|---|---|
| `db.insert()` | `Future<int>` — **id dòng mới** |
| `db.update()` / `db.delete()` | `Future<int>` — **số dòng ảnh hưởng** |
| `db.query()` | `Future<List<Map<String,dynamic>>>` |
| `db.execute()` | `Future<void>` |
| `prefs.setX()` | `Future<bool>` (async) |
| `prefs.getX()` | Giá trị hoặc `null` (**đồng bộ**) |
| `Navigator.push()` | `Future<T?>` — giá trị từ `pop` |
| `showDatePicker()` | `Future<DateTime?>` — null nếu huỷ |
| `validator` | `null` = hợp lệ, `String` = lỗi |
| Hàm `async` | luôn là `Future<T>` |
| `map()` / `where()` | `Iterable` lazy — cần `.toList()` |


---

# PHẦN BỔ SUNG — CÂU HỎI TỪ SLIDE (theo module)

> Vá các chủ đề slide chưa có trong phần chính. Đề tiếng Anh, đáp án + giải thích tiếng Việt. Vị trí đáp án đã được đa dạng hoá để luyện tự test.

<a name="m1-bs"></a>
## BỔ SUNG M1

**M1-BS-1.** How does a Flutter app communicate with platform-specific native code (e.g. to read the battery level)?
A. Through a REST API
B. Through Platform Channels (MethodChannel)
C. Through a JavaScript bridge
D. Native code cannot be called from Flutter

**M1-BS-2.** Which of these features typically REQUIRES native integration in a Flutter app?
A. Displaying a list of text
B. Bluetooth / NFC / a payment SDK
C. Navigating between screens
D. Changing a widget's colour

**M1-BS-3.** For which scenario is Flutter usually the BEST choice?
A. A graphically intensive real-time 3D game
B. An app needing very deep, low-level OS customization
C. A cross-platform business app (booking/e-commerce) with a shared UI and fast time-to-market
D. A driver that accesses hardware at the kernel level

**M1-BS-4.** When is native (Kotlin/Swift) development preferable to Flutter?
A. When you want a single codebase
B. When building an MVP quickly
C. When the app needs high-performance graphics or deep OS-level access
D. When the team has no native developers

**M1-BS-5.** What is the key rendering difference between Flutter and React Native?
A. Flutter draws every pixel with its own engine; React Native bridges to native OS widgets
B. React Native compiles to ARM; Flutter runs in a WebView
C. They both use the same rendering engine
D. Flutter uses HTML/CSS; React Native uses Skia

**M1-BS-6.** A Flutter release build is compiled to:
A. JavaScript
B. Interpreted bytecode running in a VM
C. Native ARM machine code (AOT)
D. HTML rendered in a WebView

**M1-BS-7.** What is the correct order of Flutter's rendering pipeline?
A. Render Tree → Widget Tree → GPU → Composited Scene
B. Widget Tree → Render Tree → Composited Scene → GPU Rendering
C. GPU → Widget Tree → Render Tree → Scene
D. Composited Scene → Widget Tree → GPU → Render Tree

**M1-BS-8.** Which environment lets you run Flutter code instantly in a browser with no installation?
A. Android Studio
B. VS Code
C. DartPad
D. Xcode

**M1-BS-9.** In Android Studio, what must be installed to develop Flutter apps?
A. Only the Dart plugin
B. The Flutter plugin (the Dart plugin is installed automatically with it)
C. A separate Flutter IDE
D. Nothing extra

**M1-BS-10.** Which minimum Android API level is recommended when creating an emulator in the slides?
A. API 21  B. API 26  C. API 33+ (Android 13)  D. API 19

**M1-BS-11.** What is the standard entry-point call that starts a Flutter UI?
A. `main()` returns a Widget
B. `runApp(Widget)`
C. `Flutter.start()`
D. `MaterialApp.run()`

**M1-BS-12.** What is the "Cupertino" widget set in Flutter?
A. Android Material-style widgets
B. iOS-style widgets
C. Web-only widgets
D. A state management library

### ĐÁP ÁN M1-BS
1-B · 2-B · 3-C · 4-C · 5-A · 6-C · 7-B · 8-C · 9-B · 10-C · 11-B · 12-B

**Giải thích các câu dễ sai:**
- **1, 2, 5:** Platform Channels (`MethodChannel`) là cầu nối Flutter ↔ native; camera/BLE/NFC/payment cần native. Nhớ Flutter **tự vẽ pixel**, React Native **bridge** — đây là khác biệt cốt lõi.
- **3, 4:** Flutter thắng ở app cross-platform/MVP/nghiệp vụ; game nặng đồ hoạ + truy cập OS sâu thì chọn native.
- **6:** Release = AOT → **ARM native code** (khác debug JIT).
- **9:** Cài **Flutter plugin**, Dart plugin đi kèm tự động — bẫy hay đảo ngược.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M1-BS) — bấm để mở</b></summary>

**1. Đáp án B** — App Flutter giao tiếp với mã native qua Platform Channels (MethodChannel), truyền message qua lại giữa Dart và Kotlin/Swift.

**2. Đáp án B** — Các tính năng như Bluetooth/NFC/SDK thanh toán cần tích hợp native vì phải truy cập API phần cứng hoặc dịch vụ riêng của nền tảng.

**3. Đáp án C** — Flutter tối ưu nhất cho app đa nền tảng dùng chung một UI, cần ra mắt nhanh (như booking/e-commerce), tiết kiệm chi phí và thời gian.

**4. Đáp án C** — Native (Kotlin/Swift) tốt hơn khi app cần đồ họa hiệu năng cao hoặc truy cập sâu ở mức OS mà lớp đa nền tảng khó đáp ứng.

**5. Đáp án A** — Khác biệt cốt lõi: Flutter tự vẽ mọi pixel bằng engine riêng, còn React Native bắc cầu (bridge) sang widget native của OS.

**6. Đáp án C** — Bản release được biên dịch AOT ra mã máy native ARM, không chạy qua JS hay WebView.

**7. Đáp án B** — Thứ tự pipeline render đúng là: Widget Tree → Render Tree → Composited Scene → GPU Rendering.

**8. Đáp án C** — DartPad cho phép chạy code Flutter/Dart ngay trong trình duyệt mà không cần cài đặt gì.

**9. Đáp án B** — Trong Android Studio chỉ cần cài Flutter plugin; Dart plugin sẽ được cài kèm tự động.

**10. Đáp án C** — Theo slide, khi tạo emulator nên chọn tối thiểu API 33+ (Android 13).

**11. Đáp án B** — runApp(Widget) là lời gọi chuẩn để khởi động UI Flutter, đặt widget gốc lên màn hình. ≠ A vì main() không trả về Widget mà gọi runApp.

**12. Đáp án B** — Cupertino là bộ widget mang phong cách giao diện iOS. ≠ Material (phong cách Android).

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m2-bs"></a>
## BỔ SUNG M2

**M2-BS-1.** In a Dart `switch` statement, what happens if a non-empty `case` has no `break`?
A. It is a compile-time error (Dart forbids implicit fall-through)
B. It silently falls through to the next case
C. It loops forever
D. It jumps to `default`

**M2-BS-2.** How do you make several `case` values share the same branch in Dart?
A. Separate them with commas inside one case
B. Use `fallthrough` keyword
C. Stack empty `case` labels on top of the branch
D. It is not possible

**M2-BS-3.** What is the result of `7 ~/ 2` in Dart?
A. `3.5`  B. `4`  C. `3.0`  D. `3` (an int)

**M2-BS-4.** Which operator tests whether an object is of a given type?
A. `as`  B. `==`  C. `is`  D. `??`

**M2-BS-5.** In `try / on / catch / finally`, which block always executes?
A. `finally`  B. `on`  C. `catch`  D. `try`

**M2-BS-6.** What does `catch (e, s)` capture?
A. Two separate exceptions
B. An error and a success value
C. The exception and the current widget
D. The error object `e` and its stack trace `s`

**M2-BS-7.** What does `rethrow` do inside a catch block?
A. Swallows the exception
B. Converts the exception to null
C. Re-throws the current exception (preserving its stack trace) to an outer handler
D. Restarts the try block

**M2-BS-8.** How do you catch only a specific exception type in Dart?
A. `on FormatException catch (e)`
B. `catch (FormatException e)`
C. `except FormatException`
D. `catch<FormatException>(e)`

**M2-BS-9.** Which construct cannot use `break` or `continue`?
A. `for` loop
B. `.forEach()`
C. `for-in` loop
D. `while` loop

**M2-BS-10.** What does the `Never` type indicate for a function's return?
A. It returns null
B. It returns void
C. It never returns normally (always throws or loops forever)
D. It returns any type

**M2-BS-11.** Which is a valid redirecting constructor?
A. `Point.copy(Point o) => Point(o.x, o.y);`
B. `Point.copy(Point o) { this = Point(o.x, o.y); }`
C. `redirect Point.copy(Point o);`
D. `Point.copy(Point o) : this(o.x, o.y);`

**M2-BS-12.** What is the purpose of a constructor initializer list (`: x = 0, y = 0`)?
A. To initialise `final` fields before the constructor body runs
B. To run code after the constructor body
C. To declare optional parameters
D. To override a parent method

### ĐÁP ÁN M2-BS
1-A · 2-C · 3-D · 4-C · 5-A · 6-D · 7-C · 8-A · 9-B · 10-C · 11-D · 12-A

**Giải thích các câu dễ sai:**
- **1, 2:** Dart KHÔNG fall-through ngầm; case không rỗng thiếu `break` là **lỗi compile**. Muốn dùng chung nhánh thì để các `case` rỗng chồng lên nhau.
- **3:** `~/` là chia lấy phần nguyên → `3` (int); còn `7 / 2` = `3.5` (double).
- **6, 7, 8:** `catch (e, s)` lấy lỗi + stack trace; `rethrow` ném lại giữ nguyên stack; bắt đúng loại bằng `on X catch (e)`.
- **9:** `forEach` là hàm nhận callback → không dùng được `break/continue`; cần thoát sớm phải dùng `for-in`.
- **10:** `Never` = hàm **không bao giờ trả về bình thường** (luôn throw / vòng lặp vô hạn).

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M2-BS) — bấm để mở</b></summary>

**1. Đáp án A** — Dart cấm fall-through ngầm: một case không rỗng mà thiếu break sẽ bị báo lỗi biên dịch (khác C/Java).

**2. Đáp án C** — Để nhiều case dùng chung một branch, ta xếp chồng các nhãn case rỗng ngay trên branch đó. ≠ A vì dấu phẩy không phải cú pháp hợp lệ của switch cổ điển trong Dart.

**3. Đáp án D** — ~/ là phép chia lấy phần nguyên, nên 7 ~/ 2 = 3 và kết quả có kiểu int. ≠ 4 vì không làm tròn lên; ≠ 3.0 vì không phải double.

**4. Đáp án C** — Toán tử is kiểm tra một đối tượng có thuộc kiểu cho trước hay không. ≠ as (ép kiểu, không phải kiểm tra).

**5. Đáp án A** — Trong try/on/catch/finally, khối finally luôn được thực thi dù có hay không có exception (dùng để dọn dẹp tài nguyên).

**6. Đáp án D** — catch (e, s) bắt được hai thứ: đối tượng lỗi e và stack trace s của lỗi đó.

**7. Đáp án C** — rethrow ném lại đúng exception hiện tại và giữ nguyên stack trace, để một handler ở lớp ngoài xử lý tiếp. ≠ throw e mới (làm mất stack trace gốc).

**8. Đáp án A** — Để bắt riêng một kiểu exception cụ thể, dùng cú pháp: on FormatException catch (e).

**9. Đáp án B** — .forEach() nhận vào một callback nên không thể dùng break/continue để thoát/nhảy vòng như các vòng lặp thật (for, for-in, while).

**10. Đáp án C** — Kiểu Never báo rằng hàm không bao giờ trả về bình thường — nó luôn ném lỗi hoặc lặp vô tận.

**11. Đáp án D** — Redirecting constructor hợp lệ dùng : this(...) để chuyển hướng sang constructor khác: Point.copy(Point o) : this(o.x, o.y);

**12. Đáp án A** — Initializer list (: x = 0, y = 0) dùng để khởi tạo các field final trước khi thân constructor chạy (vì final không thể gán trong thân).

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m3-bs"></a>
## BỔ SUNG M3 — Advanced Dart OOP & Generics

**M3-BS-1.** Which statement about an abstract class is TRUE?
A. It can be instantiated directly with `new`
B. It cannot have any concrete methods
C. It may declare methods with no body that subclasses must implement
D. It cannot have a constructor

**M3-BS-2.** In Flutter, `State<T>` is an example of:
A. A mixin
B. A factory constructor
C. A generic function
D. An abstract class whose methods (build, initState) are overridden

**M3-BS-3.** When a class uses `implements SomeClass`, it must:
A. Re-implement all members of that class's interface (no bodies are inherited)
B. Call `super()` in every constructor
C. Be abstract
D. Only override one method

**M3-BS-4.** What is the difference between `extends` and `implements`?
A. They are identical
B. `extends` inherits behaviour; `implements` only takes the signature and forces full re-implementation
C. `implements` allows multiple inheritance of behaviour
D. `extends` cannot override methods

**M3-BS-5.** What does a `mixin` provide?
A. Multiple inheritance of state via constructors
B. A way to make a class abstract
C. Asynchronous execution
D. Reusable behaviour mixed into a class with `with`, without a subclass relationship

**M3-BS-6.** What does `mixin CanBark on Pet` mean?
A. `CanBark` can only be applied to classes that are (subclasses of) `Pet`
B. `CanBark` extends `Pet`
C. `Pet` uses the `CanBark` mixin
D. `CanBark` is abstract

**M3-BS-7.** What is the main purpose of a `factory` constructor?
A. It always returns a brand-new instance
B. It can only be used inside abstract classes
C. It controls instance creation — can return a cached object, a subtype, or parse JSON
D. It runs asynchronously by default

**M3-BS-8.** Which is a typical use case for a factory constructor?
A. Declaring a private field
B. Defining a mixin
C. Overriding `toString()`
D. `User.fromJson(map)` parsing JSON into an object

**M3-BS-9.** Why are generics (e.g. `Box<T>`) useful?
A. They give compile-time type safety and reuse for many types, avoiding `dynamic` misuse
B. They make code run on another thread
C. They replace inheritance
D. They are only for collections

**M3-BS-10.** In `class Box<T extends Animal>`, what does the constraint guarantee?
A. `T` must be exactly `Animal`
B. `Box` inherits from `Animal`
C. `T` must be a subtype of `Animal`, so members of `Animal` can be called on a `T` value
D. `T` can be any type

**M3-BS-11.** Which correctly declares a custom exception in Dart?
A. `class LoginException throws Exception {}`
B. `class LoginException implements Exception { final String msg; LoginException(this.msg); }`
C. `exception LoginException {}`
D. `class LoginException = Exception;`

**M3-BS-12.** Which pair of Flutter examples correctly matches the keyword?
A. `StatefulWidget implements Widget`, `AnimationController extends Listenable`
B. Both use `with`
C. Both use `extends`
D. `StatefulWidget extends Widget`, `AnimationController implements Listenable`

### ĐÁP ÁN M3-BS
1-C · 2-D · 3-A · 4-B · 5-D · 6-A · 7-C · 8-D · 9-A · 10-C · 11-B · 12-D

**Giải thích các câu dễ sai:**
- **3, 4:** `implements` chỉ lấy signature, **phải cài đặt lại toàn bộ** (không thừa hưởng body); `extends` mới kế thừa hành vi. Mọi class Dart đều là implicit interface.
- **6:** `on Pet` giới hạn mixin chỉ trộn được vào class kế thừa `Pet` — đảm bảo mixin truy cập được field của `Pet` (VD `name`). KHÔNG phải "CanBark extends Pet".
- **7, 8:** factory **không bắt buộc tạo instance mới** — dùng cho singleton/cache/`fromJson`/chọn subtype.
- **10:** `<T extends Animal>` là **ràng buộc generic** (T là con của Animal) → gọi `pet.sound()` an toàn không cần ép kiểu; khác với kế thừa class thường.
- **12:** Nhớ cặp ví dụ Flutter: `StatefulWidget extends Widget` (kế thừa), `AnimationController implements Listenable` (contract).

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M3-BS) — bấm để mở</b></summary>

**1. Đáp án C** — Abstract class **không thể khởi tạo trực tiếp**, nhưng CÓ THỂ có method cụ thể (có body), CÓ THỂ có constructor. Đặc trưng của nó là **khai báo được method không có body** buộc lớp con phải override.

**2. Đáp án D** — `State<T>` là **abstract class** — bạn kế thừa nó và override `build()`, `initState()`, `dispose()`. Nó cũng dùng generic `<T extends StatefulWidget>` nhưng bản chất phân loại là abstract class.

**3. Đáp án A** — `implements` chỉ lấy **signature (interface ngầm)**, KHÔNG kế thừa body → phải **cài đặt lại toàn bộ** thành viên. Trong Dart mọi class đều tự động có một implicit interface, nên implements được bất kỳ class nào.

**4. Đáp án B** — `extends` = **kế thừa hành vi** (dùng lại code cha, chỉ override khi cần) và chỉ được 1 lớp cha. `implements` = **chỉ lấy hợp đồng**, phải viết lại hết, nhưng implements được nhiều interface cùng lúc.

**5. Đáp án D** — `mixin` cung cấp **hành vi tái sử dụng** trộn vào class bằng `with`, **không tạo quan hệ cha–con**. Mixin không có constructor nên không mang state khởi tạo theo kiểu kế thừa.

**6. Đáp án A** — `on Pet` là **ràng buộc mixin**: `CanBark` chỉ được `with` vào class là `Pet` hoặc lớp con của `Pet`. Nhờ vậy bên trong mixin có thể truy cập thành viên của `Pet` (ví dụ `name`) một cách an toàn. Đây KHÔNG phải kế thừa.

**7. Đáp án C** — `factory` constructor **kiểm soát việc tạo instance**: có thể trả về object đã cache (singleton), trả về một subtype khác, hoặc dựng object từ JSON. Điểm khác constructor thường: nó **không bắt buộc tạo instance mới**.

**8. Đáp án D** — `User.fromJson(map)` là ca dùng factory kinh điển — cần xử lý/validate map rồi mới quyết định tạo object. Các lựa chọn còn lại (private field, mixin, toString) không liên quan tới cơ chế tạo instance.

**9. Đáp án A** — Generics cho **an toàn kiểu ở compile-time** và tái sử dụng cho nhiều kiểu, thay vì dùng `dynamic` (mất kiểm tra kiểu, lỗi chỉ lộ khi chạy). Generics dùng được cho cả class/hàm chứ không riêng collection.

**10. Đáp án C** — `<T extends Animal>` nghĩa là **T phải là Animal hoặc lớp con của Animal**. Nhờ ràng buộc này, trong class có thể gọi trực tiếp các thành viên của `Animal` trên giá trị kiểu `T` mà không cần ép kiểu. `Box` KHÔNG kế thừa `Animal`.

**11. Đáp án B** — Cách đúng: **`class LoginException implements Exception`** kèm field message. Dart không có từ khóa `throws`/`exception`. Nên override `toString()` để thông báo lỗi dễ đọc.

**12. Đáp án D** — Cặp ví dụ chuẩn trong Flutter: **`StatefulWidget extends Widget`** (kế thừa hành vi) và **`AnimationController implements Listenable`** (chỉ cam kết hợp đồng thông báo thay đổi). Nhớ cặp này để phân biệt extends vs implements.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m4-bs"></a>
## BỔ SUNG M4

**M4-BS-1.** In a group of `RadioListTile<String>` widgets, which property determines which tile is currently selected?
A. `value`
B. `groupValue` (the tile whose `value == groupValue` is selected)
C. `selected`
D. `checked`

**M4-BS-2.** A group of RadioListTiles does not visually update when tapped. Most likely cause?
A. `onChanged` rebuilds automatically
B. `groupValue` was not reassigned inside `setState`
C. Radios cannot be tapped
D. `value` must be an int

**M4-BS-3.** What are the default `min` and `max` values of a `Slider`?
A. 0 and 100  B. 0.0 and 1.0  C. -1 and 1  D. No default; both are required

**M4-BS-4.** What does the `divisions` property of a `Slider` do?
A. Splits the slider into discrete steps (and enables the value label)
B. Sets the number of sliders
C. Divides the width in pixels
D. Controls animation speed

**M4-BS-5.** Which Slider callback fires once when the user releases the thumb?
A. `onChanged`  B. `onChangeStart`  C. `onChangeEnd`  D. `onReleased`

**M4-BS-6.** You want a poster image to fill its box without distortion, cropping any excess. Which `BoxFit`?
A. `fill`  B. `contain`  C. `cover`  D. `fitWidth`

**M4-BS-7.** Which `BoxFit` value stretches the image to fill the box, possibly distorting it?
A. `cover`  B. `fill`  C. `contain`  D. `none`

**M4-BS-8.** Which pair of properties makes a `BottomNavigationBar` track the selected tab?
A. `selectedIndex` + `onSelect`
B. `currentIndex` + `onTap`
C. `activeTab` + `onChanged`
D. `index` + `onPressed`

**M4-BS-9.** A `BottomNavigationBar` with 4 items hides labels of unselected tabs and animates them. How to keep all labels always visible?
A. Set `type: BottomNavigationBarType.fixed`
B. Set `showLabels: true`
C. Remove two items
D. It is impossible

**M4-BS-10.** Which widget gives a circular leading avatar in a `ListTile`?
A. `RoundBox`  B. `CircleAvatar`  C. `AvatarImage`  D. `ClipCircle`

### ĐÁP ÁN M4-BS
1-B · 2-B · 3-B · 4-A · 5-C · 6-C · 7-B · 8-B · 9-A · 10-B

**Giải thích các câu dễ sai:**
- **1, 2:** Radio là controlled widget — dòng được tick là dòng có `value == groupValue`; muốn đổi phải `setState` gán lại `groupValue`.
- **3:** Slider mặc định chạy 0.0..1.0 (không phải 0..100). Đặt `value` ngoài `[min,max]` → assert.
- **6, 7:** `cover` = lấp đầy + cắt, giữ tỉ lệ (không méo); `fill` = kéo giãn lấp đầy → **méo**. Đây là cặp hay bẫy.
- **9:** >3 item thì `type` mặc định là `shifting` (ẩn nhãn tab không chọn) → đặt `fixed` để luôn hiện nhãn.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M4-BS) — bấm để mở</b></summary>

**1. Đáp án B** — Trong nhóm Radio, mỗi tile có `value` riêng, còn **`groupValue` là giá trị đang được chọn của cả nhóm**. Tile nào có `value == groupValue` thì hiển thị là đã chọn. Không có thuộc tính `selected`/`checked` ở đây.

**2. Đáp án B** — Radio chỉ vẽ theo `groupValue` bạn truyền vào. Nếu trong `onChanged` bạn **không gán lại `groupValue` bên trong `setState`** thì UI không rebuild → nhìn như bấm không ăn. Đây là lỗi kinh điển.

**3. Đáp án B** — `Slider` mặc định **`min = 0.0`, `max = 1.0`** (kiểu double). Muốn thang 0–100 phải khai báo `min: 0, max: 100` tường minh.

**4. Đáp án A** — **`divisions`** chia slider thành **các bước rời rạc** (thay vì trượt liên tục) và bật luôn nhãn giá trị (`label`) khi kéo. Ví dụ `divisions: 10` trên thang 0–100 → bước nhảy 10.

**5. Đáp án C** — **`onChangeEnd`** chỉ bắn **một lần khi người dùng nhả tay** — thích hợp để gọi API/lưu dữ liệu. `onChanged` bắn liên tục khi kéo (dùng để cập nhật UI), `onChangeStart` bắn khi bắt đầu chạm.

**6. Đáp án C** — **`BoxFit.cover`** phóng ảnh giữ nguyên tỉ lệ cho tới khi phủ kín khung, **cắt bớt phần thừa** — đúng yêu cầu 'lấp đầy, không méo'. `fill` thì méo; `contain` để lại khoảng trống.

**7. Đáp án B** — **`BoxFit.fill`** kéo giãn ảnh cho khớp khung **bất chấp tỉ lệ** → ảnh bị méo. Nhớ bộ ba: `cover` = phủ kín + cắt, `contain` = vừa khít + chừa trống, `fill` = méo.

**8. Đáp án B** — `BottomNavigationBar` dùng cặp **`currentIndex` (tab đang chọn) + `onTap` (callback nhận index mới)**; bạn lưu index vào state rồi `setState` để đổi tab. Các cặp tên còn lại không tồn tại.

**9. Đáp án A** — Từ 4 item trở lên, BottomNavigationBar tự chuyển sang `type: shifting` (ẩn nhãn tab chưa chọn). Đặt **`type: BottomNavigationBarType.fixed`** để mọi nhãn luôn hiển thị. Không có thuộc tính `showLabels`.

**10. Đáp án B** — **`CircleAvatar`** là widget chuẩn cho avatar tròn, đặt vào `leading:` của `ListTile`. Nó nhận `backgroundImage`, `child` (chữ cái đầu) và `radius`.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m5-bs"></a>
## BỔ SUNG M5 (Navigation + State Management)

**M5-BS-1.** How does `Navigator.maybePop(context)` differ from `Navigator.pop(context)`?
A. `maybePop` pops all routes
B. They are identical
C. `maybePop` pops only if allowed (consults `WillPopScope`/`PopScope`); `pop` pops unconditionally
D. `maybePop` cannot return a value

**M5-BS-2.** In Navigator 2.0's declarative API, how do you go back to the previous screen?
A. Change the app state so the corresponding `Page` is removed from the `pages` list
B. Call `Navigator.pop()`
C. Call `pushReplacement`
D. Reset the RouterDelegate

**M5-BS-3.** In a `RouterDelegate`, which callback runs when the system back button is pressed and must sync the app state?
A. `onGenerateRoute`  B. `didPop` only  C. `onBack`  D. `onPopPage`

**M5-BS-4.** A `RouterDelegate` mixes in `ChangeNotifier`. What must you call after mutating its state so the Navigator rebuilds?
A. `setState()`  B. `notifyListeners()`  C. `rebuild()`  D. `markNeedsBuild()`

**M5-BS-5.** Which class wraps a widget as a page in the Navigator 2.0 `pages` list?
A. `MaterialPageRoute`  B. `RouteSettings`  C. `MaterialPage`  D. `PageBuilder`

**M5-BS-6.** For iOS Universal Links, where must the `apple-app-site-association` (AASA) file be hosted?
A. At `https://<domain>/.well-known/apple-app-site-association`
B. In `Info.plist`
C. Inside the app bundle
D. In `AndroidManifest.xml`

**M5-BS-7.** Which command tests an Android custom-scheme deep link from a terminal?
A. `flutter run --deep-link`
B. `adb deeplink myapp://`
C. `gradle openLink`
D. `adb shell am start -a android.intent.action.VIEW -d "myapp://movies?id=12"`

**M5-BS-8.** What is "lifting state up" in Flutter?
A. Moving state to a global variable
B. Moving shared state to the nearest common ancestor, passing data down and callbacks up
C. Persisting state to disk
D. Simply calling setState more often

**M5-BS-9.** Which method of an `InheritedWidget` decides whether its dependents should rebuild?
A. `of(context)`  B. `build()`  C. `updateShouldNotify(oldWidget)`  D. `notifyListeners()`

**M5-BS-10.** If `updateShouldNotify` returns `false`, what happens when a new instance of the InheritedWidget is built with a different value?
A. Dependents do NOT rebuild
B. Dependents rebuild anyway
C. A compile error occurs
D. The app crashes

**M5-BS-11.** Which context method reads an InheritedWidget WITHOUT registering a dependency (so it won't rebuild)?
A. `dependOnInheritedWidgetOfExactType<T>()`
B. `context.watch<T>()`
C. `of(context)`
D. `getInheritedWidgetOfExactType<T>()`

### ĐÁP ÁN M5-BS
1-C · 2-A · 3-D · 4-B · 5-C · 6-A · 7-D · 8-B · 9-C · 10-A · 11-D

**Giải thích các câu dễ sai:**
- **1:** `pop` pop vô điều kiện; `maybePop` hỏi `WillPopScope`/`PopScope` — dùng cho xác nhận thoát.
- **2:** Navigator 2.0 KHÔNG `pop` thủ công; phải đổi state để bớt `Page` khỏi `pages`.
- **5:** `MaterialPageRoute` thuộc Navigator 1.0 (imperative); Navigator 2.0 dùng `MaterialPage`/`CupertinoPage` trong `pages`.
- **9, 10:** `updateShouldNotify` là chỗ quyết định rebuild của InheritedWidget; trả `false` → dependent bỏ qua dù giá trị đổi.
- **11:** `dependOn...` = có đăng ký (sẽ rebuild); `getInheritedWidgetOfExactType` = chỉ lấy, không đăng ký.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M5-BS) — bấm để mở</b></summary>

**1. Đáp án C** — `maybePop` chỉ pop nếu được phép (hỏi ý kiến `WillPopScope`/`PopScope`, ví dụ hộp thoại xác nhận thoát), còn `pop` pop vô điều kiện.

**2. Đáp án A** — Trong API khai báo của Navigator 2.0, muốn quay lại ta thay đổi app state để `Page` tương ứng bị bỏ khỏi danh sách `pages`, Navigator tự dựng lại; không gọi `pop` thủ công.

**3. Đáp án D** — Trong `RouterDelegate`, callback `onPopPage` của Navigator chạy khi nhấn back hệ thống; tại đây phải đồng bộ app state (gỡ page tương ứng) rồi trả về true/false.

**4. Đáp án B** — `RouterDelegate` trộn `ChangeNotifier` nên sau khi thay đổi state phải gọi `notifyListeners()` để Router/Navigator dựng lại giao diện.

**5. Đáp án C** — `MaterialPage` bọc một widget thành page trong danh sách `pages` của Navigator 2.0. ≠ `MaterialPageRoute` vì cái đó dùng cho API mệnh lệnh (push/pop).

**6. Đáp án A** — File AASA của Universal Links phải được host tại `https://<domain>/.well-known/apple-app-site-association` để iOS xác minh quyền sở hữu domain.

**7. Đáp án D** — Test deep link custom scheme trên Android từ terminal bằng `adb shell am start -a android.intent.action.VIEW -d 'myapp://movies?id=12'`.

**8. Đáp án B** — 'Lifting state up' là dời state dùng chung lên widget cha chung gần nhất, rồi truyền dữ liệu xuống và callback lên, để nhiều con cùng chia sẻ và cập nhật một state.

**9. Đáp án C** — `updateShouldNotify(oldWidget)` của `InheritedWidget` quyết định các widget phụ thuộc có cần rebuild hay không khi widget này được dựng lại.

**10. Đáp án A** — Nếu `updateShouldNotify` trả `false` thì dù giá trị mới khác giá trị cũ, các dependent vẫn KHÔNG rebuild (đây là chỗ tối ưu hiệu năng của InheritedWidget).

**11. Đáp án D** — `getInheritedWidgetOfExactType<T>()` đọc InheritedWidget mà KHÔNG đăng ký phụ thuộc nên không rebuild khi nó đổi; còn `dependOnInheritedWidgetOfExactType` thì có đăng ký nên sẽ rebuild.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m6-bs"></a>
## BỔ SUNG M6

**M6-BS-1.** What is the difference between Responsive and Adaptive UI?
A. Responsive changes with available space; Adaptive changes with device type/platform
B. They are the same
C. Responsive is only for web
D. Adaptive only changes colours

**M6-BS-2.** Switching from `BottomNavigationBar` on phones to `NavigationRail` on tablets is an example of:
A. Responsive UI  B. Adaptive UI  C. Orientation handling  D. Theming

**M6-BS-3.** Changing a `GridView` from 2 columns to 4 columns as width grows is an example of:
A. Adaptive UI  B. Responsive UI  C. Deep linking  D. State lifting

**M6-BS-4.** Which widget provides a vertical navigation bar suited to tablet/desktop widths?
A. `Drawer`  B. `NavigationRail`  C. `TabBar`  D. `BottomNavigationBar`

**M6-BS-5.** Which widget is best for a horizontal list of genre chips that should wrap to the next line when space runs out?
A. `Row`  B. `Wrap`  C. `ListView`  D. `Column`

**M6-BS-6.** Which Flutter DevTools feature helps inspect constraints and flex when debugging layout?
A. Layout Explorer (Flutter Inspector)  B. Timeline  C. Memory view  D. Network view

### ĐÁP ÁN M6-BS
1-A · 2-B · 3-B · 4-B · 5-B · 6-A

**Giải thích các câu dễ sai:**
- **1, 2, 3:** Đổi **loại widget/khung theo thiết bị** = Adaptive (BottomNav→NavigationRail). Cùng layout **giãn theo không gian** = Responsive (grid 2→4 cột). Đề hay trộn 2 khái niệm.
- **5:** `Wrap` tự xuống dòng khi hết chỗ; `Row` sẽ tràn (RenderFlex overflow).

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M6-BS) — bấm để mở</b></summary>

**1. Đáp án A** — Responsive thay đổi bố cục theo không gian khả dụng (kích thước/chiều rộng); Adaptive thay đổi theo loại thiết bị/nền tảng (phone vs tablet, iOS vs Android).

**2. Đáp án B** — Đổi `BottomNavigationBar` (phone) sang `NavigationRail` (tablet) là thay đổi theo loại thiết bị, nên là Adaptive UI.

**3. Đáp án B** — Đổi `GridView` từ 2 cột sang 4 cột khi chiều rộng tăng là thay đổi theo không gian, nên là Responsive UI.

**4. Đáp án B** — `NavigationRail` là thanh điều hướng dọc phù hợp với bề rộng của tablet/desktop.

**5. Đáp án B** — `Wrap` phù hợp cho danh sách chip thể loại vì nó tự xuống dòng khi hết chỗ. ≠ Row vì Row sẽ tràn (overflow).

**6. Đáp án A** — Layout Explorer trong Flutter Inspector (DevTools) giúp xem constraints và flex khi debug bố cục.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m7-bs"></a>
## BỔ SUNG M7

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
1-B · 2-B · 3-B · 4-B · 5-A · 6-B · 7-A · 8-A · 9-A

**Giải thích các câu dễ sai:**
- **1:** `DropdownButton` KHÔNG có `validator`; muốn validate trong Form phải dùng `DropdownButtonFormField`.
- **2:** Radio cùng nhóm chung `groupValue`; đây là điểm hay nhầm với `value`.
- **3:** `showDatePicker`/`showTimePicker` là hàm **async trả Future**, không phải widget.
- **5:** Validator đồng bộ → check server phải làm ngoài validator (trong hàm submit).
- **7:** So sánh với biến state, không đọc controller khác trong validator.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M7-BS) — bấm để mở</b></summary>

**1. Đáp án B** — `DropdownButtonFormField` cho phép lựa chọn dropdown tham gia validate cùng `Form` (có validator), khác `DropdownButton` thường không tích hợp Form.

**2. Đáp án B** — Nhóm radio chỉ chọn một thì mọi `Radio` phải chung một `groupValue`; radio nào có `value` bằng `groupValue` sẽ được chọn.

**3. Đáp án B** — `showDatePicker` trả về `Future<DateTime?>` (bất đồng bộ) nên phải `await`; trả về null nếu người dùng hủy chọn.

**4. Đáp án B** — Toggle hiện/ẩn mật khẩu: lật một biến bool gắn với `obscureText` bên trong `setState`, thường đặt trong `suffixIcon` là một `IconButton`.

**5. Đáp án A** — Không thể kiểm tra email đã tồn tại trên server bên trong `validator` vì validator là đồng bộ, phải trả `String?` ngay lập tức, không thể `await` lệnh mạng.

**6. Đáp án B** — Khi đang chạy kiểm tra bất đồng bộ lúc submit, nút submit nên bị vô hiệu hóa và hiện spinner để tránh người dùng gửi trùng (double submit).

**7. Đáp án A** — Nên so sánh xác nhận mật khẩu với biến state giữ giá trị mật khẩu của widget vì nó ổn định và dễ kiểm thử; đọc trực tiếp controller kia cũng chạy được nhưng biến state là mục tiêu được khuyến nghị, tránh phụ thuộc nguồn ngoài như server/SharedPreferences.

**8. Đáp án A** — Bọc thân màn hình bằng `GestureDetector(onTap: () => FocusScope.of(context).unfocus())` để khi chạm ra ngoài field thì ẩn bàn phím.

**9. Đáp án A** — `Checkbox`/`Switch` là cặp widget dành cho lựa chọn bật/tắt (boolean true/false).

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m8-bs"></a>
## BỔ SUNG M8

**M8-BS-1.** Parsing a very large JSON list on the main isolate can freeze the UI. The idiomatic fix is:
A. Wrap the parse in `setState`
B. Use `compute()` to parse on a background isolate
C. Convert the widget to `StatelessWidget`
D. Increase the request timeout

**M8-BS-2.** A function passed to `compute()` must be:
A. An anonymous closure that captures state
B. An instance method
C. A top-level or static function
D. A `build()` method

**M8-BS-3.** Why inject an `http.Client` into an `ApiService` through its constructor?
A. It is required for the code to compile
B. It enables HTTP caching automatically
C. To avoid importing the `http` package
D. So a mock client can be supplied in unit tests

**M8-BS-4.** What does `ApiService({http.Client? client}) : client = client ?? http.Client();` do?
A. Always creates a brand-new client
B. Uses the injected client if provided, otherwise creates a default one
C. Leaves the client null
D. Throws if no client is given

**M8-BS-5.** Adding a newly-created item to the list immediately after POST, before the server confirms, is called:
A. Exponential backoff
B. Stale-while-revalidate
C. Optimistic update
D. Lazy loading

**M8-BS-6.** A common way to make a "Retry" button re-run a `FutureBuilder`'s request is:
A. Call `dispose()`
B. Restart the whole app
C. Mark the `FutureBuilder` as `const`
D. Call `setState(() {})` (re-assigning the future) so the widget rebuilds and the future runs again

### ĐÁP ÁN M8-BS
1-B · 2-C · 3-D · 4-B · 5-C · 6-D

**Giải thích các câu dễ sai:**
- **1, 2:** Parse nặng → `compute()` (isolate nền); hàm parse phải **top-level/static**, không dùng closure/method thường.
- **4:** `client ?? http.Client()` = "có mock thì dùng mock, không thì tạo client thật" — nền tảng để test.
- **5:** Optimistic update = cập nhật UI trước khi server xác nhận (khác re-fetch).

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M8-BS) — bấm để mở</b></summary>

**1. Đáp án B** — Parse JSON rất lớn trên main isolate làm nghẽn UI; cách chuẩn là dùng `compute()` để chạy hàm parse trên một isolate nền, giữ UI mượt. Bọc trong setState hay đổi sang StatelessWidget không giải quyết việc parse nặng.

**2. Đáp án C** — Hàm truyền cho `compute()` phải là hàm top-level hoặc static — vì nó chạy trên isolate khác và không thể mang theo state/closure. Closure bắt biến hay instance method sẽ không hợp lệ.

**3. Đáp án D** — Tiêm `http.Client` qua constructor để trong unit test có thể truyền vào một mock client (không gọi mạng thật). Đây là mục đích dependency injection, không phải để compile, không tự bật cache.

**4. Đáp án B** — `client = client ?? http.Client()` nghĩa là: nếu có client được tiêm vào thì dùng nó, ngược lại tạo một client mặc định. Nhờ vậy vừa test được (mock) vừa dùng bình thường mà không cần truyền gì.

**5. Đáp án C** — Thêm item vào danh sách NGAY sau khi POST, trước khi server xác nhận, gọi là optimistic update (cập nhật lạc quan) để UI phản hồi tức thì. Khác backoff, stale-while-revalidate hay lazy loading.

**6. Đáp án D** — Nút 'Retry' chạy lại request bằng cách gọi `setState(() {})` (gán lại future) để widget rebuild và FutureBuilder chạy lại future. Gọi `dispose()`, restart app hay đánh dấu `const` đều không đúng.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m9-bs"></a>
## BỔ SUNG M9

**M9-BS-1.** Which package only provides a file-system path (it does NOT read/write)?
A. `dart:io`  B. `dart:convert`  C. `path_provider`  D. `sqflite`

**M9-BS-2.** Which directory may be cleared by the OS at any time?
A. `getApplicationDocumentsDirectory()`
B. `getTemporaryDirectory()`
C. `getApplicationSupportDirectory()`
D. `getExternalStorageDirectory()`

**M9-BS-3.** Which call writes a JSON string to a local file?
A. `prefs.setString(key, jsonString)`
B. `db.insert('t', map)`
C. `jsonEncode(list)`
D. `File(path).writeAsString(jsonString)`

**M9-BS-4.** What is the relationship between SQLite and sqflite?
A. They are the same thing
B. SQLite is the C database engine; sqflite is a Flutter plugin wrapping it
C. sqflite is the engine and SQLite is the plugin
D. sqflite replaces SQLite with a NoSQL store

**M9-BS-5.** Why doesn't sqflite work on Flutter Web?
A. The browser has no JavaScript
B. sqflite is deprecated
C. There is no native SQLite engine in the browser
D. The web cannot store any data

**M9-BS-6.** On Flutter Web, `SharedPreferences` stores data in:
A. An XML file
B. An SQLite database
C. HTTP cookies
D. The browser's `localStorage`

**M9-BS-7.** In DartPad (Flutter mode), why must `SharedPreferences` be replaced by a `FakePrefs` mock?
A. Because it is faster
B. Plugins with native code are not supported, so the real plugin is unavailable
C. Because DartPad has no Dart runtime
D. Because `FakePrefs` persists data permanently

**M9-BS-8.** Which SQL clause filters GROUPS (after `GROUP BY`), not individual rows?
A. `WHERE`  B. `ORDER BY`  C. `HAVING`  D. `LIMIT`

**M9-BS-9.** Which clauses implement pagination for a long list?
A. `GROUP BY` and `HAVING`
B. `SELECT` and `FROM`
C. `WHERE` and `AND`
D. `LIMIT` and `OFFSET`

**M9-BS-10.** In `db.query()`, results are sorted using the parameter:
A. `sort`  B. `orderBy`  C. `sortBy`  D. `arrange`

### ĐÁP ÁN M9-BS
1-C · 2-B · 3-D · 4-B · 5-C · 6-D · 7-B · 8-C · 9-D · 10-B

**Giải thích các câu dễ sai:**
- **M9-BS-1:** `path_provider` chỉ trả **đường dẫn**; đọc/ghi là `dart:io File`.
- **M9-BS-2:** `getTemporaryDirectory()` là cache tạm — OS xoá được; đừng để dữ liệu quan trọng ở đó.
- **M9-BS-4, M9-BS-5:** SQLite = engine C; sqflite = plugin Flutter bọc quanh → **không có engine native trên Web**.
- **M9-BS-6:** Web vẫn dùng được SharedPreferences nhưng lưu ở `localStorage`, không phải XML.
- **M9-BS-8:** `WHERE` lọc dòng, `HAVING` lọc nhóm — rất hay đảo.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M9-BS) — bấm để mở</b></summary>

**1. Đáp án C** — `path_provider` CHỈ cung cấp đường dẫn thư mục, KHÔNG tự đọc/ghi file (việc đọc/ghi là của `dart:io`). `dart:convert` mã hóa JSON, `sqflite` là database.

**2. Đáp án B** — `getTemporaryDirectory()` trả thư mục tạm mà HĐH có thể xóa bất cứ lúc nào để giải phóng dung lượng — không nên lưu dữ liệu quan trọng ở đây. Documents/Support directory bền hơn.

**3. Đáp án D** — Ghi chuỗi JSON ra file cục bộ bằng `File(path).writeAsString(jsonString)` (dart:io). `prefs.setString` lưu vào SharedPreferences chứ không phải file, `db.insert` ghi vào SQLite, còn `jsonEncode` chỉ tạo chuỗi chứ chưa ghi.

**4. Đáp án B** — SQLite là ENGINE database viết bằng C; sqflite là PLUGIN Flutter (Dart + native) bọc quanh engine đó để Dart gọi được. Chúng không phải một, và sqflite không thay SQLite bằng NoSQL.

**5. Đáp án C** — sqflite không chạy trên Flutter Web vì trình duyệt KHÔNG có engine SQLite gốc để plugin cầu nối tới. Không liên quan việc thiếu JavaScript, sqflite không bị deprecated, và web vẫn lưu được dữ liệu bằng cách khác (localStorage).

**6. Đáp án D** — Trên Flutter Web, SharedPreferences ánh xạ sang `localStorage` của trình duyệt. Không dùng file XML (đó là Android), không dùng SQLite hay cookie.

**7. Đáp án B** — Trong DartPad (chế độ Flutter), plugin có code native không được hỗ trợ nên plugin SharedPreferences thật không dùng được → phải thay bằng mock `FakePrefs` (lưu trong RAM). Không phải vì nhanh hơn hay DartPad thiếu Dart runtime.

**8. Đáp án C** — `HAVING` lọc các NHÓM sau khi `GROUP BY` (thường dùng với hàm tổng hợp như SUM/COUNT). `WHERE` lọc từng hàng trước khi gom nhóm, `ORDER BY` sắp xếp, `LIMIT` giới hạn số lượng.

**9. Đáp án D** — Phân trang (pagination) dùng `LIMIT` (số bản ghi mỗi trang) và `OFFSET` (bỏ qua bao nhiêu bản ghi). Rất hữu ích cho danh sách dài trên mobile. Các cặp còn lại phục vụ mục đích khác.

**10. Đáp án B** — Trong `db.query()`, kết quả được sắp xếp qua tham số `orderBy` (vd `orderBy: 'id DESC'`). Không có tham số `sort`/`sortBy`/`arrange`.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m10-bs"></a>
## BỔ SUNG M10

**M10-BS-1.** How many parts does a JWT have, separated by dots?
A. 2 — key and value
B. 1 — a single encrypted blob
C. 3 — header, payload, signature
D. 4 — header, payload, signature, refresh

**M10-BS-2.** Which is TRUE about a JWT payload?
A. It is fully encrypted and unreadable by the client
B. It is Base64Url-encoded and signed but NOT encrypted, so it must not contain secrets
C. It stores the user's raw password securely
D. It cannot be decoded without the server key

**M10-BS-3.** What is the correct HTTP header to send an access token?
A. `Token: <token>`
B. `Cookie: jwt=<token>`
C. `X-Auth-Password: <token>`
D. `Authorization: Bearer <token>`

**M10-BS-4.** What is the main purpose of a refresh token?
A. Encrypt the access token
B. Store the user's password
C. Obtain a new access token when the short-lived one expires, without re-login
D. Replace the need for HTTPS

**M10-BS-5.** Why is the access token deliberately short-lived?
A. To save storage space
B. To reduce the risk window if it is leaked
C. Because JWTs technically cannot be long
D. To avoid using HTTPS

**M10-BS-6.** In Google Sign-In with Firebase, what is built from the Google tokens before signing in?
A. `FirebaseUser.fromGoogle()`
B. `OAuthToken.build()`
C. `GoogleSignInResult()`
D. `GoogleAuthProvider.credential(idToken:, accessToken:)`

**M10-BS-7.** Which file must be placed in `android/app/` for Firebase on Android?
A. `firebase.json`
B. `key.properties`
C. `google-services.json`
D. `GoogleService-Info.plist`

**M10-BS-8.** A Google Sign-In throws `DEVELOPER_ERROR`. Most likely cause?
A. No internet connection
B. Wrong package name / missing SHA-1 fingerprint
C. The access token expired
D. Missing INTERNET permission

**M10-BS-9.** Google Sign-In returns `null` on an emulator. Most likely cause?
A. The APK is unsigned
B. Dart null safety is disabled
C. The wrong Flutter version is installed
D. The emulator lacks Google Play Services

**M10-BS-10.** Which dependencies are required for Firebase Google Sign-In?
A. `firebase_core`, `firebase_auth`, `google_sign_in`
B. `http`, `provider`
C. `shared_preferences`, `sqflite`
D. `firebase_messaging` only

**M10-BS-11.** A user session typically consists of:
A. Only the username
B. The device IMEI
C. Access token, user profile, and token expiry timestamp
D. The installed app version

**M10-BS-12.** In a SplashScreen auto-login flow, what decides the destination screen?
A. The device orientation
B. Whether a valid token exists in storage → Home, otherwise Login
C. The current theme mode
D. A random choice at startup

**M10-BS-13.** Which is a FORM-level (cross-field) validation rule in a signup form?
A. Email must contain '@'
B. Password must be at least 6 characters
C. Name must not be empty
D. "Password" and "Confirm password" must match

**M10-BS-14.** Authentication vs Authorization — which is correct?
A. They are the same thing
B. Authentication verifies identity ("who are you?"); Authorization controls access ("what may you do?")
C. Authorization happens before Authentication
D. Authentication decides permissions

### ĐÁP ÁN M10-BS
1-C · 2-B · 3-D · 4-C · 5-B · 6-D · 7-C · 8-B · 9-D · 10-A · 11-C · 12-B · 13-D · 14-B

**Giải thích các câu dễ sai:**
- **1, 2:** JWT có **3** phần và **signed chứ không encrypted** → payload decode đọc được, không nhét bí mật.
- **4, 5:** Refresh token dùng để **lấy access token mới**; access token ngắn hạn để **giảm rủi ro lộ**.
- **8, 9:** `DEVELOPER_ERROR` = sai package name / thiếu SHA-1; login `null` trên emulator = thiếu Play Services. Cả hai KHÔNG phải lỗi mạng.
- **13:** Cross-field = so **hai** field (confirm password) — khác rule field-level (một field).

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M10-BS) — bấm để mở</b></summary>

**1. Đáp án C** — JWT gồm 3 phần ngăn bởi dấu chấm: Header, Payload, Signature (header.payload.signature). Không phải 2 hay 4 phần; refresh token là một token riêng, không nằm trong cấu trúc JWT.

**2. Đáp án B** — Payload JWT chỉ được mã hóa Base64Url và được KÝ (sign), KHÔNG mã hóa, nên ai có token đều đọc được nội dung — vì vậy không được đặt bí mật/mật khẩu trong đó. Slide nói rõ 'Signed (not encrypted)'.

**3. Đáp án D** — Chuẩn gửi access token là header Authorization: Bearer <token>. Các dạng Token:/Cookie:/X-Auth-Password không phải quy ước chuẩn cho bearer token.

**4. Đáp án C** — Refresh token dùng để xin access token mới khi access token ngắn hạn hết hạn, mà không bắt người dùng đăng nhập lại. Nó không mã hóa access token cũng không lưu mật khẩu.

**5. Đáp án B** — Access token cố tình để sống ngắn nhằm thu hẹp cửa sổ rủi ro nếu bị lộ — kẻ tấn công chỉ dùng được trong thời gian ngắn. Không phải để tiết kiệm bộ nhớ hay né HTTPS.

**6. Đáp án D** — Trong Google Sign-In với Firebase, từ idToken và accessToken của Google ta dựng GoogleAuthProvider.credential(idToken:, accessToken:) rồi truyền vào signInWithCredential. Các tên còn lại đều bịa.

**7. Đáp án C** — Trên Android, tệp google-services.json phải đặt trong android/app/ để Firebase hoạt động. GoogleService-Info.plist là của iOS; firebase.json/key.properties phục vụ mục đích khác.

**8. Đáp án B** — DEVELOPER_ERROR thường do sai package name hoặc thiếu vân tay SHA-1 khai trên Firebase Console, khiến Google từ chối xác thực. Không liên quan internet hay token hết hạn (slide 27 nêu rõ).

**9. Đáp án D** — Google Sign-In trả null trên emulator thường vì emulator thiếu Google Play Services; hãy dùng emulator có Play Store hoặc máy thật. Không liên quan APK ký hay null safety.

**10. Đáp án A** — Firebase Google Sign-In cần bộ ba: firebase_core, firebase_auth, google_sign_in (slide 25). http/provider/shared_preferences/sqflite không phục vụ luồng này.

**11. Đáp án C** — Một session điển hình gồm access token, hồ sơ người dùng (profile) và mốc thời gian hết hạn của token (slide 18). Chỉ username hay IMEI/phiên bản app đều không đủ định nghĩa phiên.

**12. Đáp án B** — Ở SplashScreen, đích đến quyết định theo việc có token hợp lệ trong storage hay không: có → Home (auto-login), không → Login (slide 20). Không phụ thuộc orientation hay theme.

**13. Đáp án D** — Quy tắc cấp form (liên trường) là 'Password' và 'Confirm password' phải khớp nhau vì nó so hai trường với nhau. Các quy tắc còn lại (email chứa '@', mật khẩu ≥6 ký tự, tên không rỗng) chỉ xét từng trường (field-level).

**14. Đáp án B** — Authentication xác minh danh tính ('bạn là ai?'), còn Authorization kiểm soát quyền truy cập ('bạn được làm gì?'). Chúng khác nhau và authentication diễn ra trước authorization.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m11-bs"></a>
## BỔ SUNG M11

**M11-BS-1.** Which describes the Flutter testing pyramid?
A. Many integration tests at the base
B. Equal numbers of each type
C. Many unit tests at the base, fewer widget tests, fewest integration tests
D. Only widget tests are needed

**M11-BS-2.** In the Arrange-Act-Assert pattern, what happens in the "Act" step?
A. Test data and environment are prepared
B. The operation under test is performed (e.g. `toggle()`, `tap`, `enterText`)
C. The result is verified with `expect()`
D. The widget is disposed

**M11-BS-3.** Which step of AAA uses `expect(...)`?
A. Arrange
B. Act
C. Setup
D. Assert

**M11-BS-4.** Why should integration tests be used sparingly?
A. They cannot test navigation
B. They do not compile in release mode
C. They are slow and more brittle; prefer unit and widget tests
D. They always require a live server

**M11-BS-5.** Why use `Key`s such as `Key('taskTextField')` in widget tests?
A. To speed up the app in release mode
B. To locate a specific widget reliably with `find.byKey`, independent of its text
C. To encrypt the widget's state
D. Because Dart requires a key on every widget

### ĐÁP ÁN M11-BS
1-C · 2-B · 3-D · 4-C · 5-B

**Giải thích các câu dễ sai:**
- **2 vs 3:** **Act** = thực hiện hành động; **Assert** = kiểm bằng `expect()`. Đừng lẫn hai bước cuối.
- **4:** Integration test chậm + giòn → chỉ cho luồng quan trọng; đáy tháp vẫn là unit test.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M11-BS) — bấm để mở</b></summary>

**1. Đáp án C** — Tháp kiểm thử Flutter: nhiều unit test ở đáy (nhanh, rẻ), ít widget test hơn ở giữa, ít nhất integration test ở đỉnh (chậm, đắt). Đó là lý do không chia đều số lượng mỗi loại.

**2. Đáp án B** — Trong Arrange-Act-Assert, bước 'Act' là thực hiện thao tác cần kiểm thử (gọi toggle(), tap, enterText). Chuẩn bị dữ liệu là Arrange; kiểm chứng bằng expect() là Assert.

**3. Đáp án D** — Bước dùng expect(...) là 'Assert' — kiểm chứng kết quả so với kỳ vọng. Arrange chuẩn bị, Act thực thi; 'Setup' không phải một bước trong AAA.

**4. Đáp án C** — Integration test nên dùng tiết chế vì chậm và dễ vỡ (brittle); nên ưu tiên unit và widget test cho phần lớn trường hợp (slide 20). Chúng vẫn test được navigation.

**5. Đáp án B** — Dùng Key như Key('taskTextField') để find.byKey định vị chính xác một widget cụ thể, độc lập với nội dung chữ hiển thị — bền vững khi text đổi. Key không tăng tốc app hay mã hóa state.

</details>
<!-- /giai-thich-chi-tiet -->

<a name="m12-bs"></a>
## BỔ SUNG M12 (Performance Optimization)

**M12-BS-1.** Flutter targets 60 FPS. How much time is available to render one frame?
A. 60 ms
B. ~16.6 ms
C. 1 second
D. 100 ms

**M12-BS-2.** On a 120 Hz display, the per-frame budget is about:
A. 16.6 ms
B. 120 ms
C. ~8 ms
D. 33 ms

**M12-BS-3.** What is "jank"?
A. A memory leak
B. A compile-time error
C. A category of unit test
D. Visible stutter caused by frames that miss their rendering deadline

**M12-BS-4.** Which build mode should be used to MEASURE performance accurately?
A. Debug mode
B. Profile mode
C. Debug mode with asserts on
D. Any mode gives the same numbers

**M12-BS-5.** Why should you NOT measure performance in Debug mode?
A. Debug mode has no UI
B. Debug mode cannot run the app
C. Debug adds asserts and overhead, making it artificially slow and unrepresentative
D. Debug mode disables the widget tree

**M12-BS-6.** Which command runs the app in profile mode?
A. `flutter build profile`
B. `flutter profile`
C. `flutter run --measure`
D. `flutter run --profile`

**M12-BS-7.** What does marking a static widget `const` help with?
A. It encrypts the widget
B. Flutter can skip rebuilding it, reducing work and memory
C. It converts it to a StatefulWidget
D. It forces a rebuild every frame

**M12-BS-8.** You must sort a list before displaying it. Where should the sort run?
A. Inside `build()` on every rebuild
B. Inside each list item's constructor
C. Once when the data changes — never inside `build()`
D. During the paint phase

**M12-BS-9.** Which key preserves item state across list reordering?
A. `UniqueKey()`
B. `GlobalKey()` on every item
C. No key at all
D. `ValueKey(item.id)`

**M12-BS-10.** Why is `UniqueKey()` a poor choice for list items?
A. It is deprecated
B. It changes on every build, forcing the widget to be recreated each time
C. It only works on iOS
D. It encrypts the item's state

**M12-BS-11.** Which Provider tool rebuilds only when a specific field changes (ideal for lists)?
A. `context.watch` at the top of the whole screen
B. `setState` at the root
C. `Selector`
D. A `GlobalKey`

**M12-BS-12.** How do you reduce cost for a 48px thumbnail?
A. Always load the 2000px original
B. Set `width`/`height` (resize) instead of loading the full-resolution image
C. Decode it inside `build()`
D. Wrap it in a `GlobalKey`

**M12-BS-13.** Which pre-loads an image so it displays instantly later?
A. `Image.preload()`
B. `cacheImage('x.png')`
C. `loadImage('x.png')`
D. `precacheImage(AssetImage('x.png'), context)`

**M12-BS-14.** Which widget shows a placeholder while a NETWORK image loads?
A. `Image.network` on its own
B. `FadeInImage.assetNetwork(placeholder:, image:)`
C. `AssetImage`
D. `RawImage`

**M12-BS-15.** Where should image decoding NOT happen?
A. In `initState`
B. In a repository
C. Inside `build()`
D. Before `runApp`

**M12-BS-16.** Which command produces an app-size breakdown report?
A. `flutter size`
B. `flutter build apk --report`
C. `dart analyze --size`
D. `flutter build apk --analyze-size`

**M12-BS-17.** What does "tree-shaking icons" do?
A. Removes unused Dart classes only
B. Removes unused Material icon glyphs to shrink app size
C. Animates the app icons
D. Compresses PNG assets

**M12-BS-18.** Which is a genuine cause of jank in student apps?
A. Using `const` widgets
B. Extracting list items into their own widgets
C. Rebuilding the whole screen and rendering a long list inline without `.builder`
D. Using `ListView.builder`

**M12-BS-19.** Which DevTools feature highlights areas being repainted?
A. The Memory tab
B. The Network tab
C. The Logging view
D. Repaint Rainbow

**M12-BS-20.** Extracting a list item into its own widget (e.g. `TaskTile`) helps because:
A. It reduces the app's download size
B. Only the changed tile rebuilds; the parent list stays untouched
C. It disables the widget's state
D. It encrypts the UI

**M12-BS-21.** Which build mode is AOT-optimized and used for the store release?
A. Debug
B. Profile
C. Release
D. Test

### ĐÁP ÁN M12-BS
1-B · 2-C · 3-D · 4-B · 5-C · 6-D · 7-B · 8-C · 9-D · 10-B · 11-C · 12-B · 13-D · 14-B · 15-C · 16-D · 17-B · 18-C · 19-D · 20-B · 21-C

**Giải thích các câu dễ sai:**
- **1, 2:** 60 FPS → 16.6ms/frame; 120 FPS → 8ms/frame. Vượt ngân sách = jank.
- **4, 5, 6:** Đo perf ở **Profile** (`flutter run --profile`), KHÔNG ở Debug (Debug chậm giả tạo).
- **8:** Cấm sort/parse/API trong `build()` — chạy lại mỗi rebuild.
- **9, 10:** `ValueKey` giữ state; `UniqueKey()` ép recreate mỗi frame → phản tác dụng.
- **11:** `Selector` rebuild theo field → hẹp hơn `context.watch` (rebuild cả subtree).
- **15:** Không decode ảnh trong `build()` → decode ở `initState`.
- **16, 17:** `--analyze-size` xem breakdown; tree-shaking icons loại glyph Material thừa.

<!-- giai-thich-chi-tiet -->
<details>
<summary><b>📖 Giải thích chi tiết từng câu (M12-BS) — bấm để mở</b></summary>

**1. Đáp án B** — Mục tiêu 60 FPS nghĩa mỗi frame có khoảng 1000ms/60 ≈ 16.6ms để dựng xong. Vượt quá thời gian này sẽ rớt frame gây giật.

**2. Đáp án C** — Màn 120 Hz có ngân sách mỗi frame khoảng 1000ms/120 ≈ 8ms — chặt gấp đôi so với 60 Hz. Vì thế tối ưu càng quan trọng trên thiết bị tần số quét cao.

**3. Đáp án D** — Jank là hiện tượng giật/khựng nhìn thấy được do các frame lỡ hạn dựng (vượt 16.6ms/8ms). Nó không phải rò rỉ bộ nhớ, lỗi biên dịch hay loại test.

**4. Đáp án B** — Để đo hiệu năng chính xác phải dùng Profile mode vì nó chạy gần như Release nhưng vẫn cho phép profiling. ≠ Debug vì Debug thêm assert và overhead làm số liệu sai lệch.

**5. Đáp án C** — Không đo hiệu năng ở Debug vì Debug bật assert và nhiều overhead khiến app chậm giả tạo, không đại diện cho trải nghiệm thật. Do đó dùng Profile mode để đo.

**6. Đáp án D** — flutter run --profile chạy app ở chế độ profile (hiệu năng gần release, đã bỏ overhead debug). flutter build profile/flutter profile/--measure không phải lệnh hợp lệ.

**7. Đáp án B** — Đánh dấu widget tĩnh là const giúp Flutter bỏ qua việc dựng lại nó, giảm công và bộ nhớ nhờ tối ưu tree-diffing. const không biến widget thành Stateful hay ép rebuild.

**8. Đáp án C** — Việc sắp xếp (sort) chỉ nên chạy một lần khi dữ liệu thay đổi, KHÔNG đặt trong build() vì build() chạy lại mỗi lần rebuild sẽ sort thừa gây tốn CPU và jank (slide 10).

**9. Đáp án D** — ValueKey(item.id) giữ đúng danh tính từng item khi sắp xếp lại danh sách, nhờ đó state của item được bảo toàn. ≠ UniqueKey() vì key đó đổi mỗi build, phá vỡ việc giữ state.

**10. Đáp án B** — UniqueKey() là lựa chọn tồi cho item danh sách vì nó đổi giá trị mỗi lần build, buộc Flutter tạo lại widget mỗi lần thay vì tái sử dụng — gây tốn và mất state.

**11. Đáp án C** — Selector chỉ rebuild khi một trường cụ thể thay đổi nên phù hợp cho danh sách, tránh rebuild thừa. ≠ context.watch ở đầu màn hình (rebuild cả màn) hay setState ở gốc.

**12. Đáp án B** — Với thumbnail 48px hãy đặt width/height để giải mã ảnh ở kích thước nhỏ thay vì tải ảnh gốc độ phân giải cao — tiết kiệm bộ nhớ và thời gian decode (slide 16).

**13. Đáp án D** — precacheImage(AssetImage('x.png'), context) nạp trước ảnh vào cache để lần sau hiển thị tức thì. Image.preload/cacheImage/loadImage không tồn tại.

**14. Đáp án B** — FadeInImage.assetNetwork(placeholder:, image:) hiển thị ảnh placeholder trong khi ảnh mạng đang tải rồi mờ dần chuyển sang ảnh thật. Image.network trơn không có placeholder tích hợp.

**15. Đáp án C** — Không nên giải mã (decode) ảnh trong build() vì build() chạy lại nhiều lần gây tốn CPU; nên decode một lần trong initState nếu cần (slide 16).

**16. Đáp án D** — flutter build apk --analyze-size tạo báo cáo phân rã kích thước app (code AOT, native libs, assets, packages) dạng JSON + treemap HTML (slide 17). flutter size/--report/dart analyze --size không có.

**17. Đáp án B** — 'Tree-shaking icons' loại bỏ các glyph icon Material không dùng khỏi font để giảm dung lượng app. Nó không xóa class Dart hay nén PNG.

**18. Đáp án C** — Nguyên nhân jank thật ở app sinh viên là rebuild cả màn hình và render một danh sách dài inline mà không dùng ListView.builder (slide 5, 18). Dùng const/tách widget/ListView.builder lại là cách tối ưu.

**19. Đáp án D** — Repaint Rainbow của DevTools tô màu luân phiên các vùng đang bị repaint, giúp phát hiện vẽ lại thừa. Memory/Network/Logging phục vụ mục đích khác.

**20. Đáp án B** — Tách item danh sách thành widget riêng (ví dụ TaskTile) giúp chỉ tile thay đổi mới rebuild, còn danh sách cha giữ nguyên — giảm công dựng lại (slide 9). Nó không liên quan dung lượng tải hay bảo mật.

**21. Đáp án C** — Release mode được tối ưu AOT (biên dịch trước ra mã máy), nhanh và gọn, dùng cho bản phát hành lên store. Debug/Profile không phải bản phát hành; 'Test' không phải build mode.

</details>
<!-- /giai-thich-chi-tiet -->
