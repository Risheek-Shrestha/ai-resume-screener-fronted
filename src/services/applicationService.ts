import api from "../lib/axios";
import type { ApplicationRequest, ApplicationResultResponse } from "../types/application";

export const applyForJob = async (
  jobId: number,
  applicationRequest: ApplicationRequest
): Promise<ApplicationResultResponse> => {
  const response = await api.post<ApplicationResultResponse>(`/jobs/${jobId}`, applicationRequest);

  return response.data;
};