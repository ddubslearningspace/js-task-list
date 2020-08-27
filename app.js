// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);

	// Add task event
	form.addEventListener('submit', addTask);

	// Remove task event
	taskList.addEventListener('click', removeTask);

	// Clear tasks event
	clearBtn.addEventListener('click', clearTasks);

	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

// Initialize task list
function initializeTasks() {
	let tasks;

	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	return tasks;
}

// Get tasks from localStorage
function getTasks() {
	let tasks = initializeTasks();

	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement('li');

		// Add a class and id
		li.className = 'collection-item';
		li.id = task.id;

		// Create checkbox and txt item
		li.innerHTML = `
			<label><input type="checkbox" /><span>${task.taskName}</span></label>
			<a class="delete-item secondary-content"><i class="fa fa-times"></i></a>
		`;

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {
	// Check if form is empty
	if (taskInput.value === '') {
		alert('Add a task');
		return
	}

	// Generate task ID
	const idNum = Math.floor(Date.now() * Math.random() * 100).toString(16);

	// Create task object
	const newTask = {
		id: idNum,
		taskName: taskInput.value,
		completed : ""
	}

	// Create li element
	const li = document.createElement('li');

	// Add a class and ID
	li.className = 'collection-item';
	li.id = newTask.id;

	// Create checkbox and txt item
	li.innerHTML = `
		<label><input type="checkbox" /><span>${newTask.taskName}</span></label>
		<a class="delete-item secondary-content"><i class="fa fa-times"></i></a>
	`;

	// Append li to ul
	taskList.appendChild(li);

	// Store in local storage
	storeTaskInLocalStorage(newTask);

	// Clear input
	taskInput.value = '';

	e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
	let tasks = initializeTasks();

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
			// remove from DOM
			e.target.parentElement.parentElement.remove();

			// remove from localStorage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
}

// Remove from localStorage
function removeTaskFromLocalStorage(taskItem) {
	let tasks = initializeTasks();

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
	if (confirm('Are you sure you want to clear all tasks?')) {
		while (taskList.firstChild) {
			taskList.removeChild(taskList.firstChild);
		}

		clearTasksFromLocalStorage();
	}
}

// Clear tasks from localStorage
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent;

		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}