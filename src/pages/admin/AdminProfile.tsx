import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    UserCircle2,
    Mail,
    ShieldCheck,
    Phone,
    Calendar,
    GraduationCap,
    BookOpen,
    Hash,
    Pencil,
    LogOut,
    LayoutDashboard,
    Briefcase,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";

import useAuth from "../../hooks/useAuth";

import { getMyJobs } from "../../services/jobService";

function AdminProfile() {
    const { user, logout } = useAuth();

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

    const initials = (user?.username ?? "?")
        .split(/[\s._-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

    return (
        <div className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="font-display text-3xl font-bold">
                Admin Profile
            </h1>

            <p className="mt-1 text-sm text-slate-400">
                Your account details, at a glance.
            </p>

            <Card className="mt-8" padding="lg">

                <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-indigo-700 font-display text-2xl font-bold text-white">
                        {initials || <UserCircle2 size={34} />}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {user?.username}
                        </h2>

                        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-slate-400 sm:justify-start">
                            <Mail size={14} />
                            {user?.email}
                        </p>

                        <Badge
                            variant="accent"
                            className="mt-3"
                        >
                            <ShieldCheck size={12} />
                            {user?.role}
                        </Badge>
                    </div>

                </div>

                <div className="mt-8 border-t border-slate-800 pt-6">

                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                        Personal Information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">

                        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                            <Phone size={18} className="text-cyan-400" />
                            <div>
                                <p className="text-xs text-slate-500">
                                    Phone Number
                                </p>

                                <p className="text-sm text-slate-200">
                                    {user?.phoneNumber ?? "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                            <Calendar size={18} className="text-cyan-400" />
                            <div>
                                <p className="text-xs text-slate-500">
                                    Date of Birth
                                </p>

                                <p className="text-sm text-slate-200">
                                    {user?.dateOfBirth
                                        ? new Date(user.dateOfBirth).toLocaleDateString()
                                        : "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                            <GraduationCap size={18} className="text-cyan-400" />
                            <div>
                                <p className="text-xs text-slate-500">
                                    College
                                </p>

                                <p className="text-sm text-slate-200">
                                    {user?.currentCollege ?? "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                            <BookOpen size={18} className="text-cyan-400" />
                            <div>
                                <p className="text-xs text-slate-500">
                                    Course
                                </p>

                                <p className="text-sm text-slate-200">
                                    {user?.currentCourse ?? "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                            <Hash size={18} className="text-cyan-400" />
                            <div>
                                <p className="text-xs text-slate-500">
                                    Semester
                                </p>

                                <p className="text-sm text-slate-200">
                                    {user?.currentSemester ?? "-"}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="mt-8 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-2">

                    <Link to="/admin/dashboard">
                        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-4 transition hover:border-cyan-500/40">
                            <div className="flex items-center gap-3">
                                <LayoutDashboard
                                    size={18}
                                    className="text-cyan-400"
                                />

                                <span className="text-sm font-medium text-slate-200">
                                    Admin Dashboard
                                </span>
                            </div>

                            <ShieldCheck size={16} className="text-slate-600" />
                        </div>
                    </Link>

                    <Link to="/admin/jobs">
                        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-4 transition hover:border-cyan-500/40">
                            <div className="flex items-center gap-3">
                                <Briefcase
                                    size={18}
                                    className="text-cyan-400"
                                />

                                <span className="text-sm font-medium text-slate-200">
                                    Jobs Posted
                                </span>
                            </div>

                            <span className="font-display text-lg font-bold text-cyan-400">
                                {jobCount ?? "—"}
                            </span>
                        </div>
                    </Link>

                </div>

                <div className="mt-8 flex gap-3 border-t border-slate-800 pt-6">

                    <Link to="/admin/profile/edit">
                        <Button>
                            <Pencil size={16} className="mr-2" />
                            Edit Profile
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        onClick={logout}
                    >
                        <LogOut size={16} className="mr-2" />
                        Logout
                    </Button>

                </div>

            </Card>

        </div>
    );
}

export default AdminProfile;