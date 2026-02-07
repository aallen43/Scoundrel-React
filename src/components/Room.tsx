import type { CardType } from "../types/CardType";
import Card from "./Card";
import { SuitColor, Suits, getRank } from "../util/CardHelper";

interface Props {
    cards: CardType[];
    callback: (card: CardType) => void;
    onDamageReceived: (card: CardType) => void;
    onGainHealth: (health: number) => void;
    onGainWeapon: (weapon: CardType) => void;
}

export default function Room({
    cards,
    callback,
    onDamageReceived,
    onGainHealth,
    onGainWeapon,
}: Props) {
    const onCardClick = (card: CardType): void => {
        const rank = getRank(card.value);
        switch (card.suit) {
            case Suits.spades:
            case Suits.clubs:
                onDamageReceived(card);
                break;
            case Suits.diamonds:
                onGainWeapon(card);
                break;
            case Suits.hearts:
                onGainHealth(rank);
                break;
        }
        callback(card);
    };

    return (
        <div className="room">
            {cards.map((card, index) => (
                <Card key={index} onClick={() => onCardClick(card)}>
                    <p className="card-rank">{card.value}</p>
                    <p style={{ color: SuitColor[card.suit] }}>{card.suit}</p>
                </Card>
            ))}
        </div>
    );
}
