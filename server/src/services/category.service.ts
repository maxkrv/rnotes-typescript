import { prisma } from "../utils/prisma";
import { HttpException } from "../exceptions/HttpExeption";
import {
	CategoryRequest,
	CategoryRequestWithId,
} from "../interfaces/category.interface";

class CategoryService {
	public async getCategories(userId: number) {
		return prisma.category.findMany({
			where: {
				userId,
			},
		});
	}

	public async getCategoryById(id: number, userId: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				categories: true,
			},
		});
		if (user?.categories.some((category) => category.id === id)) {
			return prisma.category.findUnique({
				where: {
					id,
				},
			});
		} else {
			throw new HttpException(404, "Category not found");
		}
	}

	public async createCategory({ name, color, userId }: CategoryRequest) {
		return prisma.category.create({
			data: {
				name,
				color,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	public async updateCategoryById({
		id,
		name,
		color,
		userId,
	}: CategoryRequestWithId) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				categories: true,
			},
		});
		if (user?.categories.some((category) => category.id === id)) {
			return prisma.category.update({
				where: {
					id,
				},
				data: {
					name,
					color,
				},
			});
		} else {
			throw new HttpException(404, "Category not found");
		}
	}

	public async deleteCategoryById(id: number, userId: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				categories: true,
			},
		});
		if (user?.categories.some((category) => category.id === id)) {
			return prisma.category.delete({
				where: {
					id,
				},
			});
		} else {
			throw new HttpException(404, "Category not found");
		}
	}
}

export default new CategoryService();
