const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const tasksList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load event listeners

loadEventListeners();


function loadEventListeners() {
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
    if (taskInput.value === '') {
        alert('Add a Task');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    //     Append node to task
    li.appendChild(document.createTextNode(taskInput.value));
    //  Create delete link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //     Create the link inner HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //     Append li to the link
    li.appendChild(link);
    tasksList.appendChild(li);
    taskInput.value = '';
    e.preventDefault();

}

// Delete Task
function deleteTask(e) {
    //     console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        // Conform and Remove the task
        if (confirm('Clear Task:')) {
            e.target.parentElement.parentElement.remove();
        }

    }
}
// Clear all tasks
function clearTasks() {
    // Setting innerHTML to '' would work, but is slower than the while loo[]
    while (tasksList.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
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