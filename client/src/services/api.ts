import axios from "axios";

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

export default api;
