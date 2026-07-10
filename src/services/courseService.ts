import api from "../lib/axios";
import type { Course } from "../types/course";

export const getCourses = async (): Promise<Course[]> => {
    const response = await api.get<Course[]>("/courses");
    return response.data;
};