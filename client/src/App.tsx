import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import NewItem from './components/NewItem'
import Modal from './components/Modal'
import { Todo, NewTodo } from './types/types'
import { getAllTodos, deleteTodo, createNewTodo, updateTodo } from './services/todosService'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  useEffect(() => {
    getAllTodos().then(data => {
      setTodos(data)
      console.log(data)
    })
  }, [])

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
    console.log('Toggling modal')
  }

  const handleSelectTodo = (id: number) => {
    console.log('Editing item', id)
    toggleModal()
    setCurrentTodo(todos.find(todo => todo.id === id) || null)
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
      toggleModal()
    }).catch(error => { 
      console.log('Error making todo: ', error)
    })
    
  }

  const handleUpdateTodo = (todo: Todo) => {
    updateTodo(todo).then(newTodo => {
      const newTodos = todos.filter(todo => todo.id !== newTodo.id)
      setTodos(newTodos.concat(newTodo))
      toggleModal()
    }).catch(error => {
      console.log('Error making todo: ', error)
    })
  }

  const handleToggleTodoCompletion = (id: number) => {
    console.log('handling completion')
    let todoToComplete = todos.find(todo => todo.id === id)
    console.log(todoToComplete)
    if (todoToComplete) {
      updateTodo({ ...todoToComplete, completed: !todoToComplete.completed }).then(newTodo => {
        console.log(newTodo)
        const newTodos = todos.filter(todo => todo.id !== newTodo.id).concat(newTodo)
        const sortedTodos = newTodos.slice().sort((a, b) => {
          return Number(a.completed) - Number(b.completed);
        });
        setTodos(sortedTodos)
      })
    } else {
      console.log('Error finding todo to toggle completion')
    }
  }

  return (
    <div id="items">
      <Header todosLength={todos.length}/>
      <main>
        <NewItem handleNewItem={toggleModal}/>
        <TodoList todos={todos} selectTodoHandler={handleSelectTodo} deleteHandler={handleDeleteTodo}
          completionHandler={handleToggleTodoCompletion} />
        <Modal newTodoHandler={handleCreateNewTodo} updateTodoHandler={handleUpdateTodo}
          todo={currentTodo} isModalVisible={isModalVisible} />
      </main>
    </div>
  )
}

export default App
