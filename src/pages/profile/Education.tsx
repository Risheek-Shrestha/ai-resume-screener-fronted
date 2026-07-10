import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import Card from "../../components/ui/Card";
import Button from "../../components/common/Button";

import {
    getEducation,
    deleteEducation,
} from "../../services/educationService";

import type { Education } from "../../types/education";

function EducationPage() {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEducations = async () => {
            try {
                const data = await getEducation();
                setEducations(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load education.");
            } finally {
                setLoading(false);
            }
        };

        loadEducations();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this education?"
        );

        if (!confirmed) return;

        try {
            await deleteEducation(id);

            setEducations((prev) =>
                prev.filter((education) => education.id !== id)
            );

            toast.success("Education deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete education.");
        }
    };

    if (loading) {
        return (
            <div className="py-10 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Education
                    </h1>
                    <p className="text-gray-600">
                        Manage your educational qualifications.
                    </p>
                </div>

                <Link to="/education/new">
                    <Button>Add Education</Button>
                </Link>
            </div>

            {educations.length === 0 ? (
                <Card>
                    <div className="py-8 text-center">
                        <p className="text-lg font-medium">
                            No education records found.
                        </p>

                        <p className="mt-2 text-gray-500">
                            Add your first education entry.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="space-y-4">
                    {educations.map((education) => (
                        <Card key={education.id}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {education.level
                                            .replaceAll("_", " ")}
                                    </h2>

                                    <p className="text-gray-600">
                                        {education.institution}
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {education.startDate}{" "}
                                        -
                                        {" "}
                                        {education.isCurrent
                                            ? "Present"
                                            : education.endDate}
                                    </p>

                                    <p className="mt-1">
                                        <strong>Grade:</strong>{" "}
                                        {education.grade}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/education/${education.id}/edit`}
                                    >
                                        <Button>
                                            Edit
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            handleDelete(
                                                education.id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EducationPage;