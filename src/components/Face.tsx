interface Props {
    state: "happy" | "neutral" | "hurt" | "dead";
}

export default function Face({ state }: Props) {
    const size = 48;
    const colors = {
        happy: "#4CAF50",
        neutral: "#FFB300",
        hurt: "#E53935",
        dead: "#E53935",
    } as const;
    const color = colors[state];

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            aria-label={`face-${state}`}
            style={{ marginLeft: 12, marginTop: 250 }}
        >
            <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill={color} />
            {/* eyes */}
            {state !== "dead" ? (
                <>
                    <circle
                        cx={size * 0.33}
                        cy={size * 0.38}
                        r={3.5}
                        fill="#fff"
                    />
                    <circle
                        cx={size * 0.67}
                        cy={size * 0.38}
                        r={3.5}
                        fill="#fff"
                    />
                </>
            ) : (
                <g stroke="#fff" strokeWidth={3} strokeLinecap="round">
                    <line
                        x1={size * 0.28}
                        y1={size * 0.3}
                        x2={size * 0.38}
                        y2={size * 0.4}
                    />
                    <line
                        x1={size * 0.38}
                        y1={size * 0.3}
                        x2={size * 0.28}
                        y2={size * 0.4}
                    />
                    <line
                        x1={size * 0.62}
                        y1={size * 0.3}
                        x2={size * 0.72}
                        y2={size * 0.4}
                    />
                    <line
                        x1={size * 0.72}
                        y1={size * 0.3}
                        x2={size * 0.62}
                        y2={size * 0.4}
                    />
                </g>
            )}
            {/* mouth */}
            {state === "happy" && (
                <path
                    d={`M${size * 0.28} ${size * 0.62} Q ${size / 2} ${size * 0.78} ${size * 0.72} ${size * 0.62}`}
                    stroke="#fff"
                    strokeWidth={3}
                    fill="transparent"
                    strokeLinecap="round"
                />
            )}
            {state === "neutral" && (
                <line
                    x1={size * 0.28}
                    y1={size * 0.66}
                    x2={size * 0.72}
                    y2={size * 0.66}
                    stroke="#fff"
                    strokeWidth={3}
                    strokeLinecap="round"
                />
            )}
            {state === "hurt" && (
                <path
                    d={`M${size * 0.72} ${size * 0.62} Q ${size / 2} ${size * 0.46} ${size * 0.28} ${size * 0.62}`}
                    stroke="#fff"
                    strokeWidth={3}
                    fill="transparent"
                    strokeLinecap="round"
                />
            )}
            {state === "dead" && (
                <line
                    x1={size * 0.4}
                    y1={size * 0.66}
                    x2={size * 0.6}
                    y2={size * 0.66}
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                />
            )}
            {/* optional bandage for hurt */}
            {state === "hurt" && (
                <g
                    transform={`translate(${size * 0.56}, ${size * 0.15}) rotate(25)`}
                >
                    <rect
                        x={-6}
                        y={-2}
                        width={16}
                        height={6}
                        rx={2}
                        fill="#fff"
                        opacity={0.9}
                    />
                    <rect
                        x={-2}
                        y={0}
                        width={4}
                        height={4}
                        rx={1}
                        fill={color}
                    />
                </g>
            )}
        </svg>
    );
}
