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

function Dashboard() {
    const { user } = useAuth();

    const quickActions = [
        {
            title: "Browse Jobs",
            icon: BriefcaseBusiness,
            link: "/jobs",
        },
        {
            title: "My Resumes",
            icon: FileText,
            link: "/resume",
        },
        {
            title: "Upload Resume",
            icon: Upload,
            link: "/resume/upload",
        },
        {
            title: "Applications",
            icon: ClipboardList,
            link: "/applications",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Hero */}

                <Card
                    className="border-slate-800 bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
                    padding="lg"
                >

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>

                            <h1 className="text-4xl font-black">

                                Welcome back,
                                <span className="text-cyan-200">
                                    {" "}{user?.username}
                                </span>

                            </h1>

                            <p className="mt-3 text-cyan-100">
                                Manage resumes, apply for jobs and
                                track your recruitment progress.
                            </p>

                        </div>

                        <UserCircle2
                            size={72}
                            className="text-cyan-100"
                        />

                    </div>

                </Card>

                {/* Stats */}

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <Card
                        hover
                        title="Resumes"
                        className="bg-slate-900 border-slate-800 text-white"
                    >
                        <h2 className="text-4xl font-black text-cyan-400">
                            --
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Uploaded resumes
                        </p>

                    </Card>

                    <Card
                        hover
                        title="Applications"
                        className="bg-slate-900 border-slate-800 text-white"
                    >
                        <h2 className="text-4xl font-black text-cyan-400">
                            --
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Submitted jobs
                        </p>

                    </Card>

                    <Card
                        hover
                        title="Average ATS"
                        className="bg-slate-900 border-slate-800 text-white"
                    >
                        <h2 className="text-4xl font-black text-green-400">
                            --
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Resume score
                        </p>

                    </Card>

                    <Card
                        hover
                        title="Account"
                        className="bg-slate-900 border-slate-800 text-white"
                    >
                        <Badge>
                            {user?.role}
                        </Badge>

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

                            <Card
                                key={action.title}
                                hover
                                className="border-slate-800 bg-slate-900"
                            >

                                <action.icon
                                    className="text-cyan-400"
                                    size={40}
                                />

                                <h3 className="mt-5 text-xl font-semibold">
                                    {action.title}
                                </h3>

                                <Link
                                    to={action.link}
                                >
                                    <Button
                                        className="mt-6"
                                        fullWidth
                                    >
                                        Open

                                        <ArrowRight
                                            size={16}
                                            className="ml-2"
                                        />

                                    </Button>
                                </Link>

                            </Card>

                        ))}

                    </div>

                </div>

                {/* Workflow */}

                <Card
                    className="mt-10 border-slate-800 bg-slate-900 text-white"
                >

                    <h2 className="text-2xl font-bold">
                        Resume Screening Workflow
                    </h2>

                    <div className="mt-8 space-y-5">

                        {[
                            "Upload your resume",
                            "Browse available jobs",
                            "Apply using your resume",
                            "Review ATS score",
                            "Receive AI suggestions",
                            "Track applications",
                        ].map((step) => (

                            <div
                                key={step}
                                className="flex items-center gap-4"
                            >

                                <CheckCircle2
                                    className="text-green-400"
                                    size={20}
                                />

                                <span className="text-slate-300">
                                    {step}
                                </span>

                            </div>

                        ))}

                    </div>

                </Card>

                {/* Profile */}

                <Card
                    className="mt-10 border-slate-800 bg-slate-900 text-white"
                >

                    <h2 className="text-2xl font-bold">
                        Account Information
                    </h2>

                    <div className="mt-6 space-y-3">

                        <p>

                            <strong>Username:</strong>{" "}

                            {user?.username}

                        </p>

                        <p>

                            <strong>Email:</strong>{" "}

                            {user?.email}

                        </p>

                        <p>

                            <strong>Role:</strong>{" "}

                            <Badge>

                                {user?.role}

                            </Badge>

                        </p>

                    </div>

                    {user?.role === "ADMIN" && (

                        <Link
                            to="/admin"
                        >

                            <Button
                                className="mt-8"
                            >

                                <ShieldCheck
                                    size={18}
                                    className="mr-2"
                                />

                                Admin Dashboard

                            </Button>

                        </Link>

                    )}

                </Card>

            </div>

        </div>
    );
}

export default Dashboard;