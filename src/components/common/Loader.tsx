interface LoaderProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    fullScreen?: boolean;
}

function Loader({
    size = "md",
    text = "Loading...",
    fullScreen = false,
}: LoaderProps) {
    const sizes = {
        sm: "h-6 w-6 border-2",
        md: "h-10 w-10 border-[3px]",
        lg: "h-16 w-16 border-4",
    };

    const loader = (
        <div className="flex flex-col items-center justify-center gap-4">

            <div
                className={`
                    animate-spin
                    rounded-full
                    border-cyan-500
                    border-t-transparent
                    ${sizes[size]}
                `}
            />

            {text && (
                <p className="text-sm text-slate-500">
                    {text}
                </p>
            )}

        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
                {loader}
            </div>
        );
    }

    return loader;
}

export default Loader;