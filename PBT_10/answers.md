## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

**Dự đoán thứ tự output:**
1. `1 - Start`
2. `4 - End`
3. `3 - Promise`
4. `6 - Promise 2`
5. `2 - Timeout 0ms`
6. `7 - Nested timeout`
7. `5 - Timeout 100ms`

**Giải thích:**
Theo cơ chế Event Loop của JavaScript:
1. **Sync code (Đồng bộ):** JS ưu tiên chạy các đoạn code đồng bộ từ trên xuống dưới trước tiên. Nên in ra (1) và (4). Các hàm `setTimeout` và `Promise` bị đẩy vào hàng đợi (Queue).
2. **Microtask Queue (Hàng đợi vi tác vụ):** Chứa các callback của Promise. Microtask luôn được ưu tiên chạy ngay sau khi code Sync kết thúc. Do đó, in ra (3) và (6). Khi (6) chạy, nó lại đẩy thêm một `setTimeout` (7) vào hàng đợi Macrotask.
3. **Macrotask Queue (Hàng đợi vĩ tác vụ):** Chứa các callback của `setTimeout`, `setInterval`. Event Loop sẽ lấy các task này ra chạy theo thứ tự thời gian. Do (2) có thời gian 0ms nên chạy trước, tiếp theo là (7) 0ms vừa được thêm vào, và cuối cùng là (5) chờ 100ms mới chạy.

### Câu A2 — Fetch API

Giải thích hàm `getData()`:
1. **`await fetch(...)`:** Hàm `fetch` dùng để gọi API từ Frontend và nó xử lý bất đồng bộ (trả về một Promise). Từ khóa `await` yêu cầu JS tạm dừng tại dòng này để đợi cho đến khi nhận được phản hồi (response) từ server rồi mới chạy tiếp.
2. **`response.ok`:** Thuộc tính này trả về `false` nếu HTTP Status code không nằm trong khoảng 200-299. Ví dụ 3 mã lỗi: `404` (Not Found), `500` (Internal Server Error), `403` (Forbidden).
3. **`response.json()`:** Bản thân việc đọc và chuyển đổi luồng dữ liệu (stream) từ server thành object JSON cũng là một quá trình tốn thời gian và trả về Promise, do đó CŨNG cần dùng `await`.
4. **`try...catch`:** Khối lệnh này sẽ bắt các lỗi: Mất kết nối mạng (Network error do fetch ném ra), Lỗi do ta chủ động ném ra (`throw new Error` khi `!response.ok`), hoặc lỗi không thể parse JSON.

### Câu A3 — Promise States

**1. Sơ đồ 3 trạng thái của Promise:**
- `Pending` (Đang chờ) → `Fulfilled` (Thành công, có dữ liệu).
- `Pending` (Đang chờ) → `Rejected` (Thất bại, có lỗi).

**2. Callback Hell là gì?**
Là tình trạng lồng ghép quá nhiều hàm callback (hàm này đợi hàm kia chạy xong) tạo thành hình kim tự tháp. Code trở nên khó đọc và khó bảo trì.

**Ví dụ 4 cấp Callback Hell:**
```javascript
// Callback Hell
getUser(1, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            console.log(comments);
        });
    });
});

// Refactor bằng Async/Await
async function getProcess() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        console.log(comments);
    } catch (err) {
        console.error(err);
    }
}
```
## PHẦN C — PHÂN TÍCH
### Câu C1 — Error Handling Strategy
1. Network errors & 2. API errors (404, 500)
```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) { // Bắt lỗi 4xx, 5xx
            if (response.status === 404) throw new Error("Không tìm thấy dữ liệu!");
            if (response.status === 429) throw new Error("Gửi yêu cầu quá nhanh, thử lại sau!");
            throw new Error(`Lỗi server: ${response.status}`);
        }
        return await response.json();
    } catch (error) { // Bắt lỗi Network (mất mạng) hoặc lỗi Throw ở trên
        if (error.name === "TypeError") console.error("Mất kết nối mạng!");
        else console.error(error.message);
    }
}
```
3. Timeout (API chậm)
```javascript
async function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms); // Hủy request sau ms giây

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") throw new Error("Request Timeout!");
        throw error;
    }
}
```
4. Retry logic (Thử lại khi lỗi mạng)
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fetchData(url); // Hàm fetchData đã viết ở phần 1
        } catch (error) {
            if (i === maxRetries - 1) throw new Error("Đã thử tối đa số lần nhưng vẫn lỗi.");
            console.log(`Lỗi. Đang thử lại lần ${i + 1}...`);
            await new Promise(res => setTimeout(res, 1000)); // Nghỉ 1s trước khi thử lại
        }
    }
}
```
### Câu C2 — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

1. So sánh các Promise Combinators

| Method                 | Khi nào resolve?                                  | Khi nào reject?               | Use case                                    |
| ---------------------- | ------------------------------------------------- | ----------------------------- | ------------------------------------------- |
| `Promise.all()`        | Tất cả Promise đều thành công                     | Chỉ cần 1 Promise thất bại    | Các tác vụ bắt buộc phải thành công toàn bộ |
| `Promise.allSettled()` | Khi tất cả Promise hoàn thành (success hoặc fail) | Không reject                  | Thu thập kết quả của nhiều tác vụ độc lập   |
| `Promise.race()`       | Promise đầu tiên hoàn thành (resolve hoặc reject) | Nếu Promise đầu tiên reject   | Timeout, chọn phản hồi nhanh nhất           |
| `Promise.any()`        | Promise đầu tiên resolve                          | Khi tất cả Promise đều reject | Tìm nguồn dữ liệu khả dụng đầu tiên         |
2. Promise.all()
- Đặc điểm
    * Chạy nhiều Promise song song.
    * Chỉ resolve khi tất cả thành công.
    * Chỉ cần một Promise lỗi → toàn bộ reject.
- Ví dụ thực tế: Trang Dashboard Admin  
Khi mở dashboard cần tải:
    * Thông tin user
    * Danh sách đơn hàng
    * Thống kê doanh thu  
-> Nếu thiếu một dữ liệu thì không thể render dashboard đầy đủ.

```javascript
async function loadDashboard() {
    try {
        const [
            user,
            orders,
            statistics
        ] = await Promise.all([
            fetch("/api/user").then(r => r.json()),
            fetch("/api/orders").then(r => r.json()),
            fetch("/api/statistics").then(r => r.json())
        ]);

        renderDashboard(user, orders, statistics);

    } catch (error) {
        showError("Không thể tải dashboard");
    }
}
```

- Tại sao dùng `.all()`?  
Vì dashboard cần đủ dữ liệu từ tất cả API.

```text
User API      ✓
Orders API    ✓
Stats API     ✗

→ Dashboard thất bại
```
3. Promise.allSettled()
- Đặc điểm
    * Chờ tất cả Promise hoàn thành.
    * Không quan tâm thành công hay thất bại.
    * Luôn resolve.
- Ví dụ thực tế: Upload nhiều ảnh
    - Người dùng chọn 10 ảnh để upload.
    - Một vài ảnh có thể lỗi nhưng vẫn muốn biết ảnh nào thành công.
```javascript
const uploads = files.map(file =>
    uploadImage(file)
);

const results =
    await Promise.allSettled(uploads);

results.forEach((result, index) => {

    if (result.status === "fulfilled") {
        console.log(
            `Ảnh ${index} upload thành công`
        );
    } else {
        console.log(
            `Ảnh ${index} upload thất bại`
        );
    }

});
```
- Tại sao dùng `.allSettled()`?
```text
Ảnh 1 ✓
Ảnh 2 ✓
Ảnh 3 ✗
Ảnh 4 ✓
Ảnh 5 ✗

→ Vẫn nhận được kết quả của tất cả ảnh
```
Nếu dùng `.all()` thì ảnh lỗi đầu tiên sẽ làm toàn bộ Promise reject.  

4. Promise.race()
- Đặc điểm
    * Trả về Promise hoàn thành đầu tiên.
    * Không quan tâm resolve hay reject.
- Ví dụ thực tế: API Timeout  
Nếu server phản hồi quá chậm (>5s) thì hủy request.
```javascript
const apiRequest =
    fetch("/api/products");

const timeout =
    new Promise((_, reject) => {
        setTimeout(() => {
            reject(
                new Error("Request timeout")
            );
        }, 5000);
    });

Promise.race([
    apiRequest,
    timeout
])
.then(response => response.json())
.then(data => {
    renderProducts(data);
})
.catch(error => {
    showError(error.message);
});
```
- Tại sao dùng `.race()`?

```text
API response      2s
Timeout           5s

→ API thắng
```

hoặc

```text
API response      8s
Timeout           5s

→ Timeout thắng
```
5. Promise.any()
- Đặc điểm
    * Trả về Promise resolve đầu tiên.
    * Bỏ qua các Promise reject.
    * Chỉ reject khi tất cả đều reject.
- Ví dụ thực tế: CDN Fallback

Một file ảnh được lưu trên nhiều CDN.

Chỉ cần lấy từ CDN nào phản hồi thành công đầu tiên.

```javascript
const image = await Promise.any([
    fetch("https://cdn1.com/banner.jpg"),
    fetch("https://cdn2.com/banner.jpg"),
    fetch("https://cdn3.com/banner.jpg")
]);

displayImage(image);
```

- Tại sao dùng `.any()`?

```text
CDN1 ✗
CDN2 ✗
CDN3 ✓

→ Lấy CDN3
```

Nếu dùng `.race()`:

```text
CDN1 reject sau 100ms
CDN3 resolve sau 200ms
```

thì `.race()` sẽ fail ngay.

`.any()` sẽ bỏ qua lỗi và tiếp tục chờ CDN thành công.
