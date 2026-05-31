# User Directory CRUD

## Mô tả

Ứng dụng quản lý người dùng sử dụng JSONPlaceholder API.

Cho phép:

* Xem danh sách người dùng
* Tìm kiếm người dùng
* Thêm người dùng mới
* Chỉnh sửa người dùng
* Xóa người dùng
* Hiển thị trạng thái loading
* Hiển thị thông báo lỗi/thành công

## API sử dụng

### JSONPlaceholder

Base URL:

```text
https://jsonplaceholder.typicode.com
```

Endpoints:

```text
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

## Tính năng

* READ users
* CREATE user
* UPDATE user
* DELETE user
* SEARCH user
* Skeleton loading
* Toast notification
* Responsive UI

## Cách chạy

### Cách 1

Mở:

```text
index.html
```

### Cách 2 (Khuyến nghị)

Dùng Live Server trong VS Code.

## Công nghệ

* HTML5
* CSS3
* JavaScript ES6+
* Fetch API
* Async/Await

## Cấu trúc thư mục

```text
user_directory/
│
├── index.html
├── style.css
├── app.js
└── README.md
```
