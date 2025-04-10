import axios from 'axios'
import { Todo, NewTodo } from '../types/types'

const baseUrl = 'api'

export const getAllTodos = () => {
  return axios
    .get<Todo[]>(`${baseUrl}/todos`)
    .then(response => response.data)
}

export const deleteTodo = (id:number) => {
  return axios
    .delete(`${baseUrl}/todos/${id}`)
    .then(response => response.status)
}

export const createNewTodo = (newTodo:NewTodo) => {
  return axios
    .post<Todo>(`${baseUrl}/todos/`, newTodo)
    .then(response => response.data)
}

export const updateTodo = (todo: Todo) => {
  return axios
    .put<Todo>(`${baseUrl}/todos/${todo.id}`, todo)
    .then(response => response.data)
}