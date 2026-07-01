import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { applyForJob } from "../../services/applicationService";
import { getMyResumes, uploadResume } from "../../services/resumeService";

import type { ResumeResponse } from "../../types/resume";
import type { ApplicationResultResponse} from "../../types/application";

function ApplyForJob() {
    const { jobId } = useParams();

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
        if (!jobId) {
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

            const response = await applyForJob(Number(jobId), {
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
        <div>
            <h1>Apply for Job</h1>

            <p>
                <strong>Job ID:</strong> {jobId}
            </p>

            <hr />

            <h2>Select Existing Resume</h2>

            {loadingResumes ? (
                <p>Loading resumes...</p>
            ) : resumes.length === 0 ? (
                <p>No resumes available.</p>
            ) : (
                resumes.map((resume) => (
                    <div key={resume.id}>
                        <label>
                            <input
                                type="radio"
                                name="resume"
                                value={resume.id}
                                checked={selectedResumeId === resume.id}
                                onChange={() =>
                                    setSelectedResumeId(resume.id)
                                }
                            />

                            {resume.fileName}
                        </label>
                    </div>
                ))
            )}

            <hr />

            <h2>Upload New Resume</h2>

            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setSelectedFile(e.target.files[0]);
                    }
                }}
            />

            <br />
            <br />

            <button
                onClick={handleUpload}
                disabled={uploading || selectedFile === null}
            >
                {uploading ? "Uploading..." : "Upload Resume"}
            </button>

            <hr />

            <button
                onClick={handleApply}
                disabled={applying}
            >
                {applying ? "Applying..." : "Apply"}
            </button>

            <br />
            <br />

            {error && (
                <p>
                    <strong>Error:</strong> {error}
                </p>
            )}

            {success && (
                <p>
                    <strong>{success}</strong>
                </p>
            )}

            {result && (
                <div>
                    <hr />

                    <h2>Application Result</h2>

                    <p>
                        <strong>Application ID:</strong> {result.applicationId}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {result.status}
                    </p>

                    <p>
                        <strong>Score:</strong> {result.score}
                    </p>

                    <p>
                        <strong>Message:</strong> {result.message}
                    </p>

                    <h3>Suggestions</h3>

                    <pre>{JSON.stringify(result.suggestions, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ApplyForJob;