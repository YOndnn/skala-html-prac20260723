const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const STORAGE_KEY = 'skala-todolist-items';

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;

        const text = document.createElement('span');
        text.textContent = todo.text;
        if (todo.done) {
            text.style.textDecoration = 'line-through';
        }

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = '삭제';

        checkbox.addEventListener('change', () => {
            todo.done = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        deleteButton.addEventListener('click', () => {
            todos = todos.filter((item) => item.id !== todo.id);
            saveTodos();
            renderTodos();
        });

        li.append(checkbox, text, deleteButton);
        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = todoInput.value.trim();
    if (!text) {
        return;
    }

    todos.unshift({
        id: Date.now(),
        text,
        done: false,
    });

    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
});

renderTodos();
