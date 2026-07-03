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
                border-slate-800
                bg-slate-900/70
                shadow-sm
                shadow-black/20
                backdrop-blur-sm
                transition-all
                duration-200

                ${hover ? "hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/30" : ""}
                ${paddings[padding]}
                ${className}
            `}
            {...props}
        >
            {(title || subtitle) && (
                <div className="mb-5">

                    {title && (
                        <h2 className="text-xl font-bold text-white">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-400">
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