
export interface JobResponse {
    id : number;
    title : string;
    description : string;
    jobType : string;
    experienceLevel : string;
    skills : string[];
    createdAt : string;
    applicationStartsAt : string;
    applicationDeadline : string;
    applicationStatus : string;
    // The current user's latest application status for this job
    // (APPLIED / SHORTLISTED / HIRED / REJECTED), or null/undefined if they
    // have never applied. Only populated by the /jobs/open endpoint.
    userApplicationStatus?: "APPLIED" | "SHORTLISTED" | "HIRED" | "REJECTED" | null;
}

export interface JobRequest {
    title: string;
    description: string;
    jobType: string;
    experienceLevel: string;
    skills: string[];
    applicationStartsAt: string;
    applicationDeadline: string;
}

export interface JobFilters {
    keyword?: string;
    jobType?: string;
    level?: string;
    skill?: string;
}