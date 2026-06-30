import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import type { JobResponse } from "../../types/job";
import { getJobsById } from "../../services/jobService";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function JobDetails() {

    const { user, isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState<JobResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    function renderApplyButton(job: JobResponse, isAuthenticated: boolean) {
        if (!isAuthenticated) return null;

        if (job.applicationStatus === "OPEN") {
            return <Link to={`/jobs/${job.id}/apply`}>Apply</Link>;
        }
        if (job.applicationStatus === "NOT_STARTED") {
            return <p>Applications open soon</p>;
        }
        if (job.applicationStatus === "CLOSED") {
            return <p>Applications closed</p>;
        }
        return null;
    }

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!id) {
                    setError("Invalid job id");
                    return;
                }

                const data = await getJobsById(Number(id));
                setJobs(data);
            } catch {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [id]);

    return (

        <div>
            <h1>Jobs Page</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {jobs && (
                    <li key={jobs.id}>
                        <h2>{jobs.title}</h2>   
                        <p>{jobs.description}</p>
                        <p>Type: {jobs.jobType}</p>
                        <p>Application Start: {jobs.applicationStartsAt}</p>
                        <p>Application Deadline: {jobs.applicationDeadline}</p>
                        {renderApplyButton(jobs, isAuthenticated)}
                    </li>
                )}

            </ul>

            {user?.role === "ADMIN" && (
                <Link to="/jobs/create">
                    <button>Create Job</button>
                </Link>
            )}

        </div>
    );
}

export default JobDetails