
import type { Course } from "./course";

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
    // Courses/semesters this job is restricted to. Empty arrays mean "open to everyone".
    eligibleCourses: Course[];
    eligibleSemesters: number[];
    // Whether the current authenticated user meets the restrictions above.
    // Only populated by the /jobs/open endpoint, same as userApplicationStatus.
    eligibleForCurrentUser?: boolean | null;
}

export interface JobRequest {
    title: string;
    description: string;
    jobType: string;
    experienceLevel: string;
    skills: string[];
    applicationStartsAt: string;
    applicationDeadline: string;
    // Course IDs this job is restricted to. Leave empty for "open to all courses".
    eligibleCourseIds?: number[];
    // Semesters this job is restricted to. Leave empty for "open to all semesters".
    eligibleSemesters?: number[];
}

export interface JobFilters {
    keyword?: string;
    jobType?: string;
    level?: string;
    skill?: string;
}