// import cardBack from "../assets/cardback.svg";

// interface Props {
//     numCardsLeft: number;
//     isShuffling: boolean;
// }

// export default function Deck({ numCardsLeft, isShuffling }: Props) {
//     return (
//         <div className="deck">
//             <div className="number-container">{numCardsLeft}</div>
//             <div className={`deck-container ${isShuffling ? "shuffling" : ""}`}>
//                 <img src={cardBack} className="card-image" />
//             </div>
//         </div>
//     );
// }

import cardBack from "../assets/cardback.svg";

interface Props {
    numCardsLeft: number;
    isShuffling: boolean;
}

export default function Deck({ numCardsLeft, isShuffling }: Props) {
    return (
        <div className="deck">
            <div className="number-container">{numCardsLeft}</div>
            <div className={`deck-container ${isShuffling ? "shuffling" : ""}`}>
                {isShuffling && (
                    <>
                        <img
                            src={cardBack}
                            className="card-image card-copy copy1"
                            alt="card back"
                            draggable={false}
                        />
                        <img
                            src={cardBack}
                            className="card-image card-copy copy2"
                            alt="card back"
                            draggable={false}
                        />
                    </>
                )}
                <img
                    src={cardBack}
                    className="card-image"
                    alt="card back"
                    draggable={false}
                />
            </div>
        </div>
    );
}
