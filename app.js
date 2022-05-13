const txtBox = document.querySelector('.txtBox'); 
const addBtn = document.querySelector('#addBtn');
const toDoContainer = document.querySelector('.todo-container');
const checkBtn = document.querySelector('.fa-check-square');
const filterToDos = document.querySelector('.filter-todos');

addBtn.addEventListener('click',addBtnFunct);
toDoContainer.addEventListener('click',removeCheck);
filterToDos.addEventListener('click',filterHandler);
document.addEventListener('DOMContentLoaded', getLocalTodos);

function addBtnFunct(e) {
        e.preventDefault();
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo')
        newTodo.innerHTML = `<li>${txtBox.value}</li>
        <span><i class="fa fa-trash"></i></span>
        <span><i class="fa fa-check-square" ></i></span>`;
        toDoContainer.appendChild(newTodo);
        saveLocalTodos(txtBox.value);
        txtBox.value = "";
}

function removeCheck(e){
        let classList = e.target.classList[1];
        let item = e.target.parentElement.parentElement;
        if (classList === 'fa-trash') { removeLocalTodos(item); item.remove();}
        if (classList === 'fa-check-square') item.classList.toggle('checked')
}

function filterHandler(e){
        const todos = [...toDoContainer.children]; 
        todos.forEach(toDo => {
                console.log(toDo);
                switch (e.target.value) {
                        case 'all' : 
                                toDo.style.display = 'flex';
                                break;
                        case 'compelted' :
                                if (toDo.classList.contains('checked')) {
                                        toDo.style.display = 'flex';
                                } else {toDo.style.display = 'none'}
                                break;
                        case 'uncompleted' :
                                if (!toDo.classList.contains('checked')) {
                                        toDo.style.display = 'flex';
                                } else {toDo.style.display = 'none'}
                                break;
                }
        });
}

function saveLocalTodos(todo) {
  let savedToDos = localStorage.getItem('todos')?
  JSON.parse(localStorage.getItem('todos')) : [];
  savedToDos.push(todo);
  localStorage.setItem('todos',JSON.stringify(savedToDos));
}

function getLocalTodos() {
        let savedToDos = localStorage.getItem('todos')?
        JSON.parse(localStorage.getItem('todos')) : [];
        savedToDos.forEach((todo) => {
                const newTodo = document.createElement('div');
                newTodo.classList.add('todo')
                newTodo.innerHTML = `<li>${todo}</li>
                <span><i class="fa fa-trash"></i></span>
                <span><i class="fa fa-check-square" ></i></span>`;
                toDoContainer.appendChild(newTodo); 
        })
}

function removeLocalTodos(todo) {
        let savedToDos = localStorage.getItem('todos')?
        JSON.parse(localStorage.getItem('todos')) : [];
        console.log(todo.children[0].innerText);
        const filteredTodos = savedToDos.filter((t) => t != todo.children[0].innerText)
        // console.log(filteredTodos);
        // console.log(todo.children[0].innerText);
        localStorage.setItem('todos',JSON.stringify(filteredTodos));
}