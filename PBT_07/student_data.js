const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let gioi = 0, kha = 0, tb = 0, yeu = 0;

let maxStudent = null;
let minStudent = null;

let sumMath = 0, sumPhysics = 0, sumCS = 0;

let sumMale = 0, countMale = 0;
let sumFemale = 0, countFemale = 0;

console.log("| STT | Tên    | TB   | Xếp loại   |");
console.log("|-----|--------|------|------------|");

for (let i = 0; i < students.length; i++) {
    let s = students[i];

    let avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
    avg = Number(avg.toFixed(1)); // làm tròn 1 chữ số

    let rank = "";
    if (avg >= 8.0) {
        rank = "Giỏi";
        gioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        kha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        tb++;
    } else {
        rank = "Yếu";
        yeu++;
    }

    let colStt = String(i + 1).padEnd(3);
    let colName = s.name.padEnd(6);
    let colAvg = avg.toFixed(1).padEnd(4);
    let colRank = rank.padEnd(10);

    console.log(`| ${colStt} | ${colName} | ${colAvg} | ${colRank} |`);

    if (maxStudent === null || avg > maxStudent.avg) {
        maxStudent = { name: s.name, avg: avg };
    }

    if (minStudent === null || avg < minStudent.avg) {
        minStudent = { name: s.name, avg: avg };
    }

    sumMath += s.math;
    sumPhysics += s.physics;
    sumCS += s.cs;

    if (s.gender === "M") {
        sumMale += avg;
        countMale++;
    } else {
        sumFemale += avg;
        countFemale++;
    }
}

console.log("\n--- Thống kê xếp loại ---");
console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", tb);
console.log("Yếu:", yeu);

console.log("\n--- Sinh viên điểm cao nhất ---");
console.log(maxStudent.name, "-", maxStudent.avg);

console.log("\n--- Sinh viên điểm thấp nhất ---");
console.log(minStudent.name, "-", minStudent.avg);

console.log("\n--- Điểm TB từng môn ---");
console.log("Math:", (sumMath / students.length).toFixed(1));
console.log("Physics:", (sumPhysics / students.length).toFixed(1));
console.log("CS:", (sumCS / students.length).toFixed(1));

console.log("\n--- TB theo giới tính ---");
console.log("Nam:", countMale ? (sumMale / countMale).toFixed(1) : 0);
console.log("Nữ:", countFemale ? (sumFemale / countFemale).toFixed(1) : 0);