import api from "../lib/axios";
import type { NotificationPageResponse } from "../types/notification";

export const getNotifications = async (
    page: number,
    size: number
): Promise<NotificationPageResponse> => {
    const response = await api.get("/notifications", { params: { page, size } });
    return response.data;
};

export const getUnreadCount = async (): Promise<number> => {
    const response = await api.get("/notifications/unread-count");
    return response.data?.count ?? 0;
};

export const markNotificationRead = async (id: number): Promise<void> => {
    await api.put(`/notifications/${id}/read`);
};

export const markAllNotificationsRead = async (): Promise<void> => {
    await api.put("/notifications/read-all");
};

export async function clearAllNotifications(): Promise<void> {
    await api.delete("/notifications");
}