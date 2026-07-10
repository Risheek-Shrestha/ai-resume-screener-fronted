import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Lock,
    Mail,
    User,
    Phone,
    Calendar,
    GraduationCap,
    BookOpen,
    Hash,
    Eye,
    EyeOff,
} from "lucide-react";

import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../ui/Card";

import { register as registerApi } from "../../services/authService";
import { getCourses } from "../../services/courseService";
import { getErrorMessage } from "../../utils/getErrorMessage";
import type { Course } from "../../types/course";

function RegisterForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [currentCollege, setCurrentCollege] = useState("");
    const [currentCourseId, setCurrentCourseId] = useState<number | "">("");
    const [currentSemester, setCurrentSemester] = useState<number | "">("");
    const [courses, setCourses] = useState<Course[]>([]);

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loadingCourses, setLoadingCourses] = useState(true);

    useEffect(() => {
        getCourses()
            .then(setCourses)
            .catch(() => setCourses([]))
            .finally(() => setLoadingCourses(false));
    }, []);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);

        try {
            await registerApi({
                username,
                email,
                password,
                phoneNumber,
                dateOfBirth,
                currentCollege,
                currentCourseId: Number(currentCourseId),
                currentSemester: Number(currentSemester),
            });
            navigate("/login", {
                state: {
                    successMessage:
                        "Account created successfully. Please sign in.",
                },
            });
        } catch (err) {
            setError(
                getErrorMessage(
                    err,
                    "Unable to create account."
                )
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">

            <div className="app-backdrop" />

            <div className="relative w-full max-w-md">

                <Link
                    to="/"
                    className="mb-6 flex items-center justify-center gap-1 font-display text-xl font-bold text-white"
                >
                    Resume<span className="text-cyan-400">Screener</span>
                </Link>

                <Card
                    className="border-slate-800 bg-slate-900/90 text-white shadow-2xl"
                    padding="lg"
                >

                    <div className="mb-8 text-center">

                        <h1 className="font-display text-3xl font-bold">
                            Create account
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Join ResumeScreener and start getting
                            AI-powered resume feedback.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <User size={16} />
                                Username
                            </label>

                            <Input
                                id="username"
                                placeholder="john_doe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Mail size={16} />
                                Email
                            </label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Lock size={16} />
                                Password
                            </label>

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    helperText="Minimum 8 characters recommended."
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Lock size={16} />
                                Confirm Password
                            </label>

                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Phone size={16} />
                                Phone Number
                            </label>

                            <Input
                                id="phoneNumber"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                type="tel"
                                placeholder="9876543210"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Calendar size={16} />
                                Date of Birth
                            </label>

                            <Input
                                id="dateOfBirth"
                                type="date"
                                value={dateOfBirth}
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <GraduationCap size={16} />
                                College
                            </label>

                            <Input
                                id="currentCollege"
                                placeholder="Shoolini University"
                                value={currentCollege}
                                onChange={(e) => setCurrentCollege(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <BookOpen size={16} />
                                Course
                            </label>

                            <select
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                                value={currentCourseId}
                                onChange={(e) =>
                                    setCurrentCourseId(
                                        e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)
                                    )
                                }
                                required
                            >
                                <option value="">
                                    {loadingCourses ? "Loading courses..." : "Select Course"}
                                </option>

                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Hash size={16} />
                                Current Semester
                            </label>

                            <Input
                                id="currentSemester"
                                type="number"
                                min={1}
                                max={12}
                                value={currentSemester}
                                onChange={(e) =>
                                    setCurrentSemester(
                                        e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)
                                    )
                                }
                                required
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            size="lg"
                            disabled={
                                loading ||
                                loadingCourses ||
                                password.length === 0 ||
                                confirmPassword.length === 0 ||
                                password !== confirmPassword ||
                                currentCourseId === "" ||
                                currentSemester === ""
                            }
                        >
                            Register

                            {!loading && (
                                <ArrowRight
                                    size={18}
                                    className="ml-2"
                                />
                            )}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                            Login
                        </Link>

                    </p>

                </Card>

            </div>

        </div>
    );
}

export default RegisterForm;