import api from "../lib/axios";
import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
} from "../types/auth";

export const login = async (
    data: LoginRequest
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
};

export const register = async (
    data: RegisterRequest
): Promise<string> => {
    const response = await api.post<string>("/users", data);
    return response.data;
};

export const forgotPassword = async (
    data: ForgotPasswordRequest
): Promise<string> => {
    const response = await api.post<string>("/auth/forgot-password", data);
    return response.data;
};

export const resetPassword = async (
    data: ResetPasswordRequest
): Promise<string> => {
    const response = await api.post<string>("/auth/reset-password", data);
    return response.data;
};