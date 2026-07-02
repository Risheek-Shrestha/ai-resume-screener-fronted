import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobs } from "../../services/jobService";
import { generateScore } from "../../services/scoreService";

import type { JobResponse } from "../../types/job";
import type { ScoreResponse } from "../../types/score";

function ScoreGauge({ score }: { score: number }) {

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const color =
        score >= 75 ? "#0EA5A0" : score >= 50 ? "#D97706" : "#DC2626";

    return (
        <div className="relative w-44 h-44 flex items-center justify-center">
            <svg width="176" height="176" className="-rotate-90">
                <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                />
                <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    stroke={color}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-700 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="font-display text-4xl font-bold text-slate-800">
                    {score}
                </span>
                <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                    ATS Score
                </span>
            </div>
        </div>
    );
}

function KeywordChips({
    keywords,
    tone,
}: {
    keywords: string;
    tone: "matched" | "missing";
}) {

    let items: string[] = [];

    try {
        const parsed = JSON.parse(keywords);
        items = Array.isArray(parsed) ? parsed : [];
    } catch {
        items = keywords
            ? keywords.split(",").map((k) => k.trim()).filter(Boolean)
            : [];
    }

    if (items.length === 0) {
        return <p className="text-sm text-slate-400 italic">None found.</p>;
    }

    const chipClasses =
        tone === "matched"
            ? "bg-teal-50 text-teal-700 border border-teal-200"
            : "bg-red-50 text-red-700 border border-red-200";

    return (
        <div className="flex flex-wrap gap-2">
            {items.map((keyword, idx) => (
                <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${chipClasses}`}
                >
                    {keyword}
                </span>
            ))}
        </div>
    );
}

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

        <div className="max-w-3xl mx-auto px-4 py-10">

            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-slate-800">
                    Resume ATS Score
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Resume #{resumeId}
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Match against a job
                </label>

                {loadingJobs ? (

                    <p className="text-sm text-slate-400">Loading jobs…</p>

                ) : (

                    <select
                        value={selectedJobId ?? ""}
                        onChange={(e) =>
                            setSelectedJobId(Number(e.target.value))
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >

                        <option value="">Select a job</option>

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

                <button
                    onClick={handleCalculate}
                    disabled={loadingScore}
                    className="mt-4 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loadingScore
                        ? "Calculating…"
                        : "Calculate ATS score"}
                </button>

                {error && (

                    <p className="mt-3 text-sm font-medium text-red-600">
                        {error}
                    </p>

                )}

            </div>

            {score && (

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">

                    <div className="flex flex-col items-center border-b border-slate-100 pb-8 mb-8">
                        <ScoreGauge score={score.overallScore} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-700 mb-3">
                                Matched keywords
                            </h3>
                            <KeywordChips
                                keywords={score.matchedKeywords}
                                tone="matched"
                            />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-red-600 mb-3">
                                Missing keywords
                            </h3>
                            <KeywordChips
                                keywords={score.missingKeywords}
                                tone="missing"
                            />
                        </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
                            Recommendations
                        </h3>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {score.recommendationsSummary}
                        </p>
                    </div>

                </div>

            )}

        </div>

    );
}

export default ResumeScore;