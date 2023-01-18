import api from "./api";
import { AuthQuery, AuthResponse } from "../types/Auth";

export const userService = {
	register: async (user: AuthQuery) => {
		const response = await api.post<AuthResponse>("/register", user);
		return response.data;
	},
	login: async (user: AuthQuery) => {
		const response = await api.post<AuthResponse>("/login", user);
		return response.data;
	},
	logOut: async () => {
		const response = await api.post<{ message: string }>("/logout");
		return response.data;
	},
	refresh: async () => {
		const response = await api.get<AuthResponse>("/refresh");
		return response.data;
	},
};
