import api from "./api";
import { AuthResponse } from "../types/Auth";
import { FormSchemaType } from "../utils/formSchema";

export const userService = {
	register: async (user: FormSchemaType) => {
		const response = await api.post<AuthResponse>("/register", user);
		return response.data;
	},
	login: async (user: FormSchemaType) => {
		const response = await api.post<AuthResponse>("/login", user);
		return response.data;
	},
	logOut: async () => {
		const response = await api.post<{ message: string }>("/logout");
		return response.data;
	},
	// refresh: async () => {
	// 	const response = await api.get<AuthResponse>("/refresh");
	// 	return response.data;
	// },
};
