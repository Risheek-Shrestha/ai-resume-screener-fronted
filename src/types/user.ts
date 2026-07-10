import type { Role } from "./auth";

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    role: Role;

    phoneNumber: string;
    dateOfBirth: string;
    currentCollege: string;
    currentCourse: string;
    currentSemester: number;
}

export interface UpdateUserRequest {
    username: string;
    phoneNumber: string;
    dateOfBirth: string;
    currentCollege: string;
    currentCourseId: number;
    currentSemester: number;
}