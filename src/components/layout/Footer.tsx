import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">
                        Resume<span className="text-cyan-600">Screener</span>
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        AI-powered resume analysis and ATS scoring platform.
                    </p>

                </div>

                <div className="flex items-center gap-5">

                    <FaGithub className="h-5 w-5 text-slate-500 hover:text-cyan-500" />
                    <FaLinkedin className="h-5 w-5 text-slate-500 hover:text-cyan-500" />

                </div>

            </div>

            <div className="border-t border-slate-100 py-5 text-center text-sm text-slate-500">

                <p className="flex items-center justify-center gap-2">

                    Built with

                    <Heart
                        className="fill-red-500 text-red-500"
                        size={16}
                    />

                    using React + Spring Boot

                </p>

            </div>

        </footer>
    );
}

export default Footer;