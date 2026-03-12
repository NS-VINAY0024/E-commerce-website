import axios from "axios";

const baseURL =
	process.env.REACT_APP_API_URL?.replace(/\/$/, "") ||
	(process.env.NODE_ENV === "development" ? "/api" : "/api");

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(res) => res,
	(error) => Promise.reject(error)
);

export default axiosInstance;

export const apiFetcher = async (args) => {
	const [url, config] = Array.isArray(args) ? args : [args];
	const res = await axiosInstance.get(url, { ...config });
	return res.data;
};

