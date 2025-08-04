interface BubbleProps {
    color: string
}

export default function Bubble(props: BubbleProps) {
    return (
        <div className={`bubble ${props.color}`}></div>
    )
}