import { prisma } from "../utils/prisma";
import { HttpException } from "../exceptions/HttpExeption";
import { TodoRequest, TodoRequestWithId } from "../interfaces/todo.interface";

class TodoService {
	public async getTodos(userId: number) {
		return prisma.todo.findMany({
			where: {
				userId,
			},
			include: {
				category: true,
			},
		});
	}

	public async getTodoById(id: number, userId: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				todos: true,
			},
		});
		if (user?.todos.some((todo) => todo.id === id)) {
			return prisma.todo.findUnique({
				where: {
					id,
				},
				include: {
					category: true,
				},
			});
		} else {
			throw new HttpException(404, "Todo not found");
		}
	}

	public async createTodo({ title, isDone, categoryId, userId }: TodoRequest) {
		if (categoryId) {
			return prisma.todo.create({
				data: {
					title,
					isDone,
					category: {
						connect: {
							id: categoryId,
						},
					},
					user: {
						connect: {
							id: userId,
						},
					},
				},
			});
		} else {
			return prisma.todo.create({
				data: {
					title,
					isDone,
					user: {
						connect: {
							id: userId,
						},
					},
				},
			});
		}
	}

	public async updateTodoById({
		id,
		userId,
		categoryId,
		title,
		isDone,
	}: TodoRequestWithId) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				todos: true,
			},
		});
		if (user?.todos.some((todo) => todo.id === id)) {
			if (categoryId) {
				return prisma.todo.update({
					where: {
						id,
					},
					data: {
						title,
						isDone,
						category: {
							connect: {
								id: categoryId,
							},
						},
					},
					include: {
						category: true,
					},
				});
			} else {
				return prisma.todo.update({
					where: {
						id,
					},
					data: {
						title,
						isDone,
						category: {
							disconnect: true,
						},
					},
					include: {
						category: true,
					},
				});
			}
		} else {
			throw new HttpException(404, "Todo not found");
		}
	}

	public async deleteTodoById(id: number, userId: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				todos: true,
			},
		});
		if (user?.todos.some((todo) => todo.id === id)) {
			return prisma.todo.delete({
				where: {
					id,
				},
			});
		} else {
			throw new HttpException(404, "Todo not found");
		}
	}
}

export default new TodoService();
