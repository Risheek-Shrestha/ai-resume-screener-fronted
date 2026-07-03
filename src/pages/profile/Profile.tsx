import { UserCircle2 } from "lucide-react";

function Profile() {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-2xl">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
                        <UserCircle2 size={30} />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">
                            Profile
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Manage your account details.
                        </p>
                    </div>

                </div>

                <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
                    Profile details are on the way.
                </div>

            </div>

        </div>
    );
}

export default Profile;
