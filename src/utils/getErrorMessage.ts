import axios from "axios";

export function getErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data === "string" && data.length > 0) {
            return data;
        }

        if (data && typeof data === "object" && "message" in data) {
            return String((data as { message: unknown }).message);
        }

        return error.message || fallback;
    }

    return fallback;
}