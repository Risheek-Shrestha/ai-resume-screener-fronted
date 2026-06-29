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