import { Link } from "react-router-dom";
import {
    ArrowRight,
    BrainCircuit,
    BriefcaseBusiness,
    CheckCircle,
    FileText,
    SearchCheck,
    Sparkles,
    Users,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

function Index() {
    const features = [
        {
            icon: FileText,
            title: "Resume Parsing",
            description:
                "Extract resume information automatically from PDF and DOCX files.",
        },
        {
            icon: SearchCheck,
            title: "ATS Score",
            description:
                "Compare resumes with job descriptions and generate ATS compatibility scores.",
        },
        {
            icon: BrainCircuit,
            title: "AI Suggestions",
            description:
                "Receive personalized recommendations to improve your resume.",
        },
        {
            icon: BriefcaseBusiness,
            title: "Job Applications",
            description:
                "Apply for jobs directly and track your application progress.",
        },
    ];
    const isAuthenticated = useAuth();

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Background */}

            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            </div>

            {/* Hero */}

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">
                            <Sparkles size={18} />
                            AI Powered Resume Screening
                        </div>

                        <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">
                            Beat the
                            <span className="text-cyan-400"> ATS.</span>
                            <br />
                            Get More Interviews.
                        </h1>

                        <p className="mt-8 max-w-xl text-lg text-slate-300 leading-8">
                            Upload your resume, compare it with job descriptions,
                            discover missing skills, and receive AI-powered
                            recommendations before applying.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to={isAuthenticated ? "/resume/upload" : "/login"}
                                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-slate-900 transition hover:scale-105 hover:bg-cyan-400"
                            >
                                {isAuthenticated ? "Upload-Resume" : "Get Started"}

                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                to="/jobs"
                                className="rounded-xl border border-slate-700 px-7 py-4 font-semibold transition hover:border-cyan-500 hover:bg-slate-900"
                            >
                                Browse Jobs
                            </Link>

                        </div>

                        <div className="mt-14 flex flex-wrap gap-10">

                            <div>
                                <p className="text-4xl font-bold text-cyan-400">
                                    95%
                                </p>
                                <p className="text-slate-400">
                                    ATS Accuracy
                                </p>
                            </div>

                            <div>
                                <p className="text-4xl font-bold text-cyan-400">
                                    AI
                                </p>
                                <p className="text-slate-400">
                                    Resume Analysis
                                </p>
                            </div>

                            <div>
                                <p className="text-4xl font-bold text-cyan-400">
                                    Instant
                                </p>
                                <p className="text-slate-400">
                                    Skill Matching
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Right Card */}

                    <div className="relative">

                        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-8">

                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">
                                    Resume Analysis
                                </h2>

                                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                                    ATS Score 91%
                                </span>
                            </div>

                            <div className="mt-8 space-y-5">

                                {[
                                    ["Java", true],
                                    ["Spring Boot", true],
                                    ["PostgreSQL", true],
                                    ["Docker", true],
                                    ["React", true],
                                    ["Kubernetes", false],
                                    ["AWS", false],
                                ].map(([skill, matched]) => (
                                    <div
                                        key={skill}
                                        className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4"
                                    >
                                        <span>{skill}</span>

                                        {matched ? (
                                            <CheckCircle
                                                className="text-green-400"
                                                size={20}
                                            />
                                        ) : (
                                            <span className="text-red-400">
                                                Missing
                                            </span>
                                        )}
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* How It Works */}

            <section className="border-y border-slate-800 bg-slate-900/40">

                <div className="max-w-6xl mx-auto px-6 py-20">

                    <h2 className="text-center text-4xl font-bold">
                        How It Works
                    </h2>

                    <div className="mt-16 grid gap-8 md:grid-cols-4">

                        {[
                            "Upload Resume",
                            "AI Analysis",
                            "View ATS Score",
                            "Apply for Jobs",
                        ].map((step, index) => (
                            <div
                                key={step}
                                className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center transition hover:border-cyan-500 hover:-translate-y-2"
                            >
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold text-slate-900">
                                    {index + 1}
                                </div>

                                <h3 className="mt-6 font-semibold text-lg">
                                    {step}
                                </h3>
                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="max-w-7xl mx-auto px-6 py-24">

                <h2 className="text-center text-4xl font-bold">
                    Everything You Need
                </h2>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-cyan-500"
                        >
                            <feature.icon
                                className="text-cyan-400"
                                size={40}
                            />

                            <h3 className="mt-6 text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-4 text-slate-400">
                                {feature.description}
                            </p>

                        </div>
                    ))}

                </div>

            </section>

            {/* CTA */}

            <section className="mx-auto max-w-5xl px-6 pb-24">

                <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 p-12 text-center">

                    <Users
                        size={50}
                        className="mx-auto"
                    />

                    <h2 className="mt-6 text-4xl font-bold">
                        Ready to Improve Your Resume?
                    </h2>

                    <p className="mt-5 text-lg text-slate-100">
                        Start using AI-powered resume screening today and
                        increase your chances of getting shortlisted.
                    </p>

                    <Link
                        to="/register"
                        className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-slate-900 transition hover:scale-105"
                    >
                        Get Started
                        <ArrowRight size={18} />
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Index;