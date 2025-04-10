import { useState, useEffect } from 'react'
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
    if (isModalVisible) {
      setCurrentTodo(null)
    } 
    setIsModalVisible(!isModalVisible)
  }

  const handleSelectTodo = (id: number) => {
    toggleModal()
    setCurrentTodo(todos.find(todo => todo.id === id) || null)
  }

  const handleDeleteTodo = (id:number) => {
    deleteTodo(id).then((status) => {
      if (status === 204) {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
        console.log('deletion successful')
      } else {
        console.error('Deletion failed')
      }
    })
  }

  const handleCreateNewTodo = (newTodo: NewTodo) => {
    createNewTodo(newTodo).then(todo => {
      setTodos(todos.concat(todo))
      toggleModal()
    }).catch(error => { 
      console.error('Error making todo: ', error)
    })
    
  }

  const handleUpdateTodo = (todo: Todo) => {
    updateTodo(todo).then(newTodo => {
      const newTodos = todos.filter(todo => todo.id !== newTodo.id)
      setTodos(newTodos.concat(newTodo))
      toggleModal()
    }).catch(error => {
      console.error('Error making todo: ', error)
    })
  }

  const handleToggleTodoCompletion = (id: number) => {
    let todoToComplete = todos.find(todo => todo.id === id)
    if (todoToComplete) {
      updateTodo({ ...todoToComplete, completed: !todoToComplete.completed }).then(newTodo => {
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
          todo={currentTodo} isModalVisible={isModalVisible} toggleModalVisibility={toggleModal} />
      </main>
    </div>
  )
}

export default App
