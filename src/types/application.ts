export type ApplicationStatus = "APPLIED" | "SHORTLISTED" | "HIRED" | "REJECTED";

export interface ApplicationResponse {
    applicationId: number;
    jobId: number;
    jobTitle: string;
    resumeId: number;
    atsScore: number;
    status: ApplicationStatus;
    appliedAt: string;
}

export interface ApplicationRequest {
    resumeId: number;
}

export interface ApplicationResultResponse {
    applicationId: number;
    jobId: number;
    status: ApplicationStatus;
    message: string;
    score: number;
    suggestions: SuggestionResponse;
}

export interface SuggestionResponse {
    resumeId: number;
    currentScore: number;
    scoreLevel: string;
    missingSkills: string[];
    weakAreas: string[];
    actionableSteps: string[];
    suggestedLearningPaths: string[];
    resumeImprovementTips: string[];
}