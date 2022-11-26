const STORAGE = "sessionStorage";
const TODOS_STORAGE_KEYS = "todos";

const addToDoBtn = document.getElementById("add-to-do-btn");
const toDoContainer = document.querySelector("#to-do-container");
const toDoInput = document.getElementsByTagName("input")[0];

let toDos = [];

function saveToDos() {
  window[STORAGE].setItem(TODOS_STORAGE_KEYS, JSON.stringify(toDos));
}

function loadToDos() {
  const storedToDos = JSON.parse(window[STORAGE].getItem(TODOS_STORAGE_KEYS));
  if (storedToDos) {
    toDos = storedToDos;
  }
}

function createToDoElement(todo) {
  const divElement = document.createElement("div");
  divElement.classList.add("to-do-instance");

  const pElement = document.createElement("p");
  pElement.textContent = todo.content;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => {
    deleteToDo(todo.content);
  });

  const divDate = document.createElement("div");
  divDate.classList.add("to-do-date");
  divDate.textContent = todo.date;

  divElement.appendChild(divDate);
  divElement.appendChild(pElement);
  divElement.appendChild(deleteBtn);

  return divElement;
}

function renderToDos() {
  toDoContainer.innerHTML = "";
  toDos.forEach((todo) => {
    const newToDoElement = createToDoElement(todo);
    toDoContainer.appendChild(newToDoElement);
  });
}

function addToDo() {
  const validText = toDoInput.value.trim();
  if (!validText) alert("Not good");

  const toDoObj = {
    content: validText,
    date: new Date(Date.now()).toLocaleDateString(),
    completed: false,
  };

  toDos.push(toDoObj);
  toDoInput.value = "";
  saveToDos();
  renderToDos();
}

function deleteToDo(todo) {
  toDos = toDos.filter((el) => el.content !== todo);
  saveToDos();
  loadToDos();
  renderToDos();
}

loadToDos();
renderToDos();

addToDoBtn.addEventListener("click", addToDo);