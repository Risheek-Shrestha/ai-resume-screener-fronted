import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    User,
    Phone,
    Calendar,
    GraduationCap,
    BookOpen,
} from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/ui/Card";

import { getCurrentUser, updateCurrentUser } from "../../services/userService";
import { getCourses } from "../../services/courseService";

import { getErrorMessage } from "../../utils/getErrorMessage";

import type { Course } from "../../types/course";
import type { UpdateUserRequest } from "../../types/user";

function EditProfile() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [currentCollege, setCurrentCollege] = useState("");
    const [currentCourseId, setCurrentCourseId] = useState<number | "">("");
    const [currentSemester, setCurrentSemester] = useState<number | "">("");

    const [courses, setCourses] = useState<Course[]>([]);

    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        getCurrentUser()
            .then((user) => {
                setUsername(user.username);
                setPhoneNumber(user.phoneNumber);
                setDateOfBirth(user.dateOfBirth);
                setCurrentCollege(user.currentCollege);

                const selectedCourse = user.currentCourse;

                getCourses()
                    .then((courseList) => {
                        setCourses(courseList);

                        const course = courseList.find(
                            (c) => c.name === selectedCourse
                        );

                        if (course) {
                            setCurrentCourseId(course.id);
                        }
                    })
                    .finally(() => setLoadingCourses(false));

                setCurrentSemester(user.currentSemester);
            })
            .catch((err) => {
                setError(
                    getErrorMessage(
                        err,
                        "Unable to load profile."
                    )
                );
            })
            .finally(() => {
                setLoadingProfile(false);
            });
    }, []);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const request: UpdateUserRequest = {
                username,
                phoneNumber,
                dateOfBirth,
                currentCollege,
                currentCourseId: Number(currentCourseId),
                currentSemester: Number(currentSemester),
            };

            await updateCurrentUser(request);

            navigate("/profile");
        } catch (err) {
            setError(
                getErrorMessage(
                    err,
                    "Unable to update profile."
                )
            );
        } finally {
            setLoading(false);
        }
    }

    if (loadingProfile) {
        return (
            <div className="flex min-h-screen items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">

            <div className="app-backdrop" />

            <div className="relative w-full max-w-xl">

                <Card
                    className="border-slate-800 bg-slate-900/90 text-white shadow-2xl"
                    padding="lg"
                >

                    <div className="mb-8 text-center">
                        <h1 className="font-display text-3xl font-bold">
                            Edit Profile
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Keep your profile information up to date.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <User size={16} />
                                Username
                            </label>

                            <Input
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Phone size={16} />
                                Phone Number
                            </label>

                            <Input
                                type="tel"
                                value={phoneNumber}
                                pattern="[0-9]{10}"
                                maxLength={10}
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <Calendar size={16} />
                                Date of Birth
                            </label>

                            <Input
                                type="date"
                                value={dateOfBirth}
                                max={
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }
                                onChange={(e) =>
                                    setDateOfBirth(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <GraduationCap size={16} />
                                College
                            </label>

                            <Input
                                value={currentCollege}
                                onChange={(e) =>
                                    setCurrentCollege(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                <BookOpen size={16} />
                                Course
                            </label>

                            <select
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                                value={currentCourseId}
                                onChange={(e) =>
                                    setCurrentCourseId(
                                        Number(e.target.value)
                                    )
                                }
                                required
                            >
                                <option value="">
                                    {loadingCourses
                                        ? "Loading courses..."
                                        : "Select Course"}
                                </option>

                                {courses.map((course) => (
                                    <option
                                        key={course.id}
                                        value={course.id}
                                    >
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                                Semester
                            </label>

                            <Input
                                type="number"
                                min={1}
                                max={12}
                                value={currentSemester}
                                onChange={(e) =>
                                    setCurrentSemester(
                                        Number(e.target.value)
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

                        <div className="flex gap-3">

                            <Button
                                type="submit"
                                loading={loading}
                                disabled={loadingCourses}
                                className="flex-1"
                            >
                                Save Changes

                                {!loading && (
                                    <ArrowRight
                                        size={18}
                                        className="ml-2"
                                    />
                                )}

                            </Button>

                            <Link
                                to="/profile"
                                className="flex-1"
                            >
                                <Button
                                    variant="outline"
                                    fullWidth
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </Link>

                        </div>

                    </form>

                </Card>

            </div>

        </div>
    );
}

export default EditProfile;