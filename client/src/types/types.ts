export interface Todo {
  id: number
  title: string
  day: string
  month: string
  year: string
  completed: boolean
  description: string
}

export type NewTodo = Omit<Todo, 'id' | 'completed'>