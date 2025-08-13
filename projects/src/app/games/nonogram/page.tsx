'use client'

import { useState } from "react";
import Nonogram from "./_components/Nonogram";
import Sizes from "./_components/Sizes";

import styles from './styles.module.css'

export default function Game() {

    const [size, setSize] = useState(5);

    const handleSetSize = (size: number) => {
        setSize(size);
    }

    return (
        <div className={`${styles["game"]} game` }>
        
            <h1 className={"title"}>Nonogram</h1>

            <Nonogram size={size}/>

            <Sizes onChangeSize={handleSetSize} size={size}/>
        
        </div>
    )
}