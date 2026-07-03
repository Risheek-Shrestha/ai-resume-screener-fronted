import { useEffect, useState } from "react";
import { getOpenJobs } from "../../services/jobService";
import type { JobResponse } from "../../types/job";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BriefcaseBusiness, Plus, ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Pagination from "../../components/ui/Pagination";

const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];
const EXPERIENCE_LEVELS = ["JUNIOR", "MID", "SENIOR"];

function Jobs() {

    const { user } = useAuth();

    const [jobs, setJobs] = useState<JobResponse[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Raw text input, debounced into `keyword` before it hits the API.
    const [keywordInput, setKeywordInput] = useState("");
    const [keyword, setKeyword] = useState("");
    const [jobType, setJobType] = useState("");
    const [level, setLevel] = useState("");
    const [skill, setSkill] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const size = 10;

    // Debounce free-text keyword search so we don't hit the API on every keystroke.
    useEffect(() => {
        const timer = setTimeout(() => {
            setKeyword(keywordInput.trim());
            setPage(0);
        }, 400);

        return () => clearTimeout(timer);
    }, [keywordInput]);

    // Reset to first page whenever a dropdown filter changes.
    function updateJobType(value: string) {
        setJobType(value);
        setPage(0);
    }

    function updateLevel(value: string) {
        setLevel(value);
        setPage(0);
    }

    function updateSkill(value: string) {
        setSkill(value);
        setPage(0);
    }

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getOpenJobs(page, size, {
                    keyword: keyword || undefined,
                    jobType: jobType || undefined,
                    level: level || undefined,
                    skill: skill || undefined,
                });
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
    }, [page, keyword, jobType, level, skill]);

    const hasActiveFilters = Boolean(jobType || level || skill);

    function clearFilters() {
        setJobType("");
        setLevel("");
        setSkill("");
        setPage(0);
    }

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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">

                <div className="relative max-w-md flex-1">
                    <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        placeholder="Search by title, description, or skill..."
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    />
                </div>

                <Button
                    variant={hasActiveFilters ? "primary" : "outline"}
                    size="md"
                    onClick={() => setShowFilters((v) => !v)}
                    type="button"
                >
                    <SlidersHorizontal size={16} className="mr-2" />
                    Filters
                    {hasActiveFilters && (
                        <span className="ml-2 rounded-full bg-slate-950/30 px-1.5 text-xs">
                            {[jobType, level, skill].filter(Boolean).length}
                        </span>
                    )}
                </Button>

            </div>

            {showFilters && (
                <Card className="mt-4 max-w-3xl" padding="md">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Job Type
                            </label>
                            <select
                                value={jobType}
                                onChange={(e) => updateJobType(e.target.value)}
                                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                            >
                                <option value="">Any</option>
                                {JOB_TYPES.map((t) => (
                                    <option key={t} value={t}>{t.replace("_", " ")}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Experience Level
                            </label>
                            <select
                                value={level}
                                onChange={(e) => updateLevel(e.target.value)}
                                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                            >
                                <option value="">Any</option>
                                {EXPERIENCE_LEVELS.map((l) => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Skill"
                            placeholder="e.g. React"
                            value={skill}
                            onChange={(e) => updateSkill(e.target.value)}
                        />

                    </div>

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                        >
                            <X size={14} />
                            Clear filters
                        </button>
                    )}
                </Card>
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
                        icon={keyword || hasActiveFilters ? Search : BriefcaseBusiness}
                        title={keyword || hasActiveFilters ? "No matching jobs" : "No jobs available"}
                        description={
                            keyword || hasActiveFilters
                                ? "Try a different keyword or adjust your filters."
                                : "There are no open positions right now. Check back soon."
                        }
                    />
                </div>
            )}

            {!loading && jobs.length > 0 && (
                <div className="mt-8 space-y-5">

                    {jobs.map((job) => (
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
