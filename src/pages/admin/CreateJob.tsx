import { useState } from "react";
import { createJob } from "../../services/jobService";

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

        <div>

            <h1>Create Job</h1>

            <p>Title</p>

            <input
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <p>Description</p>

            <textarea
                rows={8}
                cols={60}
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <p>Job Type</p>

            <input
                value={jobType}
                onChange={(e) =>
                    setJobType(e.target.value)
                }
            />

            <p>Experience Level</p>

            <input
                value={experienceLevel}
                onChange={(e) =>
                    setExperienceLevel(e.target.value)
                }
            />

            <p>Application Starts At</p>

            <input
                type="datetime-local"
                value={applicationStartsAt}
                onChange={(e) =>
                    setApplicationStartsAt(e.target.value)
                }
            />

            <p>Application Deadline</p>

            <input
                type="datetime-local"
                value={applicationDeadline}
                onChange={(e) =>
                    setApplicationDeadline(e.target.value)
                }
            />

            <hr />

            <h2>Skills</h2>

            <input
                value={skill}
                onChange={(e) =>
                    setSkill(e.target.value)
                }
            />

            <button
                type="button"
                onClick={addSkill}
            >
                Add Skill
            </button>

            <br />
            <br />

            {skills.map((skill, index) => (

                <div key={index}>

                    {skill}

                    <button
                        onClick={() =>
                            removeSkill(index)
                        }
                    >
                        Remove
                    </button>

                </div>

            ))}

            <br />

            <button
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading
                    ? "Creating..."
                    : "Create Job"}
            </button>

            <br />
            <br />

            {success && (
                <p>{success}</p>
            )}

            {error && (
                <p>{error}</p>
            )}

        </div>

    );

}

export default CreateJob;