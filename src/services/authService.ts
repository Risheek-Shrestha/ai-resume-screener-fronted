import api from "../lib/axios";
import type { AuthResponse } from "../types/auth";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

export const register = async (
    username: string,
    email: string,
    password: string
): Promise<string> => {
    const response = await api.post("/auth/register", { username, email, password });
    return response.data;
};

// NOTE: These assume the backend exposes matching endpoints. The backend
// currently only supports register/login/refresh/revoke — POST
// /api/v1/auth/forgot-password (accepts { email }, always returns 200 and
// emails a reset link/token if the account exists) and POST
// /api/v1/auth/reset-password (accepts { token, newPassword }) need to be
// added there for this flow to work end-to-end.
export const forgotPassword = async (email: string): Promise<string> => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
};

export const resetPassword = async (
    token: string,
    newPassword: string
): Promise<string> => {
    const response = await api.post("/auth/reset-password", { token, newPassword });
    return response.data;
};