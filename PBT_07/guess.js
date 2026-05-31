function startGame() {
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 7;
    let guessedNumbers = [];

    while (attempts < maxAttempts) {
        let input = prompt("Nhập số từ 1 đến 100:");

        // Kiểm tra người dùng bấm cancel
        if (input === null) {
            alert("Bạn đã thoát game!");
            return;
        }

        let guess = Number(input);

        // Validate input
        if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng nhập số hợp lệ từ 1 đến 100!");
            continue;
        }

        // Kiểm tra trùng
        if (guessedNumbers.includes(guess)) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        guessedNumbers.push(guess);
        attempts++;

        if (guess === target) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return;
        } else if (guess < target) {
            alert("Cao hơn!");
        } else {
            alert("Thấp hơn!");
        }
    }

    // Thua cuộc
    alert(`Bạn đã hết lượt! Số đúng là: ${target}`);
}