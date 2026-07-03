import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobs } from "../../services/jobService";
import { generateScore } from "../../services/scoreService";

import type { JobResponse } from "../../types/job";
import type { ScoreResponse } from "../../types/score";

import { Sparkles } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/common/Button";

function ScoreGauge({ score }: { score: number }) {

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const color =
        score >= 75 ? "#22D3EE" : score >= 50 ? "#F59E0B" : "#EF4444";

    return (
        <div className="relative w-44 h-44 flex items-center justify-center">
            <svg width="176" height="176" className="-rotate-90">
                <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    stroke="#1E293B"
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
                <span className="font-display text-4xl font-bold text-white">
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
        return <p className="text-sm text-slate-500 italic">None found.</p>;
    }

    const chipClasses =
        tone === "matched"
            ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
            : "bg-red-500/10 text-red-400 border border-red-500/30";

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

        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="max-w-3xl mx-auto">

                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold text-white">
                        Resume ATS Score
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Resume #{resumeId}
                    </p>
                </div>

                <Card className="border-slate-800 bg-slate-900 text-white mb-6" padding="lg">

                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Match against a job
                    </label>

                    {loadingJobs ? (

                        <p className="text-sm text-slate-500">Loading jobs…</p>

                    ) : (

                        <select
                            value={selectedJobId ?? ""}
                            onChange={(e) =>
                                setSelectedJobId(Number(e.target.value))
                            }
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
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

                    <Button
                        onClick={handleCalculate}
                        disabled={loadingScore}
                        fullWidth
                        className="mt-4 sm:w-auto"
                    >
                        <Sparkles size={16} className="mr-2" />
                        {loadingScore
                            ? "Calculating…"
                            : "Calculate ATS score"}
                    </Button>

                    {error && (

                        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                            {error}
                        </div>

                    )}

                </Card>

                {score && (

                    <Card className="border-slate-800 bg-slate-900 text-white" padding="lg">

                        <div className="flex flex-col items-center border-b border-slate-800 pb-8 mb-8">
                            <ScoreGauge score={score.overallScore} />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">

                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-400 mb-3">
                                    Matched keywords
                                </h3>
                                <KeywordChips
                                    keywords={score.matchedKeywords}
                                    tone="matched"
                                />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-red-400 mb-3">
                                    Missing keywords
                                </h3>
                                <KeywordChips
                                    keywords={score.missingKeywords}
                                    tone="missing"
                                />
                            </div>

                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-2">
                                Recommendations
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {score.recommendationsSummary}
                            </p>
                        </div>

                    </Card>

                )}

            </div>

        </div>

    );
}

export default ResumeScore;
