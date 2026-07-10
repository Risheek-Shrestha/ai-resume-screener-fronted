import { useState } from "react";
import type {
    Education,
    EducationRequest,
} from "../../types/education";
import { EducationLevel as EducationLevels } from "../../types/education";

interface EducationFormProps {
    initialValues?: Education;
    onSubmit: (data: EducationRequest) => Promise<void>;
    loading?: boolean;
}

const initialForm: EducationRequest = {
    level: EducationLevels.BACHELORS,
    institution: "",
    startDate: "",
    endDate: null,
    grade: "",
    isCurrent: false,
};

function EducationForm({
    initialValues,
    onSubmit,
    loading = false,
}: EducationFormProps) {
    const [formData, setFormData] = useState<EducationRequest>(
        initialValues
            ? {
                  level: initialValues.level,
                  institution: initialValues.institution,
                  startDate: initialValues.startDate,
                  endDate: initialValues.endDate,
                  grade: initialValues.grade,
                  isCurrent: initialValues.isCurrent,
              }
            : initialForm
    );

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;

            setFormData((prev) => ({
                ...prev,
                isCurrent: checked,
                endDate: checked ? null : prev.endDate,
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        await onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Education Level
                </label>

                <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full rounded-md border px-3 py-2"
                    required
                >
                    {Object.values(EducationLevels).map((level) => (
                        <option
                            key={level}
                            value={level}
                        >
                            {level.replaceAll("_", " ")}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Institution
                </label>

                <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full rounded-md border px-3 py-2"
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Start Date
                    </label>

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        End Date
                    </label>

                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate ?? ""}
                        onChange={handleInputChange}
                        disabled={formData.isCurrent}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
            </div>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isCurrent"
                    checked={formData.isCurrent}
                    onChange={handleInputChange}
                />

                Currently Studying
            </label>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Grade / CGPA / Percentage
                </label>

                <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full rounded-md border px-3 py-2"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Education"}
            </button>
        </form>
    );
}

export default EducationForm;