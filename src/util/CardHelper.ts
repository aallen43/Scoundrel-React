export const SuitColor: { [key: string]: string } = {
    "♠": "#333",
    "♣": "#333",
    "♥": "#FF0000",
    "♦": "#FF0000",
};

export const Suits: { [key: string]: string } = {
    spades: "♠",
    clubs: "♣",
    hearts: "♥",
    diamonds: "♦",
};

export const Ranks: { [key: string]: string } = {
    A: "A",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    J: "J",
    Q: "Q",
    K: "K",
};

export const RestrictedRedRanks: string[] = ["J", "Q", "K", "A"];

export const FaceValues: { [key: string]: number } = {
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};

export const getRank = (value: string): number => {
    return FaceValues[value] ?? Number.parseInt(value);
};
