const addBtn = document.querySelector("#add-btn");
const todoContainer = document.querySelector(".todo-container");
const todoTitle = document.querySelector("#todo-title");

// array of objects containing todo elements
let todos = [];
let currentTodoIndex = -1;

// function to return an object with the user entered title
const createNewTodo = (title) => {
  return {
    id: todos.length + 1,
    title: title,
    checked: false,
  };
};

window.addEventListener("beforeunload", (event) => {
  localStorage.setItem("todos", JSON.stringify(todos));
});

// function to fetch todos stored in localStorage, if any
const init = () => {
  const Todos = JSON.parse(localStorage.getItem("todos"));
  console.log(Todos);
  if (Todos.length) {
    todos = [...Todos];
    todos.forEach((todo) =>
      handleAddingTodos(todo.title, todo.id, todo.checked)
    );
  }
};
init();

// add todo
function handleAddingTodos(title = todoTitle.value, Id = 0, checked = false) {
  // if title has value same as add todo title then only create a new todo entry in array
  title === todoTitle.value && todos.push(createNewTodo(title));

  // create a new div container for the whole todo
  const newTodoContainer = document.createElement("div");

  // in this todo container create an input checkbox
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = checked;

  // adding event listener on checkbox
  checkBox.addEventListener("change", (event) =>
    toggleCheckBox(event, id.textContent)
  );

  // creating a hidden span for holding the value of the id
  const id = document.createElement("span");
  id.textContent = title === todoTitle.value ? todos.length : Id; // if it is a new todo entry then id = length -1, else id is read from already set todo entry
  id.style.display = "none";

  // create a span tag for the todo title
  const todoTitleDisplay = document.createElement("input");
  todoTitleDisplay.type = "text";
  // if new entry for todo then pick title from titleContainer else set title to the receiving value in parameters
  todoTitleDisplay.value =
    title === todoTitle.value ? todos[todos.length - 1].title : title;
  todoTitleDisplay.readOnly = true;

  // on blur event updating the title of the todo with updated title
  todoTitleDisplay.addEventListener("blur", (event) => {
    // finding the index of the current Todo inside the todos array
    currentTodoIndex = todos.findIndex(
      (todo) => Number(id.textContent) === todo.id
    );

    todos[currentTodoIndex].title = event.target.value;
    event.target.readOnly = true;
  });

  // edit button
  const editBtn = document.createElement("button");
  editBtn.style.margin = "0 5px";
  editBtn.textContent = "edit";
  editBtn.addEventListener("click", editHandler);

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  // adding event handler to delete button
  deleteBtn.addEventListener("click", (event) =>
    deleteHandler(event, id.textContent)
  );

  // appending checkboxz and the title isnide the todo- container
  newTodoContainer.appendChild(checkBox);
  newTodoContainer.appendChild(todoTitleDisplay);
  newTodoContainer.appendChild(editBtn);
  newTodoContainer.appendChild(deleteBtn);
  newTodoContainer.appendChild(id);

  // appending the todoContainer inside the Todo list container
  todoContainer.appendChild(newTodoContainer);

  // resetting the title input value after adding the todo
  todoTitle.value = "";
}

// delete todo
function deleteHandler(event, id) {
  const currentTodoContainer = event.target.parentNode;

  // removing the object from the todos array
  const updatedTodos = todos.filter((todo) => todo.id !== Number(id));
  todos = updatedTodos;

  // removing current todo from the UI
  todoContainer.removeChild(currentTodoContainer);
}

// edit todo title
function editHandler(event) {
  event.target.parentNode.children[1].readOnly = false;
  event.target.parentNode.children[1].focus();
}

// toggle checkbox
function toggleCheckBox(event, id) {
  // finding the index on todos array
  currentTodoIndex = todos.findIndex((todo) => todo.id === Number(id));

  todos[currentTodoIndex].checked = event.target.checked;
}

// event listener for add button
addBtn.addEventListener("click", () => handleAddingTodos());
