const Header = ({ todosLength }: { todosLength: number }) => {
  return (
    <header>
      <dl>
        <dt><time>All Todos</time></dt><dd>{todosLength}</dd>
      </dl>
    </header>
  )
}

export default Header