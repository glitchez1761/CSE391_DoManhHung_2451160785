## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Theo luồng (flow) mặc định | Có | Dành cho các phần tử văn bản thông thường. |
| `relative` | Có | Vị trí gốc (ban đầu) của chính nó | Có | Làm gốc tọa độ cho phần tử con absolute, dịch chuyển nhẹ. |
| `absolute` | Không | Tổ tiên gần nhất có position (khác static) | Có (cùng thẻ cha) | Badge thông báo, dropdown menu, tooltip. |
| `fixed` | Không | Cửa sổ trình duyệt (Viewport) | Không (Cố định) | Thanh header cố định, nút cuộn lên đầu trang. |
| `sticky` | Có (rồi Không) | Phần tử cha chứa cuộn & Viewport | Có (tới khi đạt ngưỡng) | Sidebar quảng cáo, tiêu đề bảng luôn dính trên cùng. |

**Câu hỏi thêm:**
- Khái niệm "nearest positioned ancestor": Là phần tử cha/ông nội bọc bên ngoài gần nhất trong cây DOM có thuộc tính `position` được thiết lập thành `relative`, `absolute`, `fixed` hoặc `sticky` (nghĩa là khác `static`).
- `absolute` tham chiếu `body` (hoặc `html`) khi phần tử đó KHÔNG có bất kỳ một "positioned ancestor" nào bọc nó.
- `absolute` tham chiếu parent khi phần tử cha đó được thiết lập `position: relative` (hoặc các giá trị khác static).

### Câu A2 — Flexbox vs Grid (Dự đoán bố cục)

**Trường hợp 1:** Bố cục 1 hàng ngang, 4 cột. Cả 4 items chia đều không gian và có chiều rộng bằng nhau (do `flex: 1`).
```text
+-----------------------------------------------------------+
| +----------+   +----------+   +----------+   +----------+ |
| |  Item 1  |   |  Item 2  |   |  Item 3  |   |  Item 4  | |
| +----------+   +----------+   +----------+   +----------+ |
+-----------------------------------------------------------+
```
- **Trường hợp 2:** Bố cục 3 hàng, 2 cột. Mỗi item chiếm 50% chiều rộng (45% width + 5% margin 2 bên), nên 1 hàng chỉ chứa được 2 items, các items còn lại rớt xuống dòng tạo thành 3 hàng.
```text
+-----------------------------------------------------------+
|  +----------------------+       +----------------------+  |
|  |        Item 1        |       |        Item 2        |  |
|  +----------------------+       +----------------------+  |
|                                                           |
|  +----------------------+       +----------------------+  |
|  |        Item 3        |       |        Item 4        |  |
|  +----------------------+       +----------------------+  |
|                                                           |
|  +----------------------+       +----------------------+  |
|  |        Item 5        |       |        Item 6        |  |
|  +----------------------+       +----------------------+  |
+-----------------------------------------------------------+
```
- **Trường hợp 3:** Bố cục 1 hàng ngang. Item 1 nằm sát mép trái, Item 2 ở giữa, Item 3 nằm sát mép phải. Cả 3 items được căn giữa theo chiều dọc.
```text
+-----------------------------------------------------------+
|                                                           |
| +--------+             +--------+              +--------+ |
| | Item 1 |             | Item 2 |              | Item 3 | |
| +--------+             +--------+              +--------+ |
|                                                           |
+-----------------------------------------------------------+
```
- **Trường hợp 4:** Bố cục 1 hàng, 3 cột. Cột trái cố định 200px, cột giữa co giãn lấp đầy không gian còn lại (1fr), cột phải cố định 200px.
```text
+-----------------------------------------------------------+
| +-------+   +-------------------------------+   +-------+ |
| | 200px |   |              1fr              |   | 200px | |
| | Item1 |   |             Item 2            |   | Item3 | |
| +-------+   +-------------------------------+   +-------+ |
+-----------------------------------------------------------+
```
- **Trường hợp 5:** Bố cục 3 hàng, 3 cột bằng nhau. Hàng 1 có 3 items, hàng 2 có 3 items, hàng 3 có 1 item (nằm ở cột đầu tiên bên trái).
```text
+-----------------------------------------------------------+
| +---------+      +---------+      +---------+             |
| | Item 1  |      | Item 2  |      | Item 3  |             |
| +---------+      +---------+      +---------+             |
|                                                           |
| +---------+      +---------+      +---------+             |
| | Item 4  |      | Item 5  |      | Item 6  |             |
| +---------+      +---------+      +---------+             |
|                                                           |
| +---------+                                               |
| | Item 7  |        (Trống)          (Trống)               |
| +---------+                                               |
+-----------------------------------------------------------+
```
## PHẦN C — SUY LUẬN
### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?
1. Navigation bar ngang (logo + menu + buttons)
    - Nên dùng: Flexbox.
    - Giải thích: Vì đây là cấu trúc 1 chiều (1D ngang) yêu cầu căn lề và phân bổ khoảng cách linh hoạt. Flexbox giải quyết cực kỳ gọn gàng bằng justify-content: space-between (để đẩy logo và nút ra 2 bên, menu ở giữa) và align-items: center (căn giữa theo chiều dọc).
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
    - Nên dùng: Grid.
    - Giải thích: Đây là cấu trúc 2 chiều (2D ngang và dọc). CSS Grid sinh ra để xử lý các bố cục dạng lưới phức tạp, giúp định hình cố định 3 cột vuông vức hoàn hảo (grid-template-columns: repeat(3, 1fr)) và tự động xếp thẳng hàng bất kể bạn render ra bao nhiêu ảnh.
3. Layout blog: main content + sidebar
    - Nên dùng: Grid.
    - Giải thích: Grid sinh ra để làm bố cục trang tổng thể (macro layout). Bạn có thể dễ dàng thiết lập tỷ lệ hoàn hảo chỉ với một dòng code như grid-template-columns: 1fr 300px; (phần main chiếm toàn bộ không gian còn lại, sidebar cố định 300px).
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
    - Nên dùng: Grid (hoặc kết hợp Grid cho layout tổng, Flex cho các link bên trong).
    - Giải thích: CSS Grid giúp chia 4 cột chính xác và đều tăm tắp với lệnh grid-template-columns: repeat(4, 1fr) mà không cần phải đi tính phần trăm chiều rộng (width) hay trừ hao lề (margin) thủ công như khi dùng Flexbox.
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
    - Nên dùng: Flexbox.
    - Giải thích: Đây là cấu trúc 1 chiều theo trục dọc. Bạn chỉ cần set thẻ Card là display: flex; flex-direction: column;, sau đó áp dụng margin-top: auto cho nút bấm. Thuộc tính này sẽ chiếm hết không gian thừa còn lại và đẩy nút bấm dính chặt xuống đáy, bất kể phần text miêu tả có dài hay ngắn.
### Câu C2: Debug Flexbox
Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống  
- Nguyên nhân: Các .card là các Flex item nằm trong .card-container. Tuy nhiên, bên trong .card không được thiết lập là một Flex container, nên các phần tử con (img, h3, btn) phân bổ theo luồng khối (block flow) thông thường. Khi tiêu đề (h3) có độ dài khác nhau, nó đẩy nút "Mua" (.btn) xuống các vị trí không đồng nhất.
- Cách sửa: Thiết lập .card là display: flex với flex-direction: column và dùng margin-top: auto cho nút "Mua" để đẩy nó xuống đáy card.
- Code:
```text
.card { 
    width: 30%; margin: 1.5%; 
    display: flex; 
    flex-direction: column; 
}
.card .btn { 
    margin-top: auto; /* Đẩy nút xuống đáy card */
}
```
Lỗi 2: Items không nằm giữa container 100vh
- Nguyên nhân: Chúng ta đã dùng display: flex trên .hero nhưng thiếu các thuộc tính căn chỉnh trục chính và trục phụ (mặc định là justify-content: flex-start và align-items: stretch).
- Cách sửa: Thêm justify-content: center để căn giữa ngang và align-items: center để căn giữa dọc.
- Code:
```text
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; /* Căn giữa ngang */
    align-items: center;     /* Căn giữa dọc */
}
```
Lỗi 3: Sidebar bị co lại khi content quá dài
- Nguyên nhân: Các Flex items mặc định có thuộc tính flex-shrink: 1, điều này cho phép trình duyệt tự động thu nhỏ phần tử nếu không gian không đủ.
- Cách sửa: Thiết lập flex-shrink: 0 cho .sidebar để "khóa" chiều rộng cố định của nó.
- Code:
```text
.sidebar { 
    width: 250px; 
    flex-shrink: 0; /* Không cho phép co nhỏ */
}
```