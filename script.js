document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const todoListSection = document.getElementById('todolist-section');
    const loginSection = document.getElementById('login-section');
    const logoutButton = document.getElementById('logout');
    const loadTodosButton = document.getElementById('load-todos');
    const todoTable = document.getElementById('todo-table');
    const todoTableBody = todoTable.querySelector('tbody');
    const message = document.getElementById('message');

    let taskCompletionCount = 0;

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === '12345') {
            loginSection.style.display = 'none';
            todoListSection.style.display = 'block';
        } else {
            errorMessage.textContent = 'Invalid username or password!';
        }
    });

    logoutButton.addEventListener('click', function () {
        loginSection.style.display = 'block';
        todoListSection.style.display = 'none';
        errorMessage.textContent = '';
        loginForm.reset();
        todoTable.style.display = 'none';
        todoTableBody.innerHTML = '';
        message.textContent = '';
        taskCompletionCount = 0;
    });

    loadTodosButton.addEventListener('click', function () {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(todos => {
                displayTodos(todos);
            })
            .catch(error => console.error('Error fetching todos:', error));
    });

    function displayTodos(todos) {
        todoTableBody.innerHTML = ''; 
        todos.slice(0, 20).forEach(todo => { 
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = todo.id;

            const titleCell = document.createElement('td');
            titleCell.textContent = todo.title;

            const statusCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.disabled = todo.completed;

            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    taskCompletionCount++;
                } else {
                    taskCompletionCount--;
                }

                if (taskCompletionCount === 5) {
                    displayMessage('Congrats, you have completed 5 tasks!');
                }
            });

            statusCell.appendChild(checkbox);
            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(statusCell);
            todoTableBody.appendChild(row);
        });

        todoTable.style.display = 'table';
    }

function displayMessage(msg) {
    const message = document.getElementById('message');
    message.textContent = msg;
    message.classList.add('show'); 
    
    return new Promise((resolve) => {
        setTimeout(() => {
            message.classList.remove('show'); 
            resolve();
        }, 3000); 
    });
}


   
});
