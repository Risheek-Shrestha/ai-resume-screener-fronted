import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">

            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}

export default MainLayout;