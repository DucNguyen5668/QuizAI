# PRM393 – MOBILE PROGRAMMING (Flutter/Dart)
## Tài liệu ôn thi toàn diện – mục tiêu 9+

> Cấu trúc điểm: Practical Exam 25% · Progress Test 3×5% = 15% · Project 30% (20% sản phẩm + 10% thuyết trình) · Final 30% (50 câu trắc nghiệm / 60 phút)
>
> PT1 = CLO1,2,3 (slot 1–15) · PT2 = CLO3,4,5 (slot 17–30) · PT3 = CLO5,6,7 (slot 32–52)

---

# MODULE 1 — FLUTTER OVERVIEW & MÔI TRƯỜNG

## 1.1 Flutter là gì
- SDK của Google, dùng ngôn ngữ **Dart**, build cross-platform từ **một codebase**: Android, iOS, Web, Windows, macOS, Linux.
- Flutter **không dùng native widget** của hệ điều hành. Nó tự vẽ mọi pixel bằng engine đồ hoạ (**Skia**, các bản mới là **Impeller**). Đây là lý do UI giống hệt nhau trên mọi nền tảng.
- Kiến trúc 3 tầng:
  - **Framework** (Dart): widget, material/cupertino, rendering, animation
  - **Engine** (C++): Skia/Impeller, text layout, Dart runtime
  - **Embedder**: cầu nối với từng OS

**Bẫy đề thi:** "Flutter render bằng cách nào?" → tự vẽ bằng engine đồ hoạ, KHÔNG bridge sang native widget như React Native.

## 1.2 Cấu trúc project
```
my_app/
├── lib/              ← code Dart, entry point là lib/main.dart
├── android/          ← project Android gốc (AndroidManifest.xml ở đây)
├── ios/              ← project Xcode (Info.plist ở đây)
├── web/ windows/ ...
├── test/             ← unit & widget test
├── assets/           ← ảnh, font, file .env (phải khai báo trong pubspec)
├── pubspec.yaml      ← khai báo dependency, assets, font, version
└── pubspec.lock      ← khoá version chính xác đã resolve
```

**pubspec.yaml** – phần hay hỏi:
```yaml
dependencies:        # thư viện app chạy thật cần
  http: ^1.2.0
dev_dependencies:    # chỉ dùng lúc dev/test (flutter_test, build_runner...)
  flutter_test:
    sdk: flutter
flutter:
  uses-material-design: true
  assets:
    - assets/images/    # khai báo cả folder phải có dấu / cuối
  fonts:
    - family: Roboto
      fonts:
        - asset: assets/fonts/Roboto-Bold.ttf
          weight: 700
```
- `^1.2.0` = caret syntax: nhận mọi bản `>=1.2.0 <2.0.0` (không phá vỡ major).
- File YAML **thụt lề bằng space, không dùng tab**.

## 1.3 Hot Reload vs Hot Restart vs Full Restart — RẤT HAY THI

| | Hot Reload (r) | Hot Restart (R) | Full Restart |
|---|---|---|---|
| Làm gì | Nạp code mới vào Dart VM, rebuild widget tree | Nạp lại code + chạy lại app từ `main()` | Build lại toàn bộ |
| **State có giữ không** | **Giữ** | **Mất** | Mất |
| Tốc độ | Nhanh nhất (<1s) | Vừa | Chậm |
| Không dùng được khi | Đổi `main()`, đổi biến `static`/global initializer, đổi enum→class, đổi kiểu generic, thêm/sửa **native code**, sửa **pubspec/assets** | Sửa native code, đổi dependency | — |

**Bẫy:** thêm asset mới hoặc sửa file `.env` → hot reload KHÔNG ăn, phải restart/rebuild (đúng như câu hỏi flutter_dotenv bạn gặp).

## 1.4 CLI cần thuộc (CLO6)
```
flutter doctor            kiểm tra môi trường
flutter create my_app     tạo project
flutter pub get           tải dependency
flutter pub upgrade       nâng version
flutter run               chạy debug
flutter run --release     chạy bản release
flutter build apk --split-per-abi
flutter build appbundle   ← Google Play yêu cầu .aab
flutter build ipa         iOS (cần macOS + Xcode)
flutter clean             xoá build cache
flutter test              chạy test
dart format . / dart analyze / dart fix --apply
```

## 1.5 3 chế độ build

| | Debug | Profile | Release |
|---|---|---|---|
| Biên dịch | **JIT** | AOT | **AOT** |
| Hot reload | Có | Không | Không |
| assert | Bật | Tắt | Tắt |
| DevTools | Đầy đủ | Có (đo hiệu năng) | Không |
| Dùng để | Phát triển | Đo performance trên máy thật | Phát hành |

**Nhớ:** Dart dùng JIT khi debug (để hot reload) và AOT khi release (để nhanh, khởi động tức thì).

---

# MODULE 2 — DART ESSENTIALS

## 2.1 Biến và kiểu
```dart
var a = 10;              // suy luận kiểu, sau đó a là int cố định
dynamic b = 10;          // đổi kiểu tuỳ ý lúc runtime (tắt kiểm tra kiểu)
Object c = 10;           // có kiểu, phải ép kiểu mới gọi method riêng
final d = DateTime.now();    // gán 1 lần, giá trị xác định lúc RUNTIME
const e = 3.14;              // hằng số xác định lúc COMPILE-TIME
late String f;               // hứa sẽ gán trước khi dùng (lazy init)
```
**Bẫy kinh điển:** `const x = DateTime.now();` → **LỖI COMPILE**, vì thời gian chỉ biết lúc chạy. Phải dùng `final`.

`final List` vẫn `add()` được (biến không đổi tham chiếu, nội dung đổi được); `const List` thì bất biến hoàn toàn.

## 2.2 Null safety (Dart 2.12+)
```dart
String s = null;      // LỖI
String? s = null;     // OK — kiểu nullable
int len = s!.length;       // ! = bang operator, ép non-null, null → runtime error
int len = s?.length ?? 0;  // ?. an toàn ; ?? giá trị mặc định
s ??= "default";           // gán nếu đang null
```
- `?.` **null-aware access**, `??` **if-null**, `??=` **null-aware assignment**, `!` **null assertion**.

## 2.3 Kiểu dữ liệu chính
`int`, `double` (không có `float`), `num` (cha của cả 2), `String`, `bool`, `List`, `Set`, `Map`, `Runes`, `Symbol`.
**Trong Dart mọi thứ đều là object**, kể cả `int` và `null` — đều kế thừa từ `Object` (trừ `null` là `Null`).

## 2.4 Hàm
```dart
int add(int a, int b) => a + b;             // arrow function (1 biểu thức)
void f(int a, [int? b, String c = 'x']) {}  // optional positional
void g({required String name, int age = 0}) {}   // named parameter
g(name: 'An');
```
- Named parameter **mặc định là optional**, muốn bắt buộc phải thêm `required`.
- Hàm là **first-class object**: gán vào biến, truyền làm tham số được.
```dart
List<int> nums = [1,2,3];
nums.forEach((n) => print(n));
var doubled = nums.map((n) => n * 2).toList();
var evens = nums.where((n) => n.isEven).toList();
var total = nums.reduce((a, b) => a + b);
var sum = nums.fold(0, (prev, e) => prev + e);
```
**Nhớ:** `map`/`where` trả về **Iterable lazy** → phải `.toList()` mới thành List.

## 2.5 OOP
```dart
class Person {
  final String name;
  int age;

  Person(this.name, this.age);                 // constructor rút gọn
  Person.guest() : name = 'Guest', age = 0;    // named constructor
  const Person.fixed(this.name, this.age);     // const constructor

  int get birthYear => DateTime.now().year - age;   // getter
  set setAge(int v) => age = v;                     // setter

  @override
  String toString() => 'Person($name, $age)';
}
```
- **Kế thừa:** `class Student extends Person` — Dart **chỉ đơn kế thừa**.
- **implements**: phải cài đặt lại TOÀN BỘ member (mọi class đều là implicit interface).
- **mixin (`with`)**: tái sử dụng code từ nhiều nguồn, giải quyết bài toán "đa kế thừa".
- **abstract class**: không tạo instance được, có thể có method chưa cài đặt.
- `super` gọi lớp cha, `@override` đánh dấu ghi đè.
- **Cascade `..`**: gọi nhiều lệnh trên cùng object
```dart
var p = Person('An', 20)..age = 21..name;   // trả về chính object
```

## 2.6 Collections
```dart
List<int> l = [1,2,3];              Set<int> s = {1,2,3};
Map<String,int> m = {'a':1};
// spread + collection if/for
var l2 = [0, ...l, if (isVip) 99, for (var i in l) i*10];
```

---

# MODULE 3 — ADVANCED DART (Bất đồng bộ + OOP nâng cao + Generics, CLO4)

## 3.1 Mô hình đơn luồng + Event Loop
Dart chạy **1 luồng chính (isolate)**. Không có shared-memory threading. Cơ chế:
- **Call stack** → chạy code đồng bộ
- **Microtask queue** (ưu tiên cao: `Future.value`, `scheduleMicrotask`, `then`)
- **Event queue** (I/O, timer, tap, HTTP response)

Thứ tự: chạy hết code đồng bộ → **vét sạch microtask queue** → mới lấy 1 event từ event queue → lại vét microtask...

**Câu hỏi kinh điển — đoán output:**
```dart
void main() {
  print('1');
  Future(() => print('2'));                 // event queue
  Future.microtask(() => print('3'));       // microtask queue
  Future.value(4).then((v) => print('4'));  // microtask
  print('5');
}
// Output: 1, 5, 3, 4, 2
```

**Isolate**: muốn chạy song song thật (tính toán nặng) phải dùng `Isolate.spawn()` hoặc `compute()`. Các isolate **không chia sẻ bộ nhớ**, chỉ giao tiếp bằng message qua `SendPort`/`ReceivePort`.

## 3.2 Future
Đại diện cho **một giá trị sẽ có trong tương lai**. 3 trạng thái: uncompleted → completed with value / completed with error.
```dart
Future<String> fetch() async {
  await Future.delayed(Duration(seconds: 2));
  return 'data';
}

// Cách 1: then/catchError
fetch().then((v) => print(v)).catchError((e) => print(e)).whenComplete(() {});

// Cách 2: async/await (dễ đọc hơn)
Future<void> load() async {
  try {
    final v = await fetch();
    print(v);
  } catch (e) {
    print(e);
  } finally {
    print('done');
  }
}
```
**Quy tắc vàng:** `await` **chỉ dùng được trong hàm có `async`**. Hàm `async` **luôn trả về Future**, kể cả khi bạn `return 1` (thành `Future<int>`). Hàm async không có giá trị trả về → `Future<void>`.

Tiện ích:
```dart
await Future.wait([f1(), f2()]);      // chạy SONG SONG, đợi tất cả xong
await Future.any([f1(), f2()]);       // lấy cái xong trước
Future.delayed(Duration(seconds: 1));
```
**Bẫy:** viết `await f1(); await f2();` là chạy **tuần tự** (tổng thời gian cộng dồn). Muốn song song dùng `Future.wait`.

## 3.3 Stream
Đại diện cho **nhiều giá trị theo thời gian** (Future = 1 giá trị, Stream = 0..n giá trị).
```dart
Stream<int> counter() async* {          // async* + yield
  for (int i = 0; i < 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

await for (final v in counter()) { print(v); }   // hoặc
final sub = counter().listen(
  (data) {}, onError: (e) {}, onDone: () {}, cancelOnError: false,
);
sub.cancel();   // BẮT BUỘC huỷ trong dispose() để tránh memory leak
```

**Single-subscription vs Broadcast — hay thi:**
| | Single subscription (mặc định) | Broadcast |
|---|---|---|
| Số listener | **Chỉ 1** | Nhiều |
| Tạo | `StreamController<T>()` | `StreamController<T>.broadcast()` |
| Dữ liệu khi chưa có listener | Được buffer | **Bị mất** |
| Dùng cho | Đọc file, HTTP response | Sự kiện UI, event bus |

Nghe stream single-subscription lần thứ 2 → ném `StateError`.

```dart
final ctrl = StreamController<int>();
ctrl.sink.add(1);        // đẩy dữ liệu vào
ctrl.stream.listen(...); // nghe
ctrl.close();            // dispose bắt buộc
```

Toán tử biến đổi: `map`, `where`, `expand`, `take`, `skip`, `distinct`, `asyncMap`.

## 3.4 Repository Pattern
Tách **nguồn dữ liệu** khỏi **UI**:
```
UI (Widget) → ViewModel/Controller → Repository → DataSource (API / SQLite / Prefs)
```
Lợi ích: đổi nguồn dữ liệu không phải sửa UI; dễ mock khi viết unit test; tránh gọi trực tiếp `http` trong widget.

---

# MODULE 4 — UI FUNDAMENTALS

## 4.1 Everything is a widget
- **Widget = bản mô tả cấu hình bất biến (immutable)**. Widget không phải là thứ được vẽ.
- 3 cây song song: **Widget tree** (config, tạo lại liên tục) → **Element tree** (cầu nối, giữ state, tồn tại lâu) → **RenderObject tree** (đo đạc, vẽ).
- Rebuild widget rẻ vì Flutter chỉ so sánh và cập nhật Element/RenderObject cần thiết.

## 4.2 StatelessWidget vs StatefulWidget

| | StatelessWidget | StatefulWidget |
|---|---|---|
| Có state đổi được | Không | Có (giữ trong `State`) |
| Method | `build(BuildContext)` | `createState()` → class State có `build` |
| Vẽ lại khi | Cha rebuild / InheritedWidget đổi | Thêm: gọi `setState()` |

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;
  @override
  void initState() { super.initState(); }      // gọi 1 LẦN, không dùng context cho InheritedWidget
  @override
  void didChangeDependencies() { super.didChangeDependencies(); }
  @override
  void didUpdateWidget(covariant Counter old) { super.didUpdateWidget(old); }
  @override
  void dispose() { /* huỷ controller, stream */ super.dispose(); }

  @override
  Widget build(BuildContext context) =>
    ElevatedButton(onPressed: () => setState(() => count++), child: Text('$count'));
}
```

**Vòng đời State (thứ tự hay thi):**
`createState()` → `initState()` → `didChangeDependencies()` → `build()` → (`didUpdateWidget()` → `build()`)* → `deactivate()` → `dispose()`

**Bẫy:**
- Gọi `setState()` sau khi widget đã dispose → lỗi. Kiểm tra `if (mounted)`.
- Không gọi `setState()` trong `build()` (vòng lặp vô hạn).
- Không gọi `Theme.of(context)`/`MediaQuery.of(context)` trong `initState()` → dùng `didChangeDependencies()`.
- `dispose()` phải huỷ `TextEditingController`, `AnimationController`, `StreamSubscription`, `Timer`.

## 4.3 Widget cơ bản
- **MaterialApp**: gốc app, cấu hình `theme`, `home`, `routes`, `initialRoute`, `onGenerateRoute`, `navigatorKey`. (Bản iOS: `CupertinoApp`.)
- **Scaffold**: khung màn hình Material — `appBar`, `body`, `floatingActionButton`, `drawer`, `endDrawer`, `bottomNavigationBar`, `bottomSheet`, `snackBar` (qua `ScaffoldMessenger`).
- **Container**: gộp padding + margin + decoration + constraints + align.
- **Text / RichText**, **Image.asset / Image.network**, **Icon**
- Nút: `ElevatedButton`, `TextButton`, `OutlinedButton`, `IconButton`, `FloatingActionButton`. `onPressed: null` → nút **bị disable**.
- **SizedBox**, **Padding**, **Center**, **Align**, **Expanded**, **Flexible**, **Spacer**

## 4.4 Danh sách
```dart
ListView(children: [...])            // dựng HẾT item ngay — chỉ dùng khi ít item
ListView.builder(                    // LAZY, chỉ dựng item nhìn thấy → danh sách dài/vô hạn
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(
    leading: Icon(Icons.person),
    title: Text(items[index].name),
    subtitle: Text(items[index].email),
    trailing: Icon(Icons.arrow_forward),
    onTap: () {},
  ),
)
ListView.separated(... separatorBuilder: (c,i) => Divider())
```
**Bẫy thi:** `ListView.builder` tương đương RecyclerView bên Android — tái sử dụng, tiết kiệm bộ nhớ. `ListView(children:)` thì không.

`Card` = bo góc + đổ bóng (`elevation`).

## 4.5 Widget tương tác
```dart
TextField(controller: c, decoration: InputDecoration(labelText:'Name'), onChanged: (v){})
Checkbox(value: v, onChanged: (nv) => setState(() => v = nv!))
Switch / Radio<T> / Slider / DropdownButton<T>
```
Tất cả đều là **controlled widget**: giá trị nằm ở State, `onChanged` phải `setState` mới thấy đổi. `onChanged: null` → disable.

**Ephemeral state** (state cục bộ 1 widget, dùng `setState`) vs **App state** (dùng chung nhiều màn, dùng Provider/InheritedWidget).

## 4.6 Pickers
```dart
final date = await showDatePicker(
  context: context, initialDate: DateTime.now(),
  firstDate: DateTime(2000), lastDate: DateTime(2100));
final time = await showTimePicker(context: context, initialTime: TimeOfDay.now());
```
Cả hai trả về **Future** và có thể **null** nếu người dùng bấm Cancel → luôn kiểm tra null.

## 4.7 Theming
```dart
MaterialApp(
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
    useMaterial3: true,
    textTheme: TextTheme(bodyLarge: TextStyle(fontSize: 16)),
  ),
  darkTheme: ThemeData.dark(),
  themeMode: ThemeMode.system,
)
// Dùng lại:
Theme.of(context).colorScheme.primary
Theme.of(context).textTheme.titleLarge
```
`Theme.of(context)` là **InheritedWidget** → đổi theme thì widget phụ thuộc tự rebuild.

---

# MODULE 5 — NAVIGATION

## 5.1 Navigator 1.0 – imperative, mô hình STACK
```dart
Navigator.push(context, MaterialPageRoute(builder: (_) => DetailScreen()));
Navigator.pop(context);
Navigator.pop(context, result);          // trả dữ liệu về màn trước
final result = await Navigator.push(...); // nhận dữ liệu trả về

Navigator.pushReplacement(...)   // thay màn hiện tại (không back lại được)
Navigator.pushAndRemoveUntil(context, route, (r) => false);  // xoá sạch stack
Navigator.popUntil(context, ModalRoute.withName('/home'));
Navigator.canPop(context);
```
`MaterialPageRoute` cho hiệu ứng chuyển màn theo nền tảng; `PageRouteBuilder` để tự custom animation.

## 5.2 Named routes
```dart
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (c) => HomeScreen(),
    '/detail': (c) => DetailScreen(),
  },
  onGenerateRoute: (settings) { ... },   // route động, có tham số
  onUnknownRoute: (settings) => MaterialPageRoute(builder: (_) => NotFound()),
)

Navigator.pushNamed(context, '/detail', arguments: {'id': 5});
// nhận:
final args = ModalRoute.of(context)!.settings.arguments as Map;
```
**Bẫy:** khai báo cả `home:` và `routes: {'/': ...}` cùng lúc → **lỗi assert**, chỉ được chọn một.

## 5.3 Navigator 2.0 (Router API) – declarative
Sinh ra để giải quyết deep link và web URL mà Navigator 1.0 làm khó.
Ba mảnh cần nhớ:
- **RouteInformationParser**: chuyển URL ↔ object trạng thái app
- **RouterDelegate**: từ trạng thái app dựng ra danh sách `Page` cho `Navigator`
- **BackButtonDispatcher**: xử lý nút back hệ thống

Thực tế hầu hết dùng thư viện bọc sẵn: **go_router**, auto_route.

## 5.4 Deep linking
**Android** – `android/app/src/main/AndroidManifest.xml`:
```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="https" android:host="myapp.com"/>
</intent-filter>
```
**iOS** – `ios/Runner/Info.plist`: khai `CFBundleURLTypes` + `CFBundleURLSchemes` (custom scheme `myapp://`), hoặc **Associated Domains** (`applinks:myapp.com`) cho Universal Links.

Phân biệt: **custom scheme** (`myapp://detail/5`) dễ làm nhưng app khác giả mạo được; **App Links (Android) / Universal Links (iOS)** dùng https + xác minh chủ sở hữu domain → an toàn hơn.

---

# MODULE 6 — LAYOUT & RESPONSIVE

## 6.1 Nguyên tắc constraint — CÂU THẦN CHÚ
> **"Constraints go down. Sizes go up. Parent sets position."**

Cha truyền ràng buộc (min/max width, height) xuống con → con tự quyết kích thước trong ràng buộc đó rồi báo lên → cha đặt vị trí cho con.

## 6.2 Row / Column (Flex)
```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,  // trục CHÍNH
  crossAxisAlignment: CrossAxisAlignment.center,      // trục PHỤ
  mainAxisSize: MainAxisSize.max,
  children: [...],
)
```
- **Row**: main axis = ngang, cross axis = dọc. **Column** thì ngược lại.
- `MainAxisAlignment`: start, end, center, spaceBetween, spaceAround, spaceEvenly.
  - spaceBetween: không có khoảng ở 2 đầu
  - spaceAround: khoảng 2 đầu = **½** khoảng giữa
  - spaceEvenly: mọi khoảng **bằng nhau**
- **Expanded**: chiếm hết chỗ trống còn lại, `flex` chia tỉ lệ. **Flexible** (fit: loose) cho phép con nhỏ hơn. **Spacer** = Expanded rỗng.

**Lỗi hay gặp trong đề:**
- `RenderFlex overflowed by X pixels` → nội dung vượt màn hình. Sửa: bọc `Expanded`/`Flexible`, hoặc `SingleChildScrollView`.
- Đặt `ListView` trong `Column` mà không bọc `Expanded` → lỗi unbounded height.
- `Expanded` chỉ dùng được **trực tiếp trong Row/Column/Flex**, đặt trong `Container` → lỗi.

## 6.3 Stack
```dart
Stack(
  alignment: Alignment.center,
  fit: StackFit.loose,
  children: [
    Image.network(url),
    Positioned(bottom: 8, right: 8, child: Icon(Icons.favorite)),
  ],
)
```
Widget xếp chồng, **child sau vẽ đè lên child trước**. `Positioned` chỉ dùng trong Stack.

## 6.4 GridView
```dart
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2, childAspectRatio: 0.75,
    mainAxisSpacing: 8, crossAxisSpacing: 8),
  itemCount: n, itemBuilder: (c,i) => Card(...),
)
// hoặc SliverGridDelegateWithMaxCrossAxisExtent(maxCrossAxisExtent: 200)  ← responsive tốt hơn
```

## 6.5 Responsive
```dart
final size = MediaQuery.of(context).size;          // kích thước MÀN HÌNH
final orientation = MediaQuery.of(context).orientation;
final padding = MediaQuery.of(context).padding;    // safe area (tai thỏ)

LayoutBuilder(builder: (context, constraints) {    // ràng buộc từ WIDGET CHA
  if (constraints.maxWidth < 600) return MobileLayout();
  return TabletLayout();
})
```
**Phân biệt quan trọng:** `MediaQuery` = kích thước cả màn hình/cửa sổ; `LayoutBuilder` = không gian mà **widget cha** cấp cho widget này. Làm responsive theo component thì `LayoutBuilder` chuẩn hơn.

Breakpoint thường dùng: <600 mobile, 600–1024 tablet, >1024 desktop.
Widget hỗ trợ: `SafeArea`, `FittedBox`, `AspectRatio`, `OrientationBuilder`, `Wrap` (tự xuống dòng khi hết chỗ — Row thì tràn).

---

# MODULE 7 — FORMS & VALIDATION

```dart
final _formKey = GlobalKey<FormState>();
final _emailCtrl = TextEditingController();

@override
void dispose() { _emailCtrl.dispose(); super.dispose(); }   // BẮT BUỘC

Form(
  key: _formKey,
  autovalidateMode: AutovalidateMode.onUserInteraction,
  child: Column(children: [
    TextFormField(
      controller: _emailCtrl,
      keyboardType: TextInputType.emailAddress,
      textInputAction: TextInputAction.next,
      obscureText: false,
      decoration: InputDecoration(labelText: 'Email', errorText: null,
        border: OutlineInputBorder(), prefixIcon: Icon(Icons.email)),
      validator: (value) {
        if (value == null || value.isEmpty) return 'Bắt buộc nhập';
        if (!value.contains('@')) return 'Email không hợp lệ';
        return null;      // null = HỢP LỆ
      },
      onSaved: (v) => email = v,
    ),
    ElevatedButton(
      onPressed: () {
        if (_formKey.currentState!.validate()) {   // chạy mọi validator
          _formKey.currentState!.save();           // gọi mọi onSaved
          // submit...
        }
      },
      child: Text('Submit'),
    ),
  ]),
)
```

**Điểm chốt hay thi:**
- `validator` trả **`null` nghĩa là hợp lệ**, trả String là thông báo lỗi.
- `Form` cần **`GlobalKey<FormState>`** để gọi `validate()`, `save()`, `reset()`.
- **`TextField` không có validator**; chỉ `TextFormField` (bản bọc của TextField cho Form) mới có.
- `TextEditingController` không dispose → **memory leak**.
- `AutovalidateMode`: `disabled` (mặc định), `always`, `onUserInteraction` (tốt nhất cho UX).

**Focus & bàn phím:**
```dart
final _focus = FocusNode();
FocusScope.of(context).requestFocus(_focus);      // chuyển focus
FocusScope.of(context).unfocus();                 // ẩn bàn phím
textInputAction: TextInputAction.next / done      // nút góc bàn phím
onFieldSubmitted: (_) => FocusScope.of(context).nextFocus(),
resizeToAvoidBottomInset: true                    // Scaffold tránh bàn phím che
```
`FocusNode` cũng phải `dispose()`.

---

# MODULE 8 — NETWORKING & JSON

## 8.1 HTTP
```yaml
dependencies:
  http: ^1.2.0
```
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<Post>> fetchPosts() async {
  final res = await http.get(
    Uri.parse('https://api.example.com/posts'),
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer $token'},
  );
  if (res.statusCode == 200) {
    final List data = jsonDecode(res.body);            // String → Dart object
    return data.map((e) => Post.fromJson(e)).toList();
  }
  throw Exception('Failed: ${res.statusCode}');
}

await http.post(uri, body: jsonEncode({'title': 't'}), headers: {...});
```
`jsonDecode` (String→Map/List) và `jsonEncode` (object→String) nằm trong `dart:convert`.
Mã trạng thái: 200 OK · 201 Created · 400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found · 500 Server Error.

**Quyền internet:** Android cần `<uses-permission android:name="android.permission.INTERNET"/>` trong AndroidManifest (bản debug đã có sẵn, bản release phải tự thêm nếu chưa).

## 8.2 Model + JSON serialization
```dart
class Post {
  final int id; final String title;
  Post({required this.id, required this.title});

  factory Post.fromJson(Map<String, dynamic> json) =>
      Post(id: json['id'], title: json['title'] ?? '');

  Map<String, dynamic> toJson() => {'id': id, 'title': title};
}
```
`factory` constructor dùng khi không nhất thiết tạo instance mới (có thể trả về cache/subclass).
Tự động hoá: `json_serializable` + `build_runner` (`dart run build_runner build`) sinh file `.g.dart`.

## 8.3 FutureBuilder — RẤT HAY THI
```dart
FutureBuilder<List<Post>>(
  future: _future,                       // KHÔNG gọi fetchPosts() trực tiếp ở đây!
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) return Center(child: Text('Lỗi: ${snapshot.error}'));
    if (!snapshot.hasData || snapshot.data!.isEmpty) return Text('Không có dữ liệu');
    return ListView.builder(...);
  },
)
```
**Bẫy số 1 của môn này:** đặt `future: fetchPosts()` ngay trong `build()` → mỗi lần rebuild lại gọi API lần nữa (vòng lặp gọi mạng). Giải pháp: khởi tạo `_future = fetchPosts();` trong `initState()`.

`ConnectionState`: `none` → `waiting` → `active` (stream) → `done`.
`StreamBuilder` tương tự nhưng nhận `stream:` và có thêm `initialData`.

## 8.4 Retry & caching
- Retry: bắt lỗi, đếm số lần thử, **exponential backoff** (1s, 2s, 4s...).
- Cache: lưu response vào SharedPreferences/SQLite kèm timestamp, đọc cache trước rồi refresh nền (**stale-while-revalidate**); tránh gọi lại API khi dữ liệu chưa hết hạn.
- Kiểm tra mạng: `connectivity_plus`.

---

# MODULE 9 — LOCAL STORAGE

## 9.1 SharedPreferences
Key-value đơn giản, lưu dưới dạng XML (Android) / NSUserDefaults (iOS). Dành cho **dữ liệu nhỏ**: token, cờ đã onboarding, theme, ngôn ngữ.
```dart
final prefs = await SharedPreferences.getInstance();
await prefs.setString('token', 'abc');
await prefs.setInt('count', 5);
await prefs.setBool('dark', true);
await prefs.setStringList('tags', ['a','b']);
final t = prefs.getString('token');     // null nếu chưa có
await prefs.remove('token');
await prefs.clear();
```
**Chỉ hỗ trợ 5 kiểu:** `int`, `double`, `bool`, `String`, `List<String>`. Muốn lưu object → `jsonEncode` thành String.
**Không dùng để lưu dữ liệu nhạy cảm** (không mã hoá) → dùng `flutter_secure_storage`. Không dùng cho dữ liệu lớn/có quan hệ → dùng SQLite.

## 9.2 SQLite (sqflite)
```dart
final db = await openDatabase(
  join(await getDatabasesPath(), 'app.db'),
  version: 1,
  onCreate: (db, v) => db.execute(
    'CREATE TABLE notes(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INTEGER)'),
  onUpgrade: (db, oldV, newV) { /* migration */ },
);

await db.insert('notes', note.toMap(), conflictAlgorithm: ConflictAlgorithm.replace);
final rows = await db.query('notes', where: 'done = ?', whereArgs: [0], orderBy: 'id DESC');
await db.update('notes', map, where: 'id = ?', whereArgs: [id]);
await db.delete('notes', where: 'id = ?', whereArgs: [id]);
await db.rawQuery('SELECT * FROM notes');
```
- SQLite **không có kiểu BOOLEAN** → lưu `INTEGER` 0/1. Không có DateTime → lưu `TEXT` ISO8601 hoặc `INTEGER` millisecondsSinceEpoch.
- Luôn dùng `?` + `whereArgs` để **chống SQL injection**.
- Đổi schema phải **tăng `version`** và xử lý `onUpgrade`.

## 9.3 So sánh 3 cách lưu

| | SharedPreferences | SQLite (sqflite) | Hive |
|---|---|---|---|
| Kiểu | Key-value | Quan hệ, có SQL | NoSQL key-value theo box |
| Dữ liệu | Nhỏ, đơn giản | Lớn, có quan hệ, cần truy vấn | Vừa, object Dart |
| Truy vấn | Không | SQL đầy đủ | Lọc bằng Dart |
| Tốc độ | Nhanh | Vừa | Rất nhanh (thuần Dart) |
| Async | Có | Có | Có/đồng bộ sau khi mở box |

## 9.4 Sync & export
- Sync: đánh dấu bản ghi `isSynced`, `updatedAt`; khi có mạng thì đẩy lên server.
- Xung đột: **last-write-wins** (đơn giản), hoặc theo version/timestamp, hoặc để user chọn.
- Export: `jsonEncode(list.map((e)=>e.toJson()).toList())` rồi ghi file bằng `path_provider` (`getApplicationDocumentsDirectory()`) + `dart:io File`.

---

# MODULE 10 — AUTH & USER MANAGEMENT

- **Login flow**: Form validate → gọi API/mock → nhận token → lưu token → điều hướng sang Home bằng `pushReplacement` (để không back lại màn login).
- **Session state**: giữ trạng thái đăng nhập ở tầng app (Provider/InheritedWidget), không giữ trong widget con.
- **Guarded route**: chặn truy cập màn cần đăng nhập.
```dart
// cách 1: kiểm tra ở onGenerateRoute
onGenerateRoute: (settings) {
  if (settings.name == '/profile' && !auth.isLoggedIn) {
    return MaterialPageRoute(builder: (_) => LoginScreen());
  }
  ...
}
// cách 2: widget bọc
class AuthGate extends StatelessWidget {
  Widget build(c) => auth.isLoggedIn ? HomeScreen() : LoginScreen();
}
// cách 3: go_router redirect
```
- **Token persistence**: SharedPreferences là **mock/không an toàn**; production dùng `flutter_secure_storage` (Keychain iOS / EncryptedSharedPreferences Android). Cần xử lý **token hết hạn** → refresh token → nếu fail thì logout.
- Logout = xoá token + clear session + `pushAndRemoveUntil` về Login.

---

# MODULE 11 — TESTING & DEBUGGING (hay bị bỏ, nhưng có trong PT3)

## 3 loại test

| Loại | Kiểm cái gì | Package | Tốc độ |
|---|---|---|---|
| **Unit test** | 1 hàm/class, không UI | `test` / `flutter_test` | Rất nhanh |
| **Widget test** | 1 widget trong môi trường ảo | `flutter_test` + `WidgetTester` | Nhanh |
| **Integration test** | Cả app trên máy thật/emulator | `integration_test` | Chậm |

```dart
// Unit
test('adds two numbers', () {
  expect(add(2, 3), 5);
});
group('Calculator', () {
  setUp(() {});  tearDown(() {});
});

// Widget
testWidgets('counter increments', (WidgetTester tester) async {
  await tester.pumpWidget(const MyApp());
  expect(find.text('0'), findsOneWidget);
  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();                 // rebuild 1 frame
  // await tester.pumpAndSettle();     // đợi hết animation
  expect(find.text('1'), findsOneWidget);
});
```
Finder: `find.text()`, `find.byType()`, `find.byKey()`, `find.byIcon()`, `find.widgetWithText()`.
Matcher: `findsOneWidget`, `findsNothing`, `findsNWidgets(n)`, `findsWidgets`.
Mock: `mockito` / `mocktail`.

**Debug:** `debugPrint()`, breakpoint trong IDE, **Flutter DevTools** (Widget Inspector, Timeline/Performance, Memory, Network), `debugPaintSizeEnabled = true`, `assert()` (chỉ chạy ở debug mode).

---

# MODULE 12 — BUILD & RELEASE

```
flutter build apk --release --split-per-abi   # nhiều APK theo CPU, nhẹ hơn
flutter build appbundle                        # .aab — Google Play bắt buộc
flutter build ipa                              # cần macOS
```
- **Ký ứng dụng Android**: tạo keystore → `key.properties` → cấu hình `signingConfigs` trong `android/app/build.gradle`. Không ký thì không lên Play Store được.
- Đổi tên/icon app: `AndroidManifest.xml` (`android:label`), `Info.plist` (`CFBundleDisplayName`), package `flutter_launcher_icons`.
- `applicationId` (Android) / `Bundle Identifier` (iOS) là định danh **duy nhất, không đổi được sau khi phát hành**.
- Version trong `pubspec.yaml`: `version: 1.0.0+3` → `1.0.0` = versionName, `3` = versionCode/build number (mỗi lần upload phải tăng).
- **Obfuscate**: `flutter build apk --obfuscate --split-debug-info=./debug-info`
- Giảm dung lượng: `--split-per-abi`, bật shrink resources/R8, nén ảnh.

---

# NOTIFICATION (CLO7)

**Local vs Push:**

| | Local notification | Push notification |
|---|---|---|
| Nguồn | Chính app tạo (hẹn giờ, sự kiện nội bộ) | Server gửi qua FCM/APNs |
| Cần mạng | Không | Có |
| Package | `flutter_local_notifications` | `firebase_messaging` |

```dart
const androidChannel = AndroidNotificationChannel(
  'high_importance', 'Thông báo quan trọng',
  importance: Importance.high);
```
- **Notification channel bắt buộc từ Android 8.0 (API 26)** — không tạo channel thì thông báo không hiện. Channel cho phép **người dùng bật/tắt từng nhóm thông báo** (âm thanh, rung, độ ưu tiên) thay vì tắt toàn bộ app.
- **Android 13 (API 33)** trở lên phải xin quyền runtime `POST_NOTIFICATIONS`.
- iOS phải xin quyền qua `requestPermission()`.
- FCM có 3 trạng thái xử lý: **foreground** (`onMessage`), **background** (`onBackgroundMessage` — hàm phải là top-level và có `@pragma('vm:entry-point')`), **terminated** (`getInitialMessage`).

---

# STATE MANAGEMENT (xuyên suốt CLO3)

| Cách | Khi nào dùng |
|---|---|
| `setState` | State cục bộ trong 1 widget (ephemeral) |
| `InheritedWidget` | Truyền dữ liệu xuống sâu, tránh prop drilling — nền tảng của mọi giải pháp khác |
| `Provider` (ChangeNotifier) | Phổ biến nhất cho app vừa, xây trên InheritedWidget |
| `Riverpod` / `BLoC` / `GetX` | App lớn, tách logic hoàn toàn khỏi UI |

```dart
// InheritedWidget: lấy dữ liệu
final theme = Theme.of(context);   // Theme, MediaQuery, Navigator đều là InheritedWidget

// Provider
ChangeNotifierProvider(create: (_) => CartModel(), child: MyApp());
context.watch<CartModel>().items;    // nghe + rebuild
context.read<CartModel>().add(x);    // chỉ gọi hành động, KHÔNG rebuild
```
`ChangeNotifier` gọi `notifyListeners()` để báo UI cập nhật.
**BLoC**: Event → Bloc → State, dựa trên Stream.

---

# TỔNG HỢP "BẪY" HAY GẶP NHẤT TRONG ĐỀ

1. `const DateTime.now()` → lỗi compile (dùng `final`).
2. `await` ngoài hàm `async` → lỗi.
3. Hàm `async` luôn trả `Future`, kể cả `return 1`.
4. Đoán thứ tự output: đồng bộ → microtask → event.
5. `map()`/`where()` trả Iterable lazy, thiếu `.toList()`.
6. Stream single-subscription nghe 2 lần → `StateError`.
7. Quên `dispose()` controller/subscription → memory leak.
8. `setState()` sau dispose → check `mounted`.
9. `Theme.of(context)` trong `initState()` → dùng `didChangeDependencies()`.
10. `future: fetchData()` viết trong `build()` → gọi API vô tận.
11. `validator` trả `null` = hợp lệ (nhiều bạn chọn ngược).
12. `TextField` không có `validator`, phải là `TextFormField`.
13. `ListView` trong `Column` không bọc `Expanded` → unbounded height.
14. `Expanded` ngoài Row/Column → lỗi.
15. Khai cả `home:` và route `'/'` → lỗi assert.
16. `onPressed: null` = nút disable, không phải "không làm gì".
17. Hot reload không giữ được thay đổi ở `main()`, biến static, assets, native code.
18. SharedPreferences chỉ lưu 5 kiểu, không lưu object trực tiếp.
19. SQLite không có kiểu BOOLEAN/DateTime.
20. Android 8+ bắt buộc notification channel; Android 13+ cần quyền POST_NOTIFICATIONS.
21. `MediaQuery` = màn hình, `LayoutBuilder` = ràng buộc từ cha.
22. Widget là **immutable**; State mới là thứ giữ dữ liệu thay đổi.
23. `pushReplacement` sau login để không back về màn Login.
24. `.env` là asset → build vào APK, sửa xong phải rebuild.

---

# CHIẾN THUẬT ĐI THI 9+

**Ưu tiên ôn theo trọng số câu hỏi thường thấy:**
1. Widget lifecycle + Stateless/Stateful (~15%)
2. Layout & constraints (~15%)
3. Async: Future/Stream/FutureBuilder (~15%)
4. Dart cơ bản + null safety (~12%)
5. Navigation (~10%)
6. Networking + JSON (~10%)
7. Local storage (~10%)
8. Form validation (~8%)
9. Testing, build, notification (~5%)

**Với đề trắc nghiệm 50 câu/60 phút = 72 giây/câu:**
- Đọc kỹ từ khoá phủ định ("NOT", "EXCEPT", "which is false").
- Câu hỏi "đoán output" → làm cuối, cần thời gian.
- Với 4 đáp án gần giống nhau, đáp án **đầy đủ và chính xác nhất** thường đúng; đáp án chứa "always"/"never" thường sai.
- Không bỏ trống câu nào (trắc nghiệm không trừ điểm sai).

**Với Practical Exam 25% (90 phút, viết chương trình):** luyện thành thạo bộ khung "app CRUD 1 màn danh sách + 1 màn chi tiết + form + gọi API hoặc SQLite" — gần như mọi đề thực hành đều nằm trong khung này. Viết trước và thuộc lòng skeleton: `main.dart` → `MaterialApp` + routes → `ListView.builder` + `FutureBuilder` → `Navigator.push` truyền object → `Form` + validator → sqflite CRUD.

---

# PHỤ LỤC A — CÁC CHỦ ĐỀ BỔ SUNG (vá lỗ hổng từ đề mẫu)

## A1. flutter_local_notifications — API cần thuộc

```dart
final plugin = FlutterLocalNotificationsPlugin();

await plugin.initialize(
  InitializationSettings(
    android: AndroidInitializationSettings('@mipmap/ic_launcher'),
    iOS: DarwinInitializationSettings(),
  ),
  onDidReceiveNotificationResponse: (resp) {
    final payload = resp.payload;      // ← lấy dữ liệu kèm theo
  },
);

await plugin.show(id, 'Title', 'Body', details, payload: 'productId=5');
await plugin.zonedSchedule(...);                 // hẹn giờ
await plugin.periodicallyShow(id, t, b, RepeatInterval.daily, details);
await plugin.cancel(id);                          // huỷ 1
await plugin.cancelAll();                         // huỷ tất cả
await plugin.pendingNotificationRequests();
```

| Việc | Đúng | Bẫy sai |
|---|---|---|
| Hiện ngay | `show()` | `display()`, `push()` |
| Hẹn giờ | `zonedSchedule()` | `schedule()` (deprecated) |
| Huỷ 1 | **`cancel(id)`** | `dismiss()`, `delete()`, `remove()` |
| Huỷ hết | `cancelAll()` | `clear()`, `removeAll()` |

**`payload`**: một **String** đính kèm notification, được trả lại cho app khi người dùng **tap** vào thông báo → dùng để điều hướng đến đúng màn hình/đối tượng. Nó KHÔNG phải style, KHÔNG phải priority, KHÔNG gửi lên Firebase.

Mẹo nhớ: plugin ánh xạ sang `NotificationManager.cancel()` của Android native → động từ luôn là **cancel**.

## A2. SharedPreferences — chi tiết API

```dart
final prefs = await SharedPreferences.getInstance();   // DUY NHẤT cách đúng
```
- Không có `SharedPreferences()`, `.open()`, `.getDefault()` — constructor bị ẩn, chỉ có **static async** `getInstance()`.
- Ghi: `setInt/setString/setBool/setDouble/setStringList` → **async**, trả `Future<bool>`.
- Đọc: `getInt/getString/...` → **đồng bộ**, trả **null** nếu chưa có key.
- Xoá: `remove(key)` (1 key) · **`clear()`** (toàn bộ). Không có `removeAll()`, `reset()`, `deleteAll()`.
- Khác: `containsKey()`, `getKeys()`, `reload()`.

**So với Android native (dễ nhầm nếu học PRM392):** Flutter dùng `set...`, Android Java dùng `put...` + `apply()/commit()`.

**Isolate safety:** plugin **không isolate-safe**. Hai isolate cùng ghi → **race condition**, một lệnh ghi có thể đè lên lệnh kia. Android KHÔNG khoá file ở mức cho phép ghi đồng thời an toàn, và các isolate KHÔNG chia sẻ instance. Không có DeadlockException nào cả.

## A3. GlobalKey — RẤT HAY THI

```dart
final _formKey = GlobalKey<FormState>();
final _scaffoldKey = GlobalKey<ScaffoldState>();
final _key = GlobalKey();               // khai báo cơ bản
```
Công dụng:
- Truy cập **State** của widget con từ bên ngoài: `_formKey.currentState!.validate()`
- Lấy `currentContext`, `currentWidget`
- **Giữ state khi widget di chuyển vị trí** trong cây (ví dụ đổi từ Row sang Column)

**Quy tắc sống còn:** GlobalKey phải **duy nhất trên toàn bộ widget tree**. Dùng cùng một instance GlobalKey cho 2 widget cùng lúc → Flutter **ném assertion error** ("Multiple widgets used the same GlobalKey"). Không phải "widget sau ghi đè widget trước", không phải "dùng chung state", không phải "bỏ qua im lặng".

Phân biệt các loại Key:
| Key | Phạm vi | Dùng khi |
|---|---|---|
| `ValueKey(value)` | Cục bộ | Phân biệt item trong list theo giá trị (id) |
| `ObjectKey(obj)` | Cục bộ | Phân biệt theo object |
| `UniqueKey()` | Cục bộ | Ép Flutter coi là widget hoàn toàn mới |
| `GlobalKey()` | **Toàn app** | Truy cập State/context từ xa |

GlobalKey **đắt về hiệu năng** hơn local key → chỉ dùng khi thật cần.

## A4. Xử lý lỗi mạng — phân loại exception

| Exception | Nghĩa |
|---|---|
| **`SocketException`** | Không có mạng / DNS fail / server không tới được → **kết nối socket hỏng TRƯỚC khi có HTTP response** |
| `TimeoutException` | Vượt quá thời gian chờ (`.timeout(Duration(...))`) |
| `HandshakeException` | Lỗi SSL/chứng chỉ không hợp lệ |
| `FormatException` | `jsonDecode` gặp chuỗi JSON sai định dạng |
| `HttpException` | Lỗi ở tầng HTTP |
| statusCode 500 | **Không ném exception** — vẫn là response hợp lệ, phải tự kiểm tra `res.statusCode` |

**Bẫy:** server trả 500 thì `http.get` vẫn thành công, không có SocketException. Phải tự check status code.

```dart
try {
  final res = await http.get(uri).timeout(const Duration(seconds: 10));
  if (res.statusCode != 200) throw HttpException('${res.statusCode}');
} on SocketException {
  // hiện "Không có kết nối mạng"
} on TimeoutException {
} on FormatException {
}
```

## A5. Giới hạn concurrency (song song có kiểm soát)

Bài toán: gửi nhiều request nhưng chỉ cho tối đa N cái chạy cùng lúc.

- **`Future.wait()` KHÔNG có tham số `maxConcurrency`** → chạy tất cả cùng lúc.
- `http.Client` không có `maxConnections`.
- `Isolate.run()` không có `concurrencyLimit`.

**Cách đúng:** dùng package **`pool`**, hoặc tự cài **semaphore** bằng danh sách `Completer`:
```dart
final pool = Pool(3);                       // tối đa 3 job đồng thời
await Future.wait(urls.map((u) => pool.withResource(() => fetch(u))));
```
Ý tưởng semaphore thủ công: giữ bộ đếm slot; hết slot thì tạo `Completer` cho vào hàng đợi; mỗi Future xong thì `complete()` cái đầu hàng đợi.

**`Completer`** = cách tạo Future thủ công:
```dart
final c = Completer<String>();
c.future;                 // Future để trả cho nơi khác await
c.complete('done');       // hoàn thành
c.completeError(e);       // báo lỗi
```

## A6. Validate JSON Schema
- Dart **có type mạnh nhưng không tự validate** dữ liệu runtime từ API — `json['id']` là `dynamic`, sai kiểu vẫn lọt tới lúc ép kiểu mới nổ.
- `json_serializable` **không có** annotation `@JsonSchema`.
- Cách đúng: dùng package **`json_schema`** validate `Map` đã decode với một schema định nghĩa sẵn **trước khi** đưa vào `fromJson`, thất bại thì ném exception riêng.

## A7. Scaffold — thuộc tính đầy đủ (hay hỏi tên property)

```dart
Scaffold(
  appBar: AppBar(...),
  body: ...,
  floatingActionButton: FloatingActionButton(...),
  floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,  // ← vị trí FAB
  floatingActionButtonAnimator: ...,
  drawer: Drawer(...),  endDrawer: ...,
  bottomNavigationBar: BottomNavigationBar(...),
  bottomSheet: ...,
  backgroundColor: ...,
  resizeToAvoidBottomInset: true,       // đẩy UI lên khi bàn phím hiện
  extendBody: false, extendBodyBehindAppBar: false,
)
```
Vị trí FAB dùng **`floatingActionButtonLocation`** (không phải `fabAlignment`/`buttonPosition`).
Giá trị: `endFloat` (mặc định), `centerFloat`, `centerDocked`, `endDocked`, `startTop`, `miniCenterFloat`...

SnackBar: `ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('...')))`.

## A8. Container — đầy đủ thuộc tính

```dart
Container(
  width:, height:,
  padding: EdgeInsets.all(8),        // trong viền
  margin: EdgeInsets.all(8),         // ngoài viền
  alignment: Alignment.center,       // căn CHILD bên trong
  color: Colors.blue,                // KHÔNG dùng chung với decoration!
  decoration: BoxDecoration(
    color:, borderRadius:, border:, boxShadow:, gradient:, image:),
  foregroundDecoration: ...,         // vẽ ĐÈ lên child
  transform: Matrix4.rotationZ(0.1), // ← xoay / tịnh tiến / co giãn bằng ma trận
  constraints: BoxConstraints(maxWidth: 200),
  clipBehavior: Clip.none,
)
```
**Xoay/dịch/scale = `transform`** (nhận `Matrix4`). Các hàm hay dùng: `Matrix4.rotationZ()`, `Matrix4.translationValues()`, `Matrix4.diagonal3Values()` (scale), `Matrix4.identity()`.

**Bẫy:** khai cả `color:` và `decoration:` cùng lúc → **lỗi assert**. Muốn có màu trong decoration thì đặt màu bên trong `BoxDecoration`.

Widget `Transform` riêng cũng làm được: `Transform.rotate/scale/translate`.

## A9. sqflite — kiểu trả về của từng method

| Method | Trả về | Ý nghĩa |
|---|---|---|
| `insert()` | `Future<int>` | **id** của dòng vừa chèn (rowId) |
| `update()` | `Future<int>` | **số dòng** bị sửa |
| `delete()` | `Future<int>` | **số dòng** bị xoá |
| `query()` | `Future<List<Map<String,dynamic>>>` | danh sách dòng |
| `rawQuery()` | `Future<List<Map<String,dynamic>>>` | |
| `execute()` | `Future<void>` | DDL (CREATE/ALTER), không trả dữ liệu |

**Nhớ:** insert trả **id**, còn update/delete trả **số dòng ảnh hưởng**. Không có cái nào trả `bool` success/failure — thất bại thì **ném exception**.

`ConflictAlgorithm`: `replace`, `ignore`, `abort` (mặc định), `fail`, `rollback`.

## A10. Firebase Authentication (CLO chưa nêu rõ nhưng đề có hỏi)

```dart
final auth = FirebaseAuth.instance;

await auth.signInAnonymously();                                  // khách, không cần thông tin
await auth.createUserWithEmailAndPassword(email: e, password: p); // đăng ký
await auth.signInWithEmailAndPassword(email: e, password: p);     // đăng nhập
await auth.signInWithCredential(credential);                      // Google/Facebook
await auth.signOut();
await auth.sendPasswordResetEmail(email: e);
await auth.currentUser?.sendEmailVerification();

auth.currentUser;                       // User? hiện tại
auth.authStateChanges();                // Stream<User?> → dùng với StreamBuilder
```
**Tên method đúng:** `signInAnonymously()` — KHÔNG phải `signInAsGuest()`, `createAnonymousUser()`, `guestLogin()`.

**Mã lỗi `FirebaseAuthException` hay hỏi:**

| Code | Khi nào |
|---|---|
| **`account-exists-with-different-credential`** | Email đã đăng ký bằng **nhà cung cấp khác** (VD: đã đăng nhập Google, giờ thử Email/Password) |
| `email-already-in-use` | Email đã tồn tại khi **tạo tài khoản mới** bằng email/password |
| `credential-already-in-use` | Credential này đã gắn vào tài khoản khác |
| `provider-already-linked` | Đã link provider này rồi |
| `wrong-password` / `user-not-found` / `invalid-email` | Đăng nhập sai |
| `weak-password` | Mật khẩu < 6 ký tự |
| `too-many-requests` | Thử quá nhiều lần |

Phân biệt hai cái dễ lẫn: **`email-already-in-use`** xảy ra lúc *đăng ký*; **`account-exists-with-different-credential`** xảy ra lúc *đăng nhập bằng provider khác với email đã có*.

```dart
try { ... } on FirebaseAuthException catch (e) {
  if (e.code == 'account-exists-with-different-credential') { ... }
}
```

Mô hình theo dõi trạng thái đăng nhập chuẩn:
```dart
StreamBuilder<User?>(
  stream: FirebaseAuth.instance.authStateChanges(),
  builder: (c, snap) => snap.hasData ? HomeScreen() : LoginScreen(),
)
```

## A11. RegExp trong Dart (dùng nhiều ở validator)

```dart
RegExp(r'^\d{10}$').hasMatch(value)      // ĐÚNG 10 chữ số
RegExp(r'^[\w.+-]+@[\w-]+\.[\w.]+$').hasMatch(email)
RegExp(r'^.{8,}$')                        // ít nhất 8 ký tự
```
- Tiền tố **`r`** = raw string, để `\d` không bị hiểu là escape của Dart. Thiếu `r` là lỗi kinh điển.
- **`^` và `$`** neo đầu/cuối chuỗi. Thiếu neo thì `RegExp(r'\d{10}')` khớp cả `"abc1234567890xyz"` → sai.
- `\d` số, `\w` chữ+số+gạch dưới, `\s` khoảng trắng, `{n}` đúng n lần, `{n,}` từ n lần, `+` ≥1, `*` ≥0, `?` 0 hoặc 1.

**So sánh 4 cách validate "đúng 10 chữ số":**
| Cách | Vấn đề |
|---|---|
| `value.length == 10` | Cho lọt "abcdefghij" — không kiểm tra là số |
| `value.contains(RegExp(r'[0-9]'))` | Chỉ cần *có* 1 chữ số là qua |
| `int.tryParse(value) != null` | Không kiểm tra độ dài; còn cho qua dấu `-`/`+` |
| **`RegExp(r'^\d{10}$').hasMatch(value)`** | **Đúng** — vừa đủ 10, vừa toàn số |

## A12. Chiến lược caching (offline-first)

| Pattern | Mô tả |
|---|---|
| **Stale-while-revalidate** | Trả **ngay** dữ liệu cache (dù cũ), **đồng thời** gọi API nền, có dữ liệu mới thì cập nhật UI + cache. → đây chính là "offline-first" |
| Cache-aside (lazy loading) | UI hỏi cache trước; **rỗng thì mới** gọi API rồi đổ vào cache |
| Read-through | Luôn đọc qua lớp cache, cache tự lo việc lấy từ nguồn |
| Write-through | Mỗi lần ghi thì ghi đồng thời vào cache và server |
| Write-behind | Ghi cache trước, đẩy lên server sau (theo lô) |

**Phân biệt then chốt:** stale-while-revalidate **luôn** gọi API nền dù cache có dữ liệu; cache-aside **chỉ** gọi API khi cache rỗng.

## A13. MaterialApp — vai trò
Widget gốc, thiết lập **cấu trúc Material Design + cấu hình cấp ứng dụng**: theme, route/navigator, localization, title, `debugShowCheckedModeBanner`, `builder`.
Nó **không** quản lý database, **không** phải giải pháp state management, **không** thay thế Scaffold (MaterialApp là vỏ ngoài, Scaffold là khung từng màn hình).

Bên trong MaterialApp ngầm chứa: `Navigator`, `Theme`, `MediaQuery`, `Localizations`, `WidgetsApp` — đó là lý do `Theme.of(context)` và `Navigator.of(context)` chỉ dùng được ở widget **con** của MaterialApp.

**Bẫy:** gọi `Navigator.of(context)` ngay trong widget chứa `MaterialApp` → lỗi "No Navigator", vì context đó ở *trên* MaterialApp. Giải pháp: tách widget con hoặc dùng `Builder`.

## A14. Flexible vs Expanded (chốt lại)

```dart
Expanded(child: w)  ==  Flexible(fit: FlexFit.tight, child: w)
```
| | `flex` | `fit` mặc định | Nghĩa |
|---|---|---|---|
| `Expanded` | 1 | **tight** (cố định) | **Bắt buộc** chiếm hết phần chia được |
| `Flexible` | 1 | **loose** (lỏng) | **Cho phép** chiếm tối đa, nhưng con nhỏ hơn thì giữ kích thước nhỏ |

Cả hai đều dùng được trong **cả Row, Column và Flex** (đáp án "Flexible chỉ cho Column, Expanded chỉ cho Row" là sai hoàn toàn).


## A15. GridView — các constructor (phân biệt kỹ)

| Constructor | Khi nào dùng |
|---|---|
| **`GridView.count(crossAxisCount: 3)`** | **Số cột cố định**, biết trước, ít item — cách nhanh gọn nhất |
| `GridView.extent(maxCrossAxisExtent: 200)` | Cố định **chiều rộng tối đa mỗi ô**, số cột tự tính → responsive |
| `GridView.builder(gridDelegate:, itemBuilder:)` | **Lazy**, danh sách dài/động — hiệu năng tốt nhất |
| `GridView(gridDelegate:, children: [])` | Dựng hết ngay, ít item |

```dart
GridView.count(
  crossAxisCount: 2,
  mainAxisSpacing: 8, crossAxisSpacing: 8,
  childAspectRatio: 0.75,          // rộng/cao của mỗi ô
  padding: EdgeInsets.all(8),
  children: [...],
)
```

**Phân biệt với các widget dễ nhầm:**
| Widget | Cuộn được | Lưới 2D | Ghi chú |
|---|---|---|---|
| **`GridView`** | **Có** | **Có** | Đúng cho "2D scrollable grid" |
| `Table` | Không | Có | Bảng tĩnh, cột theo `columnWidths` |
| `Wrap` | Không | Gần giống | Tự xuống dòng khi hết chỗ, item không đều nhau |
| `ListView` | Có | Không (1D) | Chỉ một chiều |

`GridView.builder` + `SliverGridDelegateWithFixedCrossAxisCount` cũng cho số cột cố định, nhưng nếu đề hỏi cách **đơn giản/trực tiếp nhất** cho số cột cố định thì đáp án là **`GridView.count`**.

## A16. zonedSchedule & package timezone

Muốn hẹn giờ notification chính xác theo múi giờ, **bắt buộc** khởi tạo dữ liệu timezone TRƯỚC:

```dart
import 'package:timezone/data/latest.dart' as tz;
import 'package:timezone/timezone.dart' as tz;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  tz.initializeTimeZones();                            // ① nạp CSDL múi giờ
  tz.setLocalLocation(tz.getLocation('Asia/Bangkok')); // ② đặt múi giờ local
  runApp(MyApp());
}

await plugin.zonedSchedule(
  0, 'Title', 'Body',
  tz.TZDateTime.now(tz.local).add(const Duration(hours: 1)),
  details,
  androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
  uiLocalNotificationDateInterpretation:
      UILocalNotificationDateInterpretation.absoluteTime,
);
```

**Nguyên nhân notification nổ sai giờ:** quên `tz.initializeTimeZones()` / `tz.setLocalLocation()` → dữ liệu múi giờ chưa nạp nên `TZDateTime` bị quy đổi sai.

Bác bỏ các đáp án nhiễu:
- `zonedSchedule` **không** tự ép về UTC bỏ qua timezone — chính nó sinh ra để hỗ trợ đa múi giờ.
- OS **không** ghi đè timezone của `TZDateTime`.
- Plugin **có** hỗ trợ cross-timezone, không bắt buộc UTC.

`AndroidScheduleMode`: `exact`, `exactAllowWhileIdle` (nổ đúng giờ kể cả Doze mode), `inexact`, `alarmClock`. Android 12+ cần quyền `SCHEDULE_EXACT_ALARM`/`USE_EXACT_ALARM` cho chế độ exact.

## A17. Mocking trong Unit Test — vì sao cần

Unit test phải **nhanh, ổn định, độc lập**. Gọi API/DB thật thì:
- Chậm, phụ thuộc mạng, hỏng khi server sập → test "flaky"
- Không tạo được tình huống hiếm (lỗi 500, timeout, dữ liệu rỗng)
- Có thể làm bẩn dữ liệu thật

Mock = **tạo đối tượng giả mô phỏng response của API hoặc database**, trả về dữ liệu định sẵn, không kết nối thật.

```dart
class MockApi extends Mock implements ApiService {}

test('trả về danh sách post', () async {
  final api = MockApi();
  when(() => api.fetchPosts()).thenAnswer((_) async => [Post(id: 1, title: 't')]);
  final repo = PostRepository(api);
  expect((await repo.getPosts()).length, 1);
  verify(() => api.fetchPosts()).called(1);        // kiểm tra đã gọi đúng 1 lần
});
```
Package: **`mockito`** (cần code generation) hoặc **`mocktail`** (không cần).

Mock **không** hiển thị UI, **không** thay thế việc viết logic, **không** tự sửa lỗi — nó chỉ thay thế *phụ thuộc bên ngoài*.

Đây cũng là lý do **Repository Pattern** quan trọng: có lớp trừu tượng mới mock được. Gọi thẳng `http.get` trong widget thì gần như không test nổi.


---

# PHỤ LỤC B — BỔ SUNG TỪ SLIDE (vá các phần slide chưa có ở trên)

> Đối chiếu 315 slide (Module 1–12) với nội dung chính. Các mục dưới đây là phần slide có mà phần trên còn thiếu. Số hiệu (1.6, 2.7…) nối tiếp theo từng Module gốc.

**━━━━━━━━━━ MODULE 1 (bổ sung) ━━━━━━━━━━**

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

**━━━━━━━━━━ MODULE 2 (bổ sung) ━━━━━━━━━━**

## 2.7 Toán tử (Operators)

| Nhóm | Toán tử |
|---|---|
| Số học | `+  -  *  /`  · **`~/`** (chia lấy phần nguyên) · **`%`** (chia lấy dư) |
| So sánh | `>  <  >=  <=  ==  !=` |
| Logic | `&&  \|\|  !` |
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

**━━━━━━━━━━ MODULE 3 (bổ sung — slide "Advanced Dart": OOP nâng cao + Generics) ━━━━━━━━━━**

> Slide Module 3 tên **"Advanced Dart"** gồm cả OOP nâng cao + generics, không chỉ async. Phần async (Future/Stream/event loop/repository) đã có ở 3.1–3.4; các mục dưới bổ sung phần OOP nâng cao còn thiếu.

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

**━━━━━━━━━━ MODULE 4 (bổ sung) ━━━━━━━━━━**

## 4.8 RadioListTile — chọn MỘT trong nhóm
```dart
RadioListTile<String>(
  title: const Text('HD'),
  value: 'HD',            // giá trị của DÒNG này
  groupValue: quality,    // giá trị ĐANG chọn của cả nhóm
  onChanged: (v) => setState(() => quality = v),
)
```
- Cả nhóm dùng CHUNG một biến `groupValue`; dòng nào có `value == groupValue` thì được tick.
- Generic `<T>` phải khớp giữa `value` và `groupValue`.
- `RadioListTile` = `Radio` + nhãn (title/subtitle) sẵn, bấm cả dòng đều chọn. Dùng `Radio<T>` khi muốn tự bố trí.

**Bẫy đề thi:** đổi tick mà quên `setState` gán lại `groupValue` → UI không đổi. `onChanged: null` → cả nhóm bị disable.

## 4.9 Slider — giá trị liên tục
```dart
Slider(
  value: v, min: 0, max: 100,   // MẶC ĐỊNH min=0.0, max=1.0
  divisions: 10,                 // chia nấc → giá trị rời rạc + cho phép hiện label
  label: '${v.round()}',
  activeColor: Colors.blue,
  onChanged: (nv) => setState(() => v = nv),
  onChangeEnd: (nv) {},          // gọi khi THẢ tay (có onChangeStart tương ứng)
)
```
- Mặc định `min=0.0, max=1.0`. `value` PHẢI nằm trong `[min,max]`, nếu không → assert.
- `divisions` biến slider liên tục thành các nấc; `label` chỉ hiện khi có `divisions`.
- 3 callback: `onChanged` (đang kéo), `onChangeStart`, `onChangeEnd` (thả tay — hợp để lưu/gọi API).

**Bẫy đề thi:** đặt `value` ngoài `[min,max]` → lỗi. Quên `setState` trong `onChanged` → thanh "dính", không kéo được.

## 4.10 Image & BoxFit
```dart
Image.network(url, fit: BoxFit.cover, width: 120, height: 80,
  loadingBuilder: ..., errorBuilder: ...);
Image.asset('assets/poster.png', fit: BoxFit.contain);
```
| BoxFit | Ý nghĩa |
|---|---|
| `cover` | Lấp đầy khung, giữ tỉ lệ, **cắt** phần thừa (poster/banner) |
| `contain` | Vừa khít trong khung, giữ tỉ lệ, có thể để **khoảng trống** |
| `fill` | Kéo giãn lấp đầy, **méo** tỉ lệ |
| `fitWidth` / `fitHeight` | Vừa theo chiều rộng / chiều cao |
| `none` / `scaleDown` | Giữ nguyên / thu nhỏ nếu tràn |

**Bẫy đề thi:** ảnh bị méo → đang dùng `fill`; muốn không méo + không dư viền → `cover`. Ảnh asset phải khai trong `pubspec.yaml` mục `assets:` mới hiện.

## 4.11 BottomNavigationBar
```dart
Scaffold(
  body: screens[index],
  bottomNavigationBar: BottomNavigationBar(
    currentIndex: index,
    onTap: (i) => setState(() => index = i),
    type: BottomNavigationBarType.fixed,   // >3 item nên đặt fixed
    items: const [
      BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
      BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
      BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
    ],
  ),
)
```
- `currentIndex` + `onTap` tự quản: chỉ số giữ ở State, `onTap` gọi `setState`. Widget KHÔNG tự nhớ tab.
- 2–5 tab. `type`: `fixed` (mọi tab luôn hiện nhãn) vs `shifting` (mặc định KHI >3 item → chỉ tab được chọn phình ra, ẩn nhãn tab khác). Muốn tất cả nhãn luôn hiện → đặt `type: fixed`.
- Mỗi `BottomNavigationBarItem` BẮT BUỘC có `icon`.
- Phụ: `CircleAvatar(child: Text('A'))` dùng làm `leading` tròn cho ListTile; Icon lấy từ thư viện Material Icons, đổi size/color qua `Icon(Icons.x, size:, color:)`.

**Bẫy đề thi:** với 4–5 tab thấy nhãn "nhảy"/ẩn → do `type` mặc định là `shifting`, sửa bằng `type: BottomNavigationBarType.fixed`.

**━━━━━━━━━━ MODULE 5 (bổ sung — Navigation + State Management) ━━━━━━━━━━**

## 5.5 maybePop & bảng Navigator method đầy đủ
| Method | Việc |
|---|---|
| `push` / `pushNamed` | Thêm route lên đỉnh stack |
| `pop([result])` | Bỏ route đỉnh, trả dữ liệu về màn trước (VÔ điều kiện) |
| `pushReplacement` / `pushReplacementNamed` | Thay route hiện tại (không back lại) |
| `pushAndRemoveUntil(route, predicate)` | Đẩy route mới + xoá tới khi predicate đúng |
| `popUntil(predicate)` | Pop liên tục tới route thoả predicate |
| `canPop()` | Có route để pop không (bool) |
| **`maybePop([result])`** | Pop **CÓ điều kiện** — hỏi `WillPopScope`/`PopScope` trước; bị chặn thì KHÔNG pop |

**Bẫy đề thi:** `pop` pop vô điều kiện; `maybePop` tôn trọng `WillPopScope`/`PopScope` (dùng cho hộp thoại "Bạn có chắc muốn thoát?"). `maybePop` ở route gốc → không làm gì (không đóng app).

## 5.6 Navigator 2.0 — API khai báo (declarative)
Ngoài 3 mảnh (Parser/Delegate/Dispatcher), cốt lõi là `Navigator` nhận **danh sách `Page`**:
```dart
Navigator(
  pages: [
    MaterialPage(child: HomePage()),
    if (selectedId != null) MaterialPage(child: DetailPage(selectedId!)),
  ],
  onPopPage: (route, result) {
    if (!route.didPop(result)) return false;
    selectedId = null;      // ĐỔI STATE để đồng bộ lại stack
    notifyListeners();
    return true;
  },
)
```
- Thay vì gọi `push/pop`, ta **mô tả** stack bằng list `Page`; đổi state → Flutter tự thêm/bớt màn.
- `RouterDelegate` thường `with ChangeNotifier, PopNavigatorRouterDelegateMixin`.
- `onPopPage` chạy khi bấm back: gọi `route.didPop`, rồi tự sửa state cho khớp.
- Page dùng cho pages list là **`MaterialPage`/`CupertinoPage`** (khác `MaterialPageRoute` của Navigator 1.0).

**Bẫy đề thi:** Navigator 2.0 KHÔNG tự `pop` để quay lại — phải **đổi state** (xoá phần tử khỏi `pages`). Quên `notifyListeners()` → UI không cập nhật.

## 5.7 Deep link — chi tiết bổ sung
- iOS Universal Links cần file **`apple-app-site-association`** (AASA, không có đuôi) đặt tại `https://<domain>/.well-known/apple-app-site-association`.
- Test nhanh deep link Android bằng adb:
  `adb shell am start -a android.intent.action.VIEW -d "myapp://movies?id=12"`

## 5.8 Lifting State Up (nâng state lên cha chung)
Khi hai widget con cần DÙNG CHUNG một state → chuyển state lên **widget cha chung gần nhất**, truyền dữ liệu xuống qua constructor và truyền callback lên để con báo thay đổi.
```dart
class _ParentState extends State<Parent> {
  int count = 0;
  @override
  Widget build(_) => Column(children: [
    Display(count: count),                          // con A: chỉ ĐỌC
    Button(onTap: () => setState(() => count++)),   // con B: SỬA qua callback
  ]);
}
```
- Nguồn sự thật (source of truth) nằm ở cha → tránh mỗi con giữ bản sao lệch nhau.
- Là bước đệm trước Provider: cây quá sâu (prop drilling) mới chuyển sang InheritedWidget/Provider.

## 5.9 InheritedWidget — method quan trọng
```dart
class AppData extends InheritedWidget {
  final String theme;
  const AppData({required this.theme, required Widget child, Key? key})
      : super(key: key, child: child);

  static AppData of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<AppData>()!;   // ĐĂNG KÝ phụ thuộc

  @override
  bool updateShouldNotify(AppData old) => old.theme != theme;   // có báo dependent rebuild?
}
```
| Thành phần | Vai trò |
|---|---|
| `dependOnInheritedWidgetOfExactType<T>()` | Đăng ký widget là **dependent** → data đổi thì nó rebuild |
| `getInheritedWidgetOfExactType<T>()` | Lấy widget nhưng **KHÔNG** đăng ký phụ thuộc (không rebuild) |
| `updateShouldNotify(old)` | `true` → dependent rebuild; `false` → bỏ qua dù widget mới được dựng |

**Bẫy đề thi:** `updateShouldNotify` trả `false` → dù giá trị đổi, dependent **không** rebuild. Đây là chỗ quyết định hiệu năng của InheritedWidget.

**━━━━━━━━━━ MODULE 6 (bổ sung) ━━━━━━━━━━**

## 6.6 Responsive UI vs Adaptive UI (RẤT DỄ NHẦM — hay thi)
| | **Responsive** | **Adaptive** |
|---|---|---|
| Đổi theo | **Không gian** sẵn có (width/height) | **Loại thiết bị / nền tảng** |
| Cách làm | Cùng bộ widget, sắp xếp lại theo kích thước | Chọn widget/khung KHÁC nhau theo thiết bị |
| Ví dụ | Column→Row, grid 2→4 cột, padding co giãn | BottomNav→**NavigationRail** (tablet), Drawer→Sidebar (desktop), Material↔Cupertino |

```dart
if (width < 600) return MobileView();   // adaptive: chọn khung theo thiết bị
return TabletView();
```
- **Responsive** = *cùng layout, giãn theo chỗ trống*. **Adaptive** = *layout khác nhau theo thiết bị/OS*.
- `NavigationRail`: thanh điều hướng **dọc** bên trái, thay `BottomNavigationBar` trên màn rộng (tablet/desktop).

**Bẫy đề thi:** "đổi Bottom Navigation sang NavigationRail trên tablet" → **adaptive**. "Grid 2 cột thành 4 cột khi rộng hơn" → **responsive**. Đề hay trộn 2 khái niệm này.

## 6.7 Chip & công cụ debug layout
- **`Chip`** (và `FilterChip`, `ChoiceChip`, `ActionChip`): thẻ nhỏ cho genre/tag; bọc trong **`Wrap`** để tự xuống dòng khi hết chỗ (không cần logic điều kiện):
  ```dart
  Wrap(spacing: 8, runSpacing: 8,
    children: genres.map((g) => Chip(label: Text(g))).toList())
  ```
- Debug layout: **Flutter Inspector → Layout Explorer** để xem constraints/flex từng widget; bật "Debug Paint" thấy khung.

**━━━━━━━━━━ MODULE 7 (bổ sung) ━━━━━━━━━━**

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

**━━━━━━━━━━ MODULE 8 (bổ sung) ━━━━━━━━━━**

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

**━━━━━━━━━━ MODULE 9 (bổ sung) ━━━━━━━━━━**

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

**━━━━━━━━━━ MODULE 10 (bổ sung — Auth / Session) ━━━━━━━━━━**

## 10.x JWT & Token-based Authentication (cấu trúc chi tiết)

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

## 10.y Google Sign-In (Firebase) — luồng, cấu hình, lỗi hay gặp

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

**━━━━━━━━━━ MODULE 11 (bổ sung) ━━━━━━━━━━**

## 11.x Testing pyramid & Arrange-Act-Assert

**Testing pyramid** (đáy rộng → đỉnh hẹp):
- **Unit (nhiều nhất)** — nhanh, rẻ, ổn định; bắt bug logic sớm.
- **Widget (vừa)** — kiểm UI render + tương tác.
- **Integration (ít nhất)** — chậm, đắt, giòn; chỉ dùng cho **luồng quan trọng**.

**Arrange-Act-Assert (AAA)** — mọi test theo 3 bước:
- **Arrange** — chuẩn bị dữ liệu/môi trường (`final task = Task(...)`, `tester.pumpWidget(...)`).
- **Act** — thực hiện hành động (`task.toggle()`, `tester.tap(...)`, `tester.enterText(...)`).
- **Assert** — kiểm kết quả bằng `expect(...)`.

**Bẫy đề thi:** Integration test **không nên nhiều** (chậm + giòn) — ưu tiên unit. Widget test nên dùng **`Key`** (`find.byKey(Key('taskTextField'))`) để định vị chắc chắn thay vì dựa vào text.

**━━━━━━━━━━ MODULE 12 (bổ sung — Performance Optimization) ━━━━━━━━━━**

## 12.x Performance Optimization — phần THIẾU trong "Build & Release"

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
