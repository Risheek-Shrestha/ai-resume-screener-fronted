import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { applyForJob } from "../../services/applicationService";
import { getMyResumes, uploadResume } from "../../services/resumeService";

import type { ResumeResponse } from "../../types/resume";
import type { ApplicationResultResponse} from "../../types/application";

import {
    CheckCircle2,
    FileText,
    Sparkles,
    Upload,
    XCircle,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

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
        } catch {
            setError("Failed to upload resume.");
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
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to apply for the job.");
            }
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-2xl">

                <div className="mb-8">
                    <h1 className="text-4xl font-black">
                        Apply for Job
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Job ID: <span className="text-slate-200">{id}</span>
                    </p>
                </div>

                <Card className="border-slate-800 bg-slate-900 text-white" padding="lg">

                    <h2 className="text-lg font-semibold">
                        Select Existing Resume
                    </h2>

                    <div className="mt-4 space-y-3">

                        {loadingResumes ? (
                            <Loader size="sm" text="Loading resumes..." />
                        ) : resumes.length === 0 ? (
                            <p className="text-sm text-slate-400">
                                No resumes available.
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
                                        {resume.fileName}
                                    </span>
                                </label>
                            ))
                        )}

                    </div>

                    <div className="mt-8 border-t border-slate-800 pt-6">

                        <h2 className="text-lg font-semibold">
                            Upload New Resume
                        </h2>

                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setSelectedFile(e.target.files[0]);
                                }
                            }}
                            className="mt-4 block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-cyan-400 hover:file:bg-slate-700"
                        />

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
                            disabled={applying}
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
                        <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                            {success}
                        </div>
                    )}

                    {result && (
                        <div className="mt-8 border-t border-slate-800 pt-6">

                            <h2 className="text-lg font-semibold">
                                Application Result
                            </h2>

                            <div className="mt-4 space-y-3 text-sm">

                                <p className="flex justify-between text-slate-300">
                                    <span className="text-slate-500">Application ID</span>
                                    {result.applicationId}
                                </p>

                                <p className="flex items-center justify-between text-slate-300">
                                    <span className="text-slate-500">Status</span>
                                    <Badge
                                        variant={
                                            result.status === "REJECTED"
                                                ? "danger"
                                                : "success"
                                        }
                                    >
                                        {result.status === "REJECTED" ? (
                                            <XCircle size={12} className="mr-1" />
                                        ) : (
                                            <CheckCircle2 size={12} className="mr-1" />
                                        )}
                                        {result.status}
                                    </Badge>
                                </p>

                                <p className="flex justify-between text-slate-300">
                                    <span className="text-slate-500">Score</span>
                                    <span className="font-semibold text-cyan-400">
                                        {result.score}
                                    </span>
                                </p>

                                <p className="text-slate-300">
                                    <span className="text-slate-500">Message: </span>
                                    {result.message}
                                </p>

                            </div>

                            <h3 className="mt-6 text-sm font-semibold text-slate-400">
                                Suggestions
                            </h3>

                            <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300 scrollbar-thin">
                                {JSON.stringify(result.suggestions, null, 2)}
                            </pre>

                        </div>
                    )}

                </Card>

            </div>

        </div>
    );
}

export default ApplyForJob;
