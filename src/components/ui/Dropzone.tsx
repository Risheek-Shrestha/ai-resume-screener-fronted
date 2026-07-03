import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

interface DropzoneProps {
    inputId: string;
    file: File | null;
    onFileSelect: (file: File | null) => void;
    accept?: string;
    hint?: string;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Dropzone({
    inputId,
    file,
    onFileSelect,
    accept = ".pdf,.doc,.docx",
    hint = "PDF, DOC, or DOCX",
}: DropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);

        const dropped = e.dataTransfer.files?.[0];
        if (dropped) onFileSelect(dropped);
    }

    return (
        <div>
            <input
                ref={inputRef}
                id={inputId}
                type="file"
                accept={accept}
                className="sr-only"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        onFileSelect(e.target.files[0]);
                    }
                }}
            />

            <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-8 text-center transition ${
                    isDragging
                        ? "border-cyan-500 bg-cyan-500/5"
                        : "border-slate-700 bg-slate-950/40 hover:border-slate-600"
                }`}
            >
                <UploadCloud
                    size={26}
                    className={isDragging ? "text-cyan-400" : "text-slate-500"}
                />

                <p className="mt-3 text-sm font-medium text-slate-200">
                    Drag and drop your file, or{" "}
                    <span className="text-cyan-400">browse</span>
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    {hint}
                </p>
            </div>

            {file && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <FileText size={16} className="shrink-0 text-cyan-400" />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-100">
                                {file.name}
                            </p>
                            <p className="text-xs text-slate-500">
                                {formatBytes(file.size)}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            onFileSelect(null);
                            if (inputRef.current) inputRef.current.value = "";
                        }}
                        aria-label="Remove selected file"
                        className="shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-red-400"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dropzone;