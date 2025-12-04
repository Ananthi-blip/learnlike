const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to UI
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="editBtn">Edit</button>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <button class="deleteBtn">Delete</button>
      </div>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const editBtn = li.querySelector('.editBtn');
    editBtn.addEventListener('click', () => {
      taskInput.value = task.text;
      editIndex = index;
      addBtn.textContent = 'Update';
    });

    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Add or update task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return;

  if (editIndex !== null) {
    tasks[editIndex].text = text;
    editIndex = null;
    addBtn.textContent = 'Add';
  } else {
    tasks.push({ text, completed: false });
  }

  taskInput.value = '';
  saveTasks();
  renderTasks();
});

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Initial render
renderTasks();
