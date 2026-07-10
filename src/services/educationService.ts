import api from "../lib/axios";
import type { Education, EducationRequest } from "../types/education"

const BASE_URL = "/educations";

export const getEducation = async (): Promise<Education[]> => {
    const { data } = await api.get<Education[]>(BASE_URL);
    return data;
};

export const getEducationById = async (
    id: number
): Promise<Education> => {
    const { data } = await api.get<Education>(`${BASE_URL}/${id}`);
    return data;
};

export const createEducation = async (
    education: EducationRequest
): Promise<Education> => {
    const { data } = await api.post<Education>(BASE_URL, education);
    return data;
};

export const updateEducation = async (
    id: number,
    education: EducationRequest
): Promise<Education> => {
    const { data } = await api.put<Education>(
        `${BASE_URL}/${id}`,
        education
    );
    return data;
};

export const deleteEducation = async (
    id: number
): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
};