import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

import Button from "../../components/common/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";

import { forgotPassword } from "../../services/authService";
import { getErrorMessage } from "../../utils/getErrorMessage";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await forgotPassword(email);
            // Always show the same success state, whether or not the email
            // exists, so we don't leak which accounts are registered.
            setSubmitted(true);
        } catch (err) {
            setError(getErrorMessage(err, "Something went wrong. Please try again."));
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

                    {submitted ? (
                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                                <CheckCircle2 className="text-emerald-400" size={26} />
                            </div>

                            <h1 className="mt-4 font-display text-2xl font-bold">
                                Check your email
                            </h1>

                            <p className="mt-2 text-sm text-slate-400">
                                If an account exists for <span className="text-slate-200">{email}</span>,
                                we've sent a link with instructions to reset your password.
                            </p>

                            <Link to="/login" className="mt-8 inline-block">
                                <Button variant="outline">
                                    Back to login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 text-center">
                                <h1 className="font-display text-3xl font-bold">
                                    Forgot password?
                                </h1>

                                <p className="mt-2 text-slate-400">
                                    Enter your email and we'll send you a reset link.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">

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
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" loading={loading} fullWidth size="lg">
                                    Send reset link
                                    {!loading && <ArrowRight className="ml-2" size={18} />}
                                </Button>

                            </form>
                        </>
                    )}

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Remembered your password?{" "}
                        <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300">
                            Sign in
                        </Link>
                    </p>

                </Card>

            </div>

        </div>
    );
}

export default ForgotPassword;
