import { useState, useEffect } from "react";
import Room from "./components/Room";
import Deck from "./components/Deck";
import Health from "./components/Health";
import Inventory from "./components/Inventory";
import type { CardType } from "./types/CardType";
import { Ranks, RestrictedRedRanks, Suits, getRank } from "./util/CardHelper";
import "./App.css";

function App() {
    const [room, setRoom] = useState<CardType[]>([]);
    const [deck, setDeck] = useState<CardType[]>([]);
    const [inventory, setInventory] = useState<CardType[]>([]);
    const [damage, setDamage] = useState<number>(0);
    const [hasPlayedHealth, setHasPlayedHealth] = useState<boolean>(false);
    const [previousRoomSkipped, setPreviousRoomSkipped] =
        useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isShuffling, setIsShuffling] = useState<boolean>(false);

    useEffect(() => {
        if (damage >= 20) {
            setIsGameOver(true);
        }
    }, [damage]);

    const createNewGame = (): void => {
        setIsShuffling(true);
        let newDeck = createDeck();
        setRoom([]);
        setDeck(newDeck);
        setGameStarted(true);
        setInventory([]);
        setDamage(0);
        setHasPlayedHealth(false);
        setPreviousRoomSkipped(false);
        setIsGameOver(false);
        setTimeout(() => {
            setRoom(newDeck.splice(0, 4));
            setDeck(newDeck);
            setIsShuffling(false);
        }, 1200);
    };

    const createDeck = (): CardType[] => {
        const deck: CardType[] = [];
        for (const suit of Object.values(Suits)) {
            for (const value of Object.values(Ranks)) {
                if (
                    (suit === Suits.hearts || suit == Suits.diamonds) &&
                    RestrictedRedRanks.includes(value)
                ) {
                    continue;
                }
                deck.push({ value, suit });
            }
        }
        return shuffleDeck(deck);
    };

    // Shuffle using Fisher-Yates
    const shuffleDeck = (deck: CardType[]): CardType[] => {
        const shuffled = [...deck];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const onDamageReceived = (card: CardType): void => {
        const damageReceived = getRank(card.value);
        const latestMonsterSlain = inventory[inventory.length - 1];
        let newDamage = damage + damageReceived;
        if (
            latestMonsterSlain &&
            (![Suits.spades, Suits.clubs].includes(latestMonsterSlain.suit) ||
                getRank(latestMonsterSlain.value) >= damageReceived) &&
            damageReceived - getRank(inventory[0].value) < 20
        ) {
            newDamage = damageReceived - getRank(inventory[0].value);
            if (damage + newDamage > 20) {
                setDamage(20);
            } else {
                setDamage(newDamage < 0 ? damage : damage + newDamage);
            }
            setInventory([...inventory, card]);
        } else if (newDamage < 20) {
            setDamage(newDamage);
        } else {
            setDamage(20);
        }
    };

    const onGainHealth = (healthReceived: number): void => {
        if (!hasPlayedHealth) {
            setHasPlayedHealth(true);
            const newDamage = damage - healthReceived;
            if (newDamage < 0) {
                setDamage(0);
            } else {
                setDamage(newDamage);
            }
        }
    };

    const onGainWeapon = (card: CardType): void => {
        setInventory([card]);
    };

    const onCardClick = (card: CardType): void => {
        const filteredRoom = room.filter((h) => h !== card);

        if (filteredRoom.length === 1) {
            setRoom([...filteredRoom, ...deck.splice(0, 3)]);
            setHasPlayedHealth(false);
            setPreviousRoomSkipped(false);
        } else {
            setRoom(filteredRoom);
        }
    };

    const onSkipRoom = (currentRoom: CardType[]): void => {
        const newDeck = [...deck, ...currentRoom];
        setRoom([...newDeck.splice(0, 4)]);
        setDeck(newDeck);
        setHasPlayedHealth(false);
        setPreviousRoomSkipped(true);
    };

    const onSkipRoomFromLeft = (): void => {
        const roomCards = [...room].reverse();
        onSkipRoom(roomCards);
    };

    const onSkipRoomFromRight = (): void => {
        const roomCards = [...room];
        onSkipRoom(roomCards);
    };

    const skipDisabled = room.length < 4 || previousRoomSkipped;

    return (
        <div className="app">
            <div className="board">
                <div className="title">♠♣ Scoundrel ♥♦</div>
                <div className="new-game">
                    <button className="draw-button" onClick={createNewGame}>
                        New Game
                    </button>
                    {gameStarted &&
                        deck.length + room.length == 0 &&
                        damage < 20 && (
                            <div
                                className="you-win"
                                style={{
                                    textAlign: "center",
                                    color: "green",
                                    fontSize: 24,
                                    fontWeight: 700,
                                    margin: "12px 10px 0",
                                }}
                            >
                                You Win!!
                            </div>
                        )}
                    {damage >= 20 && (
                        <div
                            className="game-over"
                            style={{
                                textAlign: "center",
                                color: "crimson",
                                fontSize: 24,
                                fontWeight: 700,
                                margin: "12px 10px 0",
                            }}
                        >
                            Game Over
                        </div>
                    )}
                </div>
                {gameStarted && (
                    <div className="game-area">
                        <div className="action-row">
                            {gameStarted && (
                                <Deck
                                    numCardsLeft={deck.length}
                                    isShuffling={isShuffling}
                                />
                            )}
                            <div className="hand-row">
                                <Room
                                    callback={onCardClick}
                                    onDamageReceived={onDamageReceived}
                                    onGainHealth={onGainHealth}
                                    onGainWeapon={onGainWeapon}
                                    cards={room}
                                    isGameOver={isGameOver}
                                />
                            </div>
                        </div>
                        <div className="skip-room">
                            <button
                                className="draw-button"
                                onClick={onSkipRoomFromLeft}
                                disabled={skipDisabled}
                                style={
                                    skipDisabled
                                        ? {
                                              opacity: 0.5,
                                              cursor: "not-allowed",
                                          }
                                        : {}
                                }
                            >
                                Skip Room (from left)
                            </button>
                            <button
                                className="draw-button"
                                onClick={onSkipRoomFromRight}
                                disabled={skipDisabled}
                                style={
                                    skipDisabled
                                        ? {
                                              opacity: 0.5,
                                              cursor: "not-allowed",
                                          }
                                        : {}
                                }
                            >
                                Skip Room (from right)
                            </button>
                        </div>
                        <div className="player-row">
                            {gameStarted && <Health currentDamage={damage} />}
                            {!!inventory.length && (
                                <Inventory inventory={inventory} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
