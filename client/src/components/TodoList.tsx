import { Todo } from "../types/types"

const TodoRow = ({todo}: {todo:Todo}) => {
  return (
    <tr data-id={todo.id}>
      <td className="list_item">
        {todo.completed ?
          <input type="checkbox" name="item_{{id}}" id="item_{{id}}" checked /> :
          <input type="checkbox" name="item_{{id}}" id="item_{{id}}" />
        }
        <span className="check"></span>
        <label htmlFor="item_{{id}}">{todo.title} - {getDueDate(todo)}</label></td>
      <td className="delete"><img src="./src/assets/images/trash.png" alt="Delete" /></td>
    </tr>
  )
}

const getDueDate = (todo: Todo) => {
  if(!todo.month || !todo.year)
    return 'No Due Date'
  return `${todo.month}/${todo.year}`
}

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const todoRows = todos.map(todo => <TodoRow todo={todo} key={todo.id} />)
  
  return (
    <table>
      <tbody>
        {todoRows}
      </tbody>
    </table>
  )
}

export default TodoList


{/* <table>
  <tbody>
    <tr data-id="{{id}}" >
      <td class="list_item">
        {{ #if completed }}
        <input type="checkbox" name="item_{{id}}" id="item_{{id}}" checked />
        {{ else}}
        <input type="checkbox" name="item_{{id}}" id="item_{{id}}" />
        {{/if}}
        <span class="check"></span>
        <label for="item_{{id}}">{{ title }} - {{ due_date }}</label></td>
      <td class="delete"><img src="images/trash.png" alt="Delete" /></td>
    </tr>
  </tbody>
</table> */}