import styles from '../styles.module.css'

interface BubbleProps {
    color: string
}

export default function Bubble(props: BubbleProps) {
    return (
        <div className={`${styles["bubble"]} ${styles[props.color]}`}></div>
    )
}