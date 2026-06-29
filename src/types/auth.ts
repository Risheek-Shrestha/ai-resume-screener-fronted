export type Role = "ADMIN" | "USER";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    email: string;
    username: string;
    role: Role;
    accessToken: string;
    refreshToken: string;
}

export interface User {
    email: string;
    username: string;
    role: Role;
}

export interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (data: AuthResponse) => void;
    logout: () => void;
}