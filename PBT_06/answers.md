# ĐÁP ÁN PHIẾU BÀI TẬP 06 - TRACK A (BOOTSTRAP 5)

## PHẦN A — ĐỌC HIỂU

### Câu A1 — Grid System

Bảng dự đoán layout:

| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
|------------|------------------|------------------------|-------------------|
| **Số cột** | 1 cột/hàng | 2 cột/hàng | 4 cột/hàng |
| **Box layout** | Xếp chồng dọc (100% width) | Dàn 2x2 (50% width) | Dàn ngang 4 box (25% width) |

**Giải thích thêm:**
- `col-md-6` nghĩa là: Bắt đầu từ màn hình cỡ medium (`md` - 768px) trở lên, phần tử này sẽ chiếm 6/12 cột (tức là 50% chiều rộng của hàng).
- **Tại sao không cần viết `col-sm-12`?** Vì Bootstrap áp dụng triết lý *Mobile-First*. Class `col-12` đã áp dụng mặc định cho kích thước nhỏ nhất (`xs`, `sm`) cho đến khi gặp breakpoint tiếp theo là `md`. Do đó, viết `col-sm-12` là thừa.

### Câu A2 — Utilities & Components

**1. Giải thích `d-none d-md-block`:**
- Element này sẽ **bị ẩn** (`display: none`) trên các thiết bị nhỏ (dưới 768px).
- Element sẽ **hiển thị dạng block** (`display: block`) bắt đầu từ breakpoint `md` (768px trở lên). Thường dùng để ẩn menu ngang/sidebar trên mobile.

**2. 5 Spacing Utilities:**
- `mt-3`: Margin Top level 3 (tương đương 1rem / 16px).
- `px-4`: Padding theo trục X (Left và Right) level 4 (tương đương 1.5rem / 24px).
- `mb-auto`: Margin Bottom tự động (thường dùng trong Flexbox để đẩy các phần tử khác xuống dưới cùng).
- `py-2`: Padding theo trục Y (Top và Bottom) level 2 (tương đương 0.5rem / 8px).
- `ms-5`: Margin Start (Bên trái trong LTR) level 5 (tương đương 3rem / 48px).

**3. Sự khác nhau giữa các loại Container:**
- `.container`: Có chiều rộng tối đa (max-width) cố định, thay đổi theo từng breakpoint (luôn căn giữa trang và có khoảng trống 2 bên).
- `.container-fluid`: Luôn luôn chiếm 100% chiều rộng màn hình bất kể thiết bị nào.
- `.container-md`: Chiếm 100% chiều rộng trên màn hình `xs` và `sm`. Bắt đầu từ màn hình `md` trở lên, nó mới hoạt động giống như `.container` bình thường.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Tùy biến Bootstrap

**1. Đổi màu `$primary` bằng SASS:**
Để đổi màu cốt lõi chuẩn xác, ta cần cài đặt Bootstrap qua npm và sử dụng công cụ biên dịch SASS.
- Bước 1: Tạo file `custom.scss`.
- Bước 2: Khai báo lại biến `$primary: #E63946;` ở đầu file.
- Bước 3: `@import` mã nguồn Bootstrap SASS (`~bootstrap/scss/bootstrap`) ngay bên dưới khai báo.
- Bước 4: Biên dịch `custom.scss` ra file CSS cuối cùng.

**2. Tại sao KHÔNG nên override CSS thuần?**
Nếu bạn viết CSS thuần `.btn-primary { background: red; }`, bạn sẽ bỏ sót hàng chục class khác dùng chung màu `$primary` như `.text-primary`, `.bg-primary`, màu viền, màu khi hover/focus, màu alert, v.v. Khi ghi đè bằng SASS variable, Bootstrap sẽ tự động nội suy và thay đổi đồng bộ *toàn bộ* hệ thống UI cho bạn.

### Câu C2 — So sánh

**So sánh Bootstrap và CSS Thuần:**
- **Số dòng CSS:** Dùng Bootstrap gần như không phải viết thêm dòng CSS nào (0 dòng), trong khi CSS thuần phải viết rất nhiều (flexbox, grid, media queries) để làm Navbar và Card responsive.
- **Thời gian phát triển:** Bootstrap nhanh hơn vượt trội nhờ thư viện class và component xây dựng sẵn.
- **Khả năng tùy biến:** CSS thuần tự do 100%. Bootstrap sẽ hơi gò bó, nếu không rành SASS, giao diện sẽ trông "rất giống Bootstrap" và khó sửa các thiết kế quá phá cách.

**Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?**
- **NÊN:** Làm admin dashboard, trang quản trị nội bộ, dự án cần prototype nhanh, làm việc trong team backend không mạnh về CSS.
- **KHÔNG NÊN:** Landing page có design quá độc đáo, dự án yêu cầu tối ưu performance cực cao (file size nhỏ), hoặc công ty đã có Design System riêng biệt.