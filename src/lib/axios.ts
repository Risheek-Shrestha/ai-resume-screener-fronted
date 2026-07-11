import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,

});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;

let pendingQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}> = [];

let onAuthFailure: (() => void) | null = null;
export function setOnAuthFailure(cb: () => void) {
    onAuthFailure = cb;
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthEndpoint =
            originalRequest?.url?.includes("/auth/login") ||
            originalRequest?.url?.includes("/auth/refresh") ||
            originalRequest?.url?.includes("/auth/register");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;
            if (isRefreshing) {
                return new Promise((resolveThis, rejectThis) => {
                    pendingQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolveThis(api(originalRequest));
                        },
                        reject: rejectThis,
                    });
                });
            } else {
                isRefreshing = true;
                return axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
                    refreshToken: localStorage.getItem("refreshToken")
                }).then((response) => {
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);
                    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    pendingQueue.forEach((prom) => {
                        prom.resolve(newAccessToken);
                    });
                    pendingQueue = [];
                    return api(originalRequest);
                }).catch((err) => {
                    pendingQueue.forEach((prom) => {
                        prom.reject(err);
                    });
                    pendingQueue = [];
                    if (onAuthFailure) {
                        onAuthFailure();
                    }
                    return Promise.reject(err);
                }).finally(() => {
                    isRefreshing = false;
                });
            }
        } else {
            return Promise.reject(error);
        }
    }
)

export default api;