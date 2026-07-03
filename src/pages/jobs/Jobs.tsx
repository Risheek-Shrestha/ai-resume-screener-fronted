import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../../services/jobService";
import type { JobResponse } from "../../types/job";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BriefcaseBusiness, Plus, ArrowRight, Search } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Pagination from "../../components/ui/Pagination";

function Jobs() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState<JobResponse[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
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
            } catch {
                setError("Failed to fetch jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [page]);

    const visibleJobs = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return jobs;

        return jobs.filter((job) => {
            const haystack = [
                job.title,
                job.jobType,
                job.experienceLevel,
                ...(job.skills ?? []),
            ]
                .join(" ")
                .toLowerCase();

            return haystack.includes(q);
        });
    }, [jobs, query]);

    return (
        <div className="mx-auto max-w-5xl px-6 py-16">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="font-display text-4xl font-bold">
                        Open Positions
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Browse current openings and apply with your resume.
                    </p>
                </div>

                {user?.role === "ADMIN" && (
                    <Link to="/admin/jobs/create">
                        <Button>
                            <Plus size={18} className="mr-2" />
                            Create Job
                        </Button>
                    </Link>
                )}

            </div>

            {!loading && !error && jobs.length > 0 && (
                <div className="relative mt-8 max-w-md">
                    <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title or skill on this page..."
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    />
                </div>
            )}

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

            {!loading && !error && jobs.length > 0 && visibleJobs.length === 0 && (
                <div className="mt-10">
                    <EmptyState
                        icon={Search}
                        title="No matches on this page"
                        description={`Nothing here matches "${query}". Try another page or a different term.`}
                    />
                </div>
            )}

            {!loading && visibleJobs.length > 0 && (
                <div className="mt-8 space-y-5">

                    {visibleJobs.map((job) => (
                        <Link key={job.id} to={`/jobs/${job.id}`}>
                            <Card hover>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div className="flex-1">

                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-xl font-semibold">
                                                {job.title}
                                            </h2>
                                            <Badge variant="primary">
                                                {job.jobType}
                                            </Badge>
                                            <Badge variant="secondary">
                                                {job.experienceLevel}
                                            </Badge>
                                        </div>

                                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                            {job.description.length > 140
                                                ? `${job.description.slice(0, 140)}…`
                                                : job.description}
                                        </p>

                                        {job.skills?.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {job.skills.slice(0, 6).map((skill) => (
                                                    <Badge key={skill} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

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

    )

}

export default Jobs