const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodo");
const selectAllButton = document.getElementById("selectAll");
const deleteSelectedButton = document.getElementById("deleteSelected");

window.onload = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todo) => {
      createLi(todo.id, todo.text);
    });
  }
};

function generateRandomId() {
  return Math.floor(Math.random() * 100000);
}

function checkIfUsed(id) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    return 0;
  }
  todos.forEach((todo) => {
    if (id == todo.id) {
      return 1;
    } else {
      return 0;
    }
  });
}

function createLi(id, text) {
  const li = document.createElement("li");
  li.innerHTML = `
             <input type="checkbox">
             <p class="text">${text}</p>
             <button class="delete">Sil</button>
             <button class="edit">Düzenle</button>
         `;
  li.setAttribute("data-id", id);
  todoList.appendChild(li);
  li.querySelector(".edit").addEventListener("click", function () {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      if (todo.id == id) {
        const newText = prompt("Yeni metni giriniz", todo.text);
        if (newText.trim() !== "") {
          todo.text = newText;
          localStorage.setItem("todos", JSON.stringify(todos));
          li.querySelector("p.text").innerHTML = newText;
        }
      }
    });
  });
  li.querySelector(".delete").addEventListener("click", function () {
    const id = li.getAttribute("data-id");
    li.remove();
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo, i) => {
      if (todo.id == id) {
        todos.splice(i, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
  });
}

addTodoButton.addEventListener("click", function () {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todoInput.value;
  if (todoText.trim() !== "") {
    var randomId = generateRandomId();
    while (1) {
      if (checkIfUsed(randomId)) {
        randomId = generateRandomId();
      } else {
        break;
      }
    }

    createLi(randomId, todoText);

    todoInput.value = "";
    todoObject = {
      id: randomId,
      text: todoText,
    };

    todos.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

deleteSelectedButton.addEventListener("click", function () {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const checkedTodos = document.querySelectorAll("li input:checked");
  checkedTodos.forEach((checkedTodo) => {
    checkedTodo.parentElement.remove();
    todos.forEach((todo, i) => {
      if (todo.id == checkedTodo.parentElement.getAttribute("data-id")) {
        todos.splice(i, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
  });
});

selectAllButton.addEventListener("click", function () {
  const allTodos = document.querySelectorAll("li input[type='checkbox']");
  const checkedTodos = document.querySelectorAll(
    "li input[type='checkbox']:checked"
  );

  if (checkedTodos.length < allTodos.length) {
    allTodos.forEach((allTodo) => {
      allTodo.checked = true;
    });
  } else {
    allTodos.forEach((allTodo) => {
      allTodo.checked = false;
    });
  }
});


const filterInput = document.getElementById("filterInput");

filterInput.addEventListener("input", function () {
  const searchText = filterInput.value.toLowerCase();
  const todos = document.querySelectorAll("li");

  todos.forEach((todo) => {
    const text = todo.querySelector(".text").textContent.toLowerCase();
    if (text.includes(searchText)) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
});
