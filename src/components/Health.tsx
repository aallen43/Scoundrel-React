interface Props {
    currentDamage: number;
}

export default function Health({ currentDamage }: Props) {
    const heightPercentage = ((20 - currentDamage) / 20) * 100;
    const healthRemaining = 20 - currentDamage;
    let className = "health-filler-good";
    if (currentDamage >= 15) {
        className = "health-filler-bad";
    } else if (currentDamage >= 10) {
        className = "health-filler-warning";
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div className="health-bar" style={{ position: "relative" }}>
                <div
                    id="health-filler"
                    className={className}
                    style={{
                        height: `${heightPercentage}%`,
                    }}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                        zIndex: 10,
                    }}
                >
                    {healthRemaining}
                </div>
            </div>
        </div>
    );
}
