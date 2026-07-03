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
                    className="mb-2 block text-sm font-medium text-slate-300"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                className={`
                    w-full rounded-xl border
                    px-4 py-3
                    bg-slate-950/60
                    text-slate-100
                    placeholder:text-slate-500
                    transition-all duration-200

                    ${
                        error
                            ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    }

                    focus:outline-none
                    disabled:bg-slate-900
                    disabled:text-slate-500
                    disabled:cursor-not-allowed

                    ${className}
                `}
                {...props}
            />

            {error ? (
                <p className="mt-2 text-sm text-red-400">
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