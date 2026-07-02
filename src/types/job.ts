
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