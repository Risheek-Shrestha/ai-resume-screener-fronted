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

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/resume" element={<MyResumes />} />
                <Route path="/resume/upload" element={<UploadResume />} />
                <Route path="/resume/:id/score" element={<ResumeScore />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;