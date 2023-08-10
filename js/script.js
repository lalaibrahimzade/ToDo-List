const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

//Localstorage-den almaq
const savedTodosJSON = localStorage.getItem("todos");
const savedTodos = savedTodosJSON ? JSON.parse(savedTodosJSON) : [];

// list-e elave edildikden sonra localstorage-e push etmek
function addTodo() {
   let todoText = todoInput.value.trim();
    if(todoText === "") return;
  

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };

    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    addTodoToList(todo);
    todoInput.value  = "";
}



for (const todo of savedTodos) {
    addTodoToList(todo);
}

document.addEventListener('keyup', keypress);
function keypress(e){
    e.preventDefault()
    if (e.key === 'Enter' || e.keyCode === 13) {
      addTodo();
    }
};

// ekranda list elementlerini elave etmek
function addTodoToList(todo) {
    const li = document.createElement("li");
    li.setAttribute("id", todo.id);
    li.innerHTML = `
    <span title="${todo.text}">${todo.text}</span>
    <button onclick="toggleComplite(${todo.id})">
      <span class="material-symbols-outlined">
        done
      </span>
    </button>
    <button onclick="editTodo(${todo.id})">
      <span class="material-symbols-outlined">
        edit
      </span>    
    </button>
    <button onclick="removeTodo(${todo.id})">
      <span class="material-symbols-outlined">
        delete
      </span>
    </button>
    
    `;

    li.classList.toggle("completed",todo.completed);
    todoList.appendChild(li);
}


//tamamlandmis list elementleri
  function toggleComplite(id) {
  const todo = savedTodos.find((todo)=>todo.id === id);
  todo.completed = !todo.completed; // true->false, fasle->true 
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  const todoElement = document.getElementById(id);
  todoElement.classList.toggle("completed", todo.completed);
}

//edit olmus list elementleri
  function editTodo(id) {
  const todo = savedTodos.find((todo) => todo.id === id);
  const newText = prompt("please edit: ", todo.text);
  if (newText !== null) {
      todo.text = newText.trim();
      localStorage.setItem("todos", JSON.stringify(savedTodos));
      const todoElement = document.getElementById(id);
      todoElement.querySelector("span").textContent = newText;
  }
}

//lsit elementlerini silmek ucun
  function removeTodo(id) {
  const todoElement = document.getElementById(id);
  todoElement.style.animation = "fadeOut 0.3s ease";
  
  setTimeout(() => {
      savedTodos.splice( 
          savedTodos.findIndex((todo) => todo.id ===id),1
      );
      localStorage.setItem("todos", JSON.stringify(savedTodos));
      todoElement.remove();
  },300);
}
