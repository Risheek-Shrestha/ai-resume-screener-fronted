import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyResumes, deleteResume } from "../../services/resumeService";

import type { ResumeResponse } from "../../types/resume";

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
        <div>

            <h1>My Resumes</h1>

            <Link to="/resume/upload">
                <button>Upload Resume</button>
            </Link>

            <hr />

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {!loading && resumes.length === 0 && (
                <p>No resumes uploaded yet.</p>
            )}

            {resumes.map((resume) => (
                <div key={resume.id}>

                    <h3>{resume.fileName}</h3>

                    <p>
                        <strong>Resume Name:</strong> {resume.resumeName}
                    </p>

                    <Link to={`/resume/${resume.id}/score`}>
                        <button>View ATS Score</button>
                    </Link>

                    {" "}

                    <button
                        onClick={() => handleDelete(resume.id)}
                    >
                        Delete
                    </button>

                    <hr />

                </div>
            ))}

        </div>
    );
}

export default MyResumes;