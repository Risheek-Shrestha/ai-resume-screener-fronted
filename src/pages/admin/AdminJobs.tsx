import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteJob, getMyJobs } from "../../services/jobService";

import type { JobResponse } from "../../types/job";

function AdminJobs() {

    const [jobs, setJobs] = useState<JobResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getMyJobs(0, 20);

            const jobsList = Array.isArray(data)
                ? data
                : data.content;

            setJobs(jobsList);

        } catch {

            setError("Unable to load jobs.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id: number) => {

        const confirmed = window.confirm(
            "Delete this job?"
        );

        if (!confirmed) return;

        try {

            await deleteJob(id);

            loadJobs();

        } catch {

            setError("Unable to delete job.");

        }

    };

    return (

        <div>

            <h1>My Posted Jobs</h1>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && jobs.length === 0 && (
                <p>No jobs posted yet.</p>
            )}

            {jobs.map(job => (

                <div key={job.id}>

                    <hr />

                    <h2>{job.title}</h2>

                    <p>{job.description}</p>

                    <p>
                        <strong>Type:</strong> {job.jobType}
                    </p>

                    <p>
                        <strong>Experience:</strong> {job.experienceLevel}
                    </p>

                    <p>
                        <strong>Status:</strong> {job.applicationStatus}
                    </p>

                    <Link to={`/admin/jobs/${job.id}/edit`}>
                        <button>Edit</button>
                    </Link>

                    {" "}

                    <button
                        onClick={() =>
                            handleDelete(job.id)
                        }
                    >
                        Delete
                    </button>

                    {" "}

                    <Link
                        to={`/admin/jobs/${job.id}/applications`}
                    >
                        <button>
                            Applications
                        </button>
                    </Link>

                    {" "}

                    <Link
                        to={`/admin/jobs/${job.id}/accepted`}
                    >
                        <button>
                            Accepted
                        </button>
                    </Link>

                </div>

            ))}

        </div>

    );

}

export default AdminJobs;