// Group To-Do List - Open Source Project

let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') return;
    
    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });
    
    input.value = '';
    renderTasks();
}
//Aliyu Ahmadu Babadoko
function toggleDarkMde(){
    document.body.classList.toggle('dark-mode');
}
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function clearAll() {
    if (confirm("Delete all tasks?")) {
        tasks = [];
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleComplete(${task.id})">${task.text}</span>
            <button onclick="deleteTask(${task.id})" style="background:#e74c3c; padding:5px 10px; font-size:14px;">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Load tasks from localStorage (bonus feature)
window.onload = () => {
    const savedTasks = localStorage.getItem('groupTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
};

// Save tasks automatically
setInterval(() => {
    localStorage.setItem('groupTasks', JSON.stringify(tasks));
}, 2000);
