import { useEffect } from "react";
import { useState } from "react";
import { getJobs } from "../../services/jobService";
import type { JobResponse } from "../../types/job";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BriefcaseBusiness, Plus, ArrowRight } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Pagination from "../../components/ui/Pagination";

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
        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-5xl">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-4xl font-black">
                            Open Positions
                        </h1>
                        <p className="mt-2 text-slate-400">
                            Browse current openings and apply with your resume.
                        </p>
                    </div>

                    {user?.role === "ADMIN" && (
                        <Link to="/jobs/create">
                            <Button>
                                <Plus size={18} className="mr-2" />
                                Create Job
                            </Button>
                        </Link>
                    )}

                </div>

                {loading && (
                    <div className="mt-16">
                        <Loader text="Loading jobs..." />
                    </div>
                )}

                {error && (
                    <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {!loading && !error && jobs.length === 0 && (
                    <div className="mt-10">
                        <EmptyState
                            icon={BriefcaseBusiness}
                            title="No jobs available"
                            description="There are no open positions right now. Check back soon."
                        />
                    </div>
                )}

                {!loading && jobs.length > 0 && (
                    <div className="mt-10 space-y-5">

                        {jobs.map((job) => (
                            <Link key={job.id} to={`/jobs/${job.id}`}>
                                <Card
                                    hover
                                    className="border-slate-800 bg-slate-900 text-white"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                        <div className="flex-1">

                                            <div className="flex flex-wrap items-center gap-3">
                                                <h2 className="text-xl font-semibold">
                                                    {job.title}
                                                </h2>
                                                <Badge variant="primary">
                                                    {job.jobType}
                                                </Badge>
                                            </div>

                                            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                                {job.description.slice(0, 140)}...
                                            </p>

                                        </div>

                                        <ArrowRight
                                            size={20}
                                            className="mt-1 shrink-0 text-cyan-400"
                                        />

                                    </div>
                                </Card>
                            </Link>
                        ))}

                    </div>
                )}

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

            </div>

        </div>

    )

}

export default Jobs
