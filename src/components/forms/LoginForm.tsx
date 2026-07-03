import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";

import Button from "../common/Button";
import Card from "../ui/Card";
import Input from "../common/Input";

import useAuth from "../../hooks/useAuth";
import { login as loginApi } from "../../services/authService";
import { getErrorMessage } from "../../utils/getErrorMessage";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const successMessage =
        location.state?.successMessage as string | undefined;

    useEffect(() => {
        if (location.state?.successMessage) {
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginApi(email, password);

            login(data);

            if (data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError(getErrorMessage(err, "Invalid email or password."));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">

            <div className="app-backdrop" />

            <div className="relative w-full max-w-md">

                <Link
                    to="/"
                    className="mb-6 flex items-center justify-center gap-1 font-display text-xl font-bold text-white"
                >
                    Resume<span className="text-cyan-400">Screener</span>
                </Link>

                <Card
                    className="border-slate-800 bg-slate-900/90 text-white shadow-2xl"
                    padding="lg"
                >

                    <div className="mb-8 text-center">

                        <h1 className="font-display text-3xl font-bold">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Sign in to continue using ResumeScreener
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Mail size={16} />
                                Email
                            </label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div>

                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Lock size={16} />
                                Password
                            </label>

                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <div className="mt-2 text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                        </div>

                        {successMessage && (
                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                                {successMessage}
                            </div>
                        )}

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            size="lg"
                        >
                            Login

                            {!loading && (
                                <ArrowRight
                                    className="ml-2"
                                    size={18}
                                />
                            )}

                        </Button>

                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                            Create one
                        </Link>

                    </p>

                </Card>

            </div>

        </div>
    );
}

export default LoginForm;