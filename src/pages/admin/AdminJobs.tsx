import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteJob, getMyJobs } from "../../services/jobService";

import type { JobResponse } from "../../types/job";

import { Briefcase, Pencil, Plus, Trash2, Users } from "lucide-react";

import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Table from "../../components/ui/Table";
import type { TableColumn } from "../../components/ui/Table";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { getErrorMessage } from "../../utils/getErrorMessage";

const statusVariant = (status: string) => {
    if (status === "OPEN") return "success" as const;
    if (status === "CLOSED") return "danger" as const;
    return "warning" as const;
};

function AdminJobs() {

    const [jobs, setJobs] = useState<JobResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [pendingDelete, setPendingDelete] = useState<JobResponse | null>(null);
    const [deleting, setDeleting] = useState(false);

    const loadJobs = useCallback(async () => {

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

    }, []);

    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    const confirmDelete = async () => {
        if (!pendingDelete) return;

        try {
            setDeleting(true);
            await deleteJob(pendingDelete.id);
            await loadJobs();
            setPendingDelete(null);
        } catch (err) {
            setError(getErrorMessage(err, "Unable to delete job."));
        } finally {
            setDeleting(false);
        }
    };

    const columns: TableColumn<JobResponse>[] = [
        {
            header: "Job",
            className: "min-w-[260px]",
            cell: (job) => (
                <div>
                    <p className="font-semibold text-white">{job.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                        <Badge variant="primary">{job.jobType}</Badge>
                        <Badge variant="secondary">{job.experienceLevel}</Badge>
                    </div>
                </div>
            ),
        },
        {
            header: "Status",
            cell: (job) => (
                <Badge variant={statusVariant(job.applicationStatus)}>
                    {job.applicationStatus}
                </Badge>
            ),
        },
        {
            header: "Actions",
            align: "right",
            cell: (job) => (
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <Link to={`/admin/jobs/${job.id}/edit`}>
                        <Button variant="outline" size="sm">
                            <Pencil size={14} className="mr-1.5" />
                            Edit
                        </Button>
                    </Link>

                    <Link to={`/admin/jobs/${job.id}/applications`}>
                        <Button variant="secondary" size="sm">
                            <Users size={14} className="mr-1.5" />
                            Applicants
                        </Button>
                    </Link>

                    <Link to={`/admin/jobs/${job.id}/accepted`}>
                        <Button variant="secondary" size="sm">
                            Accepted
                        </Button>
                    </Link>

                    <button
                        onClick={() => setPendingDelete(job)}
                        aria-label={`Delete ${job.title}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 px-3 py-2 text-sm font-medium text-slate-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            ),
        },
    ];

    return (

        <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="font-display text-4xl font-bold">
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
                <div className="mt-10">
                    <Table columns={columns} data={jobs} keyField={(job) => job.id} />
                </div>
            )}

            <ConfirmDialog
                open={pendingDelete !== null}
                title="Delete this job posting?"
                description={
                    pendingDelete
                        ? `"${pendingDelete.title}" and its applications will be permanently removed.`
                        : undefined
                }
                confirmLabel="Delete"
                loading={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />

        </div>

    );

}

export default AdminJobs;