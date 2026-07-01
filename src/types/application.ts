export interface ApplicationResponse {
    id : number;
    jobId : number;
    jobTitle : string;
    resumeId : number;
    atsScore : number;
    status : string;
    applicationTime : string;
}

export interface ApplicationRequest {
    resumeId : number
}

export interface ApplicationResultResponse {
    applicationId: number;
    jobId: number;
    status: string;
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