import api from "../lib/axios"
import type { JobResponse, JobRequest } from "../types/job";

export const getJobs = async(page: number, size: number) => {
    const response = await api.get("/jobs", { params: { page, size } });

    return response.data;
}

export const getJobsById = async (id:number) => {
    const response = await api.get(`/jobs/${id}`);
    
    return response.data;
}

export const createJob = async (
    request: JobRequest
): Promise<JobResponse> => {

    const response = await api.post<JobResponse>(
        "/jobs",
        request
    );

    return response.data;
};

export const getMyJobs = async (
    page: number,
    size: number
) => {

    const response = await api.get(
        "/jobs/me",
        {
            params: { page, size }
        }
    );

    return response.data;
};

export const deleteJob = async (
    id: number
) => {

    await api.delete(`/jobs/${id}`);

};

export const updateJob = async (
    id: number,
    request: JobRequest
): Promise<JobResponse> => {

    const response = await api.put<JobResponse>(
        `/jobs/${id}`,
        request
    );

    return response.data;
};