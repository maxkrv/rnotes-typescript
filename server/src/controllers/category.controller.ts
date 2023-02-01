import { NextFunction, Request, Response } from "express";
import TokenService from "../services/token.service";
import { User } from "@prisma/client";
import CategoryService from "../services/category.service";
import { CategoryRequest } from "../interfaces/category.interface";

class CategoryController {
	public async getCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const categories = await CategoryService.getCategories(
				user?.id as number
			);
			res.json(categories);
		} catch (error) {
			next(error);
		}
	}

	public async getCategoryById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const category = await CategoryService.getCategoryById(
				id,
				user?.id as number
			);
			res.json(category);
		} catch (error) {
			next(error);
		}
	}

	public async createCategory(
		req: Request<{}, {}, CategoryRequest>,
		res: Response,
		next: NextFunction
	) {
		try {
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const category = await CategoryService.createCategory({
				...req.body,
				userId: user?.id as number,
			});
			res.json(category);
		} catch (error) {
			next(error);
		}
	}

	public async updateCategoryById(
		req: Request<any, {}, CategoryRequest>,
		res: Response,
		next: NextFunction
	) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const category = await CategoryService.updateCategoryById({
				...req.body,
				id,
				userId: user?.id as number,
			});
			res.json(category);
		} catch (error) {
			next(error);
		}
	}

	public async deleteCategoryById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const category = await CategoryService.deleteCategoryById(
				id,
				user?.id as number
			);
			res.json(category);
		} catch (error) {
			next(error);
		}
	}
}

export default new CategoryController();
