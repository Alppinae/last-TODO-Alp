import { saveToLocalStorage, toDo } from "./localStorage.js";


const form = document.querySelector('.forum');
const toDoEkle = document.querySelector('.todo');


function getToDo() {
    toDoEkle.innerHTML = '';
    for (let i = 0; i < toDo.length; i++) {
        const task = toDo[i];
        const li = document.createElement('li');


        li.id = i;
        li.style.textDecoration = task.completed ? 'line-through' : 'none';
        li.innerHTML = `
            ${task.gorev} ${task.tarih ? `(Tarih: ${task.tarih})` : ''}
            <button class="editBtn">Düzenle</button>
            <button class="noselect"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
            <button class="okeyBtn">${task.completed ? 'Aktif Et' : 'Tamamlandı'}</button>
        `;

        toDoEkle.appendChild(li);
    }

    bindButtons(); 
}

// butonları Getirdim
function bindButtons() {
    bindDeleteBtns();
    bindEditBtns();
    bindOkeyBtns();
}


function addGorev(e) {
    e.preventDefault();
    
    const taskInput = document.querySelector('.first-input').value;
    const taskDateInput = document.querySelector('.date-input').value; 
    
    if (taskInput.trim() === '') {
        alert("Lütfen bir görev girin.");
        return;
    }

    if (taskDateInput.trim() === '') {
        alert("Lütfen bir tarih seçin.");
        return;
    }

    const newTask = {
        gorev: taskInput,
        completed: false,
        tarih: taskDateInput
    };
    

    toDo.push(newTask);

    saveToLocalStorage(); 
    getToDo(); 

    
    document.querySelector('.forum').reset();
}


function bindDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', function () {
            const taskId = Number(this.parentElement.id);
            toDo.splice(taskId, 1); 
            saveToLocalStorage(); 
            getToDo(); 
        });
    }
}


function bindEditBtns() {
    const editBtns = document.querySelectorAll('.editBtn');
    for (const editBtn of editBtns) {
        editBtn.addEventListener('click', function () {
            const taskId = Number(this.parentElement.id);
            const newTask = prompt('Yeni görevi yazın:', toDo[taskId].gorev);
            if (newTask) {
                toDo[taskId].gorev = newTask; 
                saveToLocalStorage(); 
                getToDo(); 
            }
        });
    }
}


function bindOkeyBtns() {
    const okeyBtns = document.querySelectorAll('.okeyBtn');
    for (const okeyBtn of okeyBtns) {
        okeyBtn.addEventListener('click', function () {
            const taskId = Number(this.parentElement.id);
            toDo[taskId].completed = !toDo[taskId].completed; 
            saveToLocalStorage(); 
            getToDo(); 
        });
    }
}


form.addEventListener('submit', addGorev);


getToDo();
