import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";

import Button from "../../components/common/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";

import { resetPassword } from "../../services/authService";
import { getErrorMessage } from "../../utils/getErrorMessage";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");

        if (!token) {
            setError("This reset link is invalid or has expired. Please request a new one.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await resetPassword({
                token,
                newPassword,
            });
            navigate("/login", {
                state: { successMessage: "Password reset. Please sign in with your new password." },
            });
        } catch (err) {
            setError(getErrorMessage(err, "Unable to reset password. The link may have expired."));
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
                            Reset your password
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Choose a new password for your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Lock size={16} />
                                New password
                            </label>

                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Lock size={16} />
                                Confirm new password
                            </label>

                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <Button type="submit" loading={loading} fullWidth size="lg">
                            Reset password
                            {!loading && <ArrowRight className="ml-2" size={18} />}
                        </Button>

                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300">
                            Back to login
                        </Link>
                    </p>

                </Card>

            </div>

        </div>
    );
}

export default ResetPassword;
