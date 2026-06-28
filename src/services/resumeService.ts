import api from "../lib/axios"

export const getMyResume = async () => {
    const response = await api.get("/resume");

    return response.data;
}

export const getResumeById = async (id:number) => {
    const response = await api.get(`jobs/${id}`);

    return response.data;
}