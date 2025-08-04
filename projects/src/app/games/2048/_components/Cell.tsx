interface TileProps {
    value: number
}

export default function Cell(props: TileProps) {
    return (
        <div className={`cell cell-${props.value}`}>{props.value === 0 ? "" : props.value}</div>
    )
}