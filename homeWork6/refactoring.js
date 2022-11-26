const addToDoBtn = document.getElementById("add-to-do-btn");
// console.log(addToDoBtn);
const toDoInput = document.getElementsByTagName("input")[0];
//console.log(toDoInput);
const toDoContainer = document.querySelector('#to-do-container');
const toDoContainerChecked= document.querySelector('#to-do-container-checked');

let toDos = [];






function addToDo() {
    const validText = toDoInput.value.trim();
    // console.log("clicked");
    //1. chek if inpuy has value
    if (validText) {
        const newToDoObject = {
            text: validText,
            completed: false,
        };
        toDos.push(newToDoObject);
        renderToDos();
        toDoInput.value = "";
        // preserveToDos();
        //2.2 Create toDo
        //2.3 Clear the field
    } else {
        alert("Please, type in some text");
    }
    //2. If yes, create new ToDo

}


function renderToDos() {
    //clear toDoContaner
    toDoContainer.innerHTML = "";
    toDoContainerChecked.innerHTML = "";
    // create new element

    toDos.forEach((todo) => {
            const newToDoElement = createToDoElement(todo);
            console.log(todo); 
             if(todo.completed) {
                
                 toDoContainerChecked.appendChild(newToDoElement);
             } else toDoContainer.appendChild(newToDoElement);
        })
        //append to toDoCntainer
};

function createToDoElement(toDoObj) {
    // console.log(toDoObj);
    //1. Create new HTML div element
    const divElement = document.createElement('div');
    divElement.classList.add('to-do-instance');
    // //console.log(divElement);



    // //2. Create new HTML p element
    const pElement = document.createElement('p');
    pElement.textContent = toDoObj.text;
    // //console.log(pElement);
    // //3. Create new button - delete ToDo
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('xBtn')
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
        divElement.remove();
        toDos = toDos.filter((el) => el.text !== toDoObj.text);
    });

    divElement.remove();
    // create checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = toDoObj.completed;
    checkbox.addEventListener('click', () => {
        toDoObj.completed = !toDoObj.completed;
        renderToDos();
    });
    // preserveToDos();

    // //4. Append p and button to the div element
    divElement.appendChild(pElement);
    //checkbox
    divElement.appendChild(checkbox)
    divElement.appendChild(deleteBtn);
    // //5. Return div element
    // //toDoContainer.appendChild(divElement);
    // //console.log(divElement);
    return divElement;
}

addToDoBtn.addEventListener("click", addToDo);
toDoInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") addToDo();
});