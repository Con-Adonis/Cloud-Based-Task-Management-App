let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const filterImportant = document.getElementById('filter-important');
const filterMyDay = document.getElementById('filter-myday');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  const today = new Date().toISOString().split('T')[0];

  tasks.forEach((task, index) => {
    if (filterImportant.checked && task.priority !== 'High') return;
    if (filterMyDay.checked && task.dueDate !== today) return;

    const li = document.createElement('li');
    li.className = `task-item ${task.priority.toLowerCase()}`;
    li.innerHTML = `
      <strong>${task.title}</strong> - ${task.description}<br/>
      Due: ${task.dueDate || 'No due date'} | Assigned to: ${task.assignedTo || 'Unassigned'}<br/>
      <div class="task-actions">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-desc').value,
    dueDate: document.getElementById('task-due').value,
    assignedTo: document.getElementById('task-person').value,
    priority: document.getElementById('task-priority').value || 'Low',
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskForm.reset();
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-due').value = task.dueDate;
  document.getElementById('task-person').value = task.assignedTo;
  document.getElementById('task-priority').value = task.priority;
  deleteTask(index);
}

filterImportant.addEventListener('change', renderTasks);
filterMyDay.addEventListener('change', renderTasks);

renderTasks();
