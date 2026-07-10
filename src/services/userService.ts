import api from "../lib/axios";

import type { UserResponse, UpdateUserRequest } from "../types/user";

export const getCurrentUser = async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>("/users/me");
    return response.data;
};

export const updateCurrentUser = async (
    data: UpdateUserRequest
): Promise<UserResponse> => {
    const response = await api.put<UserResponse>("/users/me", data);
    return response.data;
};