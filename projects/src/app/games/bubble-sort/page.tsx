'use client'

import Glass from './_components/Glass';
import styles from './styles.module.css'

import { useEffect, useReducer } from "react"

interface State {
    glasses: string[][];
    glassesAmount: number;
    selectedGlass: number | null;
    isWon: boolean;
}

const colors = ["red", "green", "blue", "yellow", "orange", "purple", "gray", "pink", "brown"];

type Action = 
    {type: "CREATE"} | {type: "SELECT_GLASS", payload: number};


function reducer(state: State, action: Action) {

    const stateCopy = {...state};

    switch (action.type) {
        case "CREATE":
            stateCopy.isWon = false;

            const randomColors = colors.sort(() => Math.random() - 0.5).map((color) => {
                return [color, color, color, color];
            }).slice(0, stateCopy.glassesAmount - 2);

            stateCopy.glasses = [[], []];

            for (let i = 2; i < stateCopy.glassesAmount; i++) {
                stateCopy.glasses.push([]);
                for (let c = 0; c < 4; c++) {
                    let randomColor = Math.floor(Math.random() * randomColors.length);
                    while (randomColors[randomColor].length === 0) {
                        randomColor = Math.floor(Math.random() * randomColors.length);
                    }
                    stateCopy.glasses[i].push(randomColors[randomColor].pop()!);
                }
            }
            return stateCopy;
        case "SELECT_GLASS":
            if (stateCopy.selectedGlass !== null) {
                if (stateCopy.selectedGlass === action.payload) {
                    stateCopy.selectedGlass = null;
                    return stateCopy;
                }
                if (stateCopy.glasses[action.payload].length < 4){
                    if (stateCopy.glasses[action.payload][0] === stateCopy.glasses[stateCopy.selectedGlass][0] || stateCopy.glasses[action.payload].length === 0) {
                        stateCopy.glasses[action.payload].unshift(stateCopy.glasses[stateCopy.selectedGlass].shift()!);
                        if (stateCopy.glasses.every(glass => {
                            if (glass.length === 4 || glass.length === 0) {
                                const lastColor = glass[0];
                                return glass.every(color => color === lastColor);
                            };
                            return false;
                        })) {
                            stateCopy.isWon = true;
                        }
                        stateCopy.selectedGlass = null;
                        return stateCopy;
                    }
                }
            }
            stateCopy.selectedGlass = action.payload;
            return stateCopy;
    }
}

export default function BubbleSort() {

    const [state, dispatch] = useReducer(reducer, { glasses: [], glassesAmount: 9, selectedGlass: null, isWon: false });

    useEffect(() => {
        dispatch({ type: "CREATE" });
    }, []);

    return (
        <div className={styles["game-div"]}>
            <h1 className={styles["title"]}>Bubble Sort</h1>
            <div className={styles["glasses-div"]}>
                {state.glasses.map((glass, index) => (
                    <Glass 
                        key={index}
                        bubbles={glass}
                        onClick={() => dispatch({ type: "SELECT_GLASS", payload: index })}
                        isSelected={state.selectedGlass === index}
                    />
                ))}
            </div>
            {state.isWon &&<button className={styles["reset-btn"]} onClick={() => {dispatch({ type: "CREATE" })}}>Reset</button>}
        </div>
    )
}