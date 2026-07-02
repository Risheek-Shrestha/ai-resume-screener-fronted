import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    hover?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
}

function Card({
    children,
    title,
    subtitle,
    hover = false,
    padding = "md",
    className = "",
    ...props
}: CardProps) {

    const paddings = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    return (
        <div
            className={`
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-200

                ${hover ? "hover:-translate-y-1 hover:shadow-xl" : ""}
                ${paddings[padding]}
                ${className}
            `}
            {...props}
        >
            {(title || subtitle) && (
                <div className="mb-5">

                    {title && (
                        <h2 className="text-xl font-bold text-slate-900">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}

                </div>
            )}

            {children}
        </div>
    );
}

export default Card;