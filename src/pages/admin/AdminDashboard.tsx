import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


import {
    ShieldCheck,
    Plus,
    Briefcase,
    ClipboardList,
    CheckCircle2,
    ArrowRight,
    GraduationCap,
    PlusCircle
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { getMyJobs } from "../../services/jobService";

const jobLinks = [
    { title: "Create Job", description: "Post a new opening", to: "/admin/jobs/create", icon: Plus },
    { title: "My Posted Jobs", description: "Manage existing openings", to: "/admin/jobs", icon: Briefcase },
];

const applicationLinks = [
    { title: "Review Applications", description: "Pick a job, then review its applicants", to: "/admin/jobs", icon: ClipboardList },
    { title: "Accepted Candidates", description: "Pick a job to see who was hired", to: "/admin/jobs", icon: CheckCircle2 },
];

const courseLinks = [
    {
        title: "Create Course",
        description: "Add a new course",
        to: "/admin/courses/create",
        icon: PlusCircle,
    },
    {
        title: "Manage Courses",
        description: "Edit or delete existing courses",
        to: "/admin/courses",
        icon: GraduationCap,
    },
];

function AdminDashboard() {

    const { user } = useAuth();
    const [jobCount, setJobCount] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        getMyJobs(0, 200)
            .then((data) => {
                if (cancelled) return;
                const count =
                    typeof data?.totalElements === "number"
                        ? data.totalElements
                        : Array.isArray(data)
                            ? data.length
                            : Array.isArray(data?.content)
                                ? data.content.length
                                : null;
                setJobCount(count);
            })
            .catch(() => {
                if (!cancelled) setJobCount(null);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (

        <div className="mx-auto max-w-5xl px-6 py-10 md:py-16">

            <Card
                className="bg-gradient-to-r from-cyan-600 to-indigo-700 text-white"
                padding="lg"
            >

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
                            <ShieldCheck size={16} />
                            Admin Dashboard
                        </div>

                        <h1 className="mt-4 font-display text-3xl font-bold">
                            Welcome, {user?.username}
                        </h1>

                        <p className="mt-2 text-cyan-50">
                            {user?.email}
                        </p>

                    </div>

                    <Badge className="bg-white/15 text-white ring-white/25">
                        {user?.role}
                    </Badge>

                </div>

            </Card>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">

                <Card>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Jobs posted</p>
                    <p className="mt-2 font-display text-3xl font-bold text-cyan-400">
                        {jobCount ?? "—"}
                    </p>
                </Card>

                <Card className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Signed in as</p>
                    <p className="mt-2 truncate text-lg font-semibold text-slate-100">{user?.email}</p>
                    <p className="mt-1 text-sm text-slate-400">Role: {user?.role}</p>
                </Card>

            </div>

            <div className="mt-10">

                <h2 className="mb-5 text-xl font-bold">
                    Job Management
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">

                    {jobLinks.map((link) => (
                        <Link key={link.title} to={link.to}>
                            <Card hover>
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                            <link.icon size={20} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {link.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-400">
                                                {link.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight size={18} className="text-slate-600" />

                                </div>
                            </Card>
                        </Link>
                    ))}

                </div>

            </div>

            <div className="mt-10">

                <h2 className="mb-5 text-xl font-bold">
                    Applications
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">

                    {applicationLinks.map((link) => (
                        <Link key={link.title} to={link.to}>
                            <Card hover>
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                            <link.icon size={20} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {link.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-400">
                                                {link.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight size={18} className="text-slate-600" />

                                </div>
                            </Card>
                        </Link>
                    ))}

                </div>

            </div>

            <div className="mt-10">

                <h2 className="mb-5 text-xl font-bold">
                    Course Management
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">

                    {courseLinks.map((link) => (
                        <Link key={link.title} to={link.to}>
                            <Card hover>
                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                            <link.icon size={20} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {link.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-400">
                                                {link.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight
                                        size={18}
                                        className="text-slate-600"
                                    />

                                </div>
                            </Card>
                        </Link>
                    ))}

                </div>

            </div>

        </div>
    );

}

export default AdminDashboard;