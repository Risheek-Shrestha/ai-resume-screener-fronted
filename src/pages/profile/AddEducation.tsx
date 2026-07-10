import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import EducationForm from "../../components/forms/EducationForm";
import Card from "../../components/ui/Card";

import { createEducation } from "../../services/educationService";
import type { EducationRequest } from "../../types/education";

function AddEducation() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: EducationRequest) => {
        try {
            setLoading(true);

            await createEducation(data);

            toast.success("Education added successfully.");

            navigate("/education");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add education.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Add Education</h1>
                <p className="text-gray-600">
                    Add your educational qualifications.
                </p>
            </div>

            <Card>
                <EducationForm
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            </Card>
        </div>
    );
}

export default AddEducation;