let store = JSON.parse(localStorage.getItem('todoStore')) || [];

let editIndex = null;

function saveToLocalStorage() {
  localStorage.setItem('todoStore', JSON.stringify(store));
}

function action() {
  const input = document.querySelector("#todo-input");
  const date = document.querySelector("#date_input");

  const input_value = input.value.trim();
  const input_date = date.value;

  if (input_value === '' || input_date === '') {
    alert("Please enter both task and date!");
    return;
  }

  if(editIndex !==null){
    store[editIndex].item = input_value;
    store[editIndex].date = input_date;
    editIndex = null;
    document.querySelector(".btn").textContent = "Add"
  }
  else{
      
      store.push({ item: input_value, date: input_date, done: false });
  }

  saveToLocalStorage();

  input.value = '';
  date.value = '';

  showToDO();
}
function editTask(index){
    const task = store[index]
    document.querySelector("#todo-input").value = task.item;
    document.querySelector("#date_input").value = task.date;

    document.querySelector(".btn").textContent = "Update"
    editIndex = index
}

function toggleDone(index){
    store[index].done = !store[index].done;
    saveToLocalStorage()
    showToDO()
}
function showToDO() {
  let todo_div = document.querySelector(".todo-div");
  let searchText = document.querySelector("#search_input")?.value.toLowerCase() || "";

  let newHtml = '';

  for (let i = 0; i < store.length; i++) {
    const task = store[i];
    const checked = task.done ? 'checked' : '';
    const doneClas = task.done ? 'done' : '';

    if (
      task.item.toLowerCase().includes(searchText) ||
      task.date.toLowerCase().includes(searchText)
    ) {
      const highlightedItem = highlightText(task.item, searchText);
      const highlightedDate = highlightText(task.date, searchText);

      newHtml += `
        <div class="js-todo-div">
          <input type="checkbox" onchange="toggleDone(${i})" ${checked}>
          <span class="${doneClas}">${highlightedItem}</span>
          <span class="${doneClas}">${highlightedDate}</span>
          <button onclick="editTask(${i})">✏️ Edit</button>
          <button onclick="Delete(${i})">🗑 Delete</button>
        </div>
      `;
    }
  }

  todo_div.innerHTML = newHtml;
}
function highlightText(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}
function Delete(i) {
  store.splice(i, 1);
  saveToLocalStorage();
  showToDO();
}

showToDO(); // Initial render