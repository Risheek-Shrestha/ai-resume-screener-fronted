import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    getJobsById,
    updateJob
} from "../../services/jobService";

import { ArrowLeft, Plus, X } from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Badge from "../../components/ui/Badge";
import Loader from "../../components/common/Loader";
import { getErrorMessage } from "../../utils/getErrorMessage";

function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");

    const [applicationStartsAt, setApplicationStartsAt] = useState("");
    const [applicationDeadline, setApplicationDeadline] = useState("");

    const [skills, setSkills] = useState<string[]>([]);
    const [skill, setSkill] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadJob = useCallback(async () => {

        if (!id) return;

        try {

            setLoading(true);

            const job = await getJobsById(Number(id));

            setTitle(job.title);
            setDescription(job.description);
            setJobType(job.jobType);
            setExperienceLevel(job.experienceLevel);

            setSkills(job.skills);

            setApplicationStartsAt(job.applicationStartsAt.substring(0, 16));
            setApplicationDeadline(job.applicationDeadline.substring(0, 16));

        } catch {

            setError("Unable to load job.");

        } finally {

            setLoading(false);

        }

    }, [id]);

    useEffect(() => {
        loadJob();
    }, [loadJob]);

    const addSkill = () => {

        if (!skill.trim()) return;

        if (skills.includes(skill.trim())) return;

        setSkills([...skills, skill.trim()]);

        setSkill("");

    };

    const removeSkill = (index: number) => {

        setSkills(
            skills.filter((_, i) => i !== index)
        );

    };

    const handleUpdate = async () => {

        if (!id) return;

        try {

            setLoading(true);

            setError("");
            setSuccess("");

            await updateJob(Number(id), {

                title,
                description,
                jobType,
                experienceLevel,
                skills,
                applicationStartsAt,
                applicationDeadline

            });

            setSuccess("Job updated successfully.");

            setTimeout(() => {
                navigate("/admin/jobs");
            }, 1000);

        } catch (err) {

            setError(getErrorMessage(err, "Unable to update job."));

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="mx-auto max-w-2xl px-6 py-10 md:py-16">

            <Link
                to="/admin/jobs"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
            >
                <ArrowLeft size={16} />
                Back to posted jobs
            </Link>

            <h1 className="font-display text-4xl font-bold">
                Edit Job
            </h1>
            <p className="mt-2 text-slate-400">
                Update the details of this job posting.
            </p>

            {loading && (
                <div className="mt-10">
                    <Loader text="Loading..." />
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                    {success}
                </div>
            )}

            <Card className="mt-8" padding="lg">

                <div className="space-y-6">

                    <Input
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Description
                        </label>
                        <textarea
                            rows={8}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">

                        <Input
                            label="Job Type"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        />

                        <Input
                            label="Experience Level"
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                        />

                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">

                        <Input
                            label="Application Starts At"
                            type="datetime-local"
                            value={applicationStartsAt}
                            onChange={(e) => setApplicationStartsAt(e.target.value)}
                        />

                        <Input
                            label="Application Deadline"
                            type="datetime-local"
                            value={applicationDeadline}
                            onChange={(e) => setApplicationDeadline(e.target.value)}
                        />

                    </div>

                    <div className="border-t border-slate-800 pt-6">

                        <h2 className="text-lg font-semibold">
                            Skills
                        </h2>

                        <div className="mt-4 flex gap-3">

                            <Input
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                placeholder="e.g. React"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addSkill();
                                    }
                                }}
                            />

                            <Button
                                variant="secondary"
                                onClick={addSkill}
                                className="shrink-0"
                            >
                                <Plus size={16} className="mr-2" />
                                Add
                            </Button>

                        </div>

                        {skills.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">

                                {skills.map((skill, index) => (

                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="gap-2 pr-2"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(index)}
                                            className="text-slate-400 hover:text-red-400"
                                            aria-label={`Remove ${skill}`}
                                        >
                                            <X size={12} />
                                        </button>
                                    </Badge>

                                ))}

                            </div>
                        )}

                    </div>

                    <Button
                        onClick={handleUpdate}
                        disabled={loading}
                        fullWidth
                        size="lg"
                    >
                        {loading ? "Updating..." : "Update Job"}
                    </Button>

                </div>

            </Card>

        </div>

    );

}

export default EditJob;