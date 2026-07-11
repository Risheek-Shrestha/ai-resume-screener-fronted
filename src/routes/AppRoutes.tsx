import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Index from "../pages/Index";
import NotFound from "../pages/NotFound";

import Dashboard from "../pages/dashboard/Dashboard";

import Jobs from "../pages/jobs/Jobs";
import JobDetails from "../pages/jobs/JobDetails";
import ApplyForJob from "../pages/jobs/ApplyforJob";

import MyResumes from "../pages/resume/MyResumes";
import UploadResume from "../pages/resume/UploadResume";
import ResumeScore from "../pages/resume/ResumeScore";

import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import MyApplications from "../pages/profile/MyApplications";
import EducationPage from "../pages/profile/Education";
import EditEducation from "../pages/profile/EditEducation";
import AddEducation from "../pages/profile/AddEducation";

import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateJob from "../pages/admin/CreateJob";
import AdminJobs from "../pages/admin/AdminJobs";
import EditJob from "../pages/admin/EditJobs";
import AdminApplications from "../pages/admin/Applications";
import AcceptedApplications from "../pages/admin/AcceptedApplications";
import CreateCourse from "../pages/admin/CreateCourse";
import AdminCourses from "../pages/admin/AdminCourses";
import EditCourse from "../pages/admin/EditCourses";

import RoleRoute from "./RoleRoute";

import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";
import AdminProfile from "../pages/admin/AdminProfile";
import EditAdminProfile from "../pages/admin/EditAdminProfile";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Index />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* User Routes */}
                <Route element={<RoleRoute allowedRoles={["USER"]} />}>
                    <Route element={<MainLayout />}>

                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/jobs/:id" element={<JobDetails />} />
                        <Route path="/jobs/:id/apply" element={<ApplyForJob />} />

                        <Route path="/resume" element={<MyResumes />} />
                        <Route path="/resume/upload" element={<UploadResume />} />
                        <Route
                            path="/resume/:resumeId/score"
                            element={<ResumeScore />}
                        />

                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/profile/edit"
                            element={<EditProfile />}
                        />

                        <Route
                            path="/applications"
                            element={<MyApplications />}
                        />
                        <Route path="/education" element={<EducationPage />} />

                        <Route path="/education/new" element={<AddEducation />} />

                        <Route path="/education/:id/edit" element={<EditEducation />} />

                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
                    <Route element={<AdminLayout />}>

                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />

                        <Route path="/admin/profile" element={<AdminProfile />} />

                        <Route path="/admin/editprofile" element={<EditAdminProfile />} />

                        <Route
                            path="/admin/jobs"
                            element={<AdminJobs />}
                        />

                        <Route
                            path="/admin/jobs/create"
                            element={<CreateJob />}
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

                        <Route
                            path="/admin/courses/create"
                            element={<CreateCourse />}
                        />

                        <Route
                            path="/admin/courses"
                            element={<AdminCourses />}
                        />

                        <Route
                            path="/admin/courses/:id/edit"
                            element={<EditCourse />}
                        />

                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;