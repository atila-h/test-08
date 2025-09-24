document.addEventListener('DOMContentLoaded', function () {
    // Initialize the app
    initApp();

    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', function (x) {
        if (x.key === 'Enter') {
            addTask();
        }
    });
});

function initApp() {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[today.getDay()];
    const monthName = months[today.getMonth()];
    const day = today.getDate();

    document.getElementById('dateContainer').textContent = `${dayName}, ${monthName} ${day}`;

    // week days
    generateWeekDays(today);

    // Load task localStorage
    loadTasks();
}

function generateWeekDays(today) {
    const weekDaysContainer = document.getElementById('weekDays');
    weekDaysContainer.innerHTML = '';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - today.getDay() + i);

        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        if (i === today.getDay()) {
            dayElement.classList.add('active');
        }

        dayElement.innerHTML = `
                    <div class="day-name">${days[date.getDay()]}</div>
                    <div class="day-number">${date.getDate()}</div>
                `;

        weekDaysContainer.appendChild(dayElement);
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        date: new Date().toISOString()
    };

    // Save task
    saveTask(task);

    // Add task to UI
    addTaskToUI(task);

    // Clear input
    taskInput.value = '';
    taskInput.focus();

    // Update stats
    updateStats();
}

function addTaskToUI(task) {
    const tasksContainer = document.getElementById('tasksContainer');

    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    taskElement.dataset.id = task.id;

  
    taskElement.innerHTML = `
                <input type="checkbox" class="form-check-input" ${task.completed ? 'checked' : ''}>
                <div class="task-text">${task.text}</div>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-danger delete-btn">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;

    tasksContainer.appendChild(taskElement);

    // Add event listeners
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function () {
        toggleTaskCompleted(task.id, this.checked);
    });

    const deleteBtn = taskElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteTask(task.id);
    });
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function loadTasks() {
    const tasks = getTasks();
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
        addTaskToUI(task);
    });

    updateStats();
}

function toggleTaskCompleted(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = completed;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskElement = document.querySelector(`.task-item[data-id="${id}"]`);
   
    updateStats();
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskElement = document.querySelector(`.task-item[data-id="${id}"]`);
    taskElement.remove();

    updateStats();
}

function updateStats() {
    const tasks = getTasks();
}
function newTaskAdd() {
    document.querySelector('.task-input').classList.toggle('hidden');
    document.querySelector('#tasksContainer').classList.toggle('hidden');
    document.querySelector('.task-item').classList.toggle('hidden');
    

}
