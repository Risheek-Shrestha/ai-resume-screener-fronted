import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../ui/Card";

import { register as registerApi } from "../../services/authService";
import { getErrorMessage } from "../../utils/getErrorMessage";

function RegisterForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await registerApi(
                username,
                email,
                password
            );

            navigate("/login", {
                state: {
                    successMessage:
                        "Account created successfully. Please sign in.",
                },
            });
        } catch (err) {
            setError(
                getErrorMessage(
                    err,
                    "Unable to create account."
                )
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

            <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

            <Card
                className="relative w-full max-w-md border-slate-800 bg-slate-900 text-white shadow-2xl"
                padding="lg"
            >

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold">
                        Create Account
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Join ResumeScreener and start getting
                        AI-powered resume feedback.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">

                            <User size={16} />

                            Username

                        </label>

                        <Input
                            id="username"
                            placeholder="john_doe"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">

                            <Mail size={16} />

                            Email

                        </label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
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
                            helperText="Minimum 8 characters recommended."
                            required
                        />

                    </div>

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
                        Register

                        {!loading && (
                            <ArrowRight
                                size={18}
                                className="ml-2"
                            />
                        )}

                    </Button>

                </form>

                <p className="mt-8 text-center text-sm text-slate-400">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                        Login
                    </Link>

                </p>

            </Card>

        </div>
    );
}

export default RegisterForm;