let todos = [
  
]

const filters = {
  searchText: "",
  hideCompleted: false
}

const todosJSON = localStorage.getItem('todos')

if (todosJSON !== null) {
    todos = JSON.parse(todosJSON)
}

const renderToDos = function(todos, filters) {
  let filteredToDos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })

  filteredToDos = filteredToDos.filter(function (todo){
    if(filters.hideCompleted) {
      return !todo.completed
    } else {
      return true
    }
  })

  const getThingsToDo = filteredToDos.filter(function(todos) {
    return !todos.completed
  })

  document.querySelector("#todos").innerHTML = ""

  const newParagraph = document.createElement("h2")
  newParagraph.textContent = `You have ${getThingsToDo.length} things to do.`
  document.querySelector("#todos").appendChild(newParagraph)

  filteredToDos.forEach(function(todo) {
    const p = document.createElement("p")
    p.textContent = todo.text
    document.querySelector("#todos").appendChild(p)
  })
}

renderToDos(todos,filters)

document.querySelector("#search-text").addEventListener("input", function(e) {
  filters.searchText = e.target.value
  renderToDos(todos, filters)
})

document.querySelector('#submit-form').addEventListener('submit', function (e){
  e.preventDefault()
  todos.push({
    text: e.target.elements.addingToDo.value,
    completed: false
  })
  localStorage.setItem('todos', JSON.stringify(todos))
  renderToDos(todos, filters)
  e.target.elements.addingToDo.value = ''
})


document.querySelector('#check-me').addEventListener('change', function (e){
  filters.hideCompleted = e.target.checked
  renderToDos(todos, filters)
})

