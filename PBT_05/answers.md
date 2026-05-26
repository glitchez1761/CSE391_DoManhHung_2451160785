### PHẦN A — KIỂM TRA ĐỌC HIỂU ###  
## Câu A1 (Viewport & Mobile-First)
1. Thẻ meta: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
    - width=device-width: Đặt chiều rộng trang bằng chiều rộng của thiết bị.
    - initial-scale=1.0: Mức zoom mặc định là 100%.
2. Nếu thiếu: iPhone sẽ coi trang web là bản Desktop và thu nhỏ lại, dẫn đến chữ siêu nhỏ, người dùng phải zoom bằng tay để đọc.
3. Mobile-First vs Desktop-First:
    - Mobile-First: Code mặc định cho mobile, dùng min-width để mở rộng cho màn hình lớn hơn. Khuyên dùng vì hiệu năng tốt hơn, UX đúng thực tế, code sạch hơn và chuẩn hiện đại.
    - Code:
    ```text
    /* Mobile (mặc định) */
    .container {
        padding: 10px;
    }
    /* Tablet trở lên */
    @media (min-width: 768px) {
        .container {
            padding: 30px;
        }
    }
    ```
    - Desktop-First: Code mặc định cho desktop, dùng max-width để thu nhỏ.
    - Code:
    ```text
    /* Desktop (mặc định) */
    .container {
        padding: 30px;
    }
    /* Mobile */
    @media (max-width: 768px) {
        .container {
            padding: 10px;
        }
    }
    ```
## Câu A2 (Breakpoints)
Theo tài liệu tham chiếu: tuan_3_css_advanced/13_creating_responsive_layouts.md → 16_sass_scss.md:
- xs (< 576px): Mobile dọc (1 cột).
- sm (≥ 576px): Mobile ngang (1 cột).
- md (≥ 768px): Tablet (2 cột).
- lg (≥ 992px): Desktop nhỏ (3-4 cột).
- xl (≥ 1200px): Desktop lớn (4-6 cột).
## Câu A3 (Media Queries)
| Chiều rộng màn hình | `.container` width |
|----------|---------------------------|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |
## Câu A4 (SCSS Basics)
1. Variables: Dùng để lưu trữ màu, font, kích thước, tái sử dụng khắp nơi ($primary: #333).
2. Nesting: Viết CSS lồng nhau giúp cấu trúc mã giống HTML, dễ đọc.
3. Mixins: Gom các nhóm thuộc tính CSS để dùng lại (@mixin flex-center {...}).
4. Extend: Cho phép selector này thừa kế thuộc tính từ selector khác.
- Tại sao trình duyệt không đọc được SCSS: Trình duyệt chỉ hiểu CSS. Cần dùng trình biên dịch (Sass compiler) để chuyển file `.scss` sang `.css`.
## Bài B3 (SCSS Refactor)
**Lệnh biên dịch SCSS sang CSS:**

Sử dụng công cụ Sass qua giao diện dòng lệnh (Terminal). Mở terminal tại thư mục chứa dự án và chạy:

```bash
sass scss/style.scss style.css