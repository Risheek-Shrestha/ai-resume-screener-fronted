import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "../types/auth";

function RoleRoute({ allowedRoles }: { allowedRoles: Role[] }) {

    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    } else {
        const userRole = user?.role;
        const isAuthorized = userRole && allowedRoles.includes(userRole);
        if (!isAuthorized) {
            return <Navigate to="/error" replace />;
        } else {
            return <Outlet />;

        }
    }
}

export default RoleRoute;