import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import useAuth from "../hooks/useAuth";

function NotFound() {
    const { user } = useAuth();

    const homePath =
        user?.role === "ADMIN"
            ? "/admin"
            : "/dashboard";

    return (
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-800 bg-slate-900">
                <Compass className="text-cyan-400" size={36} />
            </div>

            <p className="mt-8 font-display text-8xl font-bold text-slate-800">
                404
            </p>

            <h1 className="-mt-4 text-3xl font-bold">
                This page went missing
            </h1>

            <p className="mt-3 max-w-md text-slate-400">
                The page you're looking for doesn't exist, moved, or the link was
                mistyped. Let's get you back on track.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                    to={homePath}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.03] hover:bg-cyan-400"
                >
                    <ArrowLeft size={18} />
                    Back to home
                </Link>

                <Link
                    to="/jobs"
                    className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-500 hover:bg-slate-900"
                >
                    Browse jobs
                </Link>
            </div>
        </div>
    );
}

export default NotFound;