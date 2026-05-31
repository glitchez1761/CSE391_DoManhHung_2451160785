/**
 * @param {Array}   order
 * @param {boolean} hasTip
 * @param {Date}    date
 */
function tinhHoaDon(order, hasTip = false, date = new Date()) {
    const WIDTH = 44;

    const pad = (str, n) => String(str).padEnd(n);
    const rpad = (str, n) => String(str).padStart(n);
    const line = (char = "═") => `╠${char.repeat(WIDTH)}╣`;

    const rowCenter = (text) => {
        const leftSpace = Math.floor((WIDTH - text.length) / 2);
        const rightSpace = WIDTH - text.length - leftSpace;
        return `║${" ".repeat(leftSpace)}${text}${" ".repeat(rightSpace)}║`;
    };

    const rowBetween = (left, right) => {
        const spaceCount = WIDTH - left.length - right.length - 2;
        const spaces = spaceCount > 0 ? " ".repeat(spaceCount) : " ";
        return `║ ${left}${spaces}${right} ║`;
    };

    const fmtMoney = (val) => {
        if (val >= 1000000) return (val / 1000000).toFixed(3).replace(".", ".") + "tr";
        return (val / 1000).toFixed(0) + "k";
    };
    const fmtMoneyFull = (val) => val.toLocaleString("vi-VN") + "đ";

    const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const dateStr = `${days[date.getDay()]}, ${d}/${m}/${y} ${h}:${min}`;

    let subtotal = 0;
    order.forEach(item => subtotal += item.price * item.qty);

    let discountPercent = 0;
    if (subtotal > 1000000) {
        discountPercent += 15;
    } else if (subtotal > 500000) {
        discountPercent += 10;
    }

    const isWednesday = date.getDay() === 3;
    if (isWednesday) discountPercent += 5;

    const discountAmount = (subtotal * discountPercent) / 100;
    const afterDiscount = subtotal - discountAmount;

    const vatAmount = afterDiscount * 0.08;
    const tipAmount = hasTip ? afterDiscount * 0.05 : 0;
    const finalTotal = afterDiscount + vatAmount + tipAmount;

    const output = [];

    output.push(`╔${"═".repeat(WIDTH)}╗`);
    output.push(rowCenter("HÓA ĐƠN NHÀ HÀNG PHỐ XƯA"));
    output.push(rowCenter(dateStr));
    output.push(line());

    const header = ` ${pad("STT", 3)} ${pad("Tên món", 18)} ${pad("SL", 3)} ${rpad("Đơn giá", 7)} ${rpad("T.Tiền", 8)}`;
    output.push(`║${header}║`);
    output.push(line());

    order.forEach((item, index) => {
        const stt = pad(`${index + 1}.`, 3);
        const name = pad(item.name.length > 18 ? item.name.substring(0, 15) + "..." : item.name, 18);
        const qty = pad(`x${item.qty}`, 3);
        const price = rpad(fmtMoney(item.price), 7);
        const total = rpad(fmtMoney(item.price * item.qty), 8);

        const rowStr = ` ${stt} ${name} ${qty} ${price} ${total}`;
        output.push(`║${rowStr}║`);
    });

    output.push(line());

    output.push(rowBetween("Tổng cộng:", rpad(fmtMoneyFull(subtotal), 12)));
    output.push(rowBetween(`Giảm giá (${discountPercent}%):`, rpad(fmtMoneyFull(discountAmount), 12)));

    if (isWednesday) {
        output.push(rowBetween(" ↳ Khuyến mãi thứ 4 (5%) đã áp dụng", ""));
    }

    output.push(rowBetween("VAT (8%):", rpad(fmtMoneyFull(vatAmount), 12)));

    if (hasTip) {
        output.push(rowBetween("Tip (5%):", rpad(fmtMoneyFull(tipAmount), 12)));
    }

    output.push(line());
    output.push(rowBetween("★ THANH TOÁN:", rpad(fmtMoneyFull(finalTotal), 12)));
    output.push(`╚${"═".repeat(WIDTH)}╝`);

    return output.join("\n");
}

function formatDate(date) {
    const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${days[date.getDay()]}, ${d}/${m}/${y} ${h}:${min}`;
}

console.log("\n📋 HÓA ĐƠN 1 — Tổng nhỏ, không giảm giá\n");
const bill1 = tinhHoaDon([
    { name: "Phở bò", price: 65000, qty: 2 },
    { name: "Trà đá", price: 5000, qty: 3 },
    { name: "Bún chả", price: 55000, qty: 1 },
]);
console.log(bill1);

console.log("\n📋 HÓA ĐƠN 2 — Tổng > 500k, có tip, ngày thứ Tư\n");
// Giả lập ngày thứ 4 để test
const wednesday = new Date("2024-01-03");  // 3/1/2024 là thứ Tư
const bill2 = tinhHoaDon([
    { name: "Bò lúc lắc", price: 185000, qty: 2 },
    { name: "Lẩu hải sản", price: 320000, qty: 1 },
    { name: "Bia Tiger", price: 45000, qty: 4 },
    { name: "Tráng miệng", price: 35000, qty: 2 },
], true, wednesday);
console.log(bill2);

console.log("\n📋 HÓA ĐƠN 3 — Tổng > 1 triệu (giảm 15%)\n");
const bill3 = tinhHoaDon([
    { name: "Bít tết", price: 280000, qty: 3 },
    { name: "Cơm chiên XO", price: 120000, qty: 2 },
    { name: "Súp cua", price: 85000, qty: 3 },
    { name: "Sinh tố", price: 65000, qty: 4 },
    { name: "Nước ngọt", price: 30000, qty: 5 },
], true);
console.log(bill3);