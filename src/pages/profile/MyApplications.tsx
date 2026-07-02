import { useEffect, useState } from "react";

import { getMyApplications } from "../../services/applicationService";

import type { ApplicationResponse } from "../../types/application";

function MyApplications() {

    const [applications, setApplications] =
        useState<ApplicationResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getMyApplications();

            setApplications(data);

        } catch {

            setError("Failed to load applications.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h1>My Applications</h1>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && applications.length === 0 && (
                <p>You haven't applied for any jobs yet.</p>
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
                        <strong>Applied On:</strong>{" "}
                        {application.applicationTime}
                    </p>

                </div>

            ))}

        </div>

    );

}

export default MyApplications;