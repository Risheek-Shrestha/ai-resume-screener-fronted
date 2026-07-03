import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BriefcaseBusiness,
    FileText,
    Upload,
    UserCircle2,
    ClipboardList,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/ui/Badge";
import useAuth from "../../hooks/useAuth";

import { getMyResumes } from "../../services/resumeService";
import { getMyApplications } from "../../services/applicationService";
import { getMyScores } from "../../services/scoreService";

const quickActions = [
    {
        title: "Browse Jobs",
        description: "Find your next role",
        icon: BriefcaseBusiness,
        link: "/jobs",
    },
    {
        title: "My Resumes",
        description: "Manage what you've uploaded",
        icon: FileText,
        link: "/resume",
    },
    {
        title: "Upload Resume",
        description: "Add a new resume",
        icon: Upload,
        link: "/resume/upload",
    },
    {
        title: "Applications",
        description: "Track where you stand",
        icon: ClipboardList,
        link: "/applications",
    },
];

const workflow = [
    "Upload your resume",
    "Browse available jobs",
    "Apply using your resume",
    "Review ATS score",
    "Receive AI suggestions",
    "Track applications",
];

interface Stats {
    resumeCount: number;
    applicationCount: number;
    averageScore: number | null;
}

function Dashboard() {
    const { user } = useAuth();

    const [stats, setStats] = useState<Stats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadStats() {
            setStatsLoading(true);

            const [resumesResult, applicationsResult, scoresResult] =
                await Promise.allSettled([
                    getMyResumes(),
                    getMyApplications(),
                    getMyScores(),
                ]);

            if (cancelled) return;

            const resumeCount =
                resumesResult.status === "fulfilled"
                    ? resumesResult.value.length
                    : 0;

            const applicationCount =
                applicationsResult.status === "fulfilled"
                    ? applicationsResult.value.length
                    : 0;

            const scores =
                scoresResult.status === "fulfilled" ? scoresResult.value : [];

            const averageScore =
                scores.length > 0
                    ? Math.round(
                          scores.reduce((sum, s) => sum + s.overallScore, 0) /
                              scores.length
                      )
                    : null;

            setStats({ resumeCount, applicationCount, averageScore });
            setStatsLoading(false);
        }

        loadStats();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            {/* Hero */}

            <Card
                className="border-slate-800 bg-gradient-to-r from-cyan-600 to-indigo-700 text-white"
                padding="lg"
            >

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="font-display text-3xl font-bold md:text-4xl">
                            Welcome back, {user?.username}
                        </h1>

                        <p className="mt-3 text-cyan-50">
                            Manage resumes, apply for jobs and
                            track your recruitment progress.
                        </p>

                    </div>

                    <UserCircle2 size={64} className="text-cyan-100" />

                </div>

            </Card>

            {/* Stats */}

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                <Card hover title="Resumes">
                    <h2 className="font-display text-4xl font-bold text-cyan-400">
                        {statsLoading ? "—" : stats?.resumeCount}
                    </h2>
                    <p className="mt-2 text-slate-400">
                        Uploaded resumes
                    </p>
                </Card>

                <Card hover title="Applications">
                    <h2 className="font-display text-4xl font-bold text-cyan-400">
                        {statsLoading ? "—" : stats?.applicationCount}
                    </h2>
                    <p className="mt-2 text-slate-400">
                        Submitted applications
                    </p>
                </Card>

                <Card hover title="Average ATS">
                    <h2 className="font-display text-4xl font-bold text-emerald-400">
                        {statsLoading
                            ? "—"
                            : stats?.averageScore != null
                            ? `${stats.averageScore}%`
                            : "—"}
                    </h2>
                    <p className="mt-2 text-slate-400">
                        Across scored resumes
                    </p>
                </Card>

                <Card hover title="Account">
                    <Badge>{user?.role}</Badge>
                    <p className="mt-3 text-slate-400">
                        Active account
                    </p>
                </Card>

            </div>

            {/* Quick Actions */}

            <div className="mt-10">

                <h2 className="mb-6 text-2xl font-bold">
                    Quick Actions
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    {quickActions.map((action) => (

                        <Card key={action.title} hover className="flex flex-col">

                            <action.icon className="text-cyan-400" size={36} />

                            <h3 className="mt-5 text-lg font-semibold">
                                {action.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                {action.description}
                            </p>

                            <Link to={action.link} className="mt-6">
                                <Button fullWidth variant="outline">
                                    Open
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </Link>

                        </Card>

                    ))}

                </div>

            </div>

            {/* Workflow */}

            <Card className="mt-10">

                <h2 className="text-2xl font-bold">
                    Resume Screening Workflow
                </h2>

                <div className="mt-8 space-y-4">

                    {workflow.map((step, index) => (

                        <div key={step} className="flex items-center gap-4">

                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-400">
                                {index + 1}
                            </span>

                            <span className="text-slate-300">
                                {step}
                            </span>

                            <CheckCircle2 className="ml-auto text-emerald-400" size={18} />

                        </div>

                    ))}

                </div>

            </Card>

            {/* Profile */}

            <Card className="mt-10">

                <h2 className="text-2xl font-bold">
                    Account Information
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">

                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Username</p>
                        <p className="mt-1 font-medium text-slate-200">{user?.username}</p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                        <p className="mt-1 font-medium text-slate-200">{user?.email}</p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
                        <Badge className="mt-1">{user?.role}</Badge>
                    </div>

                </div>

                {user?.role === "ADMIN" && (

                    <Link to="/admin">

                        <Button className="mt-8">
                            <ShieldCheck size={18} className="mr-2" />
                            Admin Dashboard
                        </Button>

                    </Link>

                )}

            </Card>

        </div>
    );
}

export default Dashboard;