'use client'

import styles from '../styles.module.css'
import { useEffect, useReducer } from "react"

type Action =
    { type: "GENERATE_GRID", payload: { grid_size: number } } | 
    { type: "HANDLE_CLICK_CELL", payload: { x: number, y: number, e: React.PointerEvent, value: number } }

interface State {
    game_grid: number[][];
    player_grid: number[][];
    grid_size: number;
    horizontal_hints: number[][];
    vertical_hints: number[][];
    isReset: boolean;
    player_lives: { max: number, current: number };
}

const initialState: State = {
    game_grid: [],
    player_grid: [],
    grid_size: 0,
    horizontal_hints: [],
    vertical_hints: [],
    isReset: false,
    player_lives: { max: 3, current: 3 },
}

function reducer(state: State, action: Action) {

    switch (action.type) {
        case "GENERATE_GRID":
            const randomGrid = Array.from({ length: action.payload.grid_size }, () =>
                Array.from({ length: action.payload.grid_size }, () => Math.round(Math.random()))
            );

            const horizontal_hints: number[][] = [];
            const vertical_hints: number[][] = [];

            for (let y = 0; y < randomGrid.length; y++) {
                let amountX = 0, amountY = 0;
                for (let x = 0; x < randomGrid[y].length; x++) {
                    if (randomGrid[y][x] === 1) {
                        amountX++;
                    }
                    else if (amountX > 0) {
                        if (!horizontal_hints[y]) horizontal_hints[y] = [];
                        horizontal_hints[y].push(amountX);
                        amountX = 0;
                    }

                    if (randomGrid[x][y] === 1) {
                        amountY++;
                    }
                    else if (amountY > 0) {
                        if (!vertical_hints[y]) vertical_hints[y] = [];
                        vertical_hints[y].push(amountY);
                        amountY = 0;
                    }
                }
                if (!horizontal_hints[y]) horizontal_hints[y] = [];
                if (amountX > 0) {
                    horizontal_hints[y].push(amountX);
                }

                if (!vertical_hints[y]) vertical_hints[y] = [];
                if (amountY > 0) {
                    vertical_hints[y].push(amountY);
                }
            }

            const playerGrid = Array.from({ length: action.payload.grid_size }, () => Array(action.payload.grid_size).fill(0));


            return { ...initialState, game_grid: randomGrid, horizontal_hints, vertical_hints, player_grid: playerGrid, isReset: false, grid_size: action.payload.grid_size };

        case "HANDLE_CLICK_CELL":

            const { x, y, e, value } = action.payload;

            const playerGrid2 = state.player_grid.map(arr => [...arr]);

            if (e.buttons === 1 && value != 2) {
                if (state.game_grid[y][x] === 1) {
                    playerGrid2[y][x] = 1;

                    if (playerGrid2.every((_, y) => playerGrid2[y].every((_, x) => {
                        if (playerGrid2[y][x] !== 1 && state.game_grid[y][x] !== 1) return true;
                        if (playerGrid2[y][x] === 1 && state.game_grid[y][x] === 1) return true;
                        return false
                    }))) {
                        return { ...state, player_grid: playerGrid2, isReset: true };
                    }

                    return { ...state, player_grid: playerGrid2 };
                }
                playerGrid2[y][x] = 2;
                if (state.player_lives.current === 1) {
                    return { ...state, player_grid: playerGrid2, isReset: true };
                }
                return { ...state, player_lives: { ...state.player_lives, current: state.player_lives.current - 1 }, player_grid: playerGrid2 };
            }

            if (e.buttons === 2 && state.player_grid[y][x] !== 1) {
                playerGrid2[y][x] = playerGrid2[y][x] === 2 ? 0 : 2;
                return { ...state, player_grid: playerGrid2 };
            }

        default:
            return state;
    }
}

interface Props {
    size: number;
}

export default function Nonogram(props: Props) {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!state.isReset) return;
        dispatch({ type: "GENERATE_GRID", payload: { grid_size: props.size } });
    }, [state.isReset])

    useEffect(() => {
        dispatch({ type : "GENERATE_GRID", payload: { grid_size: props.size } });
    }, [props.size])

    return (
        <div className={styles["game-grid"]}>
            <div className={`${styles["horizontal-hints"]} ${styles[`size-${state.grid_size}`]}`}>
                {state.vertical_hints.flatMap((row, y) => (
                    <div className={styles["hint-row"]} key={y}>
                        {row.map((value, x) => (
                            <div className={styles["hint-cell"]} key={`${x}-${y}`}>{value}</div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={`${styles["vertical-hints"]} ${styles[`size-${state.grid_size}`]}`}>
                {state.horizontal_hints.flatMap((row, y) => (
                    <div className={styles["hint-column"]} key={y}>
                        {row.map((value, x) => (
                            <div className={styles["hint-cell"]} key={`${x}-${y}`}>{value}</div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={`${styles["nonogram"]} ${styles[`size-${state.grid_size}`]}`}>
                {state.player_grid.flatMap((row, y) => (
                    row.map((value, x) => (
                        <div
                            className={`${styles["cell"]} ${value === 1 ? styles['filled'] : ''} ${value === 2 ? styles['wrong'] : ''}`}
                            key={`${x}-${y}`}
                            onPointerDown={(e) => dispatch({ type: "HANDLE_CLICK_CELL", payload: { x, y, e, value } })}
                            onPointerEnter={(e) => dispatch({ type: "HANDLE_CLICK_CELL", payload: { x, y, e, value } })}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            {value === 2 ? 'X' : ""}
                        </div>
                    ))
                ))}
            </div>
            <div className={styles["lives"]}>
                {Array(state.player_lives.max).fill(0).map((_, index) => (
                    <div 
                        className={`${styles["life"]} ${index < state.player_lives.current ? styles['alive'] : ''}`} 
                        key={index}
                    ></div>
                ))}
            </div>
        </div>

    )
}