import type { ReactNode } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthResponse, User } from "../types/auth";


interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {

    const [accessToken, setAccessToken] = useState<string | null>(() =>
        localStorage.getItem("accessToken"));

    const [user, setUser] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const isAuthenticated = accessToken != null;

    function login(data: AuthResponse) {
        const newUser: User = {
            email: data.email,
            username: data.username,
            role: data.role,
        };

        setAccessToken(data.accessToken);
        setUser(newUser);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(newUser));
    }

    function logout() {
        setAccessToken(null);
        setUser(null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout }}
        >{children}</AuthContext.Provider>
    );
}

export default AuthProvider;