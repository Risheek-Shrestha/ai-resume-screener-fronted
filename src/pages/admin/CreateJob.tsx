import { useState } from "react";
import { createJob } from "../../services/jobService";

import { Plus, X } from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Badge from "../../components/ui/Badge";

function CreateJob() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");

    const [applicationStartsAt, setApplicationStartsAt] = useState("");
    const [applicationDeadline, setApplicationDeadline] = useState("");

    const [skills, setSkills] = useState<string[]>([]);
    const [skill, setSkill] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

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

    const handleSubmit = async () => {

        try {

            setLoading(true);

            setError("");
            setSuccess("");

            await createJob({
                title,
                description,
                jobType,
                experienceLevel,
                skills,
                applicationStartsAt,
                applicationDeadline
            });

            setSuccess("Job created successfully.");

            setTitle("");
            setDescription("");
            setJobType("");
            setExperienceLevel("");
            setApplicationStartsAt("");
            setApplicationDeadline("");
            setSkills([]);

        } catch (err: any) {

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            }
            else {
                setError("Unable to create job.");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">

            <div className="mx-auto max-w-2xl">

                <h1 className="text-4xl font-black">
                    Create Job
                </h1>
                <p className="mt-2 text-slate-400">
                    Post a new opening for candidates to apply to.
                </p>

                <Card
                    className="mt-8 border-slate-800 bg-slate-900 text-white"
                    padding="lg"
                >

                    <div className="space-y-6">

                        <Input
                            label="Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Description
                            </label>
                            <textarea
                                rows={8}
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                            />
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">

                            <Input
                                label="Job Type"
                                value={jobType}
                                onChange={(e) =>
                                    setJobType(e.target.value)
                                }
                            />

                            <Input
                                label="Experience Level"
                                value={experienceLevel}
                                onChange={(e) =>
                                    setExperienceLevel(e.target.value)
                                }
                            />

                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">

                            <Input
                                label="Application Starts At"
                                type="datetime-local"
                                value={applicationStartsAt}
                                onChange={(e) =>
                                    setApplicationStartsAt(e.target.value)
                                }
                            />

                            <Input
                                label="Application Deadline"
                                type="datetime-local"
                                value={applicationDeadline}
                                onChange={(e) =>
                                    setApplicationDeadline(e.target.value)
                                }
                            />

                        </div>

                        <div className="border-t border-slate-800 pt-6">

                            <h2 className="text-lg font-semibold">
                                Skills
                            </h2>

                            <div className="mt-4 flex gap-3">

                                <Input
                                    value={skill}
                                    onChange={(e) =>
                                        setSkill(e.target.value)
                                    }
                                    placeholder="e.g. React"
                                />

                                <Button
                                    type="button"
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
                                                onClick={() =>
                                                    removeSkill(index)
                                                }
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
                            onClick={handleSubmit}
                            disabled={loading}
                            fullWidth
                            size="lg"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Job"}
                        </Button>

                        {success && (
                            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                    </div>

                </Card>

            </div>

        </div>

    );

}

export default CreateJob;
