import './style.css';

interface Todo {
  name: string,
  isCompleted: boolean,
  readonly id: string
}

const todos: Todo[] = [];
const todosContainer = document.querySelector('.todosContainer') as HTMLDivElement;
const todosInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myform") as HTMLFormElement;
myForm.onsubmit = (e) => {
  e.preventDefault();
  const todo: Todo = {
    name: todosInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000)
  }
  todos.push(todo);
  todosInput.value = ""
  renderTodo(todos);
}

const generateTodoItem = (name: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement('div');
  todo.className = 'todo';
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked
    });
    console.log("iscompleted", isCompleted)
    console.log("checked", checkBox.checked)
    paragraph.className = checkBox.checked ? "strike" : ""
  }
  console.log("after iscompleted", isCompleted)
  //create p for title
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = name;
  paragraph.className = isCompleted ? "strike" : ""
  //create delete button

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  }
  //append all

  todo.append(checkBox, paragraph, btn);

  todosContainer.append(todo);

}
const deleteTodo = (id: string) => {
  let idx = todos.findIndex((item) => item.id == id);
  todos.splice(idx, 1);
  renderTodo(todos);

}
const renderTodo = (todos: Todo[]) => {
  todosContainer.innerText = ""
  todos.forEach((item) => {
    generateTodoItem(item.name, item.isCompleted, item.id);
  })
}