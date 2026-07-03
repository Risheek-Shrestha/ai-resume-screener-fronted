import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import type { JobResponse } from "../../types/job";
import { getJobsById } from "../../services/jobService";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    ArrowRight,
    BriefcaseBusiness,
    CalendarClock,
    CalendarCheck2,
    Layers,
    Plus,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

function JobDetails() {

    const { user, isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState<JobResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    function renderApplyButton(job: JobResponse, isAuthenticated: boolean) {
        if (!isAuthenticated) return null;

        if (job.applicationStatus === "OPEN") {
            return (
                <Link to={`/jobs/${job.id}/apply`}>
                    <Button size="lg">
                        Apply Now
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

    return (

        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-3xl">

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
                    <Card
                        className="border-slate-800 bg-slate-900 text-white"
                        padding="lg"
                    >

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

                        <h1 className="mt-6 text-3xl font-black">
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

                        <div className="mt-8 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-2">

                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <CalendarClock size={18} className="text-cyan-400" />
                                <span>
                                    Application Start:{" "}
                                    <span className="text-slate-200">
                                        {jobs.applicationStartsAt}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <CalendarCheck2 size={18} className="text-cyan-400" />
                                <span>
                                    Deadline:{" "}
                                    <span className="text-slate-200">
                                        {jobs.applicationDeadline}
                                    </span>
                                </span>
                            </div>

                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            {renderApplyButton(jobs, isAuthenticated)}

                            {user?.role === "ADMIN" && (
                                <Link to="/jobs/create">
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

        </div>
    );
}

export default JobDetails
