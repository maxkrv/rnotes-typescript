import axios from "axios";

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
	withCredentials: true,
});

api.interceptors.response.use((config) => {
	config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
	return config;
});

export default api;
