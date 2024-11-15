document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task))
        updateTasksList();
        updateStats();
    }
})

let tasks = [];

const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTask();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');

    // console.log("taskList : ",taskList)
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class = "taskItem">
                <div class = "task ${task.completed ? 'completed' : ''} " >
                    <input type = "checkbox" class = "checkbox" ${
                        task.completed ? 'checked' : ''
                    } />
                    <p>${task.text}</p>
                </div>
                <div class = "icons" />
                    <img src = "./img/edit.png" onClick="editTask(${index})"/>
                    <img src = "./img/delete-bin.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;

        listItem.addEventListener('change', () => 
            toggleTaskComplete(index));

        taskList.append(listItem);
    });
    updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateStats();
    saveTask();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTask();
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTask();
}

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks/totalTasks) * 100;

    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`
}

document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
})