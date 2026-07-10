import type { ReactNode } from "react";
import { useState, useEffect, useCallback } from "react";

import { AuthContext } from "./AuthContext";

import type { AuthResponse } from "../types/auth";
import type { UserResponse } from "../types/user";

import { getCurrentUser } from "../services/userService";
import { setOnAuthFailure } from "../lib/axios";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | null>(() =>
        localStorage.getItem("accessToken")
    );

    const [user, setUser] = useState<UserResponse | null>(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const isAuthenticated = accessToken !== null;

    const login = useCallback(async (data: AuthResponse) => {

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        setAccessToken(data.accessToken);

        const profile = await getCurrentUser();

        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));

    }, []);

    const logout = useCallback(() => {

        setAccessToken(null);
        setUser(null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

    }, []);

    useEffect(() => {
        setOnAuthFailure(logout);
    }, [logout]);

    useEffect(() => {

        if (!accessToken) {
            return;
        }

        getCurrentUser()
            .then((profile) => {
                setUser(profile);
                localStorage.setItem("user", JSON.stringify(profile));
            })
            .catch(() => {
                logout();
            });

    }, [accessToken, logout]);

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;