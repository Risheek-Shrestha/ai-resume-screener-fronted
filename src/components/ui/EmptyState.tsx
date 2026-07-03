import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: ReactNode;
}

function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-16 text-center">

            {Icon && (
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-cyan-400">
                    <Icon size={26} />
                </div>
            )}

            <h3 className="text-lg font-semibold text-white">
                {title}
            </h3>

            {description && (
                <p className="mt-2 max-w-sm text-sm text-slate-400">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}

        </div>
    );
}

export default EmptyState;
