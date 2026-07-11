import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { downloadResumeForApplication } from "../../services/resumeService";

import {
    getApplicationsForJob,
    updateApplicationStatus
} from "../../services/applicationService";

import type { ApplicationResponse } from "../../types/application";

import { ArrowLeft, ClipboardList, Eye } from "lucide-react";

import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Table from "../../components/ui/Table";
import type { TableColumn } from "../../components/ui/Table";
import { formatDate } from "../../utils/date";
import { getErrorMessage } from "../../utils/getErrorMessage";

const statusVariant = (status: string) => {
    if (status === "REJECTED") return "danger" as const;
    if (status === "HIRED" || status === "SHORTLISTED") return "success" as const;
    return "primary" as const;
};

function AdminApplications() {

    const { jobId } = useParams();

    const [applications, setApplications] =
        useState<ApplicationResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const loadApplications = useCallback(async () => {

        if (!jobId) return;

        try {

            setLoading(true);
            setError("");

            const data = await getApplicationsForJob(Number(jobId));

            setApplications(data);

        } catch {

            setError("Unable to load applications.");

        } finally {

            setLoading(false);

        }

    }, [jobId]);

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);

    const changeStatus = async (applicationId: number, status: string) => {

        try {
            setUpdatingId(applicationId);
            await updateApplicationStatus(applicationId, status);
            await loadApplications();
        } catch (err) {
            setError(getErrorMessage(err, "Unable to update status."));
        } finally {
            setUpdatingId(null);
        }

    };

    const viewResume = async (applicationId: number) => {

        try {

            const file = await downloadResumeForApplication(applicationId);

            const url = window.URL.createObjectURL(file);

            window.open(url, "_blank");

        } catch {

            setError("Unable to open resume.");

        }

    };

    const columns: TableColumn<ApplicationResponse>[] = [
        {
            header: "Application",
            cell: (application) => (
                <div>
                    <p className="font-semibold text-white">#{application.applicationId}</p>
                    <p className="mt-0.5 text-xs text-slate-500">Resume #{application.resumeId}</p>
                </div>
            ),
        },
        {
            header: "ATS Score",
            cell: (application) => (
                <span className="font-semibold text-cyan-400">{application.atsScore}</span>
            ),
        },
        {
            header: "Applied On",
            cell: (application) => (
                <span className="text-slate-300">{formatDate(application.appliedAt)}</span>
            ),
        },
        {
            header: "Status",
            cell: (application) => (
                <Badge variant={statusVariant(application.status)}>
                    {application.status}
                </Badge>
            ),
        },
        {
            header: "Actions",
            align: "right",
            className: "min-w-[280px]",
            cell: (application) => (
                <div className="flex flex-wrap items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewResume(application.applicationId)}
                    >
                        <Eye size={14} className="mr-1.5" />
                        Resume
                    </Button>

                    {application.status === "APPLIED" && (
                        <>
                            <Button
                                size="sm"
                                loading={updatingId === application.applicationId}
                                onClick={() => changeStatus(application.applicationId, "SHORTLISTED")}
                            >
                                Shortlist
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                loading={updatingId === application.applicationId}
                                onClick={() => changeStatus(application.applicationId, "REJECTED")}
                            >
                                Reject
                            </Button>
                        </>
                    )}

                    {application.status === "SHORTLISTED" && (
                        <>
                            <Button
                                size="sm"
                                loading={updatingId === application.applicationId}
                                onClick={() => changeStatus(application.applicationId, "HIRED")}
                            >
                                Hire
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                loading={updatingId === application.applicationId}
                                onClick={() => changeStatus(application.applicationId, "REJECTED")}
                            >
                                Reject
                            </Button>
                        </>
                    )}
                </div>
            ),
        },
    ];

    return (

        <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">

            <Link
                to="/admin/jobs"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
            >
                <ArrowLeft size={16} />
                Back to posted jobs
            </Link>

            <h1 className="font-display text-4xl font-bold">
                Applications
            </h1>
            <p className="mt-2 text-slate-400">
                Review and manage applicants for this job.
            </p>

            {loading && (
                <div className="mt-16">
                    <Loader text="Loading applications..." />
                </div>
            )}

            {error && (
                <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}

            {!loading && applications.length === 0 && (
                <div className="mt-10">
                    <EmptyState
                        icon={ClipboardList}
                        title="No applications"
                        description="No one has applied for this job yet."
                    />
                </div>
            )}

            {!loading && applications.length > 0 && (
                <div className="mt-10">
                    <Table
                        columns={columns}
                        data={applications}
                        keyField={(application) => application.applicationId}
                    />
                </div>
            )}

        </div>

    );

}

export default AdminApplications;