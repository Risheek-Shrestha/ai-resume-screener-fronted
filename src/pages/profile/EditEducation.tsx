import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import Card from "../../components/ui/Card";
import EducationForm from "../../components/forms/EducationForm";

import {
    getEducationById,
    updateEducation,
} from "../../services/educationService";

import type {
    Education,
    EducationRequest,
} from "../../types/education";

function EditEducation() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [education, setEducation] =
        useState<Education | null>(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchEducation = async () => {
            if (!id) return;

            try {
                const data = await getEducationById(Number(id));
                setEducation(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load education.");
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, [id]);

    const handleSubmit = async (
        data: EducationRequest
    ) => {
        if (!id) return;

        try {
            setSaving(true);

            await updateEducation(Number(id), data);

            toast.success("Education updated successfully.");

            navigate("/education");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update education.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-10 text-center">
                Loading...
            </div>
        );
    }

    if (!education) {
        return (
            <div className="py-10 text-center">
                Education not found.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Edit Education
                </h1>

                <p className="text-gray-600">
                    Update your education details.
                </p>
            </div>

            <Card>
                <EducationForm
                    initialValues={education}
                    onSubmit={handleSubmit}
                    loading={saving}
                />
            </Card>
        </div>
    );
}

export default EditEducation;