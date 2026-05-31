## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Function Declaration vs Expression vs Arrow
```javascript
// 1. Function Declaration
function tinhThueBaoHiem1(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue }; 
}

// 2. Function Expression
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
```
Giải thích về Hoisting: Ba cách này có sự khác biệt rõ rệt về Hoisting.
- Function Declaration: Được hoisting toàn bộ lên đầu scope, nghĩa là bạn có thể gọi hàm tinhThueBaoHiem1() ở các dòng code trước khi nó được định nghĩa.
- Function Expression & Arrow Function: Nếu được khai báo bằng const hoặc let, chúng sẽ nằm trong Vùng chết tạm thời (TDZ - Temporal Dead Zone). Bạn không thể gọi tinhThueBaoHiem2() hay tinhThueBaoHiem3() trước khi khởi tạo chúng, nếu không sẽ bị lỗi ReferenceError.
### Câu A2 — Scope & Closure
Đoạn 1 (Closure):
Output:
```text
1
2
3
2
2
```
Đoạn 2 (var vs let):
Output sau 200ms:
```text
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```
Giải thích: 
- var có phạm vi Function/Global Scope. Đến khi setTimeout chạy, vòng lặp đã chạy xong và biến i đã tăng lên 3.
- let có phạm vi Block Scope (Ngăn kéo bàn). Mỗi vòng lặp sẽ tạo ra một "ngăn kéo" độc lập chứa giá trị j riêng biệt tại thời điểm đó, nên nó in ra đúng 0, 1, 2.
### Câu A3 — Array Methods
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((acc, n) => acc + n, 0);

// 4. Tìm số đầu tiên > 7
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allOver0 = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const strArr = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse();
```
### Câu A4 — Object Destructuring & Spread
Destructuring:
- console.log(name, price, ram, color); → In ra: "iPhone 16" 25990000 8 "Titan".
- console.log(specs); → Lỗi ReferenceError: specs is not defined. Vì chúng ta đã trích xuất sâu (nested destructuring) vào ram và color, biến specs không được tạo ra.

Spread:
- console.log(updated.price); → In ra: 23990000 (Đã bị ghi đè).
- console.log(updated.sale); → In ra: true.
- console.log(product.price); → In ra: 25990000 (Mảng gốc không bị đổi do Spread tạo ra copy mới).

Spread Gotcha:
- console.log(product.specs.ram); → In ra: 16.
- Tại sao? Toán tử Spread ... chỉ thực hiện sao chép nông (Shallow Copy). Đối với các object lồng nhau (như specs), nó chỉ copy tham chiếu bộ nhớ. Sửa copy.specs cũng chính là sửa product.specs.
## PHẦN C — SUY LUẬN
### Câu C1 — Refactor Code
Viết lại bằng Arrow Function và Array Methods:
```javascript
const processOrders = (orders) => orders
    .filter(o => o.status === "completed" && o.total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```
### Câu C2 — Thiết kế API
```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) result.push(arr[i]);
        }
        return result;
    },
    reduce(arr, fn, initialValue) {
        let acc = initialValue !== undefined ? initialValue : arr[0];
        let startIndex = initialValue !== undefined ? 0 : 1;
        for (let i = startIndex; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};
```