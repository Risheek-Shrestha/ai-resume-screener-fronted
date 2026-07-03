import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

import { applyForJob } from "../../services/applicationService";
import { getMyResumes, uploadResume } from "../../services/resumeService";

import type { ResumeResponse } from "../../types/resume";
import type { ApplicationResultResponse } from "../../types/application";

import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle2,
    FileText,
    GraduationCap,
    Lightbulb,
    ListChecks,
    Sparkles,
    Upload,
    XCircle,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Dropzone from "../../components/ui/Dropzone";
import ScoreGauge from "../../components/ui/ScoreGauge";
import { getErrorMessage } from "../../utils/getErrorMessage";

function SuggestionSection({
    title,
    icon: Icon,
    tone = "slate",
    children,
}: {
    title: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    tone?: "slate" | "red" | "amber" | "cyan" | "emerald";
    children: ReactNode;
}) {
    const toneClasses: Record<string, string> = {
        slate: "bg-slate-800 text-slate-300",
        red: "bg-red-500/10 text-red-400",
        amber: "bg-amber-500/10 text-amber-400",
        cyan: "bg-cyan-500/10 text-cyan-400",
        emerald: "bg-emerald-500/10 text-emerald-400",
    };

    return (
        <div>
            <div className="mb-3 flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
                    <Icon size={14} />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}

function ChipList({ items, tone }: { items: string[]; tone: "red" | "cyan" }) {
    const chipClasses =
        tone === "red"
            ? "bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-500/25"
            : "bg-cyan-500/10 text-cyan-300 ring-1 ring-inset ring-cyan-500/25";

    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span key={item} className={`rounded-full px-3 py-1 text-sm font-medium ${chipClasses}`}>
                    {item}
                </span>
            ))}
        </div>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

function StepList({ items }: { items: string[] }) {
    return (
        <ol className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-xs font-semibold text-cyan-300">
                        {i + 1}
                    </span>
                    {item}
                </li>
            ))}
        </ol>
    );
}

const scoreLevelTone = (level?: string) => {
    const normalized = (level ?? "").toLowerCase();
    if (normalized.includes("strong") || normalized.includes("excellent") || normalized.includes("high")) return "success" as const;
    if (normalized.includes("weak") || normalized.includes("low") || normalized.includes("poor")) return "danger" as const;
    return "warning" as const;
};

function ApplyForJob() {
    const { id } = useParams();

    const [resumes, setResumes] = useState<ResumeResponse[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [loadingResumes, setLoadingResumes] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [applying, setApplying] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [result, setResult] =
        useState<ApplicationResultResponse | null>(null);

    useEffect(() => {
        loadResumes();
    }, []);

    const loadResumes = async () => {
        try {
            setLoadingResumes(true);
            setError("");

            const data = await getMyResumes();

            setResumes(data);

            if (data.length > 0) {
                setSelectedResumeId(data[0].id);
            }
        } catch {
            setError("Failed to load resumes.");
        } finally {
            setLoadingResumes(false);
        }
    };


    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please choose a resume.");
            return;
        }

        try {
            setUploading(true);
            setError("");
            setSuccess("");

            const uploadedResume = await uploadResume(
                selectedFile,
                selectedFile.name
            );

            setSuccess("Resume uploaded successfully.");

            await loadResumes();

            setSelectedResumeId(uploadedResume.id);

            setSelectedFile(null);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to upload resume."));
        } finally {
            setUploading(false);
        }
    };

    const handleApply = async () => {
        if (!id) {
            setError("Invalid job.");
            return;
        }

        if (selectedResumeId === null) {
            setError("Please select or upload a resume.");
            return;
        }

        try {
            setApplying(true);
            setError("");

            const response = await applyForJob(Number(id), {
                resumeId: selectedResumeId,
            });

            setResult(response);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to apply for the job."));
        } finally {
            setApplying(false);
        }
    };

    const suggestions = result?.suggestions;

    return (
        <div className="mx-auto max-w-2xl px-6 py-16">

            <Link
                to={id ? `/jobs/${id}` : "/jobs"}
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
            >
                <ArrowLeft size={16} />
                Back to job
            </Link>

            {!result && (
                <div className="mb-8">
                    <h1 className="font-display text-4xl font-bold">
                        Apply for Job
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Job ID: <span className="text-slate-200">{id}</span>
                    </p>
                </div>
            )}

            {!result && (
                <Card padding="lg">

                    <h2 className="text-lg font-semibold">
                        Select Existing Resume
                    </h2>

                    <div className="mt-4 space-y-3">

                        {loadingResumes ? (
                            <Loader size="sm" text="Loading resumes..." />
                        ) : resumes.length === 0 ? (
                            <p className="text-sm text-slate-400">
                                No resumes available. Upload one below.
                            </p>
                        ) : (
                            resumes.map((resume) => (
                                <label
                                    key={resume.id}
                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                                        selectedResumeId === resume.id
                                            ? "border-cyan-500 bg-cyan-500/10"
                                            : "border-slate-800 bg-slate-950 hover:border-slate-700"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="resume"
                                        value={resume.id}
                                        checked={selectedResumeId === resume.id}
                                        onChange={() =>
                                            setSelectedResumeId(resume.id)
                                        }
                                        className="h-4 w-4 accent-cyan-500"
                                    />

                                    <FileText size={16} className="text-cyan-400" />

                                    <span className="text-sm text-slate-200">
                                        {resume.resumeName || resume.fileName}
                                    </span>
                                </label>
                            ))
                        )}

                    </div>

                    <div className="mt-8 border-t border-slate-800 pt-6">

                        <h2 className="text-lg font-semibold">
                            Upload New Resume
                        </h2>

                        <div className="mt-4">
                            <Dropzone
                                inputId="applyResumeFile"
                                file={selectedFile}
                                onFileSelect={setSelectedFile}
                                hint="PDF, DOC, or DOCX"
                            />
                        </div>

                        <Button
                            onClick={handleUpload}
                            disabled={uploading || selectedFile === null}
                            variant="secondary"
                            className="mt-4"
                        >
                            <Upload size={16} className="mr-2" />
                            {uploading ? "Uploading..." : "Upload Resume"}
                        </Button>

                    </div>

                    <div className="mt-8 border-t border-slate-800 pt-6">
                        <Button
                            onClick={handleApply}
                            disabled={applying || selectedResumeId === null}
                            fullWidth
                            size="lg"
                        >
                            <Sparkles size={18} className="mr-2" />
                            {applying ? "Applying..." : "Apply"}
                        </Button>
                    </div>

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                            {success}
                        </div>
                    )}

                </Card>
            )}

            {result && (
                <div className="space-y-6">

                    <Card padding="lg">

                        <div className="flex items-center gap-4">
                            <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                                    result.status === "REJECTED"
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-emerald-500/10 text-emerald-400"
                                }`}
                            >
                                {result.status === "REJECTED" ? (
                                    <XCircle size={22} />
                                ) : (
                                    <CheckCircle2 size={22} />
                                )}
                            </div>

                            <div>
                                <h1 className="font-display text-2xl font-bold">
                                    Application {result.status === "REJECTED" ? "not shortlisted" : "submitted"}
                                </h1>
                                <p className="mt-1 text-sm text-slate-400">
                                    {result.message}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-800 pt-6 text-sm">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-500">Application</p>
                                <p className="mt-1 font-semibold text-slate-200">#{result.applicationId}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
                                <Badge variant={result.status === "REJECTED" ? "danger" : "success"} className="mt-1">
                                    {result.status}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
                                <p className="mt-1 font-semibold text-cyan-400">{result.score}</p>
                            </div>
                        </div>

                    </Card>

                    {suggestions && (
                        <Card padding="lg">

                            <div className="flex flex-col items-center gap-6 border-b border-slate-800 pb-8 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="font-display text-xl font-bold">
                                        Resume feedback
                                    </h2>
                                    <p className="mt-1 max-w-sm text-sm text-slate-400">
                                        How this resume matched the role, and what would raise the score.
                                    </p>
                                    {suggestions.scoreLevel && (
                                        <Badge variant={scoreLevelTone(suggestions.scoreLevel)} className="mt-3">
                                            {suggestions.scoreLevel}
                                        </Badge>
                                    )}
                                </div>
                                <ScoreGauge score={suggestions.currentScore} size={140} />
                            </div>

                            <div className="mt-8 space-y-8">

                                {suggestions.missingSkills?.length > 0 && (
                                    <SuggestionSection title="Missing skills" icon={XCircle} tone="red">
                                        <ChipList items={suggestions.missingSkills} tone="red" />
                                    </SuggestionSection>
                                )}

                                {suggestions.weakAreas?.length > 0 && (
                                    <SuggestionSection title="Weak areas" icon={AlertTriangle} tone="amber">
                                        <BulletList items={suggestions.weakAreas} />
                                    </SuggestionSection>
                                )}

                                {suggestions.actionableSteps?.length > 0 && (
                                    <SuggestionSection title="Actionable steps" icon={ListChecks} tone="cyan">
                                        <StepList items={suggestions.actionableSteps} />
                                    </SuggestionSection>
                                )}

                                {suggestions.suggestedLearningPaths?.length > 0 && (
                                    <SuggestionSection title="Suggested learning paths" icon={GraduationCap} tone="cyan">
                                        <ChipList items={suggestions.suggestedLearningPaths} tone="cyan" />
                                    </SuggestionSection>
                                )}

                                {suggestions.resumeImprovementTips?.length > 0 && (
                                    <SuggestionSection title="Resume improvement tips" icon={Lightbulb} tone="emerald">
                                        <BulletList items={suggestions.resumeImprovementTips} />
                                    </SuggestionSection>
                                )}

                            </div>

                        </Card>
                    )}

                    <div className="flex flex-wrap gap-4">
                        <Link to="/applications">
                            <Button variant="outline">
                                View my applications
                            </Button>
                        </Link>
                        <Link to="/jobs">
                            <Button variant="ghost">
                                Browse more jobs
                            </Button>
                        </Link>
                    </div>

                </div>
            )}

        </div>
    );
}

export default ApplyForJob;