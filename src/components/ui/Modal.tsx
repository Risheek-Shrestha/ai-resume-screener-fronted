import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "md" | "lg";
}

function Modal({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = "sm",
}: ModalProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleKeyDown);
        panelRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    const widths = {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-up"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
                tabIndex={-1}
                className={`relative w-full ${widths[size]} animate-fade-up rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/40 focus:outline-none`}
            >

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
                >
                    <X size={18} />
                </button>

                {title && (
                    <h2
                        id="modal-title"
                        className="pr-8 font-display text-xl font-bold text-white"
                    >
                        {title}
                    </h2>
                )}

                {description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {description}
                    </p>
                )}

                {children && (
                    <div className={title || description ? "mt-5" : ""}>
                        {children}
                    </div>
                )}

                {footer && (
                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                        {footer}
                    </div>
                )}

            </div>

        </div>,
        document.body
    );
}

export default Modal;