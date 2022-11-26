console.log("Script started");
const addToDoBtn = document.getElementById("add-to-do-btn");
// console.log(addToDoBtn);
const toDoInput = document.getElementsByTagName("input")[0];
//console.log(toDoInput);
const toDoContainer = document.querySelector('#to-do-container');
const toDoNonChecked = document.querySelector('#non-checked');
const toDoChecked = document.querySelector('#checked');

toDoInput.focus();

function preserveToDos() {
  //console.log("preserveToDos");
  const allToDos = Array.from(
    document.querySelectorAll(".to-do-instance p")
  ).map((el) => el.textContent);
  window.sessionStorage.setItem("todos", allToDos);
}

function loadToDos() {
  const loadedToDos = window.sessionStorage.getItem("todos").split( ',');
  if (loadedToDos && loadedToDos.length > 0) {
    //console.log(loadedToDos);
    loadedToDos.forEach((toDo) => {
      toDoContainer.appendChild(createToDoElement(toDo));
    });
  }
}



function createToDoElement(text) {
  //1. Create new HTML div element
  const divElement = document.createElement('div');
  divElement.classList.add('to-do-instance');
  //console.log(divElement);

  //2. Create new HTML p element
  const pElement = document.createElement('p');
  pElement.textContent = text;
  //console.log(pElement);
  //3. Create new button - delete ToDo
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('xBtn')
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => divElement.remove());
  divElement.remove();
  preserveToDos();

  //4. Append p and button to the div element
  divElement.appendChild(pElement);
  divElement.appendChild(deleteBtn);
  //5. Return div element
  //toDoContainer.appendChild(divElement);
  //console.log(divElement);
  return divElement;
}

function appendNewToDo(toDo) {
  const newToDoElement = createToDoElement(toDo);
  toDoContainer.appendChild(newToDoElement);
  preserveToDos();
}

function addToDo() {
  const validText = toDoInput.value.trim();
 // console.log("clicked");
  //1. chek if inpuy has value
  if(validText) {
    //console.log(validText);
      //2. If yes, create new ToDo
      //2.1 Check if input is valid
      const newToDo = createToDoElement(validText);
      toDoContainer.appendChild(newToDo);
      toDoInput.value = "";
      preserveToDos();
      //2.2 Create toDo
      //2.3 Clear the field
  } else {
    alert("Please, type in some text");
  }
  //2. If yes, create new ToDo

}

addToDoBtn.addEventListener("click",addToDo);
toDoInput.addEventListener("keydown", (event)=> {
  if(event.key == "Enter") addToDo();
});

// 1. Get butto from HTML documnets
//2. Handle click button event
// - create new to do
// - append todo

function remove(toDo) {
  toDo.remove();
  preserveToDos();
}


loadToDos();


