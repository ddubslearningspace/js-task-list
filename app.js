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

		// Add a class
		li.className = 'collection-item';

		// Create text node and append to li
		li.appendChild(document.createTextNode(task));

		// Create new link elemt
		const link = document.createElement('a');

		// Add a class
		link.className = 'delete-item secondary-content';

		// Add icon html
		link.innerHTML = '<i class="fa fa-times"></i>';

		// Append link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');

	// Add a class
	li.className = 'collection-item';

	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link elemt
	const link = document.createElement('a');

	// Add a class
	link.className = 'delete-item secondary-content';

	// Add icon html
	link.innerHTML = '<i class="fa fa-times"></i>';

	// Append link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	// Store in local storage
	storeTaskInLocalStorage(taskInput.value);

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
		if (confirm('Are you sure?')) {
			// remove from DOM
			e.target.parentElement.parentElement.remove();

			// remove from localStorage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
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
	if (confirm('Are you sure?')) {
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