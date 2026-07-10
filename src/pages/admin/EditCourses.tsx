import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GraduationCap, Save } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import {
    getCourse,
    updateCourse,
} from "../../services/courseService";

import { getErrorMessage } from "../../utils/getErrorMessage";

function EditCourse() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [totalYears, setTotalYears] = useState(4);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!id) return;

        getCourse(Number(id))
            .then((course) => {
                setName(course.name);
                setTotalYears(course.totalYears);
            })
            .catch((err) =>
                setError(
                    getErrorMessage(
                        err,
                        "Unable to load course."
                    )
                )
            )
            .finally(() => setLoading(false));

    }, [id]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!id) return;

        setSaving(true);
        setError("");

        try {

            await updateCourse(Number(id), {
                name,
                totalYears,
            });

            navigate("/admin/courses");

        } catch (err) {

            setError(
                getErrorMessage(
                    err,
                    "Unable to update course."
                )
            );

        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (

        <div className="mx-auto max-w-2xl px-6 py-10">

            <h1 className="mb-8 flex items-center gap-3 font-display text-3xl font-bold">
                <GraduationCap />
                Edit Course
            </h1>

            <Card padding="lg">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <Input
                        id="name"
                        label="Course Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    <Input
                        id="years"
                        label="Total Years"
                        type="number"
                        min={1}
                        max={10}
                        value={totalYears}
                        onChange={(e) =>
                            setTotalYears(Number(e.target.value))
                        }
                        required
                    />

                    {error && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        loading={saving}
                    >
                        <Save
                            size={16}
                            className="mr-2"
                        />
                        Save Changes
                    </Button>

                </form>

            </Card>

        </div>

    );
}

export default EditCourse;