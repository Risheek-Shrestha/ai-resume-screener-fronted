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
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/" element={<Register />} />
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/" element={<MyResumes />} />
                <Route path="/" element={<ResumeScore />} />
                <Route path="/" element={<Profile />} />
                <Route path="/" element={<JobDetails />} />
                <Route path="/" element={<Jobs />} />
                <Route path="/" element={<DashBoard />} />
                <Route path="/" element={<UploadResume />} />
                <Route path="/" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;