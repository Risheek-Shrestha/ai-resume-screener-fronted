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

const steps = [
    "Upload Resume",
    "AI Analysis",
    "View ATS Score",
    "Apply for Jobs",
];

interface SkillMatch {
    skill: string;
    matched: boolean;
}

const sampleSkills: SkillMatch[] = [
    { skill: "Java", matched: true },
    { skill: "Spring Boot", matched: true },
    { skill: "PostgreSQL", matched: true },
    { skill: "Docker", matched: true },
    { skill: "React", matched: true },
    { skill: "Kubernetes", matched: false },
    { skill: "AWS", matched: false },
];

function Index() {
    const { isAuthenticated } = useAuth();

    return (
        <div>

            {/* Hero */}

            <section className="relative overflow-hidden">

                <div className="scanline-mask pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">

                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

                        <div className="animate-fade-up">

                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                                <Sparkles size={16} />
                                AI-powered resume screening
                            </div>

                            <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
                                Beat the
                                <span className="text-cyan-400"> ATS.</span>
                                <br />
                                Get more interviews.
                            </h1>

                            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                                Upload your resume, compare it with real job descriptions,
                                discover missing skills, and get AI-generated recommendations
                                before you apply — not after you're rejected.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">

                                <Link
                                    to={isAuthenticated ? "/resume/upload" : "/register"}
                                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-slate-950 transition hover:scale-[1.03] hover:bg-cyan-400"
                                >
                                    {isAuthenticated ? "Upload a resume" : "Get started free"}
                                    <ArrowRight size={18} />
                                </Link>

                                <Link
                                    to="/jobs"
                                    className="rounded-xl border border-slate-700 px-7 py-4 font-semibold transition hover:border-cyan-500 hover:bg-slate-900"
                                >
                                    Browse jobs
                                </Link>

                            </div>

                            <div className="mt-14 flex flex-wrap gap-10">

                                <div>
                                    <p className="font-display text-4xl font-bold text-cyan-400">
                                        95%
                                    </p>
                                    <p className="text-slate-400">
                                        ATS accuracy
                                    </p>
                                </div>

                                <div>
                                    <p className="font-display text-4xl font-bold text-cyan-400">
                                        AI
                                    </p>
                                    <p className="text-slate-400">
                                        Resume analysis
                                    </p>
                                </div>

                                <div>
                                    <p className="font-display text-4xl font-bold text-cyan-400">
                                        Instant
                                    </p>
                                    <p className="text-slate-400">
                                        Skill matching
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Right: sample analysis card */}

                        <div className="animate-fade-up [animation-delay:150ms]">

                            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">

                                <div className="flex items-center justify-between">
                                    <h2 className="font-display text-xl font-bold">
                                        Resume Analysis
                                    </h2>

                                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/25">
                                        ATS Score 91%
                                    </span>
                                </div>

                                <div className="mt-8 space-y-3">

                                    {sampleSkills.map(({ skill, matched }) => (
                                        <div
                                            key={skill}
                                            className="flex items-center justify-between rounded-xl bg-slate-800/70 px-5 py-4"
                                        >
                                            <span className="text-slate-100">{skill}</span>

                                            {matched ? (
                                                <CheckCircle className="text-emerald-400" size={20} />
                                            ) : (
                                                <span className="text-sm font-medium text-red-400">
                                                    Missing
                                                </span>
                                            )}
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* How It Works */}

            <section className="border-y border-slate-800 bg-slate-900/30">

                <div className="mx-auto max-w-6xl px-6 py-20">

                    <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
                        How it works
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
                        Four steps between the resume on your laptop and an interview
                        invite in your inbox.
                    </p>

                    <div className="mt-16 grid gap-8 md:grid-cols-4">

                        {steps.map((step, index) => (
                            <div
                                key={step}
                                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center transition hover:-translate-y-2 hover:border-cyan-500/60"
                            >
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-display text-xl font-bold text-slate-950">
                                    {index + 1}
                                </div>

                                <h3 className="mt-6 text-lg font-semibold">
                                    {step}
                                </h3>
                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="mx-auto max-w-7xl px-6 py-24">

                <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
                    Everything you need
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
                    From parsing to placement, one workflow instead of five tools.
                </p>

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition hover:-translate-y-2 hover:border-cyan-500/60"
                        >
                            <feature.icon className="text-cyan-400" size={36} />

                            <h3 className="mt-6 text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                {feature.description}
                            </p>

                        </div>
                    ))}

                </div>

            </section>

            {/* CTA */}

            <section className="mx-auto max-w-5xl px-6 pb-24">

                <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-indigo-600 p-12 text-center">

                    <Users size={44} className="mx-auto text-white" />

                    <h2 className="mt-6 font-display text-3xl font-bold md:text-4xl">
                        Ready to improve your resume?
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg text-lg text-cyan-50">
                        Create a free account and get your first ATS score in minutes.
                    </p>

                    <Link
                        to={isAuthenticated ? "/resume/upload" : "/register"}
                        className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-slate-900 transition hover:scale-[1.03]"
                    >
                        {isAuthenticated ? "Upload a resume" : "Get started free"}
                        <ArrowRight size={18} />
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Index;