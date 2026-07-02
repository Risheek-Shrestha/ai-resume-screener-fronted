import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?:
        | "primary"
        | "success"
        | "warning"
        | "danger"
        | "secondary";
}

function Badge({
    children,
    variant = "primary",
    className = "",
    ...props
}: BadgeProps) {

    const variants = {
        primary:
            "bg-cyan-100 text-cyan-700",

        success:
            "bg-green-100 text-green-700",

        warning:
            "bg-yellow-100 text-yellow-700",

        danger:
            "bg-red-100 text-red-700",

        secondary:
            "bg-slate-100 text-slate-700",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
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