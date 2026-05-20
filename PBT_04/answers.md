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