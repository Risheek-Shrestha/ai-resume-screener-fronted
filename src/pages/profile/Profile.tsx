import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    UserCircle2,
    Mail,
    ShieldCheck,
    FileText,
    ClipboardList,
    LogOut,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";

import { getMyResumes } from "../../services/resumeService";
import { getMyApplications } from "../../services/applicationService";

function Profile() {
    const { user, logout } = useAuth();

    const [resumeCount, setResumeCount] = useState<number | null>(null);
    const [applicationCount, setApplicationCount] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        getMyResumes()
            .then((data) => !cancelled && setResumeCount(data.length))
            .catch(() => !cancelled && setResumeCount(null));

        getMyApplications()
            .then((data) => !cancelled && setApplicationCount(data.length))
            .catch(() => !cancelled && setApplicationCount(null));

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
                Profile
            </h1>
            <p className="mt-1 text-sm text-slate-400">
                Your account details, at a glance.
            </p>

            <Card className="mt-8" padding="lg">

                <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 font-display text-2xl font-bold text-white">
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
                        <Badge variant={user?.role === "ADMIN" ? "accent" : "primary"} className="mt-3">
                            <ShieldCheck size={12} />
                            {user?.role}
                        </Badge>
                    </div>

                </div>

                <div className="mt-8 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-2">

                    <Link to="/resume">
                        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-4 transition hover:border-cyan-500/40">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-cyan-400" />
                                <span className="text-sm font-medium text-slate-200">Resumes</span>
                            </div>
                            <span className="font-display text-lg font-bold text-cyan-400">
                                {resumeCount ?? "—"}
                            </span>
                        </div>
                    </Link>

                    <Link to="/applications">
                        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-4 transition hover:border-cyan-500/40">
                            <div className="flex items-center gap-3">
                                <ClipboardList size={18} className="text-cyan-400" />
                                <span className="text-sm font-medium text-slate-200">Applications</span>
                            </div>
                            <span className="font-display text-lg font-bold text-cyan-400">
                                {applicationCount ?? "—"}
                            </span>
                        </div>
                    </Link>

                </div>

                <div className="mt-8 border-t border-slate-800 pt-6">
                    <Button variant="outline" onClick={logout}>
                        <LogOut size={16} className="mr-2" />
                        Logout
                    </Button>
                </div>

            </Card>

        </div>
    );
}

export default Profile;