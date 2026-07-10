import type { UserResponse } from "../types/user";

export type Role = "ADMIN" | "USER";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
    currentCollege: string;
    currentCourseId: number;
    currentSemester: number;
}

export interface AuthResponse {
    email: string;
    username: string;
    role: Role;
    accessToken: string;
    refreshToken: string;
}

export interface AuthContextType {
    user: UserResponse | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (data: AuthResponse) => Promise<void>;
    logout: () => void;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}