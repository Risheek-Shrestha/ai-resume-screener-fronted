import api from "../lib/axios"

export const getJobs = async(page: number, size: number) => {
    const response = await api.get("/jobs", { params: { page, size } });

    return response.data;
}

export const getJobsById = async (id:number) => {
    const response = await api.get(`/jobs/${id}`);
    
    return response.data;
}