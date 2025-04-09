import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import NewItem from './components/NewItem'
import Modal from './components/Modal'
import { Todo } from './types/types'
import { getAllTodos, deleteTodo } from './services/todosService'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const modalForm = useRef<HTMLDivElement>(null)
  const modalLayer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getAllTodos().then(data => {
      setTodos(data)
      console.log(data)
    })
  }, [])


  const handleNewItem = () => {
    console.log('handle new item')
    if (modalForm.current && modalLayer.current) {
      modalForm.current.style.display = "block"
      modalLayer.current.style.display = "block"
    }
  }

  const handleDeleteItem = (id:number) => {
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

  const handleAddNewItem = () => {

  }

  const handleEditItem = () => {
    return todos[0]
  }

  const handleToggleItemCompletion = () => {
    console.log('handling completion')
    return todos[0]
  }

  return (
    <div id="items">
      <Header todosLength={todos.length}/>
      <main>
        <NewItem handleNewItem={handleNewItem}/>
        <TodoList todos={todos} editHandler={handleEditItem} deleteHandler={handleDeleteItem}
          completionHandler={handleToggleItemCompletion} />
        <Modal ref={modalLayer} formRef={modalForm} />
      </main>
    </div>
  )
}

export default App
