// 1. Cuando clickeo el botón "Add", crear un nuevo todo
// 2. Mostrar ese todo en la lista
// 3. Cuando clickeo delete, borrar ese todo
// 4. Actualizar el contador (X de Y completados)
// 5. Los datos deben guardarse en localStorage

// 1. When I click the "Add" button, create a new todo item with the input text
// 2. Add that new todo to the list (display it on the page)
// 3. When I click the delete button, remove that specific todo from the list
// 4. Update the progress counter to show "X of Y completed"
// 5. Save all todos to localStorage so they persist when page refreshes
// 6. When checkbox is clicked, mark todo as complete/incomplete
// 7. Load todos from localStorage when the page loads

const addButton = document.querySelector(".add-btn");
const addInput = document.querySelector("#add-input");
const todoList = document.querySelector(".todo__container--body__list");
const progressDisplay = document.querySelector("#progress");

// add Todo
const addTodo = () => {
  const todoText = addInput.value;

  if (todoText.trim() === "") {
    alert("Please enter an item");
    return;
  }

  const newTodo = document.createElement("li");
  newTodo.innerHTML = `
    <input type="checkbox" id="todo-${Date.now()}">
    <label for="todo-${Date.now()}">${todoText}</label>
    <button class="delete-btn">×</button>
  `;

  todoList.appendChild(newTodo);
  addInput.value = "";
  updateProgress();
  saveTodos();
};

// delete Todo
const deleteTodo = (event) => {
  const deleteButton = event.target;
  const todoItem = deleteButton.parentElement;
  todoItem.remove();
  updateProgress();
  saveTodos();
};

// Update progress
const updateProgress = () => {
  const checked = document.querySelectorAll(
    'input[type="checkbox"]:checked',
  ).length;

  const total = document.querySelectorAll('input[type="checkbox"]').length;

  progressDisplay.textContent = `${checked} of ${total} completed`;
};

//save Todo
const saveTodos = () => {
  // Get all the todos from the page
  const todos = [];
  const todoItems = document.querySelectorAll(
    ".todo__container--body__list li",
  );

  // Loop through each todo
  todoItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const label = item.querySelector("label");

    // Create an object with the todo data
    const todoData = {
      id: checkbox.id,
      text: label.textContent,
      completed: checkbox.checked,
    };
    // Add it to the array
    todos.push(todoData);
  });

  // Save the array to localStorage as a string
  localStorage.setItem("todos", JSON.stringify(todos));
};

//load Todo
const loadTodos = () => {
  todoList.innerHTML = "";

  const saved = localStorage.getItem("todos");

  if (!saved) return;

  const todos = JSON.parse(saved);

  todos.forEach((todo) => {
    const newTodo = document.createElement("li");
    newTodo.innerHTML = `
      <input type="checkbox" id="${todo.id}">
      <label for="${todo.id}">${todo.text}</label>
      <button class="delete-btn">×</button>
    `;

    const checkbox = newTodo.querySelector('input[type="checkbox"]');

    if (todo.completed === true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    todoList.appendChild(newTodo);
  });

  updateProgress();
};

// Event Listeners
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(event);
  }
});
todoList.addEventListener("change", updateProgress);
todoList.addEventListener("change", saveTodos);

loadTodos();
