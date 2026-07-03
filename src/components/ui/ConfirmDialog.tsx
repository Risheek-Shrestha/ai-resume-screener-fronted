import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "../common/Button";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    tone?: "danger" | "primary";
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    tone = "danger",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <Modal
            open={open}
            onClose={onCancel}
            size="sm"
            footer={
                <>
                    <Button variant="outline" size="sm" onClick={onCancel} disabled={loading}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={tone === "danger" ? "danger" : "primary"}
                        size="sm"
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            <div className="flex items-start gap-4">
                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        tone === "danger"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-cyan-500/10 text-cyan-400"
                    }`}
                >
                    <AlertTriangle size={20} />
                </div>
                <div>
                    <h2 className="font-display text-lg font-bold text-white">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;