import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const productLinks = [
    { to: "/jobs", label: "Browse jobs" },
    { to: "/resume/upload", label: "Upload a resume" },
    { to: "/register", label: "Create an account" },
];

function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950">

            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">

                <div className="sm:col-span-2 lg:col-span-2">

                    <Link to="/" className="font-display text-xl font-bold text-white">
                        Resume<span className="text-cyan-400">Screener</span>
                    </Link>

                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                        AI-powered resume analysis and ATS scoring — see exactly how you
                        match a job before you apply, and what to fix if you don't.
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
                        >
                            <FaGithub className="h-4 w-4" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
                        >
                            <FaLinkedin className="h-4 w-4" />
                        </a>
                    </div>

                </div>

                <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
                        Product
                    </h3>
                    <ul className="mt-4 space-y-3">
                        {productLinks.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className="text-sm text-slate-400 transition hover:text-cyan-400"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
                        How it works
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-400">
                        <li>1. Upload your resume</li>
                        <li>2. Match it to a job</li>
                        <li>3. Fix what's missing</li>
                        <li>4. Apply with confidence</li>
                    </ul>
                </div>

            </div>

            <div className="border-t border-slate-900 py-6 text-center text-sm text-slate-500">
                <p className="flex items-center justify-center gap-2">
                    Built with
                    <Heart className="fill-red-500 text-red-500" size={14} />
                    using React &amp; Spring Boot
                </p>
            </div>

        </footer>
    );
}

export default Footer;