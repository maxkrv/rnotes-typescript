import { NextFunction, Request, Response } from "express";
import TokenService from "../services/token.service";
import { User } from "@prisma/client";
import TodoService from "../services/todo.service";
import { TodoRequest } from "../interfaces/todo.interface";

class TodoController {
	public async getTodos(req: Request, res: Response, next: NextFunction) {
		try {
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const todos = await TodoService.getTodos(user?.id as number);
			res.json(todos);
		} catch (error) {
			next(error);
		}
	}

	public async getTodoById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const todo = await TodoService.getTodoById(id, user?.id as number);
			res.json(todo);
		} catch (error) {
			next(error);
		}
	}

	public async createTodo(
		req: Request<{}, {}, TodoRequest>,
		res: Response,
		next: NextFunction
	) {
		try {
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const todo = await TodoService.createTodo({
				...req.body,
				userId: user?.id as number,
			});
			res.json(todo);
		} catch (error) {
			next(error);
		}
	}

	public async updateTodoById(
		req: Request<any, {}, TodoRequest>,
		res: Response,
		next: NextFunction
	) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const todo = await TodoService.updateTodoById({
				...req.body,
				userId: user?.id as number,
				id,
			});
			res.json(todo);
		} catch (error) {
			next(error);
		}
	}

	public async deleteTodoById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const todo = await TodoService.deleteTodoById(id, user?.id as number);
			res.json(todo);
		} catch (error) {
			next(error);
		}
	}
}

export default new TodoController();
