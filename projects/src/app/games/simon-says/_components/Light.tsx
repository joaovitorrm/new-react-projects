import styles from "../styles.module.css"

interface LightProps {
    color: string;
    isActive: boolean;
    onClick: () => void;
}

export default function Light(props: LightProps) {
    return (
        <div className={`${styles["light"]} ${styles[`${props.color}`]} ${props.isActive ? styles['active'] : ''}`} onClick={props.onClick}></div>
    )
}