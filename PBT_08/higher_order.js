// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    }
}

const process = pipe(
    x => x * 2,        
    x => x + 10,       
    x => x.toString(), 
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    }
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); 
console.log(expensiveCalc(1000000)); // (Không in "Đang tính...")

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("a");
search("ap");
search("app"); // Chỉ dòng này được chạy sau 500ms

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let i = 1; i <= maxAttempts; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxAttempts) throw error;
            console.log(`Lỗi. Đang thử lại lần ${i}...`);
        }
    }
}