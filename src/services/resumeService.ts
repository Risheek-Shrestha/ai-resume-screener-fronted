import api from "../lib/axios"
import type { ResumeResponse } from "../types/resume";

export const getMyResumes = async () => {
    const response = await api.get("/resumes");

    return response.data;
};

export const getResumeById = async (id:number) => {
    const response = await api.get(`resumes/${id}`);

    return response.data;
};

export const uploadResume = async (
    file: File,
    resumeName: string
): Promise<ResumeResponse> => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("resumeName", resumeName);

    const response = await api.post("/resumes", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};