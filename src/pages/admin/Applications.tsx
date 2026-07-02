import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadResumeForApplication } from "../../services/resumeService";

import {
    getApplicationsForJob,
    updateApplicationStatus
} from "../../services/applicationService";

import type { ApplicationResponse } from "../../types/application";

function AdminApplications() {

    const { jobId } = useParams();

    const [applications, setApplications] =
        useState<ApplicationResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        loadApplications();

    }, [jobId]);

    const loadApplications = async () => {

        if (!jobId) return;

        try {

            setLoading(true);

            setError("");

            const data = await getApplicationsForJob(
                Number(jobId)
            );

            setApplications(data);

        } catch {

            setError("Unable to load applications.");

        } finally {

            setLoading(false);

        }

    };

    const changeStatus = async (
        applicationId: number,
        status: string
    ) => {

        try {

            await updateApplicationStatus(
                applicationId,
                status
            );

            loadApplications();

        } catch {

            setError("Unable to update status.");

        }

    };

    const viewResume = async (applicationId: number) => {

        try {

            const file = await downloadResumeForApplication(applicationId);

            const url = window.URL.createObjectURL(file);

            window.open(url, "_blank");

        } catch {

            setError("Unable to open resume.");

        }

    };

    return (

        <div>

            <h1>Applications</h1>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {!loading && applications.length === 0 && (

                <p>No applications.</p>

            )}

            {applications.map(application => (

                <div key={application.id}>

                    <hr />

                    <h2>{application.jobTitle}</h2>

                    <p>

                        <strong>Application ID:</strong>{" "}
                        {application.id}

                    </p>

                    <p>

                        <strong>Resume ID:</strong>{" "}
                        {application.resumeId}

                    </p>

                    <p>

                        <strong>ATS Score:</strong>{" "}
                        {application.atsScore}

                    </p>

                    <p>

                        <strong>Status:</strong>{" "}
                        {application.status}

                    </p>
                    <p>
                        <strong>ATS Score:</strong> {application.atsScore}
                    </p>

                    <button
                        onClick={() => viewResume(application.id)}
                    >
                        View Resume
                    </button>

                    <br />
                    <br />

                    {application.status === "APPLIED" && (

                        <>

                            <button
                                onClick={() =>
                                    changeStatus(
                                        application.id,
                                        "SHORTLISTED"
                                    )
                                }
                            >
                                Shortlist
                            </button>

                            <button
                                onClick={() =>
                                    changeStatus(
                                        application.id,
                                        "REJECTED"
                                    )
                                }
                            >
                                Reject
                            </button>

                        </>

                    )}

                    {application.status === "SHORTLISTED" && (

                        <>

                            <button
                                onClick={() =>
                                    changeStatus(
                                        application.id,
                                        "HIRED"
                                    )
                                }
                            >
                                Hire
                            </button>

                            <button
                                onClick={() =>
                                    changeStatus(
                                        application.id,
                                        "REJECTED"
                                    )
                                }
                            >
                                Reject
                            </button>

                        </>

                    )}

                </div>

            ))}

        </div>

    );

}

export default AdminApplications;