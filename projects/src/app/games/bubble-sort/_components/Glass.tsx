import styles from '../styles.module.css'

import Bubble from "./Bubble"

interface GlassProps {
    bubbles: string[];
    onClick: () => void;
    isSelected: boolean;
}

export default function Glass(props: GlassProps) {
    return (
        <div className={`${styles["glass"]} ${props.isSelected ? styles["selected"] : ''}`} onClick={() => props.onClick()}>
            {props.bubbles.map((bubble, index) => (<Bubble key={index} color={bubble} />))}
        </div>
    )
}