import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteJob, getMyJobs } from "../../services/jobService";

import type { JobResponse } from "../../types/job";

import { Briefcase, Pencil, Plus, Trash2, Users } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";

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

        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-5xl">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h1 className="text-4xl font-black">
                            My Posted Jobs
                        </h1>
                        <p className="mt-2 text-slate-400">
                            Manage your job postings and review applicants.
                        </p>
                    </div>

                    <Link to="/admin/jobs/create">
                        <Button>
                            <Plus size={18} className="mr-2" />
                            Create Job
                        </Button>
                    </Link>

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

                {!loading && jobs.length === 0 && (
                    <div className="mt-10">
                        <EmptyState
                            icon={Briefcase}
                            title="No jobs posted yet"
                            description="Create your first job posting to start receiving applications."
                            action={
                                <Link to="/admin/jobs/create">
                                    <Button variant="outline">
                                        <Plus size={16} className="mr-2" />
                                        Create Job
                                    </Button>
                                </Link>
                            }
                        />
                    </div>
                )}

                {!loading && jobs.length > 0 && (
                    <div className="mt-10 space-y-5">

                        {jobs.map(job => (

                            <Card
                                key={job.id}
                                className="border-slate-800 bg-slate-900 text-white"
                            >

                                <div className="flex flex-wrap items-start justify-between gap-4">

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
                                            <Badge
                                                variant={
                                                    job.applicationStatus === "OPEN"
                                                        ? "success"
                                                        : job.applicationStatus === "CLOSED"
                                                        ? "danger"
                                                        : "warning"
                                                }
                                            >
                                                {job.applicationStatus}
                                            </Badge>
                                        </div>

                                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                            {job.description}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-5">

                                    <Link to={`/admin/jobs/${job.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            <Pencil size={14} className="mr-2" />
                                            Edit
                                        </Button>
                                    </Link>

                                    <Link to={`/admin/jobs/${job.id}/applications`}>
                                        <Button variant="secondary" size="sm">
                                            <Users size={14} className="mr-2" />
                                            Applications
                                        </Button>
                                    </Link>

                                    <Link to={`/admin/jobs/${job.id}/accepted`}>
                                        <Button variant="secondary" size="sm">
                                            <Users size={14} className="mr-2" />
                                            Accepted
                                        </Button>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-800 px-3 py-2 text-sm font-medium text-slate-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </button>

                                </div>

                            </Card>

                        ))}

                    </div>
                )}

            </div>

        </div>

    );

}

export default AdminJobs;
