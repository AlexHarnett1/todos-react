import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import NewItem from './components/NewItem'
import Modal from './components/Modal'
import { Todo, NewTodo } from './types/types'
import { getAllTodos, deleteTodo, createNewTodo } from './services/todosService'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<Todo | null>(null)
  const modalForm = useRef<HTMLFormElement>(null)
  const modalFormDiv = useRef<HTMLDivElement>(null)
  const modalLayer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getAllTodos().then(data => {
      setTodos(data)
      console.log(data)
    })
  }, [])

  const toggleModal = () => {
    console.log('Toggling up modal')
    if (modalFormDiv.current && modalLayer.current) {
      if (modalFormDiv.current.style.display === "block") {
        setTodo(null)
        modalFormDiv.current.style.display = "none"
        modalLayer.current.style.display = "none"
      }
      else {
        modalFormDiv.current.style.display = "block"
        modalLayer.current.style.display = "block"
      }
    }
  }

  const handleSelectTodo = (id: number) => {
    console.log('Editing item', id)
    toggleModal()
    setTodo(todos.find(todo => todo.id === id) || null)
  }

  const handleDeleteTodo = (id:number) => {
    console.log('deleting item')
    deleteTodo(id).then((status) => {
      if (status === 204) {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
        console.log('deletion successful')
      } else {
        console.log('Deletion failed')
      }
    })
  }

  const handleCreateNewTodo = (newTodo: NewTodo) => {
    createNewTodo(newTodo).then(todo => {
      setTodos(todos.concat(todo))
      modalForm.current?.reset()
      toggleModal()
    }).catch(reason => { 
      console.log('Error making todo: ', reason)
    })
    
  }

  const handleEditTodo = (todo: Todo) => {
    console.log(todo)
  }

  const handleToggleTodoCompletion = () => {
    console.log('handling completion')
    return todos[0]
  }

  return (
    <div id="items">
      <Header todosLength={todos.length}/>
      <main>
        <NewItem handleNewItem={toggleModal}/>
        <TodoList todos={todos} selectTodoHandler={handleSelectTodo} deleteHandler={handleDeleteTodo}
          completionHandler={handleToggleTodoCompletion} />
        <Modal ref={modalLayer} formDivRef={modalFormDiv} formRef={modalForm} newTodoHandler={handleCreateNewTodo}
          markCompleteHandler={handleToggleTodoCompletion} editTodoHandler={handleEditTodo} todo={todo} />
      </main>
    </div>
  )
}

export default App
