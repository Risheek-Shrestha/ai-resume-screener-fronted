import { useState } from "react";
import { uploadResume } from "../../services/resumeService";
import { useNavigate } from "react-router-dom";

function UploadResume() {

    const [resumeName, setResumeName] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {navigate} = useNavigate();

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

            // Reset file input
            const input = document.getElementById("resumeFile") as HTMLInputElement;
            if (input) {
                input.value = "";
                
            }

            navigate("/MyResumes");

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
        <div>

            <h1>Upload Resume</h1>

            <div>
                <label>Resume Name</label>
                <br />

                <input
                    type="text"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    placeholder="Enter resume name"
                />
            </div>

            <br />

            <div>
                <label>Select Resume</label>
                <br />

                <input
                    id="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
            </div>

            <br />

            <button
                onClick={handleUpload}
                disabled={loading}
            >
                {loading ? "Uploading..." : "Upload Resume"}
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

        </div>
    );
}

export default UploadResume;