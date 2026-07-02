import { Link, NavLink } from "react-router-dom";
import {
    UserCircle2,
    LogOut
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    const navLink =
        "text-sm font-medium text-slate-600 transition hover:text-cyan-600";

    const activeLink = "text-cyan-600";

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <Link
                    to="/"
                    className="text-2xl font-black tracking-tight"
                >
                    Resume
                    <span className="text-cyan-500">
                        Screener
                    </span>
                </Link>

                {/* Navigation */}

                <nav className="hidden items-center gap-8 md:flex">

                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            `${navLink} ${isActive ? activeLink : ""}`
                        }
                    >
                        Jobs
                    </NavLink>

                    {isAuthenticated && (
                        <>
                            <NavLink
                                to="/my-resumes"
                                className={({ isActive }) =>
                                    `${navLink} ${isActive ? activeLink : ""}`
                                }
                            >
                                My Resumes
                            </NavLink>

                            <NavLink
                                to="/applications"
                                className={({ isActive }) =>
                                    `${navLink} ${isActive ? activeLink : ""}`
                                }
                            >
                                Applications
                            </NavLink>

                            {user?.role === "ADMIN" && (
                                <NavLink
                                    to="/admin"
                                    className={({ isActive }) =>
                                        `${navLink} ${isActive ? activeLink : ""}`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            )}
                        </>
                    )}

                </nav>

                {/* Right Side */}

                <div className="flex items-center gap-3">

                    {isAuthenticated ? (
                        <>

                            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">

                                <UserCircle2
                                    size={22}
                                    className="text-cyan-600"
                                />

                                <div className="leading-tight">

                                    <p className="text-sm font-semibold">
                                        {user?.username}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {user?.role}
                                    </p>

                                </div>

                            </div>

                            <Button
                                variant="outline"
                                onClick={logout}
                            >
                                <LogOut
                                    size={18}
                                    className="mr-2"
                                />

                                Logout

                            </Button>

                        </>
                    ) : (
                        <>
                            <Link to="/login">

                                <Button variant="outline">
                                    Login
                                </Button>

                            </Link>

                            <Link to="/register">

                                <Button>
                                    Register
                                </Button>

                            </Link>
                        </>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;