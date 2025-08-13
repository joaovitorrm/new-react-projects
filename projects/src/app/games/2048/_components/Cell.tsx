import styles from '../styles.module.css'

interface TileProps {
    value: number
}

export default function Cell(props: TileProps) {
    return (
        <div className={`${styles.cell} ${styles[`cell-${props.value}`]} cell-${props.value}`}>{props.value === 0 ? "" : props.value}</div>
    )
}