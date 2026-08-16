const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

let noted = localStorage.getItem("savedNotes");
let noteArray = noted === null ? [] : JSON.parse(noted);

function render() {
    taskList.innerHTML = "";
    
    noteArray.forEach((e, i) => {
        const box = document.createElement("div");
        box.id = "box";

        const checkBox = document.createElement("input");
        checkBox.id = "check";
        checkBox.type = "checkbox";
        checkBox.checked = e.completed;

        // Use an input field or paragraph depending on whether we are editing
        const task1 = document.createElement("p");
        task1.id = "task1";
        task1.textContent = e.text;
        task1.classList.toggle("open", checkBox.checked);

        // Make task editable on click
        task1.addEventListener("click", () => {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = e.text;
            editInput.id = "task1"; // keeping your ID for now

            // Function to save the edited text
            const saveEdit = () => {
                let updatedText = editInput.value.trim();
                if (updatedText !== "") {
                    e.text = updatedText;
                    saveAndRender();
                } else {
                    render(); // Revert if empty
                }
            };

            // Save on pressing Enter
            editInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    saveEdit();
                }
            });

            // Save when clicking outside the input box
            editInput.addEventListener("blur", saveEdit);

            // Replace the paragraph with the input box and focus it
            box.replaceChild(editInput, task1);
            editInput.focus();
        });

        checkBox.onclick = () => {
            e.completed = checkBox.checked;
            saveAndRender();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.id = "deleteBtn";
        deleteBtn.textContent = "DELETE";
        deleteBtn.onclick = () => {
            noteArray.splice(i, 1);
            saveAndRender();
        };

        box.appendChild(checkBox);
        box.appendChild(task1);
        box.appendChild(deleteBtn);
        taskList.appendChild(box);
    });
}

function saveAndRender() {
    localStorage.setItem("savedNotes", JSON.stringify(noteArray));
    render();
}

function addTask() {
    let note = taskInput.value.trim();
    if (note === "") {
        return;
    }
    noteArray.push({ text: note, completed: false });
    saveAndRender();
    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        addTask();
    }
});

render();