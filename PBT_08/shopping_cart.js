function createCart() {
    let items = [];
    let discount = 0;

    function formatMoney(num) {
        return num.toLocaleString("vi-VN");
    }

    function pad(str, length, align = "left") {
        str = String(str);
        if (align === "right") return str.padStart(length, " ");
        return str.padEnd(length, " ");
    }

    return {
        addItem(product, quantity = 1) {
            const found = items.find(i => i.id === product.id);
            if (found) {
                found.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },

        getTotal() {
            let total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
            return Math.max(0, total - discount);
        },

        applyDiscount(code) {
            const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

            if (code === "SALE10") discount = total * 0.1;
            else if (code === "SALE20") discount = total * 0.2;
            else if (code === "FREESHIP") discount = 30000;
            else discount = 0;
        },

        getItemCount() {
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },

        clearCart() {
            items = [];
            discount = 0;
        },

        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng trống");
                return;
            }

            const widths = {
                index: 3,
                name: 15,
                qty: 3,
                price: 12,
                total: 13
            };

            const line = "─".repeat(60);

            console.log("┌" + line + "┐");

            console.log(
                "│ " +
                pad("#", widths.index) + " │ " +
                pad("Sản phẩm", widths.name) + " │ " +
                pad("SL", widths.qty, "right") + " │ " +
                pad("Đơn giá", widths.price, "right") + " │ " +
                pad("Tổng", widths.total, "right") +
                " │"
            );

            items.forEach((item, i) => {
                const total = item.price * item.quantity;

                console.log(
                    "│ " +
                    pad(i + 1, widths.index) + " │ " +
                    pad(item.name, widths.name) + " │ " +
                    pad(item.quantity, widths.qty, "right") + " │ " +
                    pad(formatMoney(item.price), widths.price, "right") + " │ " +
                    pad(formatMoney(total), widths.total, "right") +
                    " │"
                );
            });

            console.log("├" + line + "┤");

            console.log(
                "│ " +
                pad("Tổng cộng:", 45) +
                pad(formatMoney(this.getTotal()) + "đ", 13, "right") +
                " │"
            );

            console.log("└" + line + "┘");
        }
    };
}


// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());