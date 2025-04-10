import { Todo } from "../types/types"

interface TodoCallbacks {
  selectTodoHandler: (id:number) => void
  deleteHandler: (id: number) => void
  completionHandler: (id: number) => void
}

interface TodoListProps extends TodoCallbacks {
  todos: Todo[]
}

interface TodoRowProps {
  todo: Todo
  callbacks: TodoCallbacks
}

const getDueDate = (todo: Todo) => {
  if (!todo.month || !todo.year)
    return 'No Due Date'
  return `${todo.month}/${todo.year}`
}

const TodoRow = (props: TodoRowProps) => {
  const callbacks = props.callbacks
  const todo = props.todo
  return (
    <tr data-id={todo.id}>
      <td className="list_item" >
        <input type="checkbox" name={`item_${todo.id}`} id={`item_${todo.id}`}
          onChange={(e) => e.preventDefault()} checked={!!todo.completed} />
        <span className="check" onClick={(e) => {
          e.stopPropagation()
          callbacks.completionHandler(todo.id)
        }
        } ></span>
        <label htmlFor={`item_${todo.id}`} onClick={() => callbacks.selectTodoHandler(todo.id)}>
          {todo.title} - {getDueDate(todo)}</label>
      </td>
      <td className="delete" onClick={() => callbacks.deleteHandler(todo.id)}>
        <img src="./src/assets/images/trash.png" alt="Delete" /></td>
    </tr>
  )
}

const TodoList = (props: TodoListProps) => {
  const {todos, ...callbacks} = props
  const todoRows = todos.map(todo => <TodoRow todo={todo} callbacks={callbacks} key={todo.id} />)
  
  return (
    <table>
      <tbody>
        {todoRows}
      </tbody>
    </table>
  )
}

export default TodoList
