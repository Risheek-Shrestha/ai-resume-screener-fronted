import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    GraduationCap,
    Pencil,
    Trash2,
    Plus,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/common/Button";

import {
    getCourses,
    deleteCourse,
} from "../../services/courseService";

import type { Course } from "../../types/course";
import { getErrorMessage } from "../../utils/getErrorMessage";

function AdminCourses() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCourses();
    }, []);

    async function loadCourses() {
        try {
            setCourses(await getCourses());
        } catch (err) {
            setError(
                getErrorMessage(
                    err,
                    "Unable to load courses."
                )
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {

        if (!confirm("Delete this course?")) {
            return;
        }

        try {
            await deleteCourse(id);

            setCourses((previous) =>
                previous.filter((course) => course.id !== id)
            );
        } catch (err) {
            alert(
                getErrorMessage(
                    err,
                    "Unable to delete course."
                )
            );
        }
    }

    return (
        <div className="mx-auto max-w-5xl px-6 py-10">

            <div className="mb-8 flex items-center justify-between">

                <h1 className="flex items-center gap-3 font-display text-3xl font-bold">

                    <GraduationCap />

                    Courses

                </h1>

                <Link to="/admin/courses/create">

                    <Button>

                        <Plus
                            size={16}
                            className="mr-2"
                        />

                        Add Course

                    </Button>

                </Link>

            </div>

            {error && (
                <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                    {error}
                </div>
            )}

            <Card padding="none">

                <table className="w-full">

                    <thead className="border-b border-slate-800">

                        <tr className="text-left">

                            <th className="p-4">
                                Course
                            </th>

                            <th className="p-4">
                                Years
                            </th>

                            <th className="p-4 text-right">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {!loading &&
                            courses.map((course) => (

                                <tr
                                    key={course.id}
                                    className="border-b border-slate-800"
                                >

                                    <td className="p-4">
                                        {course.name}
                                    </td>

                                    <td className="p-4">
                                        {course.totalYears}
                                    </td>

                                    <td className="space-x-2 p-4 text-right">

                                        <Link to={`/admin/courses/${course.id}/edit`}>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                            >
                                                <Pencil
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                handleDelete(course.id)
                                            }
                                        >
                                            <Trash2
                                                size={14}
                                                className="mr-1"
                                            />
                                            Delete
                                        </Button>

                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </Card>

        </div>
    );
}

export default AdminCourses;