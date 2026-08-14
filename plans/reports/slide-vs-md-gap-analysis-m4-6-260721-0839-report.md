# GAP ANALYSIS + BỔ SUNG — MODULE 4,5,6

Đối chiếu 3 file slide (Module4/5/6) với `PRM393_On_Thi_Full.md` (File A) và `PRM393_Ngan_Hang_Cau_Hoi.md` (File B). Chỉ liệt kê gap thi được; bỏ bìa/agenda/ảnh trang trí. Đã grep Phụ lục A để tránh trùng.

## PHẦN 0 — Tóm tắt gap (theo module)

**Module 4** (slide có, MD thiếu/sơ):
- `RadioListTile` (value/groupValue/onChanged) — File A chỉ nhắc `Radio<T>`, không có RadioListTile.
- `Slider` chi tiết: min/max mặc định (0..1), `divisions`, `label`, `onChangeStart/onChangeEnd`, activeColor — File A chỉ liệt kê tên.
- `BoxFit` (cover/contain/fill/...) cho `Image` — chưa có ở A lẫn B.
- `BottomNavigationBar` API: `currentIndex`/`onTap`/`items`/`type` fixed-vs-shifting — chỉ nhắc như property của Scaffold, chưa mô tả.
- Minor: `CircleAvatar` (leading tròn), nguồn Material Icons — gộp mục nhỏ.

**Module 5** (Navigation + State Management):
- `maybePop()` (pop có điều kiện, tôn trọng WillPopScope/PopScope) — bảng Navigator ở A/B thiếu.
- Navigator 2.0 **declarative**: `Navigator(pages:[MaterialPage...], onPopPage:)`, RouterDelegate + ChangeNotifier — A/B mới nêu 3 thành phần (Parser/Delegate/Dispatcher), chưa có API list `Page`.
- "Lifting State Up" (khái niệm có tên) — A/B chỉ có "app state", chưa gọi tên.
- `InheritedWidget.updateShouldNotify` + `getInheritedWidgetOfExactType` — File B M14 có `dependOn...` nhưng thiếu 2 cái này.
- Minor: file AASA `/.well-known/apple-app-site-association`, lệnh `adb ... am start` test deep link.

**Module 6**:
- **Responsive vs Adaptive UI** (phân biệt cốt lõi, rất dễ nhầm) + `NavigationRail` (adaptive: BottomNav→Rail trên tablet) — CHƯA có ở A lẫn B. Đây là gap quan trọng nhất của M6.
- Minor: `Chip`/`FilterChip` bọc trong `Wrap`; Flutter Inspector "Layout Explorer".

**Đã cover tốt (không cần bổ sung):** MediaQuery/LayoutBuilder/OrientationBuilder, breakpoints, GridView các constructor, SafeArea, Flexible/Expanded/Spacer, RenderFlex overflow, Stack/Positioned, ListView.builder/separated, Scaffold/AppBar/FAB location, Theme/Dark mode/useMaterial3, showDate/TimePicker, named routes + onGenerateRoute/onUnknownRoute, Navigator 1.0 push/pop/pushReplacement/pushAndRemoveUntil, deep link Android intent-filter + iOS CFBundleURLTypes/Associated Domains, Provider watch/read/Consumer/Selector, ChangeNotifier/notifyListeners, Stateless vs Stateful, lifecycle.

---

## PHẦN 1 — Nội dung chèn vào PRM393_On_Thi_Full.md (ready-to-paste)

### (Module 4) — chèn sau mục 4.7 (trước dấu `---` kết Module 4)

```markdown
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
```

### (Module 5) — chèn sau 5.4 (Navigation) và bổ sung vào mục "STATE MANAGEMENT"

Chèn sau mục 5.4:
```markdown
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
```

Chèn vào cuối mục "STATE MANAGEMENT" (sau khối Provider/BLoC):
```markdown
## Lifting State Up (nâng state lên cha chung)
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

## InheritedWidget — method quan trọng
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
```

### (Module 6) — chèn sau 6.5 (trước dấu `---` kết Module 6)

```markdown
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
```

---

## PHẦN 2 — Câu hỏi chèn vào PRM393_Ngan_Hang_Cau_Hoi.md (ready-to-paste)

### (Module 4) — chèn cuối phần "MODULE 4" (sau phần Giải thích M4)

```markdown
### CÂU BỔ SUNG M4 (từ slide)

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
```

### (Module 5) — chèn cuối phần "MODULE 5" (Navigation); nhóm State Management có thể để tại đây hoặc chuyển sang M14

```markdown
### CÂU BỔ SUNG M5 (Navigation + State Management, từ slide)

**M5-BS-1.** How does `Navigator.maybePop(context)` differ from `Navigator.pop(context)`?
A. They are identical
B. `maybePop` pops only if allowed (consults `WillPopScope`/`PopScope`); `pop` pops unconditionally
C. `maybePop` pops all routes
D. `maybePop` cannot return a value

**M5-BS-2.** In Navigator 2.0's declarative API, how do you go back to the previous screen?
A. Call `Navigator.pop()`
B. Change the app state so the corresponding `Page` is removed from the `pages` list
C. Call `pushReplacement`
D. Reset the RouterDelegate

**M5-BS-3.** In a `RouterDelegate`, which callback runs when the system back button is pressed and must sync the app state?
A. `onGenerateRoute`  B. `onPopPage`  C. `didPop` only  D. `onBack`

**M5-BS-4.** A `RouterDelegate` mixes in `ChangeNotifier`. What must you call after mutating its state so the Navigator rebuilds?
A. `setState()`  B. `notifyListeners()`  C. `rebuild()`  D. `markNeedsBuild()`

**M5-BS-5.** Which class wraps a widget as a page in the Navigator 2.0 `pages` list?
A. `MaterialPageRoute`  B. `MaterialPage`  C. `RouteSettings`  D. `PageBuilder`

**M5-BS-6.** For iOS Universal Links, where must the `apple-app-site-association` (AASA) file be hosted?
A. In `Info.plist`
B. At `https://<domain>/.well-known/apple-app-site-association`
C. Inside the app bundle
D. In `AndroidManifest.xml`

**M5-BS-7.** Which command tests an Android custom-scheme deep link from a terminal?
A. `flutter run --deep-link`
B. `adb shell am start -a android.intent.action.VIEW -d "myapp://movies?id=12"`
C. `adb deeplink myapp://`
D. `gradle openLink`

**M5-BS-8.** What is "lifting state up" in Flutter?
A. Moving shared state to the nearest common ancestor, passing data down and callbacks up
B. Moving state to a global variable
C. Persisting state to disk
D. Simply calling setState more often

**M5-BS-9.** Which method of an `InheritedWidget` decides whether its dependents should rebuild?
A. `of(context)`  B. `updateShouldNotify(oldWidget)`  C. `build()`  D. `notifyListeners()`

**M5-BS-10.** If `updateShouldNotify` returns `false`, what happens when a new instance of the InheritedWidget is built with a different value?
A. Dependents rebuild anyway
B. Dependents do NOT rebuild
C. A compile error occurs
D. The app crashes

**M5-BS-11.** Which context method reads an InheritedWidget WITHOUT registering a dependency (so it won't rebuild)?
A. `dependOnInheritedWidgetOfExactType<T>()`
B. `getInheritedWidgetOfExactType<T>()`
C. `context.watch<T>()`
D. `of(context)`

### ĐÁP ÁN M5-BS
1-B · 2-B · 3-B · 4-B · 5-B · 6-B · 7-B · 8-A · 9-B · 10-B · 11-B

**Giải thích các câu dễ sai:**
- **1:** `pop` pop vô điều kiện; `maybePop` hỏi `WillPopScope`/`PopScope` — dùng cho xác nhận thoát.
- **2:** Navigator 2.0 KHÔNG `pop` thủ công; phải đổi state để bớt `Page` khỏi `pages`.
- **5:** `MaterialPageRoute` thuộc Navigator 1.0 (imperative); Navigator 2.0 dùng `MaterialPage`/`CupertinoPage` trong `pages`.
- **9, 10:** `updateShouldNotify` là chỗ quyết định rebuild của InheritedWidget; trả `false` → dependent bỏ qua dù giá trị đổi.
- **11:** `dependOn...` = có đăng ký (sẽ rebuild); `getInheritedWidgetOfExactType` = chỉ lấy, không đăng ký.
```

### (Module 6) — chèn cuối phần "MODULE 6"

```markdown
### CÂU BỔ SUNG M6 (từ slide)

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
```

---

**Status:** DONE
**Summary:** Rà 3 module slide (M4:26, M5:34, M6:24 slide) vs File A + File B. Tìm ~12 gap thi được (M4: 4 chính + minor; M5: 4 chính + minor; M6: 1 chính "Responsive vs Adaptive" + minor). Soạn sẵn nội dung lý thuyết tiếng Việt cho File A (7 mục 4.8–4.11, 5.5–5.7, Lifting State Up + InheritedWidget methods, 6.6–6.7) và 27 câu trắc nghiệm bổ sung cho File B (M4-BS: 10, M5-BS: 11, M6-BS: 6) kèm đáp án + giải thích. Tất cả ready-to-paste, không sửa 2 file MD.
**Concerns:** (1) Khối câu State Management (M5-BS-8..11) thuộc slide Module 5 nhưng File B đã có "MODULE 14 — STATE MANAGEMENT"; đề xuất dán vào M5 cho khớp slide, hoặc chuyển sang M14 nếu muốn gom theo chủ đề — tuỳ chủ nhân chọn. (2) Vài gap minor (Material Icons origin, DropdownButton chi tiết, Chip variants, adb/AASA) đã gộp gọn thay vì tách mục riêng theo nguyên tắc KISS.
