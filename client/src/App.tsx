import { useState, useEffect } from 'react'
import Header from './components/Header'
import Todos from './components/Todos'
import NewItem from './components/NewItem'
import Modal from './components/Modal'
import { Todo } from './types/types'
import { getAllTodos } from './services/todosService'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    getAllTodos().then(data => {
      setTodos(data)
      console.log(data)
    })
  }, [])


  const handleNewItem = () => {
    console.log('handle new item')
  }

  return (
    <div id="items">
      <Header />
      <main>
        <NewItem handleNewItem={handleNewItem}/>
        <Todos />
        <Modal />
      </main>
    </div>
  )
}

export default App
