import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyApplications } from "../../services/applicationService";

import type { ApplicationResponse } from "../../types/application";

import { ClipboardList, TrendingUp } from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate } from "../../utils/date";

const statusVariant = (status: string) => {
    switch (status) {
        case "HIRED":
        case "SHORTLISTED":
            return "success" as const;
        case "REJECTED":
            return "danger" as const;
        default:
            return "primary" as const;
    }
};

function MyApplications() {

    const [applications, setApplications] =
        useState<ApplicationResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {
            setLoading(true);
            setError("");

            const data = await getMyApplications();

            setApplications(data);

        } catch {
            setError("Failed to load applications.");
        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="mx-auto max-w-4xl px-6 py-16">

            <h1 className="font-display text-4xl font-bold">
                My Applications
            </h1>
            <p className="mt-2 text-slate-400">
                Track the status of every job you've applied to.
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
                        title="No applications yet"
                        description="You haven't applied for any jobs yet."
                        action={
                            <Link to="/jobs" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                                Browse open jobs →
                            </Link>
                        }
                    />
                </div>
            )}

            {!loading && applications.length > 0 && (
                <div className="mt-10 space-y-5">

                    {applications.map(application => (

                        <Card key={application.applicationId}>

                            <div className="flex flex-wrap items-start justify-between gap-4">

                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {application.jobTitle}
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Application #{application.applicationId} &middot; Resume #{application.resumeId}
                                    </p>
                                </div>

                                <Badge variant={statusVariant(application.status)}>
                                    {application.status}
                                </Badge>

                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-sm sm:grid-cols-3">

                                <div>
                                    <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-slate-500">
                                        <TrendingUp size={12} />
                                        ATS Score
                                    </p>
                                    <p className="mt-1 font-semibold text-cyan-400">
                                        {application.atsScore}
                                    </p>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Applied On
                                    </p>
                                    <p className="mt-1 text-slate-300">
                                        {formatDate(application.appliedAt)}
                                    </p>
                                </div>

                            </div>

                        </Card>

                    ))}

                </div>
            )}

        </div>

    );

}

export default MyApplications;