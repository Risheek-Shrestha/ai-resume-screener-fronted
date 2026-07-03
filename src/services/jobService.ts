import api from "../lib/axios"
import type { JobResponse, JobRequest, JobFilters } from "../types/job";

function buildFilterParams(page: number, size: number, filters?: JobFilters) {
    const params: Record<string, string | number> = { page, size };

    if (filters?.keyword) params.keyword = filters.keyword;
    if (filters?.jobType) params.jobType = filters.jobType;
    if (filters?.level) params.level = filters.level;
    if (filters?.skill) params.skill = filters.skill;

    return params;
}

export const getJobs = async(page: number, size: number, filters?: JobFilters) => {
    const response = await api.get("/jobs", { params: buildFilterParams(page, size, filters) });

    return response.data;
}

// Open jobs for the current user, supporting the same keyword/jobType/level/skill filters
// exposed by the backend's GET /api/v1/jobs/open endpoint.
export const getOpenJobs = async (page: number, size: number, filters?: JobFilters) => {
    const response = await api.get("/jobs/open", { params: buildFilterParams(page, size, filters) });

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