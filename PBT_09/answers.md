## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — DOM Tree & querySelector

**1. Sơ đồ cây DOM Tree:**
```text
div#app
├── header
│   ├── h1
│   └── nav
│       ├── a.active
│       ├── a
│       └── a
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    └── ul#todoList
        ├── li.todo-item
        └── li.todo-item.completed
```
2. Viết querySelector:
- Chọn thẻ `<h1>`: document.querySelector("h1")
- Chọn input trong form: document.querySelector("#todoInput")
- Chọn tất cả .todo-item: document.querySelectorAll(".todo-item")
- Chọn link đang active: document.querySelector("a.active")
- Chọn `<li>` đầu tiên trong #todoList: document.querySelector("#todoList li") hoặc document.querySelector(".todo-item")
- Chọn tất cả `<a>` bên trong `<nav>`: document.querySelectorAll("nav a")

### Câu A2 — innerHTML vs textContent
1. Sự khác nhau:
- textContent: Chỉ thay đổi hoặc lấy ra nội dung dạng văn bản thuần túy (text thuần), bỏ qua mọi thẻ HTML. Dùng khi bạn chỉ muốn hiển thị chữ.
- innerHTML: Trả về hoặc thiết lập toàn bộ cấu trúc HTML bên trong phần tử. Dùng khi bạn cần render động các thẻ HTML từ JS.
2. Lỗ hổng XSS:
innerHTML nguy hiểm vì nếu nội dung được nhập từ người dùng chứa các thẻ `<script>` hoặc `<img onerror="...">`, trình duyệt sẽ hiểu đó là mã HTML/JS hợp lệ và thực thi nó, dẫn đến việc hacker chạy mã độc trên trình duyệt của người dùng.

- Cách sửa (Fix code): Dùng textContent thay cho innerHTML.
```javascript
// Dùng textContent để mã hóa an toàn các ký tự đặc biệt
document.querySelector("#result").textContent = userInput;
```
### Câu A3 - Event Bubbling
Câu A3 — Event Bubbling
- Khi click vào button (Mặc định): Output sẽ là:
    - BUTTON
    - INNER
    - OUTER
(Sự kiện click nổi bọt từ phần tử con lên các phần tử cha)
- Nếu uncomment e.stopPropagation(): Output sẽ CHỈ là:
    - BUTTON (Lệnh stopPropagation() đã ngăn chặn sự kiện nổi bọt, không cho các thẻ cha bắt được sự kiện này)
# PHẦN C — DEBUG & PHÂN TÍCH

## Câu C1 — Debug DOM Code

### Các lỗi tìm được và cách sửa

| STT | Lỗi                                           | Nguyên nhân                                       | Cách sửa                                               |
| --- | -------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| 1   | `addEventListener("onclick", ...)`            | Event name sai, phải dùng `"click"`               | Đổi thành `addEventListener("click", ...)`             |
| 2   | `countDisplay = count;`                       | Gán giá trị cho biến DOM element                  | Đổi thành `countDisplay.textContent = count;`          |
| 3   | `const countDisplay` nhưng bị gán lại         | Biến DOM không nên bị ghi đè                      | Chỉ cập nhật nội dung bằng `textContent`               |
| 4   | `historyList.innerHTML = null;`               | `innerHTML` phải là chuỗi                         | Đổi thành `historyList.innerHTML = "";`                |
| 5   | `item.remove;`                                | Thiếu dấu ngoặc gọi hàm                           | Đổi thành `item.remove();`                             |
| 6   | `localStorage.getItem("count")` trả về string | Dẫn đến lỗi kiểu dữ liệu khi tăng giảm            | Dùng `Number(localStorage.getItem("count"))`           |
| 7   | Không load history từ localStorage            | Chỉ load count, không khôi phục danh sách history | Gán lại `historyList.innerHTML` từ localStorage        |
| 8   | Event click của history bị mất sau khi load   | Các event listener không được lưu trong HTML      | Dùng Event Delegation hoặc bind lại event sau khi load |
| 9   | Có thể decrement xuống số âm                  | Không kiểm tra giới hạn                           | Thêm điều kiện nếu yêu cầu không cho số âm             |

---

### Code sửa hoàn chỉnh

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;

    const li = document.createElement("li");
    li.textContent = `Count changed to ${count}`;
    historyList.appendChild(li);
});

document.querySelector("#decrementBtn").addEventListener("click", () => {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.remove();
}

// Event Delegation cho history
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");

    items.forEach(item => {
        item.remove();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;

    countDisplay.textContent = count;
    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
```

---

# Câu C2 (7 điểm) — Performance

## 1. Tại sao bind event lên 1000 elements riêng lẻ là Bad Practice?

Ví dụ:

```javascript
items.forEach(item => {
    item.addEventListener("click", handleClick);
});
```

Khi có 1000 phần tử:

* Trình duyệt phải tạo 1000 event listener.
* Tốn thêm bộ nhớ (memory).
* Tăng thời gian khởi tạo trang.
* Khó quản lý khi phần tử được thêm/xóa động.
* Hiệu năng giảm khi số lượng phần tử lớn.

### Hậu quả

```text
1000 elements
→ 1000 event listeners
→ nhiều memory hơn
→ nhiều CPU hơn
→ code khó bảo trì hơn
```

---

## 2. Event Delegation giải quyết như thế nào?

Thay vì gắn event cho từng phần tử, chỉ gắn một event lên phần tử cha.

### Ví dụ

```javascript
document.getElementById("list")
.addEventListener("click", (e) => {

    if (e.target.matches(".item")) {
        console.log(e.target.textContent);
    }

});
```

### Ưu điểm

* Chỉ cần 1 event listener.
* Tiết kiệm bộ nhớ.
* Tự động hoạt động với phần tử thêm mới.
* Dễ bảo trì hơn.

```text
1000 elements
→ 1 parent listener
→ Event Bubbling
→ xác định phần tử được click bằng e.target
```

---

## 3. Refactor dùng DocumentFragment

### Code gốc

```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
}
```

### Vấn đề

Mỗi lần:

```javascript
appendChild()
```

trình duyệt phải:

1. Cập nhật DOM
2. Tính toán lại layout (reflow)
3. Có thể repaint

Thực hiện 1000 lần liên tiếp gây lãng phí tài nguyên.

---

### Code tối ưu

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

---

## 4. Tại sao DocumentFragment nhanh hơn?

`DocumentFragment` là một DOM tạm thời nằm ngoài document chính.

Quá trình:

```text
Tạo 1000 phần tử
↓
Thêm vào Fragment
↓
Không reflow
↓
Append Fragment vào DOM thật
↓
Chỉ 1 lần reflow
```

So sánh:

| Cách làm                       | Reflow    |
| ------------------------------ | --------- |
| appendChild trực tiếp 1000 lần | ~1000 lần |
| DocumentFragment               | 1 lần     |

### Kết luận

* Giảm số lần thao tác trên DOM.
* Giảm reflow/repaint.
* Tăng tốc độ render.
* Tiết kiệm CPU và bộ nhớ.
* Là kỹ thuật tối ưu DOM phổ biến trong JavaScript hiện đại.

