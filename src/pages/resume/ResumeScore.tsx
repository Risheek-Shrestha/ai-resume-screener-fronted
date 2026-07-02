import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobs } from "../../services/jobService";
import { generateScore } from "../../services/scoreService";

import type { JobResponse } from "../../types/job";
import type { ScoreResponse } from "../../types/score";

function ResumeScore() {

    const { resumeId } = useParams();

    const [jobs, setJobs] = useState<JobResponse[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<number>();

    const [score, setScore] =
        useState<ScoreResponse | null>(null);

    const [loadingJobs, setLoadingJobs] = useState(false);
    const [loadingScore, setLoadingScore] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                setLoadingJobs(true);

                const data = await getJobs(0, 100);

                const jobsList = Array.isArray(data)
                    ? data
                    : data.content;

                setJobs(jobsList);

            } catch {

                setError("Failed to load jobs.");

            } finally {

                setLoadingJobs(false);

            }

        };

        fetchJobs();

    }, []);

    const handleCalculate = async () => {

        if (!resumeId) {
            setError("Invalid resume.");
            return;
        }

        if (!selectedJobId) {
            setError("Please select a job.");
            return;
        }

        try {

            setLoadingScore(true);
            setError("");

            const response = await generateScore({
                resumeId: Number(resumeId),
                jobId: selectedJobId
            });

            setScore(response);

        } catch (err: any) {

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Unable to calculate ATS score.");
            }

        } finally {

            setLoadingScore(false);

        }

    };

    return (

        <div>

            <h1>Resume ATS Score</h1>

            <p>
                <strong>Resume ID:</strong> {resumeId}
            </p>

            <hr />

            <h2>Select Job</h2>

            {loadingJobs ? (

                <p>Loading jobs...</p>

            ) : (

                <select
                    value={selectedJobId ?? ""}
                    onChange={(e) =>
                        setSelectedJobId(Number(e.target.value))
                    }
                >

                    <option value="">
                        Select a Job
                    </option>

                    {jobs.map(job => (

                        <option
                            key={job.id}
                            value={job.id}
                        >
                            {job.title}
                        </option>

                    ))}

                </select>

            )}

            <br />
            <br />

            <button
                onClick={handleCalculate}
                disabled={loadingScore}
            >
                {loadingScore
                    ? "Calculating..."
                    : "Calculate ATS Score"}
            </button>

            <br />
            <br />

            {error && (

                <p>

                    <strong>Error:</strong> {error}

                </p>

            )}

            {score && (

                <div>

                    <hr />

                    <h2>ATS Result</h2>

                    <p>

                        <strong>Overall Score:</strong>{" "}
                        {score.overallScore}

                    </p>

                    <h3>Matched Keywords</h3>

                    <pre>{score.matchedKeywords}</pre>

                    <h3>Missing Keywords</h3>

                    <pre>{score.missingKeywords}</pre>

                    <h3>Recommendations</h3>

                    <p>{score.recommendationsSummary}</p>

                </div>

            )}

        </div>

    );
}

export default ResumeScore;