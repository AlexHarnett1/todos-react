import axios from 'axios'
import { Todo } from '../types/types'

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