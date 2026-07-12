import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createJob } from "../../services/jobService";
import { getCourses } from "../../services/courseService";
import type { Course } from "../../types/course";

import { ArrowLeft, Plus, X } from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Badge from "../../components/ui/Badge";
import { getErrorMessage } from "../../utils/getErrorMessage";

const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

function CreateJob() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");

    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");

    const [deadlineDate, setDeadlineDate] = useState("");
    const [deadlineTime, setDeadlineTime] = useState("");

    const [skills, setSkills] = useState<string[]>([]);
    const [skill, setSkill] = useState("");

    const [courses, setCourses] = useState<Course[]>([]);
    const [eligibleCourseIds, setEligibleCourseIds] = useState<number[]>([]);
    const [eligibleSemesters, setEligibleSemesters] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getCourses()
            .then(setCourses)
            .catch(() => {
                // Non-critical — eligibility just won't be settable if this fails.
            });
    }, []);

    const toggleCourse = (id: number) => {
        setEligibleCourseIds((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const toggleSemester = (sem: number) => {
        setEligibleSemesters((prev) =>
            prev.includes(sem) ? prev.filter((s) => s !== sem) : [...prev, sem]
        );
    };

    const addSkill = () => {
        const trimmed = skill.trim();

        if (!trimmed) return;

        if (skills.includes(trimmed)) return;

        setSkills([...skills, trimmed]);
        setSkill("");
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            setError("");
            setSuccess("");

            const applicationStartsAt =
                startDate && startTime
                    ? `${startDate}T${startTime}:00`
                    : "";

            const applicationDeadline =
                deadlineDate && deadlineTime
                    ? `${deadlineDate}T${deadlineTime}:00`
                    : "";

            await createJob({
                title,
                description,
                jobType,
                experienceLevel,
                skills,
                applicationStartsAt,
                applicationDeadline,
                eligibleCourseIds,
                eligibleSemesters,
            });

            setSuccess("Job created successfully.");

            setTitle("");
            setDescription("");
            setJobType("");
            setExperienceLevel("");

            setStartDate("");
            setStartTime("");

            setDeadlineDate("");
            setDeadlineTime("");

            setSkills([]);
            setSkill("");

            setEligibleCourseIds([]);
            setEligibleSemesters([]);
        } catch (err) {
            setError(getErrorMessage(err, "Unable to create job."));
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
                Create Job
            </h1>

            <p className="mt-2 text-slate-400">
                Post a new opening for candidates to apply to.
            </p>

            <Card className="mt-8" padding="lg">
                <div className="space-y-6">
                    <Input
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Senior Backend Engineer"
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Description
                        </label>

                        <textarea
                            rows={8}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Responsibilities, requirements, and anything a candidate should know."
                            className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Input
                            label="Job Type"
                            list="job-type-options"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            placeholder="e.g. FULL_TIME"
                        />

                        <Input
                            label="Experience Level"
                            list="experience-level-options"
                            value={experienceLevel}
                            onChange={(e) => setExperienceLevel(e.target.value)}
                            placeholder="e.g. MID"
                        />

                        <datalist id="job-type-options">
                            <option value="FULL_TIME" />
                            <option value="PART_TIME" />
                            <option value="INTERNSHIP" />
                            <option value="CONTRACT" />
                        </datalist>

                        <datalist id="experience-level-options">
                            <option value="JUNIOR" />
                            <option value="MID" />
                            <option value="SENIOR" />
                        </datalist>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="mb-4 text-lg font-semibold">
                                Application Starts
                            </h2>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <Input
                                    label="Date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />

                                <Input
                                    label="Time"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-lg font-semibold">
                                Application Deadline
                            </h2>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <Input
                                    label="Date"
                                    type="date"
                                    value={deadlineDate}
                                    onChange={(e) => setDeadlineDate(e.target.value)}
                                />

                                <Input
                                    label="Time"
                                    type="time"
                                    value={deadlineTime}
                                    onChange={(e) => setDeadlineTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-6">
                        <h2 className="text-lg font-semibold">
                            Eligibility
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Leave everything unselected to open this job to all students.
                        </p>

                        <div className="mt-4">
                            <p className="mb-2 text-sm font-medium text-slate-300">
                                Eligible Courses
                            </p>
                            {courses.length === 0 ? (
                                <p className="text-sm text-slate-500">
                                    No courses found.
                                </p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {courses.map((course) => (
                                        <button
                                            type="button"
                                            key={course.id}
                                            onClick={() => toggleCourse(course.id)}
                                            className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                                eligibleCourseIds.includes(course.id)
                                                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                                                    : "border-slate-700 text-slate-400 hover:border-slate-600"
                                            }`}
                                        >
                                            {course.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <p className="mb-2 text-sm font-medium text-slate-300">
                                Eligible Semesters
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {SEMESTER_OPTIONS.map((sem) => (
                                    <button
                                        type="button"
                                        key={sem}
                                        onClick={() => toggleSemester(sem)}
                                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                            eligibleSemesters.includes(sem)
                                                ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                                                : "border-slate-700 text-slate-400 hover:border-slate-600"
                                        }`}
                                    >
                                        Sem {sem}
                                    </button>
                                ))}
                            </div>
                        </div>
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
                                            type="button"
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
                        onClick={handleSubmit}
                        disabled={loading}
                        fullWidth
                        size="lg"
                    >
                        {loading ? "Creating..." : "Create Job"}
                    </Button>

                    {success && (
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
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
    );
}

export default CreateJob;