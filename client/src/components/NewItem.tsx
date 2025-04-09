const NewItem = ({handleNewItem}: {handleNewItem: () => void}) => {
  return (
    <label htmlFor='new_item' onClick={handleNewItem}>
      <img src="./src/assets/images/plus.png" alt="Add Todo Item" />
      <h2>Add new to do</h2>
    </label>
  )
}

export default NewItem