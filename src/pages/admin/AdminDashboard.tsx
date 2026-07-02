import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AdminDashboard() {

    const { user } = useAuth();

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <p>
                Welcome, <strong>{user?.username}</strong>
            </p>

            <p>
                <strong>Email:</strong> {user?.email}
            </p>

            <p>
                <strong>Role:</strong> {user?.role}
            </p>

            <hr />

            <h2>Job Management</h2>

            <ul>

                <li>
                    <Link to="/admin/jobs/create">
                        Create Job
                    </Link>
                </li>

                <li>
                    <Link to="/admin/jobs">
                        My Posted Jobs
                    </Link>
                </li>

            </ul>

            <hr />

            <h2>Applications</h2>

            <ul>

                <li>
                    <Link to="/admin/applications">
                        View Applications
                    </Link>
                </li>

                <li>
                    <Link to="/admin/applications/accepted">
                        Accepted Applications
                    </Link>
                </li>

            </ul>

        </div>
    );
}

export default AdminDashboard;