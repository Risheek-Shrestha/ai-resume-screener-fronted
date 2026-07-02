export interface ScoreRequest {
    resumeId: number;
    jobId: number;
}

export interface ScoreResponse {
    id: number;
    userId: number;
    jobId: number;
    resumeId: number;
    overallScore: number;
    matchedKeywords: string;
    missingKeywords: string;
    recommendationsSummary: string;
}