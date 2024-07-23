
class Node {
    constructor(value) {
        this.value = value;
        this.completed = false;
        this.next = null;
    }
}


class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    
    addTask(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        this.saveToLocalStorage();
    }

    
    toggleTaskCompletion(value) {
        let current = this.head;
        while (current !== null) {
            if (current.value === value) {
                current.completed = !current.completed;
                this.saveToLocalStorage();
                return true;
            }
            current = current.next;
        }
        return false;
    }

    
    deleteTask(value) {
        if (!this.head) {
            return false;
        }
        if (this.head.value === value) {
            this.head = this.head.next;
            this.size--;
            this.saveToLocalStorage();
            return true;
        }
        let current = this.head;
        let prev = null;
        while (current !== null) {
            if (current.value === value) {
                prev.next = current.next;
                this.size--;
                this.saveToLocalStorage();
                return true;
            }
            prev = current;
            current = current.next;
        }
        return false;
    }

    
    getAllTasks() {
        let tasks = [];
        let current = this.head;
        while (current !== null) {
            tasks.push({
                value: current.value,
                completed: current.completed
            });
            current = current.next;
        }
        return tasks;
    }

    
    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.getAllTasks()));
    }

    
    loadFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            this.addTask(task.value);
            if (task.completed) {
                this.toggleTaskCompletion(task.value);
            }
        });
    }
}


const taskList = new LinkedList();


document.addEventListener('DOMContentLoaded', () => {
    taskList.loadFromLocalStorage();
    renderTasks();
});


const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskListElement = document.getElementById('taskList');


function renderTasks() {
    taskListElement.innerHTML = '';
    taskList.getAllTasks().forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.value;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => {
            taskList.toggleTaskCompletion(task.value);
            renderTasks();
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            taskList.deleteTask(task.value);
            renderTasks();
        });
        li.appendChild(deleteButton);
        taskListElement.appendChild(li);
    });
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskValue = taskInput.value.trim();
    if (taskValue !== '') {
        taskList.addTask(taskValue);
        taskInput.value = '';
        renderTasks();
    }
});
