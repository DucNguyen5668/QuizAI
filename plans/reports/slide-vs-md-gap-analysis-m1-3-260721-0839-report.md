# GAP ANALYSIS + BỔ SUNG — MODULE 1,2,3

> Đối chiếu slide (.pptx đã trích text) với `PRM393_On_Thi_Full.md` (File A) và `PRM393_Ngan_Hang_Cau_Hoi.md` (File B).
> Đã kiểm tra cả PHỤ LỤC A (dòng 884–1257) để tránh đề xuất trùng.

---

## PHẦN 0 — Tóm tắt gap (theo module)

### MODULE 1 (slide "Introduction to Flutter")
File A M1 mạnh phần kiến trúc/hot reload/CLI/build mode; thiếu:
- **Platform Channels / native integration** (slide 7): camera, Bluetooth, NFC, payment SDK, OS service — thiếu cả A & B.
- **Khi nào dùng Flutter / khi nào nên native** (slide 5,6,8): tiêu chí ra quyết định — thiếu.
- **Bảng Flutter vs React Native vs Native** (slide 13): bridge vs self-render engine, "compiles to ARM code" — B chỉ có 1 câu (Q22), A không có bảng.
- **Môi trường phát triển** (slide 16,17,19,23,24): DartPad, cài Android Studio + Flutter plugin, VS Code, tạo emulator (Device Manager, API level) — thiếu.
- **Pipeline render** (slide 10): Widget Tree → Render Tree → Composited Scene → GPU — thiếu.
- Nhắc thoáng/thiếu: **Cupertino widgets** (slide 4), **runApp()** (slide 25), **Application/Organization ID** (slide 21), **lịch sử phiên bản** (slide 9).

### MODULE 2 (slide "Dart Essentials")
File A M2 thiếu 2 mảng lớn:
- **Control flow: if/else, switch/case (break, default, fall-through)** (slide 11) — thiếu ở A & B.
- **Exception handling tổng quát: try/catch/on/finally/rethrow, catch(e,s) stack trace** (slide 21) — A chỉ có trong ví dụ async M3, không có mục riêng; B không có câu nào.
- Nhỏ hơn: **vòng lặp cổ điển for / for-in** (slide 12, mới có forEach), **bảng operators đầy đủ** `% ~/ is as` (slide 7), **kiểu Never / enum / Iterable / void** (slide 5), **redirecting constructor + initializer list** (slide 17).

### MODULE 3 (slide tên "Advanced Dart" — KHÁC nội dung File A M3 = "Asynchronous Programming")
**Đây là module lệch nhiều nhất.** File A M3 chỉ có async (Future/Stream/event loop/repository — đã cover tốt). Toàn bộ phần OOP nâng cao + generics của slide THIẾU:
- **Abstract class** chi tiết + `State<T>` (slide 4) — thiếu (A chỉ 1 dòng ở 2.5).
- **Implicit interface** chi tiết (slide 5) — nhắc thoáng.
- **Bảng extends vs implements vs with + ví dụ Flutter** (slide 6) — thiếu.
- **Mixins** chi tiết + ví dụ (slide 7) — nhắc thoáng.
- **Mixin constraint (`on`)** (slide 8) — thiếu hoàn toàn.
- **Factory constructor** chi tiết + fromJson + use cases (slide 9,10) — thiếu (A chỉ nhắc ở M8).
- **Generics: overview, generic class `Box<T>`, generic constraint `<T extends Animal>`** (slide 11,12,13) — thiếu.
- **Custom exception (`implements Exception`)** (slide 15) — thiếu.
- Đã cover tốt (KHÔNG cần bổ sung): event loop & microtask (slide 16,17), future chaining (18), stream generator/broadcast (19), repository pattern (20,21), collection-if/for/spread (14).

---

## PHẦN 1 — Nội dung chèn vào `PRM393_On_Thi_Full.md` (ready-to-paste, style File A)

### (Module 1) — chèn nối tiếp sau mục 1.5, trước dấu `---` kết Module 1

```markdown
## 1.6 Khi nào chọn Flutter — khi nào nên Native

**Flutter phù hợp khi:**
- Ứng dụng cross-platform, chia sẻ UI + logic từ một codebase.
- MVP, startup, prototype nhanh — ưu tiên **time-to-market** & chi phí thấp.
- App nghiệp vụ: e-commerce, booking, dashboard; dùng device feature ở mức vừa phải.
- Team ít nhân lực native Android/iOS.

**Nên dùng Native (Kotlin/Swift) khi:**
- Cần tuỳ biến OS sâu, truy cập phần cứng cấp thấp.
- Game hiệu năng cao / đồ hoạ real-time.
- Yêu cầu UI/UX đặc thù riêng từng nền tảng rất chặt.

**Bẫy đề thi:** Flutter "powerful nhưng không phải lúc nào cũng tối ưu" — câu hỏi kiểu "khi nào KHÔNG nên dùng Flutter" thì đáp án thường là *game nặng đồ hoạ / truy cập OS cấp thấp*.

## 1.7 Platform Channels — tích hợp native

Khi Flutter chưa hỗ trợ trực tiếp một tính năng, ta viết code native (Kotlin/Java bên Android, Swift/Obj-C bên iOS) rồi kết nối qua **Platform Channels** (`MethodChannel`).

```dart
const channel = MethodChannel('com.app/battery');
final level = await channel.invokeMethod<int>('getBatteryLevel');
```

- Flutter lo **UI + business logic**; native lo **feature phụ thuộc nền tảng**.
- Ví dụ cần native: **Camera, Bluetooth, NFC, Payment SDK, dịch vụ cấp OS**.

**Bẫy đề thi:** Flutter KHÔNG loại bỏ native code — nó **tích hợp** với native qua Platform Channels. Cơ chế giao tiếp là `MethodChannel` (không phải "bridge" như React Native, không phải "JNI trực tiếp").

## 1.8 Flutter vs React Native vs Native

| Framework | Ngôn ngữ | Cách render UI |
|---|---|---|
| **Flutter** | Dart | **Tự vẽ** bằng engine (Skia/Impeller) → biên dịch **ARM native** |
| React Native | JavaScript | **Bridge** sang native widget của OS |
| Native (Android/iOS) | Kotlin / Swift | Pure native widget |

- Lợi thế engine riêng của Flutter: **UI đồng nhất mọi nền tảng** + **không có overhead bridge** khi cập nhật UI.
- Release build của Flutter **compile ra ARM code** (AOT) → gần tốc độ native.

**Bẫy đề thi:** khác biệt cốt lõi Flutter vs React Native = Flutter **tự vẽ pixel**, React Native **bridge sang native widget**.

## 1.9 Pipeline render (từ Widget đến màn hình)

```
Widget Tree  →  Render Tree  →  Composited Scene  →  GPU Rendering
(cấu hình)      (layout/paint)   (ghép layer)         (Skia/Impeller vẽ)
```
- Kiến trúc 3 tầng đã học ở 1.1: **Framework (Dart) → Engine (C++, Skia/Impeller) → Embedder (cầu nối OS)**.
- **Embedder** xử lý: input, vòng đời (lifecycle), quản lý cửa sổ; có thể viết **custom embedder** (VD chạy trên Raspberry Pi).

## 1.10 Bộ công cụ phát triển (DartPad / Android Studio / VS Code)

| Môi trường | Đặc điểm | Chạy app |
|---|---|---|
| **DartPad** (dartpad.dev) | Online, **không cần cài đặt**, chạy Flutter ngay trong trình duyệt, hỗ trợ widget lõi (Scaffold, Text, Column…) | Nút ▶ Run |
| **Android Studio** | IDE đầy đủ + SDK tools + **emulator**; cần cài **Flutter plugin** (Dart plugin tự cài kèm) | ▶ Run on emulator |
| **VS Code** | Nhẹ, khởi động nhanh; cài extension **Flutter & Dart** | `F5` hoặc `flutter run` |

- Tất cả đều biên dịch về **cùng một Flutter runtime**.
- **Tạo emulator (Android Studio):** Device Manager → Create Device → chọn Pixel → **API 33+ (Android 13)**. Máy yếu dùng Pixel 3a / API 30.
- **Tạo project:** đặt tên + **Organization ID** (VD `com.fptu.movies`) → ghép thành **application ID** (package name) duy nhất trên store.
- **Cupertino widgets** = bộ widget phong cách iOS (song song với **Material** phong cách Android).
- **Hello World tối giản:** entry point là `runApp()`:

```dart
import 'package:flutter/material.dart';
void main() => runApp(const MaterialApp(
  home: Scaffold(body: Center(child: Text('Hello, World'))),
));
```

**Lịch sử (đôi khi hỏi mốc):** 2015 Sky → 2017 Alpha → 2018 Flutter 1.0 → 2021 Flutter 2.0 (thêm Web/Desktop) → 2023–2025 Flutter 3.x stable.
```

### (Module 2) — chèn nối tiếp sau mục 2.6, trước dấu `---` kết Module 2

```markdown
## 2.7 Toán tử (Operators)

| Nhóm | Toán tử |
|---|---|
| Số học | `+  -  *  /`  · **`~/`** (chia lấy phần nguyên) · **`%`** (chia lấy dư) |
| So sánh | `>  <  >=  <=  ==  !=` |
| Logic | `&&  ||  !` |
| Kiểm tra kiểu | **`is`** (đúng kiểu) · **`is!`** · **`as`** (ép kiểu) |
| Null-aware | `?.  ??  ??=  !` (xem 2.2) |
| Cascade | `..` (xem 2.5) |

**Bẫy:** `5 / 2` = `2.5` (**double**), còn `5 ~/ 2` = `2` (**int**). Nhầm `/` với `~/` là lỗi hay gặp.

## 2.8 Control Flow — if/else & switch

```dart
if (score >= 50) print('Pass');
else print('Fail');

switch (day) {
  case 'Mon':
    print('Start');
    break;              // BẮT BUỘC, nếu không sẽ lỗi (Dart không fall-through ngầm)
  case 'Sat':
  case 'Sun':
    print('Weekend');   // nhiều case chung 1 nhánh: để case rỗng chồng lên nhau
    break;
  default:
    print('Other');
}
```
- `switch` rõ ràng hơn nhiều `if-else` khi so **giá trị rời rạc** (int, String, enum).
- Mỗi `case` phải kết thúc bằng `break` (hoặc `return`/`throw`/`continue`), nếu không **lỗi compile** — Dart **không** cho fall-through ngầm như C/Java.

**Bẫy đề thi:** Dart KHÔNG rơi (fall-through) tự động giữa các case. Muốn nhiều case chung nhánh thì để các `case` rỗng liền nhau.

## 2.9 Vòng lặp (Loops)

```dart
for (int i = 0; i < 3; i++) print(i);          // đếm cổ điển
for (var x in [1, 2, 3]) print(x);             // for-in: duyệt collection
[1, 2, 3].forEach((e) => print(e));            // functional style
while (cond) { ... }   do { ... } while (cond);
```
- `break` để thoát, `continue` để bỏ qua vòng hiện tại.
- `forEach` KHÔNG dùng được `break/continue` (vì là hàm) — cần thoát sớm thì dùng `for-in`.

## 2.10 Xử lý ngoại lệ (Exceptions) — try / catch / on / finally

```dart
try {
  final n = int.parse(input);      // có thể ném FormatException
  if (n < 0) throw ArgumentError('Must be >= 0');
} on FormatException {
  print('Sai định dạng số');        // on: bắt ĐÚNG loại exception
} on ArgumentError catch (e) {
  print('Lỗi tham số: ${e.message}');
} catch (e, s) {                    // catch tất cả; e = lỗi, s = StackTrace
  print('Lỗi khác: $e');
  rethrow;                          // ném lại sau khi log để nơi trên xử lý tiếp
} finally {
  print('Luôn chạy — dùng để dọn dẹp');
}
```

| Thành phần | Vai trò |
|---|---|
| `try` | khối code có nguy cơ lỗi |
| `on Loại` | bắt **đúng một kiểu** exception |
| `catch (e)` / `catch (e, s)` | bắt mọi lỗi; `s` là **stack trace** |
| `finally` | **luôn chạy** dù thành công hay lỗi (cleanup) |
| `rethrow` | ném lại lỗi hiện tại (giữ nguyên stack) sau khi đã log |
| `throw` | chủ động ném exception |

- Nên ném **custom exception** cho lỗi nghiệp vụ (xem Module 3 — Custom Exceptions).

**Bẫy đề thi:**
- `on X` (không có `catch`) khi cần loại, `catch (e, s)` khi cần chi tiết + stack trace; dùng nhiều `on` xếp từ **cụ thể → chung**.
- Trong Dart, có thể `throw` **bất kỳ object** nào, nhưng chuẩn là ném lớp cài `Exception`/`Error`.

## 2.11 Kiểu dữ liệu bổ sung & constructor initializer list

Các kiểu hay bị hỏi thêm ngoài 2.3:

| Kiểu | Ý nghĩa |
|---|---|
| `enum` | Danh sách hằng cố định: `enum Status { active, banned }` |
| `Iterable` | Kiểu trừu tượng cha của List/Set — kết quả `map/where` là `Iterable` (lazy) |
| **`Never`** | Hàm **không bao giờ trả về** (luôn `throw` / vòng lặp vô hạn) |
| `void` | Không có giá trị trả về |
| `Object` | Cha của mọi object (trừ `null` là `Null`) |
| `dynamic` | **Tắt** kiểm tra kiểu tĩnh — dễ lỗi runtime |

**Constructor với initializer list** (chạy trước thân hàm, để gán `final`):
```dart
class Point {
  final int x, y;
  Point(this.x, this.y);
  Point.origin() : x = 0, y = 0;          // named + initializer list
  Point.copy(Point o) : this(o.x, o.y);   // redirecting constructor (this(...))
}
```
- **Redirecting constructor** dùng `: this(...)` để gọi constructor khác cùng class, tránh lặp code.
```

### (Module 3) — chèn nối tiếp sau mục 3.4, trước dấu `---` kết Module 3

> Lưu ý: slide Module 3 tên **"Advanced Dart"** gồm cả OOP nâng cao + generics, không chỉ async. Các mục dưới bổ sung phần OOP nâng cao còn thiếu.

```markdown
## 3.5 Abstract class

Lớp trừu tượng **định nghĩa cấu trúc mà chưa có đầy đủ hành vi**, buộc lớp con phải cài đặt:

```dart
abstract class Shape {
  double area();                 // không có thân → lớp con BẮT BUỘC override
}
class Circle extends Shape {
  final double r;
  Circle(this.r);
  @override double area() => 3.14 * r * r;
}
// Shape s = Shape();  // ❌ LỖI: không thể tạo instance abstract class
```
- Có thể có cả method đã cài đặt lẫn method trừu tượng, có field, có constructor (để lớp con gọi `super`).
- Trong Flutter, **`State<T>` là abstract class** — widget override `build()`, `initState()`… để định nghĩa hành vi.

**Bẫy:** abstract class **không tạo instance trực tiếp**; dùng `extends` để kế thừa (giữ được phần đã cài đặt), khác với `implements`.

## 3.6 Implicit interface & extends vs implements vs with

**Mọi class trong Dart đều tự động là một interface.** `implements` buộc override **toàn bộ** signature (không kế thừa phần thân):

```dart
class Bird { void fly() => print('Bird flying'); }
class Eagle implements Bird {
  @override void fly() => print('Eagle gliding');   // PHẢI tự cài đặt lại hết
}
```

| Từ khoá | Ý nghĩa | Dùng khi |
|---|---|---|
| `extends` | **Kế thừa hành vi** (dùng lại phần đã cài đặt) | Mở rộng/chỉnh sửa class có sẵn — chỉ **1 lớp cha** |
| `implements` | Chỉ lấy **signature**, phải cài đặt lại tất cả | Định nghĩa **contract**, custom hoàn toàn — nhiều interface |
| `with` (mixin) | **Trộn** khối code tái sử dụng vào class | Chia sẻ hành vi cho nhiều class không cùng cây kế thừa |

Ví dụ Flutter: `StatefulWidget extends Widget` · `AnimationController implements Listenable`.

**Bẫy:** `implements` **không** thừa hưởng thân method — kể cả method đã có body ở class gốc vẫn phải viết lại. Dùng cho testing / dependency injection / plugin.

## 3.7 Mixins — chia sẻ code không qua kế thừa

```dart
mixin Logger {
  void log(String msg) => print('[LOG] $msg');
}
class AuthService with Logger {
  void login() => log('login called');    // dùng được log() nhờ mixin
}
```
- Mixin = **khối hành vi tái sử dụng**, trộn vào bằng `with`; **một class trộn được nhiều mixin**.
- Flutter dùng mixin cho animation (`SingleTickerProviderStateMixin`), scrolling, lifecycle.

**Mixin constraint — từ khoá `on`:** giới hạn mixin chỉ áp dụng cho class con của một kiểu → đảm bảo có sẵn field/method cần dùng:

```dart
class Pet { String name; Pet(this.name); }
mixin CanBark on Pet {                     // chỉ dùng cho class kế thừa Pet
  void bark() => print('$name says woof!');   // truy cập được 'name' của Pet
}
class Dog extends Pet with CanBark {
  Dog() : super('Buddy');
}
```

**Bẫy đề thi:** `mixin CanBark on Pet` nghĩa là mixin **chỉ** trộn được vào class đã `extends Pet` — tránh áp nhầm (VD `CanFly` cho `Fish`). Không có `on` thì mixin dùng cho mọi class.

## 3.8 Factory constructor

`factory` cho phép **kiểm soát việc tạo instance** — không bắt buộc luôn trả về object mới:

```dart
class User {
  final String name;
  User._(this.name);                                   // constructor private
  factory User.fromJson(Map<String, dynamic> j) => User._(j['name']);
}
```

| Tình huống | Ví dụ |
|---|---|
| Trả về instance có sẵn | **Singleton** (dịch vụ dùng chung) |
| Chuyển đổi định dạng | **`.fromJson()`** parse JSON |
| Kiểm tra kiểu trước khi tạo | chọn subclass phù hợp (database adapter) |
| Tạo bất đồng bộ gián tiếp | nạp asset trước khi dựng object |

**Bẫy:** khác constructor thường ở chỗ factory **có thể trả về cache / subclass / instance cũ**, và **không** tự động gán field — phải `return` object rõ ràng. Flutter dùng factory nhiều cho theme, color, text style.

## 3.9 Generics — kiểu tổng quát

Generics = **khuôn cho kiểu dữ liệu**, viết một lần dùng cho nhiều kiểu, an toàn lúc compile:

```dart
class Box<T> {                       // T là type parameter
  T value;
  Box(this.value);
  void show() => print('Value = $value');
}
void main() => Box<int>(10).show();  // Box<int>, Box<String>, Box<Widget>...
```
- Dart dùng generics khắp nơi: `List<T>`, `Set<T>`, `Map<K, V>`, `Future<T>`, `Stream<T>`.
- Lợi ích: **an toàn kiểu lúc compile**, tránh lạm dụng `dynamic`.

**Generic constraint (`extends`)** — ép type parameter phải là con của một kiểu:
```dart
abstract class Animal { String sound(); }
class Cat extends Animal { @override String sound() => 'Meow'; }

class Box<T extends Animal> {        // T buộc phải là Animal
  final T pet;
  Box(this.pet);
  void play() => print(pet.sound()); // gọi sound() an toàn vì T chắc chắn là Animal
}
```

**Bẫy đề thi:** `<T extends Animal>` (constraint) khác `class Dog extends Animal` (kế thừa). Constraint đảm bảo mọi `T` đều có method của `Animal` → gọi được `pet.sound()` mà không ép kiểu.

## 3.10 Custom Exception

Tạo exception riêng cho lỗi nghiệp vụ (thay vì ném chuỗi text) → dễ bắt đúng loại, dễ debug:

```dart
class LoginException implements Exception {
  final String msg;
  LoginException(this.msg);
  @override String toString() => 'LoginException: $msg';
}

// dùng:
if (password.isEmpty) throw LoginException('Mật khẩu trống');
try { ... } on LoginException catch (e) { print(e.msg); }
```
- Class cài `implements Exception` (hoặc `Error`), thường có field mô tả + `toString()`.
- Ném custom exception ở **repository** → tầng UI bắt đúng loại để hiện thông báo phù hợp.
```

---

## PHẦN 2 — Câu hỏi chèn vào `PRM393_Ngan_Hang_Cau_Hoi.md` (đề tiếng Anh + đáp án)

### (Module 1) — chèn vào cuối MODULE 1 (sau phần giải thích, trước `---`)

```markdown
### CÂU HỎI BỔ SUNG M1 (từ slide)

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
```

### (Module 2) — chèn vào cuối MODULE 2 (sau phần giải thích, trước `---`)

```markdown
### CÂU HỎI BỔ SUNG M2 (từ slide)

**M2-BS-1.** In a Dart `switch` statement, what happens if a non-empty `case` has no `break`?
A. It silently falls through to the next case
B. It is a compile-time error (Dart forbids implicit fall-through)
C. It loops forever
D. It jumps to `default`

**M2-BS-2.** How do you make several `case` values share the same branch in Dart?
A. Separate them with commas inside one case
B. Stack empty `case` labels on top of the branch
C. Use `fallthrough` keyword
D. It is not possible

**M2-BS-3.** What is the result of `7 ~/ 2` in Dart?
A. `3.5`  B. `3` (an int)  C. `4`  D. `3.0`

**M2-BS-4.** Which operator tests whether an object is of a given type?
A. `as`  B. `is`  C. `==`  D. `??`

**M2-BS-5.** In `try / on / catch / finally`, which block always executes?
A. `on`  B. `catch`  C. `finally`  D. `try`

**M2-BS-6.** What does `catch (e, s)` capture?
A. Two separate exceptions
B. The error object `e` and its stack trace `s`
C. An error and a success value
D. The exception and the current widget

**M2-BS-7.** What does `rethrow` do inside a catch block?
A. Swallows the exception
B. Re-throws the current exception (preserving its stack trace) to an outer handler
C. Converts the exception to null
D. Restarts the try block

**M2-BS-8.** How do you catch only a specific exception type in Dart?
A. `catch (FormatException e)`
B. `on FormatException catch (e)`
C. `except FormatException`
D. `catch<FormatException>(e)`

**M2-BS-9.** Which construct cannot use `break` or `continue`?
A. `for` loop
B. `for-in` loop
C. `while` loop
D. `.forEach()`

**M2-BS-10.** What does the `Never` type indicate for a function's return?
A. It returns null
B. It never returns normally (always throws or loops forever)
C. It returns void
D. It returns any type

**M2-BS-11.** Which is a valid redirecting constructor?
A. `Point.copy(Point o) : this(o.x, o.y);`
B. `Point.copy(Point o) => Point(o.x, o.y);`
C. `Point.copy(Point o) { this = Point(o.x, o.y); }`
D. `redirect Point.copy(Point o);`

**M2-BS-12.** What is the purpose of a constructor initializer list (`: x = 0, y = 0`)?
A. To run code after the constructor body
B. To initialise `final` fields before the constructor body runs
C. To declare optional parameters
D. To override a parent method

### ĐÁP ÁN M2-BS
1-B · 2-B · 3-B · 4-B · 5-C · 6-B · 7-B · 8-B · 9-D · 10-B · 11-A · 12-B

**Giải thích các câu dễ sai:**
- **1, 2:** Dart KHÔNG fall-through ngầm; case không rỗng thiếu `break` là **lỗi compile**. Muốn dùng chung nhánh thì để các `case` rỗng chồng lên nhau.
- **3:** `~/` là chia lấy phần nguyên → `3` (int); còn `7 / 2` = `3.5` (double).
- **6, 7, 8:** `catch (e, s)` lấy lỗi + stack trace; `rethrow` ném lại giữ nguyên stack; bắt đúng loại bằng `on X catch (e)`.
- **9:** `forEach` là hàm nhận callback → không dùng được `break/continue`; cần thoát sớm phải dùng `for-in`.
- **10:** `Never` = hàm **không bao giờ trả về bình thường** (luôn throw / vòng lặp vô hạn).
```

### (Module 3) — chèn vào cuối MODULE 3 (sau phần giải thích, trước `---`)

```markdown
### CÂU HỎI BỔ SUNG M3 — Advanced Dart OOP & Generics (từ slide)

**M3-BS-1.** Which statement about an abstract class is TRUE?
A. It can be instantiated directly with `new`
B. It may declare methods with no body that subclasses must implement
C. It cannot have any concrete methods
D. It cannot have a constructor

**M3-BS-2.** In Flutter, `State<T>` is an example of:
A. A mixin
B. An abstract class whose methods (build, initState) are overridden
C. A factory constructor
D. A generic function

**M3-BS-3.** When a class uses `implements SomeClass`, it must:
A. Call `super()` in every constructor
B. Re-implement all members of that class's interface (no bodies are inherited)
C. Be abstract
D. Only override one method

**M3-BS-4.** What is the difference between `extends` and `implements`?
A. `extends` inherits behaviour; `implements` only takes the signature and forces full re-implementation
B. They are identical
C. `implements` allows multiple inheritance of behaviour
D. `extends` cannot override methods

**M3-BS-5.** What does a `mixin` provide?
A. Multiple inheritance of state via constructors
B. Reusable behaviour mixed into a class with `with`, without a subclass relationship
C. A way to make a class abstract
D. Asynchronous execution

**M3-BS-6.** What does `mixin CanBark on Pet` mean?
A. `CanBark` extends `Pet`
B. `CanBark` can only be applied to classes that are (subclasses of) `Pet`
C. `Pet` uses the `CanBark` mixin
D. `CanBark` is abstract

**M3-BS-7.** What is the main purpose of a `factory` constructor?
A. It always returns a brand-new instance
B. It controls instance creation — can return a cached object, a subtype, or parse JSON
C. It can only be used inside abstract classes
D. It runs asynchronously by default

**M3-BS-8.** Which is a typical use case for a factory constructor?
A. `User.fromJson(map)` parsing JSON into an object
B. Declaring a private field
C. Defining a mixin
D. Overriding `toString()`

**M3-BS-9.** Why are generics (e.g. `Box<T>`) useful?
A. They make code run on another thread
B. They give compile-time type safety and reuse for many types, avoiding `dynamic` misuse
C. They replace inheritance
D. They are only for collections

**M3-BS-10.** In `class Box<T extends Animal>`, what does the constraint guarantee?
A. `T` must be exactly `Animal`
B. `T` must be a subtype of `Animal`, so members of `Animal` can be called on a `T` value
C. `Box` inherits from `Animal`
D. `T` can be any type

**M3-BS-11.** Which correctly declares a custom exception in Dart?
A. `class LoginException implements Exception { final String msg; LoginException(this.msg); }`
B. `class LoginException throws Exception {}`
C. `exception LoginException {}`
D. `class LoginException = Exception;`

**M3-BS-12.** Which pair of Flutter examples correctly matches the keyword?
A. `StatefulWidget implements Widget`, `AnimationController extends Listenable`
B. `StatefulWidget extends Widget`, `AnimationController implements Listenable`
C. Both use `with`
D. Both use `extends`

### ĐÁP ÁN M3-BS
1-B · 2-B · 3-B · 4-A · 5-B · 6-B · 7-B · 8-A · 9-B · 10-B · 11-A · 12-B

**Giải thích các câu dễ sai:**
- **3, 4:** `implements` chỉ lấy signature, **phải cài đặt lại toàn bộ** (không thừa hưởng body); `extends` mới kế thừa hành vi. Mọi class Dart đều là implicit interface.
- **6:** `on Pet` giới hạn mixin chỉ trộn được vào class kế thừa `Pet` — đảm bảo mixin truy cập được field của `Pet` (VD `name`). KHÔNG phải "CanBark extends Pet".
- **7, 8:** factory **không bắt buộc tạo instance mới** — dùng cho singleton/cache/`fromJson`/chọn subtype.
- **10:** `<T extends Animal>` là **ràng buộc generic** (T là con của Animal) → gọi `pet.sound()` an toàn không cần ép kiểu; khác với kế thừa class thường.
- **12:** Nhớ cặp ví dụ Flutter: `StatefulWidget extends Widget` (kế thừa), `AnimationController implements Listenable` (contract).
```

---

**Status:** DONE
**Summary:** Tìm được ~24 nhóm gap (M1: 6 nhóm gồm Platform Channels/khi-nào-dùng-Flutter/so-sánh-RN/dev-environments/pipeline-render; M2: 4 nhóm lớn gồm switch/exception/operators/loops; M3: 8 nhóm — toàn bộ OOP nâng cao + generics vì File A M3 chỉ có async). Đã soạn 3 khối lý thuyết tiếng Việt (10 mục con cho A) + **36 câu trắc nghiệm tiếng Anh** (12/module) kèm đáp án & giải thích, ready-to-paste.
**Concerns:** Module 3 lệch lớn — slide "Advanced Dart" nhưng heading File A/B ghi "Asynchronous Programming"; nếu muốn khớp hoàn toàn nên cân nhắc đổi tiêu đề Module 3 (giữ nguyên hay đổi là quyết định của người dùng, tôi KHÔNG tự sửa). Phần async trong slide M2/M3 đã được File A cover tốt nên không bổ sung để tránh trùng.
