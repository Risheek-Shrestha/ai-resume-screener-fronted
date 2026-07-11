import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, User, Mail, ShieldCheck } from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/ui/Card";

import { getCurrentUser, updateCurrentUser } from "../../services/userService";
import { getErrorMessage } from "../../utils/getErrorMessage";

function EditAdminProfile() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getCurrentUser()
            .then((user) => {
                setUsername(user.username);
                setEmail(user.email);
                setRole(user.role);
            })
            .catch((err) => {
                setError(getErrorMessage(err, "Unable to load profile."));
            })
            .finally(() => {
                setLoadingProfile(false);
            });
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await updateCurrentUser({ username } as any);
            navigate("/admin/profile");
        } catch (err) {
            setError(getErrorMessage(err, "Unable to update profile."));
        } finally {
            setLoading(false);
        }
    }

    if (loadingProfile) {
        return (
            <div className="flex min-h-screen items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">

            <div className="app-backdrop" />

            <div className="relative w-full max-w-xl">

                <Card
                    className="border-slate-800 bg-slate-900/90 text-white shadow-2xl"
                    padding="lg"
                >

                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                            <ShieldCheck size={14} />
                            Admin Account
                        </div>

                        <h1 className="font-display text-3xl font-bold">
                            Edit Profile
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Only your username can be changed here.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <User size={16} />
                                Username
                            </label>

                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Mail size={16} />
                                Email
                            </label>

                            <Input value={email} disabled readOnly />

                            <p className="mt-1 text-xs text-slate-500">
                                Email changes aren't supported yet.
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <ShieldCheck size={16} />
                                Role
                            </label>

                            <Input value={role} disabled readOnly />
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3">

                            <Button
                                type="submit"
                                loading={loading}
                                className="flex-1"
                            >
                                Save Changes

                                {!loading && (
                                    <ArrowRight size={18} className="ml-2" />
                                )}
                            </Button>

                            <Link to="/admin/profile" className="flex-1">
                                <Button variant="outline" fullWidth type="button">
                                    Cancel
                                </Button>
                            </Link>

                        </div>

                    </form>

                </Card>

            </div>

        </div>
    );
}

export default EditAdminProfile;