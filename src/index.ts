import {v4 as uuidV4} from 'uuid'
console.log("Hello world")

type Task = {
  id: string
  title: string,
  completed: boolean,
  createdAt: Date
}
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// create local storage
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  // validate the input and if empty return null
  if(input?.value == "" || input?.value == null) return

  // create a new task with the following properties
  const newTask: Task ={
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)
  // call the function that add an item to the list
  addListItem(newTask)
  // clear input field after submit
  input.value = ""
})

// in order to pass the types and reduce file size for clean code we define types independendly and pass them as parameters in the function bellow

function addListItem  (task: Task){
  const item = document.createElement("li")
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener("change", () => {
    task.completed =checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed

  // compine all the field/ elements into one using the array append method
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)

}

const saveTasks = () => {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks():Task[] {
  const taskJson = localStorage.getItem('TASKS')
  if(taskJson == null) return []
  return JSON.parse(taskJson)
}