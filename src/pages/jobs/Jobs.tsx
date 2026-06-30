import { useEffect } from "react";
import { useState } from "react";
import { getJobs } from "../../services/jobService";
import type { JobResponse } from "../../types/job";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Jobs() {

    const {user} = useAuth();

    const [jobs, setJobs] = useState<JobResponse[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const size = 10;

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getJobs(page, size);
                const jobsList = Array.isArray(data?.content)
                    ? data.content
                    : [];
                setJobs(jobsList);
                setTotalPages(data?.totalPages || 0);
            } catch{
                setError("Failed to fetch jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [page]);


    return (
        <div>
            <h1>Jobs Page</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {jobs.map((job) => (
                   <Link key={job.id} to={`/jobs/${job.id}`}>
                        <li>
                            <h2>{job.title}</h2>
                            <p>{job.description.slice(0, 100)}...</p>
                            <p>Type: {job.jobType}</p>
                            </li>
                    </Link>
                ))}
            </ul>

            <div>
                <button
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span> Page {page + 1} of {totalPages} </span>
                <button
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                >
                    Next
                </button>
            </div>

            {user?.role === "ADMIN" && (
                <Link to="/jobs/create">
                    <button>Create Job</button>
                </Link>
            )}

        </div>

    )

}

export default Jobs