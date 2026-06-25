const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

let noted = localStorage.getItem("savedNotes");
let noteArray = noted===null?[]:JSON.parse(noted);


function render(){
    taskList.innerHTML = "";
    noteArray.forEach((e, i) =>{
        const box = document.createElement("div");
        box.id = "box";
        const checkBox = document.createElement("input");
        checkBox.id = "check";
        checkBox.type = "checkbox";
        const task1 = document.createElement("p");
        task1.id = "task1";
        task1.textContent = e.text;

        checkBox.checked = e.completed;

        task1.classList.toggle("open", checkBox.checked);

        checkBox.onclick = ()=>{
            e.completed = checkBox.checked;
            saveAndRender();
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.id = "deleteBtn";
        deleteBtn.textContent = "DELETE";
        deleteBtn.onclick = ()=>{
            noteArray.splice(i, 1);
            saveAndRender();
        }

        box.appendChild(checkBox);
        box.appendChild(task1);
        box.appendChild(deleteBtn);
        taskList.appendChild(box);
    });
}
function saveAndRender(){
    localStorage.setItem("savedNotes", JSON.stringify(noteArray));
    render();
}
function addTask(){
    let note = taskInput.value.trim();
    if(note===""){
        return;
    }
    noteArray.push({text: note, completed: false});
    saveAndRender();
    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e =>{
    if(e.key==="Enter"){
        addTask();
    }
});
render();