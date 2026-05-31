let todos = [];
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const itemsLeft = document.getElementById('itemsLeft');
const clearBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

function genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function persist() {
    localStorage.setItem('todos_app_v1', JSON.stringify(todos));
}

function loadState() {
    try {
        const raw = localStorage.getItem('todos_app_v1');
        todos = raw ? JSON.parse(raw) : [];
    } catch {
        todos = [];
    }
}

function createTodoEl(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.setAttribute('data-id', todo.id);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'todo-toggle';
    toggleBtn.setAttribute('data-action', 'toggle');
    toggleBtn.setAttribute('aria-label', todo.completed ? 'Đánh dấu chưa xong' : 'Đánh dấu xong');
    if (todo.completed) toggleBtn.textContent = '✓';

    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;
    textSpan.setAttribute('data-action', 'toggle');
    textSpan.setAttribute('title', 'Double-click để sửa');

    const delBtn = document.createElement('button');
    delBtn.className = 'todo-delete';
    delBtn.setAttribute('data-action', 'delete');
    delBtn.setAttribute('aria-label', 'Xóa todo');
    delBtn.textContent = '×';

    li.appendChild(toggleBtn);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

function render() {
    const visible = todos.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    });

    while (todoList.firstChild) todoList.removeChild(todoList.firstChild);

    const frag = document.createDocumentFragment();
    visible.forEach(todo => frag.appendChild(createTodoEl(todo)));
    todoList.appendChild(frag);

    const active = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${active} item${active !== 1 ? 's' : ''} left`;

    persist();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    todos.unshift({ id: genId(), text, completed: false });
    todoInput.value = '';
    render();
}

let clickTimer = null;

todoList.addEventListener('click', function (e) {
    const li = e.target.closest('[data-id]');
    if (!li) return;
    const id = li.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');

    if (action === 'delete') {
        todos = todos.filter(t => t.id !== id);
        render();
        return;
    }

    if (action === 'toggle') {
        const isText = e.target.classList.contains('todo-text');

        const doToggle = () => {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                render();
            }
        };

        if (isText) {
            clearTimeout(clickTimer);
            if (e.detail === 1) {
                clickTimer = setTimeout(doToggle, 150);
            }
        } else {
            doToggle();
        }
        return;
    }
});

todoList.addEventListener('dblclick', function (e) {
    clearTimeout(clickTimer);

    const textSpan = e.target.closest('.todo-text');
    if (!textSpan) return;

    const li = textSpan.closest('[data-id]');
    const id = li.getAttribute('data-id');
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    li.classList.add('editing');

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'todo-edit-input';
    editInput.value = todo.text;
    editInput.setAttribute('aria-label', 'Sửa todo');
    li.replaceChild(editInput, textSpan);
    editInput.focus();
    editInput.setSelectionRange(todo.text.length, todo.text.length);

    let committed = false;
    function commitEdit() {
        if (committed) return;
        committed = true;
        const newText = editInput.value.trim();
        if (newText) {
            todo.text = newText;
        } else {
            todos = todos.filter(t => t.id !== id);
        }
        render();
    }

    editInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') commitEdit();
        if (e.key === 'Escape') { committed = true; render(); }
    });
    editInput.addEventListener('blur', commitEdit);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        currentFilter = this.dataset.filter;
        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        render();
    });
});

todoInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });
addBtn.addEventListener('click', addTodo);

clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    render();
});

loadState();
render();