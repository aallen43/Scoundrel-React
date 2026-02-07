import type { ReactNode } from "react";

interface Props {
    key: number;
    children: ReactNode;
    onClick?: () => void;
}

export default function Card({ key, children, onClick }: Props) {
    return (
        <div key={key} className="card" onClick={onClick}>
            {children}
        </div>
    );
}
