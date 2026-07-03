interface ScoreGaugeProps {
    score: number;
    size?: number;
    label?: string;
}

function ScoreGauge({ score, size = 176, label = "ATS Score" }: ScoreGaugeProps) {

    const radius = (size - 32) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, score));
    const offset = circumference - (clamped / 100) * circumference;

    const color =
        clamped >= 75 ? "#22D3EE" : clamped >= 50 ? "#F59E0B" : "#EF4444";

    const center = size / 2;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#1E293B"
                    strokeWidth="12"
                    fill="none"
                />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={color}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-700 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="font-display text-4xl font-bold text-white">
                    {Math.round(clamped)}
                </span>
                {label && (
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
}

export default ScoreGauge;