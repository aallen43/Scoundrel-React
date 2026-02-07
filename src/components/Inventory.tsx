import type { CardType } from "../types/CardType";
import { SuitColor } from "../util/CardHelper";
import Card from "./Card";

interface Props {
    inventory: CardType[];
}

export default function Inventory({ inventory }: Props) {
    return (
        <div className="card-stack" aria-hidden={inventory.length === 0}>
            {inventory.map((c, i) => (
                <Card key={i}>
                    <p className="card-rank">{c.value}</p>
                    <p
                        style={{
                            color: SuitColor[c.suit],
                        }}
                    >
                        {c.suit}
                    </p>
                </Card>
            ))}
        </div>
    );
}
