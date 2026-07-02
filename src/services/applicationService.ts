import api from "../lib/axios";
import type { ApplicationRequest, ApplicationResultResponse, ApplicationResponse } from "../types/application";

export const applyForJob = async (
  jobId: number,
  applicationRequest: ApplicationRequest
): Promise<ApplicationResultResponse> => {
  const response = await api.post<ApplicationResultResponse>(`/applications/jobs/${jobId}`, applicationRequest);

  return response.data;
};

export const getMyApplications = async (): Promise<ApplicationResponse[]> => {

    const response = await api.get<ApplicationResponse[]>(
        "/applications/me"
    );

    return response.data;
};

export const getApplicationsForJob = async (
    jobId: number
): Promise<ApplicationResponse[]> => {

    const response = await api.get<ApplicationResponse[]>(
        `/applications/jobs/${jobId}`
    );

    return response.data;
};

export const updateApplicationStatus = async (
    applicationId: number,
    status: string
): Promise<ApplicationResponse> => {

    const response = await api.patch<ApplicationResponse>(
        `/applications/${applicationId}/status`,
        {
            status
        }
    );

    return response.data;
};

export const getAcceptedApplications = async (
    jobId: number
): Promise<ApplicationResponse[]> => {

    const response = await api.get<ApplicationResponse[]>(
        `/applications/jobs/${jobId}/accepted`
    );

    return response.data;
};