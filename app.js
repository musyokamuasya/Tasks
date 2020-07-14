const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const tasksList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load event listeners

loadEventListeners();


function loadEventListeners() {
    // Load saved tasks after DOM Content Loaded
    document.addEventListener('DOMContentLoaded', getSavedTasks);
    // Submit form
    form.addEventListener('submit', addTask);

    //     Remove dynamic list
    tasksList.addEventListener('click', deleteTask);

    //     Clear Tasks
    clearButton.addEventListener('click', clearTasks);

    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    let taskValue = taskInput.value;
    if (taskValue === '') {
        alert('Add a Task');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    //     Append node to task

    li.appendChild(document.createTextNode(taskValue));
    //  Create delete link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //     Create the link inner HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //     Append li to the link
    li.appendChild(link);
    tasksList.appendChild(li);
    taskInput.value = '';
    persistTask(taskInput.value);
    e.preventDefault();
    // Persist to local storage

}

// Delete Task
function deleteTask(e) {
    //     console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        // Conform and Remove the task
        if (confirm('Clear Task:')) {
            e.target.parentElement.parentElement.remove();
            // Remove fro local storage as well
            removePersistedTask(e.target.parentElement.parentElement);
        }

    }
}
// Clear all tasks
function clearTasks() {
    // Setting innerHTML to '' would work, but is slower than the while loo[]
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
        clearAllFromStorage();
    }
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Persist task
function persistTask(task) {
    let tasks;
    // If there is no saved tasks, start an empty array of tasks
    if (localStorage.getItem('tasks') === 'null') {
        tasks = [];
    } else {
        // If there is saved tasks, get all of them
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Add the tasks to the task
    tasks.push(task);
    // Save the tasks with in the local storage as a string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Load saved tasks
function getSavedTasks() {
    let tasks;
    // If there is no saved tasks, start an empty array of tasks
    if (localStorage.getItem('tasks') === 'null') {
        tasks = [];
    } else {
        // If there is saved tasks, get all of them
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        let taskValue = task;
        const li = document.createElement('li');
        li.className = 'collection-item';
        //     Append node to task

        li.appendChild(document.createTextNode(taskValue));
        //  Create delete link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //     Create the link inner HTML
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //     Append li to the link
        li.appendChild(link);
        tasksList.appendChild(li);
    });
}

// Remove persisted task from storage
function removePersistedTask(taskItem) {
    let tasks;
    // If there is no saved tasks, start an empty array of tasks
    if (localStorage.getItem('tasks') === 'null') {
        tasks = [];
    } else {
        // If there is saved tasks, get all of them
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            // Splice add/removes item into the array
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks from local storage
function clearAllFromStorage() {
    localStorage.clear();
}