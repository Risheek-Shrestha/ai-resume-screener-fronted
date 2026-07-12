import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import type { JobResponse } from "../../types/job";
import type { ApplicationStatus } from "../../types/application";
import { getJobsById } from "../../services/jobService";
import { getMyApplications } from "../../services/applicationService";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    CalendarClock,
    CalendarCheck2,
    CheckCircle2,
    GraduationCap,
    Layers,
    Plus,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { formatDateTime } from "../../utils/date";

function JobDetails() {

    const { user, isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState<JobResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // The user's status on their most recent application to this job
    // (undefined while loading/unknown, null if they've never applied).
    const [myStatus, setMyStatus] = useState<ApplicationStatus | null | undefined>(undefined);
    const { id } = useParams();

    // Statuses that mean the user has a still-active application and
    // shouldn't be able to apply again. REJECTED is excluded on purpose —
    // rejected applicants can re-apply, e.g. with a new resume.
    const ACTIVE_STATUSES: ApplicationStatus[] = ["APPLIED", "SHORTLISTED", "HIRED"];

    function renderApplyButton(job: JobResponse, isAuthenticated: boolean) {
        if (!isAuthenticated) {
            return (
                <Link to="/login">
                    <Button size="lg">
                        Login to apply
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                </Link>
            );
        }

        if (job.applicationStatus === "NOT_STARTED") {
            return (
                <Badge variant="warning" className="text-sm">
                    Applications open soon
                </Badge>
            );
        }
        if (job.applicationStatus === "CLOSED") {
            return (
                <Badge variant="danger" className="text-sm">
                    Applications closed
                </Badge>
            );
        }

        if (job.applicationStatus === "OPEN") {
            // Still loading the user's application history — avoid a flash
            // of the wrong button.
            if (myStatus === undefined) {
                return null;
            }

            if (myStatus !== null && ACTIVE_STATUSES.includes(myStatus)) {
                return (
                    <Button size="lg" disabled>
                        <CheckCircle2 size={18} className="mr-2" />
                        Already Applied
                    </Button>
                );
            }

            // Never applied, or previously REJECTED — free to apply again.
            return (
                <Link to={`/jobs/${job.id}/apply`}>
                    <Button size="lg">
                        {myStatus === "REJECTED" ? "Apply Again" : "Apply Now"}
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                </Link>
            );
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

    // Look up the user's most recent application for this job so the apply
    // button can reflect it (Already Applied vs. Apply Now/Apply Again).
    useEffect(() => {
        const fetchMyStatus = async () => {
            if (!isAuthenticated || !id) {
                setMyStatus(null);
                return;
            }

            try {
                const applications = await getMyApplications();
                const forThisJob = applications.filter(
                    (a) => a.jobId === Number(id)
                );

                if (forThisJob.length === 0) {
                    setMyStatus(null);
                    return;
                }

                // A user can now have multiple applications for the same job
                // (after being rejected and re-applying) — use the most
                // recent one.
                const latest = forThisJob.reduce((a, b) =>
                    new Date(a.appliedAt) > new Date(b.appliedAt) ? a : b
                );
                setMyStatus(latest.status);
            } catch {
                // If we can't determine status, default to letting the user
                // try to apply — the backend still enforces the real rule.
                setMyStatus(null);
            }
        };

        fetchMyStatus();
    }, [id, isAuthenticated]);

    return (

        <div className="mx-auto max-w-3xl px-6 py-16">

            <Link
                to="/jobs"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
            >
                <ArrowLeft size={16} />
                Back to jobs
            </Link>

            {loading && (
                <div className="mt-16">
                    <Loader text="Loading job..." />
                </div>
            )}

            {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}

            {!loading && jobs && (
                <Card padding="lg">

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                            <BriefcaseBusiness size={22} />
                        </div>
                        <Badge variant="primary">
                            {jobs.jobType}
                        </Badge>
                        <Badge variant="secondary">
                            {jobs.experienceLevel}
                        </Badge>
                    </div>

                    <h1 className="mt-6 font-display text-3xl font-bold">
                        {jobs.title}
                    </h1>

                    <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-300">
                        {jobs.description}
                    </p>

                    {jobs.skills?.length > 0 && (
                        <div className="mt-6">
                            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-400">
                                <Layers size={16} />
                                Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {jobs.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {(jobs.eligibleCourses?.length > 0 || jobs.eligibleSemesters?.length > 0) && (
                        <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-300">
                                <GraduationCap size={16} />
                                Eligibility
                            </p>
                            <div className="flex flex-wrap gap-2 text-sm text-slate-300">
                                {jobs.eligibleCourses?.length > 0 && (
                                    <span>
                                        Open to:{" "}
                                        {jobs.eligibleCourses.map((c) => c.name).join(", ")}
                                    </span>
                                )}
                                {jobs.eligibleSemesters?.length > 0 && (
                                    <span>
                                        {jobs.eligibleCourses?.length > 0 ? " · " : "Open to: "}
                                        Semester{jobs.eligibleSemesters.length > 1 ? "s" : ""}{" "}
                                        {jobs.eligibleSemesters.slice().sort((a, b) => a - b).join(", ")}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-2">

                        <div className="flex items-center gap-3 text-sm text-slate-400">
                            <CalendarClock size={18} className="text-cyan-400" />
                            <span>
                                Application Start:{" "}
                                <span className="text-slate-200">
                                    {formatDateTime(jobs.applicationStartsAt)}
                                </span>
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-400">
                            <CalendarCheck2 size={18} className="text-cyan-400" />
                            <span>
                                Deadline:{" "}
                                <span className="text-slate-200">
                                    {formatDateTime(jobs.applicationDeadline)}
                                </span>
                            </span>
                        </div>

                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        {renderApplyButton(jobs, isAuthenticated)}

                        {user?.role === "ADMIN" && (
                            <Link to="/admin/jobs/create">
                                <Button variant="outline">
                                    <Plus size={18} className="mr-2" />
                                    Create Job
                                </Button>
                            </Link>
                        )}
                    </div>

                </Card>
            )}

        </div>
    );
}

export default JobDetails