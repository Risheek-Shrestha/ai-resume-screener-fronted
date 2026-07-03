import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
    ShieldCheck,
    Plus,
    Briefcase,
    ClipboardList,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

function AdminDashboard() {

    const { user } = useAuth();

    const jobLinks = [
        { title: "Create Job", description: "Post a new opening", to: "/admin/jobs/create", icon: Plus },
        { title: "My Posted Jobs", description: "Manage existing openings", to: "/admin/jobs", icon: Briefcase },
    ];

    const applicationLinks = [
        { title: "View Applications", description: "Review incoming applicants", to: "/admin/applications", icon: ClipboardList },
        { title: "Accepted Applications", description: "See who has been hired", to: "/admin/applications/accepted", icon: CheckCircle2 },
    ];

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-5xl">

                <Card
                    className="border-slate-800 bg-gradient-to-r from-cyan-600 to-blue-700 text-white"
                    padding="lg"
                >

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
                                <ShieldCheck size={16} />
                                Admin Dashboard
                            </div>

                            <h1 className="mt-4 text-3xl font-black">
                                Welcome, {user?.username}
                            </h1>

                            <p className="mt-2 text-cyan-100">
                                {user?.email}
                            </p>

                        </div>

                        <Badge className="bg-white/15 text-white">
                            {user?.role}
                        </Badge>

                    </div>

                </Card>

                <div className="mt-10">

                    <h2 className="mb-5 text-xl font-bold">
                        Job Management
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2">

                        {jobLinks.map((link) => (
                            <Link key={link.title} to={link.to}>
                                <Card
                                    hover
                                    className="border-slate-800 bg-slate-900 text-white"
                                >
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
                                <Card
                                    hover
                                    className="border-slate-800 bg-slate-900 text-white"
                                >
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

            </div>

        </div>
    );
}

export default AdminDashboard;
