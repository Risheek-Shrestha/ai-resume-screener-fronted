import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAcceptedApplications } from "../../services/applicationService";
import { downloadResumeForApplication } from "../../services/resumeService";

import type { ApplicationResponse } from "../../types/application";

function AcceptedApplications() {

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

            const data = await getAcceptedApplications(
                Number(jobId)
            );

            setApplications(data);

        } catch {

            setError("Unable to load accepted applications.");

        } finally {

            setLoading(false);

        }

    };

    const viewResume = async (
        applicationId: number
    ) => {

        try {

            const file =
                await downloadResumeForApplication(applicationId);

            const url =
                window.URL.createObjectURL(file);

            window.open(url, "_blank");

        } catch {

            setError("Unable to open resume.");

        }

    };

    return (

        <div>

            <h1>Accepted Applications</h1>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {!loading && applications.length === 0 && (
                <p>No accepted applications.</p>
            )}

            {applications.map(application => (

                <div key={application.id}>

                    <hr />

                    <h2>{application.jobTitle}</h2>

                    <p>
                        <strong>Application ID:</strong> {application.id}
                    </p>

                    <p>
                        <strong>Resume ID:</strong> {application.resumeId}
                    </p>

                    <p>
                        <strong>ATS Score:</strong> {application.atsScore}
                    </p>

                    <button
                        onClick={() =>
                            viewResume(application.id)
                        }
                    >
                        View Resume
                    </button>

                </div>

            ))}

        </div>

    );

}

export default AcceptedApplications;