import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobs } from "../../services/jobService";
import { generateScore } from "../../services/scoreService";

import type { JobResponse } from "../../types/job";
import type { ScoreResponse } from "../../types/score";

import { Sparkles, Target } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/common/Button";
import ScoreGauge from "../../components/ui/ScoreGauge";
import EmptyState from "../../components/ui/EmptyState";

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
        return <p className="text-sm italic text-slate-500">None found.</p>;
    }

    const chipClasses =
        tone === "matched"
            ? "bg-cyan-500/10 text-cyan-300 ring-1 ring-inset ring-cyan-500/25"
            : "bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-500/25";

    return (
        <div className="flex flex-wrap gap-2">
            {items.map((keyword, idx) => (
                <span
                    key={idx}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${chipClasses}`}
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

        <div className="mx-auto max-w-3xl px-6 py-16">

            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-white">
                    Resume ATS Score
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                    Resume #{resumeId}
                </p>
            </div>

            <Card className="mb-6" padding="lg">

                <label className="mb-2 block text-sm font-semibold text-slate-300">
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
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                    >
                        <option value="">Select a job</option>

                        {jobs.map(job => (
                            <option key={job.id} value={job.id}>
                                {job.title}
                            </option>
                        ))}
                    </select>
                )}

                <Button
                    onClick={handleCalculate}
                    disabled={loadingScore}
                    className="mt-4 sm:w-auto"
                >
                    <Sparkles size={16} className="mr-2" />
                    {loadingScore ? "Calculating…" : "Calculate ATS score"}
                </Button>

                {error && (
                    <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

            </Card>

            {!score && !loadingScore && (
                <EmptyState
                    icon={Target}
                    title="No score yet"
                    description="Pick a job above and calculate your score to see matched keywords, gaps and recommendations."
                />
            )}

            {score && (

                <Card padding="lg">

                    <div className="mb-8 flex flex-col items-center border-b border-slate-800 pb-8">
                        <ScoreGauge score={score.overallScore} />
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">

                        <div>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                                Matched keywords
                            </h3>
                            <KeywordChips
                                keywords={score.matchedKeywords}
                                tone="matched"
                            />
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-red-400">
                                Missing keywords
                            </h3>
                            <KeywordChips
                                keywords={score.missingKeywords}
                                tone="missing"
                            />
                        </div>

                    </div>

                    <div className="mt-8 border-t border-slate-800 pt-6">
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                            Recommendations
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-300">
                            {score.recommendationsSummary}
                        </p>
                    </div>

                </Card>

            )}

        </div>

    );
}

export default ResumeScore;