import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAcceptedApplications } from "../../services/applicationService";
import { downloadResumeForApplication } from "../../services/resumeService";

import type { ApplicationResponse } from "../../types/application";

import { ArrowLeft, CheckCircle2, Eye } from "lucide-react";

import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";
import Table from "../../components/ui/Table";
import type { TableColumn } from "../../components/ui/Table";
import { formatDate } from "../../utils/date";

function AcceptedApplications() {

    const { jobId } = useParams();

    const [applications, setApplications] =
        useState<ApplicationResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        loadApplications();
    }, [jobId]);

    const loadApplications = async () => {

        if (!jobId) return;

        try {

            setLoading(true);
            setError("");

            const data = await getAcceptedApplications(Number(jobId));

            setApplications(data);

        } catch {

            setError("Unable to load accepted applications.");

        } finally {

            setLoading(false);

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
            cell: () => (
                <Badge variant="success">
                    <CheckCircle2 size={12} />
                    Hired
                </Badge>
            ),
        },
        {
            header: "Resume",
            align: "right",
            cell: (application) => (
                <Button variant="outline" size="sm" onClick={() => viewResume(application.applicationId)}>
                    <Eye size={14} className="mr-1.5" />
                    View
                </Button>
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
                Accepted Applications
            </h1>
            <p className="mt-2 text-slate-400">
                Candidates who have been hired for this job.
            </p>

            {loading && (
                <div className="mt-16">
                    <Loader text="Loading accepted applications..." />
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
                        icon={CheckCircle2}
                        title="No accepted applications"
                        description="No candidates have been accepted for this job yet."
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

export default AcceptedApplications;