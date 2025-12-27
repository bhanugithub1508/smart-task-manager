// Smart Task Manager - JavaScript (Best Practice)

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

// ---------------------------
// Add Task
// ---------------------------
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({ text, completed: false });
    saveTasks();
    taskInput.value = "";
    renderTasks(tasks);
});

// ---------------------------
// Render Tasks
// ---------------------------
function renderTasks(taskArray) {
    taskList.innerHTML = "";

    taskArray.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");

        span.addEventListener("click", () => toggleTask(index));

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.addEventListener("click", () => deleteTask(index));

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

// ---------------------------
// Toggle Completion
// ---------------------------
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks(tasks);
}

// ---------------------------
// Delete Task
// ---------------------------
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks(tasks);
}

// ---------------------------
// Filter Tasks
// ---------------------------
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        if (filter === "completed") {
            renderTasks(tasks.filter(t => t.completed));
        } 
        else if (filter === "pending") {
            renderTasks(tasks.filter(t => !t.completed));
        } 
        else {
            renderTasks(tasks);
        }
    });
});

// ---------------------------
// Save to LocalStorage
// ---------------------------
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial Load
renderTasks(tasks);
