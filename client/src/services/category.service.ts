import api from "./api";
import { Category, CategoryRequest } from "../types/Category";

export const categoryService = {
	getCategories: async () => {
		const response = await api.get<Category[]>("/categories");
		return response.data;
	},
	getCategoryById: async (id: number) => {
		const response = await api.get<Category>(`/categories/${id}`);
		return response.data;
	},
	createCategory: async (category: CategoryRequest) => {
		const response = await api.post<Category>("/categories", category);
		return response.data;
	},
	updateCategoryById: async (id: number, category: CategoryRequest) => {
		const response = await api.put<Category>(`/categories/${id}`, category);
		return response.data;
	},
	deleteCategoryById: async (id: number) => {
		const response = await api.delete<Category>(`/categories/${id}`);
		return response.data;
	},
};
