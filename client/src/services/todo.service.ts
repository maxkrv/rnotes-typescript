import api from "./api";
import { Todo, TodoRequest } from "../types/Todo";

export const todoService = {
	getTodos: async () => {
		const response = await api.get<Todo[]>("/todos");
		return response.data;
	},
	getTodoById: async (id: number) => {
		const response = await api.get<Todo>(`/todos/${id}`);
		return response.data;
	},
	createTodo: async (todo: TodoRequest) => {
		const response = await api.post<Todo>("/todos", todo);
		return response.data;
	},
	updateTodoById: async (id: number, todo: TodoRequest) => {
		const response = await api.put<Todo>(`/todos/${id}`, todo);
		return response.data;
	},
	deleteTodoById: async (id: number) => {
		const response = await api.delete<Todo>(`/todos/${id}`);
		return response.data;
	},
};
