let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function clearAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      currentFilter === "completed" && !task.completed ||
      currentFilter === "pending" && task.completed
    ) return;

    const li = document.createElement("li");

    // 📝 Task Text
    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    // ✅ Tick button - After text now
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "✓";
    checkBtn.classList.add("action-btn");
    if (!task.completed) {
      checkBtn.onclick = () => toggleComplete(index);
    } else {
      checkBtn.disabled = true;
      checkBtn.style.color = "green";
    }
    li.appendChild(checkBtn);

    // ✏️ Edit (only if task is not completed)
    if (!task.completed) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "✎";
      editBtn.classList.add("action-btn");
      editBtn.onclick = () => editTask(index);
      li.appendChild(editBtn);
    }

    // ❌ Delete
    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.classList.add("action-btn", "cross-btn");
    delBtn.onclick = () => deleteTask(index);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}


// 🌙 Theme toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const themeIcon = document.getElementById("toggleTheme");
  themeIcon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

renderTasks();
