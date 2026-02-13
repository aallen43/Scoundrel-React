import type { ReactNode } from "react";

interface Props {
    key: number | string;
    children: ReactNode;
    isGameOver?: boolean;
    onClick?: () => void;
}

export default function Card({ key, children, isGameOver, onClick }: Props) {
    return (
        <div
            key={key}
            className="card"
            onClick={onClick}
            style={isGameOver ? { pointerEvents: "none" } : {}}
        >
            {children}
        </div>
    );
}
