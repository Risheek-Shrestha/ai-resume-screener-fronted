import { useState } from "react";
import { uploadResume } from "../../services/resumeService";
import { Link, useNavigate } from "react-router-dom";

import { ArrowLeft, UploadCloud } from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Dropzone from "../../components/ui/Dropzone";
import { getErrorMessage } from "../../utils/getErrorMessage";

function UploadResume() {

    const [resumeName, setResumeName] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleUpload = async () => {

        setError("");
        setSuccess("");

        if (!resumeName.trim()) {
            setError("Please enter a resume name.");
            return;
        }

        if (!file) {
            setError("Please choose a resume file.");
            return;
        }

        try {
            setLoading(true);

            await uploadResume(file, resumeName);

            setSuccess("Resume uploaded successfully.");

            setResumeName("");
            setFile(null);

            navigate("/resume");

        } catch (err) {
            setError(getErrorMessage(err, "Failed to upload resume."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-[80vh] items-center justify-center px-6 py-16">

            <div className="w-full max-w-md">

                <Link
                    to="/resume"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
                >
                    <ArrowLeft size={16} />
                    Back to my resumes
                </Link>

                <Card padding="lg" className="shadow-2xl">

                    <div className="mb-8 text-center">

                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                            <UploadCloud size={26} />
                        </div>

                        <h1 className="font-display text-3xl font-bold">
                            Upload Resume
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Add a resume so you can apply for jobs and check ATS scores.
                        </p>

                    </div>

                    <div className="space-y-6">

                        <Input
                            label="Resume Name"
                            value={resumeName}
                            onChange={(e) => setResumeName(e.target.value)}
                            placeholder="e.g. Senior Backend Engineer — 2026"
                        />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Select Resume
                            </label>

                            <Dropzone
                                inputId="resumeFile"
                                file={file}
                                onFileSelect={setFile}
                                hint="PDF, DOC, or DOCX"
                            />
                        </div>

                        <Button
                            onClick={handleUpload}
                            disabled={loading}
                            fullWidth
                            size="lg"
                        >
                            {loading ? "Uploading..." : "Upload Resume"}
                        </Button>

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                                {success}
                            </div>
                        )}

                    </div>

                </Card>

            </div>

        </div>
    );
}

export default UploadResume;