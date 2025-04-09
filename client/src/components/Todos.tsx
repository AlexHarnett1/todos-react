const Todos = () => {
  
  
  return (
    <table>
      <tbody>
        <tr>
          <td className="list_item">
            <input type="checkbox" name="item_3" id="item_3" />
            <span className="check"></span>
            This is where we will list todos
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Todos


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