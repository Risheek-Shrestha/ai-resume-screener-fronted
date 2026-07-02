import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getJobsById,
    updateJob
} from "../../services/jobService";

function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");

    const [applicationStartsAt, setApplicationStartsAt] =
        useState("");

    const [applicationDeadline, setApplicationDeadline] =
        useState("");

    const [skills, setSkills] = useState<string[]>([]);
    const [skill, setSkill] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {

        loadJob();

    }, []);

    const loadJob = async () => {

        if (!id) return;

        try {

            setLoading(true);

            const job = await getJobsById(Number(id));

            setTitle(job.title);
            setDescription(job.description);
            setJobType(job.jobType);
            setExperienceLevel(job.experienceLevel);

            setSkills(job.skills);

            setApplicationStartsAt(
                job.applicationStartsAt.substring(0,16)
            );

            setApplicationDeadline(
                job.applicationDeadline.substring(0,16)
            );

        } catch {

            setError("Unable to load job.");

        } finally {

            setLoading(false);

        }

    };

    const addSkill = () => {

        if (!skill.trim()) return;

        if (skills.includes(skill.trim())) return;

        setSkills([...skills, skill.trim()]);

        setSkill("");

    };

    const removeSkill = (index:number) => {

        setSkills(
            skills.filter((_,i)=>i!==index)
        );

    };

    const handleUpdate = async () => {

        if (!id) return;

        try {

            setLoading(true);

            setError("");
            setSuccess("");

            await updateJob(Number(id),{

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

            },1000);

        } catch (err:any){

            if(err.response?.data?.message){

                setError(err.response.data.message);

            }else{

                setError("Unable to update job.");

            }

        } finally{

            setLoading(false);

        }

    };

    return (

        <div>

            <h1>Edit Job</h1>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {success && <p>{success}</p>}

            <p>Title</p>

            <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <p>Description</p>

            <textarea
                rows={8}
                cols={60}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />

            <p>Job Type</p>

            <input
                value={jobType}
                onChange={(e)=>setJobType(e.target.value)}
            />

            <p>Experience Level</p>

            <input
                value={experienceLevel}
                onChange={(e)=>setExperienceLevel(e.target.value)}
            />

            <p>Application Starts At</p>

            <input
                type="datetime-local"
                value={applicationStartsAt}
                onChange={(e)=>
                    setApplicationStartsAt(e.target.value)
                }
            />

            <p>Application Deadline</p>

            <input
                type="datetime-local"
                value={applicationDeadline}
                onChange={(e)=>
                    setApplicationDeadline(e.target.value)
                }
            />

            <hr />

            <h2>Skills</h2>

            <input
                value={skill}
                onChange={(e)=>setSkill(e.target.value)}
            />

            <button
                onClick={addSkill}
            >
                Add Skill
            </button>

            <br/>
            <br/>

            {skills.map((skill,index)=>(

                <div key={index}>

                    {skill}

                    <button
                        onClick={()=>
                            removeSkill(index)
                        }
                    >
                        Remove
                    </button>

                </div>

            ))}

            <br/>

            <button
                onClick={handleUpdate}
                disabled={loading}
            >
                {loading
                    ? "Updating..."
                    : "Update Job"}
            </button>

        </div>

    );

}

export default EditJob;