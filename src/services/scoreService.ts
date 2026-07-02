import api from "../lib/axios";
import type { ScoreRequest, ScoreResponse } from "../types/score";

export const generateScore = async (
    request: ScoreRequest
): Promise<ScoreResponse> => {

    const response = await api.post<ScoreResponse>(
        "/scores",
        request
    );

    return response.data;
};

export const getMyScores = async (): Promise<ScoreResponse[]> => {

    const response = await api.get<ScoreResponse[]>(
        "/scores/my-scores"
    );

    return response.data;
};