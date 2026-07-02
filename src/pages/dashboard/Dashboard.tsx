import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function DashBoard() {

    const { user } = useAuth();

    return (
        <div>

            <h1>Dashboard</h1>

            <p>
                Welcome, <strong>{user?.username}</strong>
            </p>

            <p>
                <strong>Email:</strong> {user?.email}
            </p>

            <hr />

            <h2>Quick Actions</h2>

            <ul>
                <li>
                    <Link to="/jobs">
                        Browse Jobs
                    </Link>
                </li>

                <li>
                    <Link to="/resume">
                        My Resumes
                    </Link>
                </li>

                <li>
                    <Link to="/resume/upload">
                        Upload Resume
                    </Link>
                </li>

                <li>
                    <Link to="/profile">
                        My Profile
                    </Link>
                </li>
                <li>
                    <Link to="/applications">
                        My Applications
                    </Link>
                </li>

                {user?.role === "ADMIN" && (
                    <li>
                        <Link to="/admin">
                            Admin Dashboard
                        </Link>
                    </li>
                )}
            </ul>

            <hr />

            <h2>Resume Screener Workflow</h2>

            <ol>
                <li>Upload your resume.</li>
                <li>Browse available jobs.</li>
                <li>Open a job that interests you.</li>
                <li>Apply using one of your uploaded resumes.</li>
                <li>Review your ATS score and AI suggestions.</li>
                <li>Track your applications.</li>
            </ol>

        </div>
    );
}

export default DashBoard;