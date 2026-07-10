import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Save } from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { createCourse } from "../../services/courseService";
import { getErrorMessage } from "../../utils/getErrorMessage";

function CreateCourse() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [totalYears, setTotalYears] = useState(4);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await createCourse({
                name,
                totalYears,
            });

            navigate("/admin/courses");
        } catch (err) {
            setError(
                getErrorMessage(
                    err,
                    "Unable to create course."
                )
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-2xl px-6 py-10">

            <h1 className="mb-8 flex items-center gap-3 font-display text-3xl font-bold">
                <GraduationCap />
                Create Course
            </h1>

            <Card padding="lg">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <Input
                        id="name"
                        label="Course Name"
                        placeholder="MCA"
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
                        loading={loading}
                    >
                        <Save
                            size={16}
                            className="mr-2"
                        />
                        Create Course
                    </Button>

                </form>

            </Card>

        </div>
    );
}

export default CreateCourse;