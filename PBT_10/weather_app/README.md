# Weather App

## Mô tả

Ứng dụng tra cứu thời tiết theo tên thành phố.

Người dùng có thể:

* Tìm kiếm thời tiết hiện tại
* Xem nhiệt độ
* Xem độ ẩm
* Xem mô tả thời tiết
* Xem icon thời tiết
* Lưu lịch sử tìm kiếm

## API sử dụng

### wttr.in

Endpoint:

```text
https://wttr.in/{city}?format=j1
```

Ví dụ:

```text
https://wttr.in/Hanoi?format=j1
```

Dữ liệu sử dụng:

* temp_C
* humidity
* weatherDesc
* weatherIconUrl

## Tính năng

* Tìm kiếm theo tên thành phố
* Loading state
* Success state
* Error state
* LocalStorage lưu 5 thành phố gần nhất
* Click lịch sử để tìm lại
* Responsive UI

## Cách chạy

### Mở trực tiếp

```text
weather_app/index.html
```

### Live Server

1. Mở project bằng VS Code
2. Cài extension Live Server
3. Chuột phải file `index.html`
4. Chọn Open with Live Server

## Công nghệ sử dụng

* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* Async/Await
* LocalStorage

## Cấu trúc thư mục

```text
weather_app/
│
├── index.html
├── style.css
├── app.js
└── README.md
```
