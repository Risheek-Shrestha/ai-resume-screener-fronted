import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    Plus,
    Menu,
    X,
    ArrowLeft,
} from "lucide-react";

const links = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/admin/jobs", label: "Posted Jobs", icon: Briefcase, end: false },
    { to: "/admin/jobs/create", label: "Create Job", icon: Plus, end: false },
];

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
        <nav className="flex flex-1 flex-col gap-1">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                            isActive
                                ? "bg-cyan-500/10 text-cyan-300 ring-1 ring-inset ring-cyan-500/25"
                                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                        }`
                    }
                >
                    <link.icon size={18} />
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
}

function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 md:hidden">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <Briefcase size={16} className="text-cyan-400" />
                    Admin Menu
                </span>

                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Open admin menu"
                    className="rounded-lg border border-slate-800 p-2 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300"
                >
                    <Menu size={18} />
                </button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="fixed inset-0 z-[90] md:hidden">
                    <div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />

                    <div className="relative flex h-full w-72 flex-col border-r border-slate-800 bg-slate-950 p-5">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="font-display text-sm font-bold uppercase tracking-wide text-slate-400">
                                Admin
                            </span>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close admin menu"
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <SidebarLinks onNavigate={() => setOpen(false)} />

                        <NavLink
                            to="/dashboard"
                            onClick={() => setOpen(false)}
                            className="mt-auto flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-800/60 hover:text-slate-200"
                        >
                            <ArrowLeft size={18} />
                            Back to app
                        </NavLink>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950/40 px-4 py-6 md:flex">
                <p className="mb-4 px-3.5 font-display text-xs font-bold uppercase tracking-widest text-slate-500">
                    Recruiter Tools
                </p>

                <SidebarLinks />

                <NavLink
                    to="/dashboard"
                    className="mt-auto flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-800/60 hover:text-slate-200"
                >
                    <ArrowLeft size={18} />
                    Back to app
                </NavLink>
            </aside>
        </>
    );
}

export default Sidebar;