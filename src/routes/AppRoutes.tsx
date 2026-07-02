import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DashBoard from "../pages/dashboard/Dashboard";
import JobDetails from "../pages/jobs/JobDetails";
import Jobs from "../pages/jobs/Jobs";
import Profile from "../pages/profile/Profile";
import MyResumes from "../pages/resume/MyResumes";
import ResumeScore from "../pages/resume/ResumeScore";
import UploadResume from "../pages/resume/UploadResume";
import NotFound from "../pages/NotFound";
import Index from "../pages/Index";
import ProtectedRoute from "../routes/ProtectedRoute"
import RoleRoute from "./RoleRoute";
import MainLayout from "../components/layout/MainLayout";
import ApplyForJob from "../pages/jobs/ApplyforJob";
import MyApplications from "../pages/profile/MyApplications";
import CreateJob from "../pages/admin/CreateJob";
import AdminJobs from "../pages/admin/AdminJobs";
import EditJob from "../pages/admin/EditJobs";
import AdminApplications from "../pages/admin/Applications";
import AcceptedApplications from "../pages/admin/AcceptedApplications";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/error" element={<NotFound />} />
                <Route path="*" element={<Index />} />
                <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
                    <Route element={<MainLayout />}>

                        <Route path="/admin" element={<AdminDashboard />} />

                        <Route
                            path="/admin/jobs/create"
                            element={<CreateJob />}
                        />

                        <Route
                            path="/admin/jobs"
                            element={<AdminJobs />}
                        />

                        <Route
                            path="/admin/jobs/:id/edit"
                            element={<EditJob />}
                        />

                        <Route
                            path="/admin/jobs/:id/applications"
                            element={<AdminApplications />}
                        />

                        <Route
                            path="/admin/jobs/:jobId/accepted"
                            element={<AcceptedApplications />}
                        />

                    </Route>
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/jobs/:id" element={<JobDetails />} />
                        <Route path="/jobs/:id/apply" element={<ApplyForJob />} />
                        <Route path="/resume" element={<MyResumes />} />
                        <Route path="/resume/upload" element={<UploadResume />} />
                        <Route path="/resume/:resumeId/score" element={<ResumeScore />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/applications" element={<MyApplications />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    );
}

export default AppRoutes;