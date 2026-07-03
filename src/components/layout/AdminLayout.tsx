import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminLayout() {
    return (
        <div className="min-h-screen text-white">
            <div className="app-backdrop" />
            <Navbar />

            <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row">
                <Sidebar />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;