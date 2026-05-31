console.log("=".repeat(50));
console.log("ĐOẠN 1 — var hoisting");
console.log("=".repeat(50));

console.log(x);
var x = 5;
console.log("Sau gán, x =", x);

console.log();
console.log("=".repeat(50));
console.log("ĐOẠN 2 — let TDZ (Temporal Dead Zone)");
console.log("=".repeat(50));

try {
    console.log(y);
    let y = 10;
} catch (e) {
    console.log("LỖI đúng như dự đoán:", e.message);
}

console.log();
console.log("=".repeat(50));
console.log("ĐOẠN 3 — const không thể gán lại");
console.log("=".repeat(50));

try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (e) {
    console.log("LỖI đúng như dự đoán:", e.message);
}

console.log();
console.log("=".repeat(50));
console.log("ĐOẠN 4 — const với array: tham chiếu cố định, nội dung thay đổi được");
console.log("=".repeat(50));

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

try {
    arr = [5, 6];
} catch (e) {
    console.log("Gán lại arr → LỖI:", e.message);
}

console.log();
console.log("=".repeat(50));
console.log("ĐOẠN 5 — let có block scope");
console.log("=".repeat(50));

let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);

console.log();
console.log("=".repeat(50));
console.log("BONUS — Minh họa var KHÔNG có block scope (khác let)");
console.log("=".repeat(50));

var b = 1;
{
    var b = 2;
    console.log("Trong block (var):", b);
}
console.log("Ngoài block (var):", b);