import { useState } from "react";
import { uploadResume } from "../../services/resumeService";
import { useNavigate } from "react-router-dom";

import { UploadCloud } from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

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

            const input = document.getElementById("resumeFile") as HTMLInputElement;
            if (input) {
                input.value = "";
                
            }

            navigate("/resume");

        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to upload resume.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">

            <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

            <Card
                className="relative w-full max-w-md border-slate-800 bg-slate-900 text-white shadow-2xl"
                padding="lg"
            >

                <div className="mb-8 text-center">

                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                        <UploadCloud size={26} />
                    </div>

                    <h1 className="text-3xl font-bold">
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
                        placeholder="Enter resume name"
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Select Resume
                        </label>

                        <input
                            id="resumeFile"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setFile(e.target.files[0]);
                                }
                            }}
                            className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-cyan-400 hover:file:bg-slate-700"
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
                        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                            {success}
                        </div>
                    )}

                </div>

            </Card>

        </div>
    );
}

export default UploadResume;
