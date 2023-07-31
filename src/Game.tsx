import React, { useState } from "react";
import classnames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type Tile = {
    id: number;
    color: string;
};

type Board = Tile[][];

const colors = ["#FF3333", "#FF66CC", "#3366FF", "#FFFF66"];

const initialBoard: Board = Array(8)
    .fill(0)
    .map((_, rowIndex) =>
        Array(8)
            .fill(0)
            .map((__, colIndex) => ({
                id: rowIndex * 8 + colIndex,
                color: colors[Math.floor(Math.random() * 4)],
            }))
    );

const DIRECTIONS = [
    [-1, 0], // UP
    [1, 0], // DOWN
    [0, -1], // LEFT
    [0, 1], // RIGHT
];


let matches = getMatches(initialBoard);
while (matches.length > 0) {
    matches.forEach(([i, j]) => {
        initialBoard[i][j].color = colors[Math.floor(Math.random() * 4)];
    });
    matches = getMatches(initialBoard);
}

function getMatches(board: Board): number[][] {
    const matches: number[][] = [];

    board.forEach((row, i) => {
        row.forEach((tile, j) => {
            DIRECTIONS.forEach(([di, dj]) => {
                const match = [[i, j]];
                let ni = i + di,
                    nj = j + dj;
                while (ni >= 0 && ni < 8 && nj >= 0 && nj < 8 && board[ni][nj].color === tile.color) {
                    match.push([ni, nj]);
                    ni += di;
                    nj += dj;
                }
                if (match.length >= 3) {
                    matches.push(...match);
                }
            });
        });
    });

    return matches;
}

const quotes = [
    "Select 2 adjacent tiles to swap them.",
    "Try to match 3 or more tiles of the same color.",
    "You can only swap tiles that are next to each other.",
    "Good luck!",
]

const tauntQuotes = [
    "Meh.",
    "I've seen better.",
    "Barely even trying.",
    "That's it?",
    "And you claim you're sentient?"
]

// Kinky quotes for a special girl
const successQuotes = [
    "Nice.",
    "Good job.",
    "You're getting better.",
    "You're so smart.",
    "I'm proud of you.",
    "You're so good at this.",
    "Wow, amazing."
];

export const Game = () => {
    const [board, setBoard] = useState(initialBoard);
    const [selectedTile, setSelectedTile] = useState<(Tile & {j: number, i: number}) | null>(null);
    const [quote, setQuote] = useState<string>(quotes[0]);
    const [quoteIndex, setQuoteIndex] = useState<number>(0);

    const selectTile = (i: number, j: number) => {
        setSelectedTile({ i, j, ...board[i][j] });
    };

    const swapTiles = (i1: number, j1: number, i2: number, j2: number) => {
        const newBoard = [...board];
        [newBoard[i1][j1], newBoard[i2][j2]] = [newBoard[i2][j2], newBoard[i1][j1]];
        setBoard(newBoard);
    };

    const handleClick = (i: number, j: number) => {
        if (selectedTile) {
            if (quoteIndex < quotes.length - 1) {
                setQuoteIndex((quoteIndex + 1));
                setQuote(quotes[quoteIndex + 1]);
            } else {
                // 25% chance to taunt
                if (Math.random() < 0.25) {
                    setQuote(tauntQuotes[Math.floor(Math.random() * tauntQuotes.length)]);
                } else {
                    setQuote("");
                }
            }

            const [di, dj] = [Math.abs(selectedTile.i - i), Math.abs(selectedTile.j - j)];
            if ((di === 1 && dj === 0) || (di === 0 && dj === 1)) {
                swapTiles(selectedTile.i, selectedTile.j, i, j);
                setSelectedTile(null);
            } else {

                selectTile(i, j);
            }
        } else {
            selectTile(i, j);
        }
    };

    const removeMatches = () => {
        const matches = getMatches(board);
        if (matches.length > 0) {
            setQuote(successQuotes[Math.floor(Math.random() * successQuotes.length)]);

            const newBoard = board.map((row) =>
                row.map((tile) =>
                    matches.some(([i, j]) => board[i][j].id === tile.id)
                        ? { ...tile, color: colors[Math.floor(Math.random() * 4)] }
                        : tile
                )
            );
            setBoard(newBoard);
        }
    };

    return (
        <div className="game">
            <div className="game-info">
                <div className="game-info-text">
                    <h2 style={{maxWidth: 400, height: 80}}>{quote}</h2>
                </div>
            </div>
            <div onClick={removeMatches}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="tile-row">
                        {row.map((tile, colIndex) => {
                                const tileClasses = classnames('tile', {
                                    'selected': selectedTile && selectedTile.i === rowIndex && selectedTile.j === colIndex,
                                });

                                return <TransitionGroup component={null} key={colIndex}>
                                    <CSSTransition
                                        key={tile.id}
                                        timeout={0}
                                        classNames="fade"
                                    >
                                        <div
                                            className={tileClasses}
                                            onClick={() => handleClick(rowIndex, colIndex)}
                                            style={{
                                                display: "inline-block",
                                                backgroundColor: tile.color,
                                            }}
                                        />
                                    </CSSTransition>
                                </TransitionGroup>
                            }
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
