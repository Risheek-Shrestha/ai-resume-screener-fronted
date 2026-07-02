import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

function Input({
    label,
    error,
    helperText,
    fullWidth = true,
    className = "",
    id,
    ...props
}: InputProps) {
    return (
        <div className={fullWidth ? "w-full" : ""}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                className={`
                    w-full rounded-xl border
                    px-4 py-3
                    bg-white
                    text-slate-900
                    placeholder:text-slate-400
                    transition-all duration-200

                    ${
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    }

                    focus:outline-none
                    disabled:bg-slate-100
                    disabled:cursor-not-allowed

                    ${className}
                `}
                {...props}
            />

            {error ? (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            ) : helperText ? (
                <p className="mt-2 text-sm text-slate-500">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
}

export default Input;