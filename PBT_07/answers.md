# 📋 PHIẾU TRẢ LỜI — PBT 07: JavaScript Basics

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 — var / let / const

#### Dự đoán output:

**Đoạn 1:**
```javascript
console.log(x);   // → undefined
var x = 5;
```
**Giải thích:** `var` bị **hoisting** — JS "kéo" khai báo lên đầu scope nhưng KHÔNG kéo giá trị.
Engine thực sự thực thi như:
```javascript
var x;            // khai báo được kéo lên (giá trị = undefined)
console.log(x);   // → undefined
x = 5;            // gán giá trị ở đây
```

---

**Đoạn 2:**
```javascript
console.log(y);   // → ReferenceError: Cannot access 'y' before initialization
let y = 10;
```
**Giải thích:** `let` cũng bị hoisting nhưng nằm trong **Temporal Dead Zone (TDZ)** — tồn tại nhưng không thể truy cập trước dòng khai báo. Khác `var` ở chỗ: `var` cho `undefined`, còn `let`/`const` ném lỗi thẳng.

---

**Đoạn 3:**
```javascript
const z = 15;
z = 20;           // → TypeError: Assignment to constant variable.
console.log(z);   // Không chạy tới đây
```
**Giải thích:** `const` không thể gán lại. Lỗi xảy ra ngay tại dòng `z = 20`.

---

**Đoạn 4:**
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // → [1, 2, 3, 4]
```
**Giải thích:** `const` giữ nguyên **tham chiếu** (địa chỉ bộ nhớ), không phải giá trị.
`arr` vẫn trỏ đến cùng 1 mảng → có thể thêm/xóa phần tử bên trong.
Chỉ không được gán lại `arr = [5, 6, 7]` (thay đổi tham chiếu).

---

**Đoạn 5:**
```javascript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);  // → "Trong block: 2"
}
console.log("Ngoài block:", a);      // → "Ngoài block: 1"
```
**Giải thích:** `let` có **block scope** — `a` bên trong `{}` là biến hoàn toàn khác với `a` bên ngoài. Hai biến cùng tên nhưng ở scope khác nhau, không ảnh hưởng nhau.

---

### Câu A2 — Data Types & Coercion

| Biểu thức | Kết quả | Lý do |
|---|---|---|
| `typeof null` | `"object"` | Bug lịch sử của JS từ 1995, không bao giờ sửa vì compatibility |
| `typeof undefined` | `"undefined"` | Đúng như tên |
| `typeof NaN` | `"number"` | NaN = "Not a Number" nhưng type vẫn là number |
| `"5" + 3` | `"53"` | `+` với string → nối chuỗi, 3 bị chuyển thành `"3"` |
| `"5" - 3` | `2` | `-` không có nghĩa với string → JS chuyển `"5"` thành số |
| `"5" * "3"` | `15` | `*` luôn chuyển sang số |
| `true + true` | `2` | `true` = `1` trong ngữ cảnh số |
| `[] + []` | `""` | Cả 2 array convert → string rỗng `""`, cộng lại = `""` |
| `[] + {}` | `"[object Object]"` | `[]` → `""`, `{}` → `"[object Object]"`, nối lại |
| `{} + []` | `0` | `{}` ở đầu câu → được hiểu là **block code rỗng**, `+[]` = `+""` = `0` |

**Giải thích "5" + 3 vs "5" - 3:**
- Toán tử `+` có **2 nghĩa**: cộng số VÀ nối chuỗi. Khi một trong hai toán hạng là string, JS ưu tiên nghĩa "nối chuỗi" → chuyển số còn lại thành string.
- Toán tử `-` CHỈ có 1 nghĩa: phép trừ số. Không tồn tái "trừ chuỗi" → JS buộc phải chuyển `"5"` thành số `5` trước khi tính.

**Bài học:** Luôn dùng `Number()` hoặc `parseInt()` khi lấy dữ liệu từ input để tránh coercion bất ngờ.

---

### Câu A3 — So sánh == vs ===

| Biểu thức | Kết quả | Lý do |
|---|---|---|
| `5 == "5"` | `true` | `==` chuyển `"5"` → `5` trước khi so sánh |
| `5 === "5"` | `false` | `===` không chuyển type: number ≠ string |
| `null == undefined` | `true` | Quy tắc đặc biệt: `null` và `undefined` bằng nhau khi dùng `==` |
| `null === undefined` | `false` | Khác type: `null` ≠ `undefined` |
| `NaN == NaN` | `false` | NaN không bằng bất cứ thứ gì, kể cả chính nó! |
| `0 == false` | `true` | `false` → `0`, `0 == 0` = true |
| `0 === false` | `false` | Khác type: number ≠ boolean |
| `"" == false` | `true` | Cả hai → `0`, `0 == 0` = true |

**Quy tắc:** Luôn dùng `===` (strict equality).
- `==` có hàng chục quy tắc chuyển đổi ngầm → khó đoán, dễ bug.
- `===` đơn giản: **khác type → false**, cùng type mới so sánh giá trị.
- Exception duy nhất có thể dùng `==`: kiểm tra `null || undefined` cùng lúc: `value == null` (bắt cả hai).

---

### Câu A4 — Truthy & Falsy

**6 giá trị Falsy trong JavaScript:**
```
false, 0, "", null, undefined, NaN
```
(Và ES2020 thêm: `0n` — BigInt zero)

**Dự đoán kết quả:**

| Biểu thức | Kết quả | Lý do |
|---|---|---|
| `if ("0")` | **In "A"** | `"0"` là string có nội dung → truthy (chú ý: khác số `0`!) |
| `if ("")` | Không in | `""` string rỗng → **falsy** |
| `if ([])` | **In "C"** | `[]` mảng rỗng → **truthy** (bẫy phổ biến nhất!) |
| `if ({})` | **In "D"** | `{}` object rỗng → **truthy** |
| `if (null)` | Không in | `null` → **falsy** |
| `if (0)` | Không in | `0` → **falsy** |
| `if (-1)` | **In "G"** | Số khác 0 (kể cả âm) → truthy |
| `if (" ")` | **In "H"** | String có space → string không rỗng → **truthy** |

**Bẫy quan trọng:** `"0"` và `[]` đều truthy! Nhiều developer nhầm vì nghĩ `"0"` = false.

---

### Câu A5 — Template Literals

```javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

**Ưu điểm Template Literal:**
- Không cần escape dấu nháy đôi bên trong
- Hỗ trợ **multi-line** tự nhiên (không cần `\n`)
- Expression bên trong `${}` có thể là bất kỳ JS expression: `${a + b}`, `${isAdmin ? 'Admin' : 'User'}`, `${arr.length}`

---

## PHẦN C — SUY LUẬN

---

### Câu C1 — Debug JavaScript

**Danh sách 6 lỗi tìm được:**

---

**Lỗi 1: Assignment thay vì comparison (nghiêm trọng nhất)**
```javascript
// ❌ SAI — gán giá trị 0 cho giaSauGiam, luôn là falsy → if không bao giờ chạy đúng
if (giaSauGiam = 0) {

// ✅ ĐÚNG
if (giaSauGiam === 0) {
```
*Đây là lỗi cực kỳ phổ biến. `=` là phép gán, `===` là so sánh.*

---

**Lỗi 2: Không validate input kiểu dữ liệu**
```javascript
// ❌ SAI — "100000" là string, JS coerce khi nhân nên không báo lỗi
const gia = tinhGiaGiamGia("100000", 20);   // Trả về 80000 thay vì báo lỗi

// ✅ THÊM validation ở đầu hàm:
if (isNaN(Number(giaBan)) || isNaN(Number(phanTramGiam))) {
    return "Lỗi: Input không phải số";
}
giaBan = Number(giaBan);  // Ép kiểu tường minh
```

---

**Lỗi 3: `giaSauGiam = 0` không `return` sau log**
```javascript
// ❌ Thiếu return — hàm vẫn chạy tiếp và return giaSauGiam (= 0)
if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!")
}
return giaSauGiam   // return 0 — không sai nhưng logic không hoàn chỉnh

// ✅ Thêm return nếu muốn dừng luôn:
if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!")
    return 0;
}
```

---

**Lỗi 4 (ẨN): `var i` trong vòng lặp với `setTimeout`**
```javascript
// ❌ SAI — in "Item 5" năm lần thay vì "Item 0, 1, 2, 3, 4"
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)  // i lúc này = 5 (vòng lặp đã kết thúc)
    }, 1000)
}
```
**Giải thích:** `var` có **function scope** → chỉ có 1 biến `i` duy nhất cho toàn hàm. Tất cả 5 callback setTimeout đều tham chiếu đến CÙNG biến `i`. Sau 1 giây, vòng lặp đã chạy xong, `i = 5` → cả 5 lần đều in "Item 5".

```javascript
// ✅ SỬA bằng let — mỗi lần lặp tạo 1 biến i riêng (block scope)
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)  // Mỗi callback nhớ i của riêng nó
    }, 1000)
}
// → In: "Item 0", "Item 1", "Item 2", "Item 3", "Item 4"
```

---

**Lỗi 5: Thiếu `return` khi input không hợp lệ về kiểu**
Khi `phanTramGiam = 110`, hàm return đúng. Nhưng khi `giaBan = "abc"`:
```javascript
// ❌ isNaN("abc" * 20 / 100) = true nhưng hàm không check → return NaN
// ✅ Thêm check: if (typeof giaBan !== 'number' && isNaN(Number(giaBan)))
```

---

**Lỗi 6: Thiếu semicolons (style — nhưng quan trọng về ASI edge cases)**
```javascript
return "Phần trăm giảm không hợp lệ"  // thiếu ;
var giamGia = giaBan * phanTramGiam / 100  // thiếu ;
let giaSauGiam = giaBan - giamGia          // thiếu ;
```
JS có ASI (Automatic Semicolon Insertion) nhưng có các edge case nó KHÔNG insert — gây lỗi khó debug.

---

**Code đã sửa hoàn chỉnh:** → xem file `restaurant_bill.js` và `var_let_const.js`