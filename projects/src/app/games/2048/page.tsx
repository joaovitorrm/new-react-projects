'use client'

import { useEffect, useReducer } from 'react';
import './styles.css';
import Cell from './_components/Cell';

type Action =
    { type: "CREATE"} | { type: "HANDLE_KEY_DOWN", payload: KeyboardEvent };

type State = {
    grid: number[][];
}

function getRandomEmptyPos(grid: number[][]) {
    let randomRow = Math.floor(Math.random() * 4);
    let randomColumn = Math.floor(Math.random() * 4);
    while (grid[randomRow][randomColumn] !== 0) {
        randomRow = Math.floor(Math.random() * 4);
        randomColumn = Math.floor(Math.random() * 4);
    }
    return { randomRow, randomColumn };
}

function reducer(state: State, action: Action) {

    switch (action.type) {

        case "CREATE":

            const newGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

            for (let i = 0; i < 2; i++) {
                const { randomRow, randomColumn } = getRandomEmptyPos(newGrid);
                newGrid[randomRow][randomColumn] = 2;
            }

            return { grid: newGrid };

        case "HANDLE_KEY_DOWN":

            const gridMoved = state.grid.map(row => [...row]);

            switch (action.payload.key) {
                case "ArrowUp":
                    for (let gridY = 0; gridY < 3; gridY++) {
                        for (let repeatTimes = 0; repeatTimes < gridY + 1; repeatTimes++) {
                            for (let gridX = 0; gridX < 4; gridX++) {
                                if (gridMoved[gridY - repeatTimes][gridX] === 0) {
                                    gridMoved[gridY - repeatTimes][gridX] = gridMoved[gridY + 1 - repeatTimes][gridX];
                                    gridMoved[gridY + 1 - repeatTimes][gridX] = 0;
                                }
                                else if (gridMoved[gridY - repeatTimes][gridX] === gridMoved[gridY + 1 - repeatTimes][gridX]) {
                                    gridMoved[gridY - repeatTimes][gridX] += gridMoved[gridY + 1 - repeatTimes][gridX];
                                    gridMoved[gridY + 1 - repeatTimes][gridX] = 0;
                                }
                            }
                        }
                    }
                    break;
                case "ArrowLeft":
                    for (let gridY = 0; gridY < 3; gridY++) {
                        for (let repeatTimes = 0; repeatTimes < gridY + 1; repeatTimes++) {
                            for (let gridX = 0; gridX < 4; gridX++) {
                                if (gridMoved[gridX][gridY - repeatTimes] === 0) {
                                    gridMoved[gridX][gridY - repeatTimes] = gridMoved[gridX][gridY + 1 - repeatTimes];
                                    gridMoved[gridX][gridY + 1 - repeatTimes] = 0;
                                }
                                else if (gridMoved[gridX][gridY - repeatTimes] === gridMoved[gridX][gridY + 1 - repeatTimes]) {
                                    gridMoved[gridX][gridY - repeatTimes] += gridMoved[gridX][gridY + 1 - repeatTimes];
                                    gridMoved[gridX][gridY + 1 - repeatTimes] = 0;
                                }
                            }
                        }
                    }
                    break;

                case "ArrowRight":
                    for (let gridY = 3; gridY > 0; gridY--) {
                        for (let repeatTimes = 0; repeatTimes < 4 - gridY; repeatTimes++) {
                            for (let gridX = 0; gridX < 4; gridX++) {
                                if (gridMoved[gridX][gridY + repeatTimes] === 0) {
                                    gridMoved[gridX][gridY + repeatTimes] = gridMoved[gridX][gridY - 1 + repeatTimes];
                                    gridMoved[gridX][gridY - 1 + repeatTimes] = 0;
                                }
                                else if (gridMoved[gridX][gridY + repeatTimes] === gridMoved[gridX][gridY - 1 + repeatTimes]) {
                                    gridMoved[gridX][gridY + repeatTimes] += gridMoved[gridX][gridY - 1 + repeatTimes];
                                    gridMoved[gridX][gridY - 1 + repeatTimes] = 0;
                                }
                            }
                        }
                    }
                    break;

                case "ArrowDown":
                    for (let gridY = 3; gridY > 0; gridY--) {
                        for (let repeatTimes = 0; repeatTimes < 4 - gridY; repeatTimes++) {
                            for (let gridX = 0; gridX < 4; gridX++) {
                                if (gridMoved[gridY + repeatTimes][gridX] === 0) {
                                    gridMoved[gridY + repeatTimes][gridX] = gridMoved[gridY - 1 + repeatTimes][gridX];
                                    gridMoved[gridY - 1 + repeatTimes][gridX] = 0;
                                }
                                else if (gridMoved[gridY + repeatTimes][gridX] === gridMoved[gridY - 1 + repeatTimes][gridX]) {
                                    gridMoved[gridY + repeatTimes][gridX] += gridMoved[gridY - 1 + repeatTimes][gridX];
                                    gridMoved[gridY - 1 + repeatTimes][gridX] = 0;
                                }
                            }
                        }
                    }
                    break;

                default:
                    return state;
            }

            if (!gridMoved.every(row => row.every(cell => cell !== 0))) {
                const { randomRow: randomRow, randomColumn: randomColumn } = getRandomEmptyPos(gridMoved);
                gridMoved[randomRow][randomColumn] = 2;    
            }

            return { ...state, grid: gridMoved };
    }
}

export default function Game2048() {

    const [state, dispatch] = useReducer(reducer, { grid: [] });

    useEffect(() => {
        dispatch({ type: "CREATE" });

        const handleKey = (e: KeyboardEvent) => dispatch({ type: "HANDLE_KEY_DOWN", payload: e });

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <>
            <h1 className="title">2048</h1>
            <div className="game">
                {state.grid.map((row, y) => (
                    row.map((value, x) =>
                        <Cell key={`${x}-${y}`} value={value} />
                    )
                ))}
            </div>
        </>
    )
}