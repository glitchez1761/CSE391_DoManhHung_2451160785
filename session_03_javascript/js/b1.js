// 1. CHỌN PHẦN TỬ DOM
const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const notification = document.getElementById('notification');
const modalTitle = document.getElementById('modalTitle');
// Mảng dữ liệu demo mặc định (trùng khớp với HTML) để phục vụ các chức năng CRUD ban đầu
const defaultStudents = [
    { id: "2451160001", name: "Nguyễn Văn An", dob: "2005-01-15", className: "66HTTT2", mark: "8.5", email: "an.nguyen@gmail.com" },
    { id: "2451160002", name: "Trần Thị Bình", dob: "2005-05-22", className: "66HTTT2", mark: "7.2", email: "binh.tran@gmail.com" },
    { id: "2451160003", name: "Lê Hoàng Chiến", dob: "2005-11-10", className: "66HTTT2", mark: "9.0", email: "chien.le@gmail.com" },
    { id: "2451160004", name: "Phạm Minh Đức", dob: "2005-08-12", className: "66HTTT2", mark: "6.8", email: "duc.pham@gmail.com" },
    { id: "2451160005", name: "Vũ Thị Dung", dob: "2005-03-30", className: "66HTTT2", mark: "7.9", email: "dung.vu@gmail.com" }
];

// Nếu trong localStorage chưa có dữ liệu, lấy mảng defaultStudents làm dữ liệu gốc
let students = JSON.parse(localStorage.getItem('students')) || defaultStudents;

// Nếu là lần đầu tiên chạy ứng dụng (chưa có key 'students' trong localStorage), lưu luôn mảng demo vào storage
if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(students));
}

// Phần tử thống kê
const avgScoreEl = document.getElementById('avgScore');
const totalStudentsEl = document.getElementById('totalStudents');

// 2. CÁC HÀM XỬ LÝ CHÍNH
// Hàm hiển thị danh sách sinh viên ra bảng
function renderStudents() {
    studentTableBody.innerHTML = ''; // Xóa nội dung cũ

    if (students.length === 0) {
        studentTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có dữ liệu sinh viên</td></tr>';
    } else {
        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.className}</td>
                <td>${student.mark}</td>
                <td>${student.email}</td>
                <td>
                    <button class="btn btn-warning btn-edit" data-index="${index}">Sửa</button>
                    <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
                </td>
            `;
            studentTableBody.appendChild(tr);
        });
    }
    updateStatistics();
}

// Hàm lưu dữ liệu
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Hàm cập nhật thống kê
function updateStatistics() {
    const total = students.length;
    totalStudentsEl.innerText = total;

    if (total === 0) {
        avgScoreEl.innerText = '0.0';
        return;
    }

    const sum = students.reduce((acc, curr) => acc + parseFloat(curr.mark), 0);
    const avg = (sum / total).toFixed(2);
    avgScoreEl.innerText = avg;
}

// Hàm hiển thị thông báo
function showMessage(msg) {
    notification.innerText = msg;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000); // Ẩn sau 3 giây
}

// Hàm reset form
function resetForm() {
    studentForm.reset();
    document.getElementById('editIndex').value = -1;
    modalTitle.innerText = "Thêm Sinh viên";

    // Clear lỗi validation
    document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
}

// Hàm Validate dữ liệu cơ bản
function validateData(id, name, dob, className, mark, email) {
    let isValid = true;

    if (!id.trim() || id.length < 5) {
        document.getElementById('errId').innerText = "Mã SV không hợp lệ.";
        isValid = false;
    } else {
        document.getElementById('errId').innerText = "";
    }

    if (parseFloat(mark) < 0 || parseFloat(mark) > 10) {
        document.getElementById('errMark').innerText = "Điểm phải từ 0 đến 10.";
        isValid = false;
    } else {
        document.getElementById('errMark').innerText = "";
    }

    return isValid;
}

// 3. GẮN SỰ KIỆN (EVENT LISTENERS)

// Mở form thêm mới
btnOpenAddForm.addEventListener('click', () => {
    resetForm();
    studentModal.classList.remove('hidden');
});

// Đóng form
btnCloseForm.addEventListener('click', () => {
    studentModal.classList.add('hidden');
});

// Submit form (Thêm hoặc Sửa)
studentForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn load lại trang

    const id = document.getElementById('studentId').value;
    const name = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('className').value;
    const mark = document.getElementById('avgMark').value;
    const email = document.getElementById('email').value;
    const editIndex = document.getElementById('editIndex').value;

    if (!validateData(id, name, dob, className, mark, email)) return;

    const studentData = { id, name, dob, className, mark, email };

    if (editIndex === "-1") {
        // Chế độ thêm mới
        students.push(studentData);
        showMessage("Thêm sinh viên thành công!");
    } else {
        // Chế độ sửa
        students[editIndex] = studentData;
        showMessage("Cập nhật sinh viên thành công!");
    }

    saveStudents();
    renderStudents();
    studentModal.classList.add('hidden');
});

// Xử lý sự kiện Sửa và Xóa sử dụng Event Delegation trên thân bảng
studentTableBody.addEventListener('click', function (e) {
    // Bấm nút Xóa
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
            students.splice(index, 1);
            saveStudents();
            renderStudents();
            showMessage("Đã xóa sinh viên!");
        }
    }

    // Bấm nút Sửa
    if (e.target.classList.contains('btn-edit')) {
        const index = e.target.getAttribute('data-index');
        const student = students[index];

        // Đưa dữ liệu lên form
        document.getElementById('studentId').value = student.id;
        document.getElementById('fullName').value = student.name;
        document.getElementById('dob').value = student.dob;
        document.getElementById('className').value = student.className;
        document.getElementById('avgMark').value = student.mark;
        document.getElementById('email').value = student.email;

        // Chuyển trạng thái form
        document.getElementById('editIndex').value = index;
        modalTitle.innerText = "Sửa thông tin Sinh viên";
        studentModal.classList.remove('hidden');
    }
});

// 4. CHẠY LẦN ĐẦU KHI TẢI TRANG
renderStudents();