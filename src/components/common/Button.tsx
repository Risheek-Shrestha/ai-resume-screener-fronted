import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    loading?: boolean;
}

function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled,
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses =
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

    const variants = {
        primary:
            "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20",

        secondary:
            "bg-slate-800 text-white hover:bg-slate-700",

        outline:
            "border border-slate-700 text-slate-200 hover:border-cyan-500 hover:bg-slate-900",

        ghost:
            "text-slate-300 hover:bg-slate-800/60 hover:text-white",

        danger:
            "bg-red-600 text-white hover:bg-red-500",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",

        md: "px-5 py-3 text-base",

        lg: "px-7 py-4 text-lg",
    };

    return (
        <button
            className={`
                ${baseClasses}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg
                        className="mr-2 h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <circle
                            className="opacity-20"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />

                        <path
                            className="opacity-100"
                            fill="currentColor"
                            d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
                        />
                    </svg>

                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;