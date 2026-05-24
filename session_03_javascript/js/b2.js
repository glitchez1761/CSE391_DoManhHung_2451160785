const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const notification = document.getElementById('notification');
const modalTitle = document.getElementById('modalTitle');

const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: #777;">Chưa có công việc nào.</p>';
    } else {
        tasks.forEach((task, index) => {
            const card = document.createElement('div');
            card.className = `task-card ${task.isCompleted ? 'completed' : ''}`;

            card.innerHTML = `
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p><strong>Mô tả:</strong> ${task.desc || 'Không có'}</p>
                    <p><strong>Hạn chót:</strong> ${task.dueDate}</p>
                    <p><strong>Ưu tiên:</strong> ${task.priority}</p>
                </div>
                <div class="task-actions">
                    <input type="checkbox" class="check-status" data-index="${index}" ${task.isCompleted ? 'checked' : ''}>
                    <button class="btn btn-warning btn-sm btn-edit" data-index="${index}">Sửa</button>
                    <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">Xóa</button>
                </div>
            `;
            taskList.appendChild(card);
        });
    }
    updateTaskSummary();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;
    const pending = total - completed;

    totalTasksEl.innerText = total;
    completedTasksEl.innerText = completed;
    pendingTasksEl.innerText = pending;
}

function showMessage(msg) {
    notification.innerText = msg;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 3000);
}

function resetForm() {
    taskForm.reset();
    document.getElementById('editIndex').value = -1;
    modalTitle.innerText = "Thêm Công việc";
}

btnOpenAddForm.addEventListener('click', () => {
    resetForm();
    taskModal.classList.remove('hidden');
});

btnCloseForm.addEventListener('click', () => {
    taskModal.classList.add('hidden');
});

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const editIndex = document.getElementById('editIndex').value;

    const taskData = {
        title,
        desc,
        dueDate,
        priority,
        isCompleted: false
    };

    if (editIndex === "-1") {
        tasks.push(taskData);
        showMessage("Thêm công việc thành công!");
    } else {
        taskData.isCompleted = tasks[editIndex].isCompleted;
        tasks[editIndex] = taskData;
        showMessage("Cập nhật công việc thành công!");
    }

    saveTasks();
    renderTasks();
    taskModal.classList.add('hidden');
});

taskList.addEventListener('click', function (e) {
    const index = e.target.getAttribute('data-index');
    if (index === null) return;

    if (e.target.classList.contains('btn-delete')) {
        if (confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            showMessage("Đã xóa công việc!");
        }
    }

    if (e.target.classList.contains('btn-edit')) {
        const task = tasks[index];
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDesc').value = task.desc;
        document.getElementById('dueDate').value = task.dueDate;
        document.getElementById('priority').value = task.priority;

        document.getElementById('editIndex').value = index;
        modalTitle.innerText = "Sửa Công việc";
        taskModal.classList.remove('hidden');
    }
});

taskList.addEventListener('change', function (e) {
    if (e.target.classList.contains('check-status')) {
        const index = e.target.getAttribute('data-index');
        // Đảo ngược trạng thái
        tasks[index].isCompleted = e.target.checked;
        saveTasks();
        renderTasks();
    }
});

// 4. CHẠY LẦN ĐẦU KHI TẢI TRANG
renderTasks();