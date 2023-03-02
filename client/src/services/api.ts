import axios from "axios";
import { AuthResponse } from "../types/Auth";

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	config.headers["Authorization"] = `Bearer ${
		typeof window !== "undefined" && localStorage.getItem("token")
	}`;
	return config;
});
api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get<AuthResponse>(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/api/refresh`,
					{ withCredentials: true }
				);
				localStorage.setItem("token", response.data.accessToken);
				return api.request(originalRequest);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		}
		throw error;
	}
);

export default api;
