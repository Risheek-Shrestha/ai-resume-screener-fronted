export interface Education {
    id: number;
    userId: number;
    level: EducationLevel;
    institution: string;
    startDate: string;
    endDate: string | null;
    grade: string;
    isCurrent: boolean;
}

export interface EducationRequest {
    level: EducationLevel;
    institution: string;
    startDate: string;
    endDate: string | null;
    grade: string;
    isCurrent: boolean;
}

export const EducationLevel = {
    MATRICULATION: "MATRICULATION",
    INTERMEDIATE: "INTERMEDIATE",
    BACHELORS: "BACHELORS",
    MASTERS: "MASTERS",
    DOCTORATE: "DOCTORATE",
    DIPLOMA: "DIPLOMA",
    CERTIFICATION: "CERTIFICATION",
    OTHER: "OTHER",
} as const;

export type EducationLevel =
    (typeof EducationLevel)[keyof typeof EducationLevel];