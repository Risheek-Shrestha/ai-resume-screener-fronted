import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadResumeForApplication } from "../../services/resumeService";

import {
    getApplicationsForJob,
    updateApplicationStatus
} from "../../services/applicationService";

import type { ApplicationResponse } from "../../types/application";

import { ClipboardList, Eye } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";

function AdminApplications() {

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

            const data = await getApplicationsForJob(
                Number(jobId)
            );

            setApplications(data);

        } catch {

            setError("Unable to load applications.");

        } finally {

            setLoading(false);

        }

    };

    const changeStatus = async (
        applicationId: number,
        status: string
    ) => {

        try {

            await updateApplicationStatus(
                applicationId,
                status
            );

            loadApplications();

        } catch {

            setError("Unable to update status.");

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

    return (

        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-4xl">

                <h1 className="text-4xl font-black">
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
                    <div className="mt-10 space-y-5">

                        {applications.map(application => (

                            <Card
                                key={application.id}
                                className="border-slate-800 bg-slate-900 text-white"
                            >

                                <div className="flex flex-wrap items-start justify-between gap-4">

                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {application.jobTitle}
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Application #{application.id} &middot; Resume #{application.resumeId}
                                        </p>
                                    </div>

                                    <Badge
                                        variant={
                                            application.status === "REJECTED"
                                                ? "danger"
                                                : application.status === "HIRED" ||
                                                  application.status === "SHORTLISTED"
                                                ? "success"
                                                : "primary"
                                        }
                                    >
                                        {application.status}
                                    </Badge>

                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-slate-800 pt-4 text-sm">

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-slate-500">
                                            ATS Score
                                        </p>
                                        <p className="mt-1 font-semibold text-cyan-400">
                                            {application.atsScore}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-slate-500">
                                            ATS Score
                                        </p>
                                        <p className="mt-1 font-semibold text-cyan-400">
                                            {application.atsScore}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5 flex flex-wrap items-center gap-3">

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => viewResume(application.id)}
                                    >
                                        <Eye size={14} className="mr-2" />
                                        View Resume
                                    </Button>

                                    {application.status === "APPLIED" && (

                                        <>

                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    changeStatus(
                                                        application.id,
                                                        "SHORTLISTED"
                                                    )
                                                }
                                            >
                                                Shortlist
                                            </Button>

                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    changeStatus(
                                                        application.id,
                                                        "REJECTED"
                                                    )
                                                }
                                            >
                                                Reject
                                            </Button>

                                        </>

                                    )}

                                    {application.status === "SHORTLISTED" && (

                                        <>

                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    changeStatus(
                                                        application.id,
                                                        "HIRED"
                                                    )
                                                }
                                            >
                                                Hire
                                            </Button>

                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    changeStatus(
                                                        application.id,
                                                        "REJECTED"
                                                    )
                                                }
                                            >
                                                Reject
                                            </Button>

                                        </>

                                    )}

                                </div>

                            </Card>

                        ))}

                    </div>
                )}

            </div>

        </div>

    );

}

export default AdminApplications;
