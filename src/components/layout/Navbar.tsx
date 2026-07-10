import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    UserCircle2,
    LogOut,
    Menu,
    X,
    LayoutDashboard,
    ShieldCheck,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";
import NotificationBell from "./NotificationBell";

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [lastPathname, setLastPathname] = useState(location.pathname);

    // Close the mobile menu when the route changes. Adjusting state during
    // render (rather than in an effect) avoids an extra render pass.
    if (location.pathname !== lastPathname) {
        setLastPathname(location.pathname);
        setMenuOpen(false);
    }

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const navLink =
        "text-sm font-medium text-slate-400 transition hover:text-cyan-400";

    const activeLink = "text-cyan-400";

    const navItems = [
        { to: "/jobs", label: "Jobs", show: true },
        { to: "/dashboard", label: "Dashboard", show: isAuthenticated },
        { to: "/resume", label: "My Resumes", show: isAuthenticated },
        { to: "/applications", label: "Applications", show: isAuthenticated },
        { to: "/admin", label: "Admin", show: isAuthenticated && user?.role === "ADMIN" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <Link
                    to="/"
                    className="font-display text-2xl font-bold tracking-tight text-white"
                >
                    Resume
                    <span className="text-cyan-400">Screener</span>
                </Link>

                {/* Desktop navigation */}

                <nav className="hidden items-center gap-8 md:flex">
                    {navItems
                        .filter((item) => item.show)
                        .map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `${navLink} ${isActive ? activeLink : ""}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                </nav>

                {/* Right side (desktop) */}

                <div className="hidden items-center gap-3 md:flex">

                    {isAuthenticated ? (
                        <>
                            <NotificationBell />

                            <Link
                                to="/profile"
                                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 transition hover:border-cyan-500/40 hover:bg-slate-900"
                            >
                                {user?.role === "ADMIN" ? (
                                    <ShieldCheck size={20} className="text-cyan-400" />
                                ) : (
                                    <UserCircle2 size={22} className="text-cyan-400" />
                                )}

                                <div className="leading-tight">
                                    <p className="text-sm font-semibold text-slate-100">
                                        {user?.username}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {user?.role}
                                    </p>
                                </div>
                            </Link>

                            <Button variant="outline" size="sm" onClick={logout}>
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>

                            <Link to="/register">
                                <Button size="sm">
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}

                </div>

                {/* Mobile menu toggle */}

                <div className="flex items-center gap-2 md:hidden">
                    {isAuthenticated && <NotificationBell />}

                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="rounded-lg border border-slate-800 p-2 text-slate-300"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

            </div>

            {/* Mobile menu panel */}

            {menuOpen && (
                <div className="border-t border-slate-800 bg-slate-950 px-6 py-5 md:hidden">

                    <nav className="flex flex-col gap-1">
                        {navItems
                            .filter((item) => item.show)
                            .map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${isActive
                                            ? "bg-cyan-500/10 text-cyan-300"
                                            : "text-slate-300 hover:bg-slate-900"
                                        }`
                                    }
                                >
                                    {item.to === "/dashboard" && <LayoutDashboard size={16} />}
                                    {item.label}
                                </NavLink>
                            ))}
                    </nav>

                    <div className="mt-5 border-t border-slate-800 pt-5">

                        {isAuthenticated ? (
                            <div className="flex items-center justify-between gap-3">

                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 transition hover:border-cyan-500/40 hover:bg-slate-900"
                                >
                                    {user?.role === "ADMIN" ? (
                                        <ShieldCheck size={20} className="text-cyan-400" />
                                    ) : (
                                        <UserCircle2 size={22} className="text-cyan-400" />
                                    )}

                                    <div className="leading-tight">
                                        <p className="text-sm font-semibold text-slate-100">
                                            {user?.username}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {user?.role}
                                        </p>
                                    </div>
                                </Link>

                                <Button variant="outline" size="sm" onClick={logout}>
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </Button>

                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" className="flex-1">
                                    <Button variant="outline" fullWidth size="sm">
                                        Login
                                    </Button>
                                </Link>

                                <Link to="/register" className="flex-1">
                                    <Button fullWidth size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}

                    </div>

                </div>
            )}

        </header>
    );
}

export default Navbar;