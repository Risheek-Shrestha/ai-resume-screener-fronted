import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?:
        | "primary"
        | "success"
        | "warning"
        | "danger"
        | "secondary"
        | "accent";
}

function Badge({
    children,
    variant = "primary",
    className = "",
    ...props
}: BadgeProps) {

    const variants = {
        primary:
            "bg-cyan-500/10 text-cyan-300 ring-1 ring-inset ring-cyan-500/25",

        success:
            "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/25",

        warning:
            "bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-500/25",

        danger:
            "bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-500/25",

        secondary:
            "bg-slate-500/10 text-slate-300 ring-1 ring-inset ring-slate-500/20",

        accent:
            "bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/25",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-1
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold

                ${variants[variant]}
                ${className}
            `}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;