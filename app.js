const form = document.querySelector("#todoAddForm");
const input = document.querySelector("#form");
const todoList = document.querySelector(".list-group");
const FirstcardBody = document.querySelector(".card-body");
const SecondcardBody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clearButton");
const filterInput = document.querySelector("#form2");

let todos = [];

runEvents();

function runEvents() { 
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    SecondcardBody.addEventListener("click", removeTodoAtUI);
    clear.addEventListener("click", removeAll);
    filterInput.addEventListener("keyup", filter);
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if (todoListesi.length > 0) {
        todoListesi.forEach(function(todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display: flex !important");
            } else {
                todo.setAttribute("style", "display: none !important");
            }
        });
    } else {
        showAlert("warning", "Filtreleme yapmak için en az bir todo olmalıdır!");
    }
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo); 
    });
}

function addTodo(e) { 
    const inputText = input.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lütfen bir değer giriniz!");
    } else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo Eklendi.");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa-solid fa-xmark";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    input.value = "";
} 

function removeTodoAtUI(e) {
    if (e.target.classList.contains("fa-xmark") || e.target.classList.contains("delete-item")) { 
        const todo = e.target.closest("li");
        const todoText = todo.firstChild.textContent.trim();
        todo.remove();
        
        removeTodoAtStorage(todoText);
        showAlert("success", "Todo başarıyla silindi.");
    }
}

function removeTodoAtStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function(todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeAll() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(function(todo) {
            todo.remove();
        });

        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Tüm Todolar Silindi");
    } else {
        showAlert("warning", "Silmek için en az bir todo olmalıdır!");
    }
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = "alert alert-" + type + " mt-3 mb-0";
    div.textContent = message;

    FirstcardBody.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2200);
}