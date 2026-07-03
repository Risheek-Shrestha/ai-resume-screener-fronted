import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

function Error() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 text-center text-white">

            <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-slate-800 bg-slate-900">
                <Compass className="text-cyan-400" size={36} />
            </div>

            <p className="relative mt-8 font-display text-8xl font-black text-slate-800">
                404
            </p>

            <h1 className="relative -mt-4 text-3xl font-bold">
                Page not found
            </h1>

            <p className="relative mt-3 max-w-md text-slate-400">
                The page you're looking for doesn't exist or may have been
                moved. Let's get you back on track.
            </p>

            <Link
                to="/"
                className="relative mt-10 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-400"
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>

        </div>
    );
}

export default Error;
