const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


// Carica le attività salvate
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Mostra tutte le attività
function showTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const taskElement = document.createElement("li");
        taskElement.classList.add("task");

        const text = document.createElement("span");
        text.textContent = task.text;

        // Se l'attività è completata
        if (task.completed) {
            text.classList.add("completed");
        }

        // Completa o riapre l'attività
        text.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            showTasks();
        });


        // Pulsante elimina
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Elimina";
        deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            showTasks();
        });


        taskElement.appendChild(text);
        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);
    });
}


// Aggiunge una nuova attività
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Inserisci un'attività!");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    showTasks();

    taskInput.value = "";
    taskInput.focus();
}


// Salva le attività nel browser
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Pulsante Aggiungi
addButton.addEventListener("click", addTask);


// Tasto Invio
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Mostra le attività quando apri la pagina
showTasks();