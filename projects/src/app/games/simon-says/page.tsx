'use client'

import { useEffect, useReducer } from "react";
import Light from "./_components/Light";

import styles from './styles.module.css'

const colors = ["green", "red", "yellow", "blue"];

type Action =
    { type: "ADD_PATTERN" } |
    { type: "CLICK_COLOR", payload: { color: string } } |
    { type: "SHOW_COLOR", payload: { color: string } } |
    { type: "HIDE_COLOR" } |
    { type: "IS_SHOWING_PATTERN", payload: boolean } | 
    { type: "CHECK_SCORED"}


interface State {
    pattern: string[];
    score: number;
    click: { index: number, color: string },
    showingColor: string,
    isShowingPattern: boolean
}

const initialState = {
    pattern: [],
    score: 0,
    click: { index: -1, color: "" },
    showingColor: "",
    isShowingPattern: false,
}

function reducer(state: State, action: Action) {

    switch (action.type) {
        case "ADD_PATTERN":
            return {
                ...state,
                pattern: [...state.pattern, colors[Math.floor(Math.random() * colors.length)]],
            }

        case "SHOW_COLOR":
            return {
                ...state,
                showingColor: action.payload.color,
            }

        case "HIDE_COLOR":
            return {
                ...state,
                showingColor: ""
            }

        case "IS_SHOWING_PATTERN":
            return {
                ...state,
                isShowingPattern: action.payload
            }

        case "CLICK_COLOR":

            if (state.isShowingPattern) return state;

            const index = state.click.index === -1 ? 0 : state.click.index;

            if (action.payload.color === state.pattern[index]) {
                return {
                    ...state,
                    click: { index: index + 1, color: action.payload.color }
                }
            }

            return {
                ...state,
                click: { index: -1, color: "" },
                score: 0,
                pattern: [],
                showingColor: ""
            }

        case "CHECK_SCORED":

            if (state.click.index === state.pattern.length) {
                return {
                    ...state,
                    score: state.score + 1,
                    pattern: [...state.pattern, colors[Math.floor(Math.random() * colors.length)]],
                    click: { index: -1, color: "" },
                }
            }

            return state
    }
}

export default function SimonSays() {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const showPattern = async () => {
            dispatch({ type: "IS_SHOWING_PATTERN", payload: true });
            for (let i = 0; i < state.pattern.length; i++) {
                dispatch({ type: "SHOW_COLOR", payload: { color: state.pattern[i] } });
                await new Promise(resolve => setTimeout(resolve, 1000 - 15 * state.pattern.length));
                dispatch({ type: "HIDE_COLOR" });
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            dispatch({ type: "IS_SHOWING_PATTERN", payload: false });
        }
        showPattern();
    }, [state.pattern]);

    useEffect(() => {

        if (state.click.index === -1) return;

        let isCancelled = false;

        const showColor = async () => {
            dispatch({ type: "SHOW_COLOR", payload: { color: state.click.color } });
            await new Promise(resolve => setTimeout(resolve, 1000 - 15 * state.pattern.length));

            if (isCancelled) return;
            dispatch({ type: "HIDE_COLOR" });

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (isCancelled) return;
            dispatch({ type: "CHECK_SCORED" });
        }
        showColor();

        return () => {isCancelled = true};
    }, [state.click.index])

    return (
        <div className={`${styles["game"]} game`}>
            <h1 className="title">Simon Says</h1>

            <div className={styles["simon-says"]}>
                {colors.map((color, index) => (
                    <Light
                        key={index}
                        color={color}
                        isActive={state.showingColor === color}
                        onClick={() => dispatch({ type: "CLICK_COLOR", payload: { color: color } })}
                    />))}
                <div className={styles["center-score"]}>{state.score}</div>
            </div>

            <button className={`${styles["start-btn"]} ${state.pattern.length > 0 && styles["disabled"]}`} onClick={() => dispatch({ type: "ADD_PATTERN" })}>Start</button>
        </div>
    )
}