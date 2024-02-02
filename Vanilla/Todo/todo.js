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

// add todo
function handleAddingTodos() {
  todos.push(createNewTodo(todoTitle.value));

  // create a new div container for the whole todo
  const newTodoContainer = document.createElement("div");

  // in this todo container create an input checkbox
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = todos[todos.length - 1].checked;

  // adding event listener on checkbox
  checkBox.addEventListener("change", (event) => {
    // finding the index on todos array
    currentTodoIndex = todos.findIndex(
      (todo) => todo.id === Number(id.textContent)
    );

    todos[currentTodoIndex].checked = event.target.checked;
  });

  // creating a hidden span for holding the value of the id
  const id = document.createElement("span");
  id.textContent = todos.length;
  id.style.display = "none";

  // create a span tag for the todo title
  const todoTitleDisplay = document.createElement("input");
  todoTitleDisplay.type = "text";
  todoTitleDisplay.value = todos[todos.length - 1].title;
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

  editBtn.addEventListener("click", (event) => {
    event.target.parentNode.children[1].readOnly = false;
    event.target.parentNode.children[1].focus();
  });

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";

  // adding event handler to delete button
  deleteBtn.addEventListener("click", (event) => {
    const currentTodoContainer = event.target.parentNode;

    // removing the object from the todos array
    const updatedTodos = todos.filter(
      (todo) => todo.id !== Number(id.textContent)
    );
    todos = updatedTodos;

    // removing current todo from the UI
    todoContainer.removeChild(currentTodoContainer);
  });

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

// event listener for add button
addBtn.addEventListener("click", handleAddingTodos);
