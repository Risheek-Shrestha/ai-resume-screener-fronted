import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyResumes, deleteResume } from "../../services/resumeService";

import type { ResumeResponse } from "../../types/resume";

import { FileText, Plus, Trash2, TrendingUp } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";

function MyResumes() {

    const [resumes, setResumes] = useState<ResumeResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadResumes();
    }, []);

    const loadResumes = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMyResumes();
            setResumes(data);

        } catch {
            setError("Failed to load resumes.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteResume(id);
            await loadResumes();
        } catch {
            setError("Failed to delete resume.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-4xl">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-4xl font-black">
                            My Resumes
                        </h1>
                        <p className="mt-2 text-slate-400">
                            Manage your uploaded resumes and check ATS scores.
                        </p>
                    </div>

                    <Link to="/resume/upload">
                        <Button>
                            <Plus size={18} className="mr-2" />
                            Upload Resume
                        </Button>
                    </Link>

                </div>

                {loading && (
                    <div className="mt-16">
                        <Loader text="Loading resumes..." />
                    </div>
                )}

                {error && (
                    <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {!loading && resumes.length === 0 && (
                    <div className="mt-10">
                        <EmptyState
                            icon={FileText}
                            title="No resumes uploaded yet"
                            description="Upload your first resume to start applying for jobs."
                            action={
                                <Link to="/resume/upload">
                                    <Button variant="outline">
                                        <Plus size={16} className="mr-2" />
                                        Upload Resume
                                    </Button>
                                </Link>
                            }
                        />
                    </div>
                )}

                {!loading && resumes.length > 0 && (
                    <div className="mt-10 space-y-5">

                        {resumes.map((resume) => (
                            <Card
                                key={resume.id}
                                className="border-slate-800 bg-slate-900 text-white"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-4">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                            <FileText size={20} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-white">
                                                {resume.resumeName}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-400">
                                                {resume.fileName}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <Link to={`/resume/${resume.id}/score`}>
                                            <Button variant="outline" size="sm">
                                                <TrendingUp size={16} className="mr-2" />
                                                View ATS Score
                                            </Button>
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(resume.id)}
                                            className="rounded-xl border border-slate-800 p-2.5 text-slate-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                                            aria-label="Delete resume"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>

                                </div>
                            </Card>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default MyResumes;
