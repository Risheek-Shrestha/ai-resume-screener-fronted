import api from "../lib/axios";
import type { Course } from "../types/course";

export const getCourses = async (): Promise<Course[]> => {
    const response = await api.get<Course[]>("/courses");
    return response.data;
};

export const getCourse = async (
    id: number
): Promise<Course> => {
    const response = await api.get<Course>(`/courses/${id}`);
    return response.data;
};

export const createCourse = async (
    data: Omit<Course, "id">
): Promise<Course> => {
    const response = await api.post<Course>("/courses", data);
    return response.data;
};

export const updateCourse = async (
    id: number,
    data: Omit<Course, "id">
): Promise<Course> => {
    const response = await api.put<Course>(
        `/courses/${id}`,
        data
    );
    return response.data;
};

export const deleteCourse = async (
    id: number
): Promise<void> => {
    await api.delete(`/courses/${id}`);
};