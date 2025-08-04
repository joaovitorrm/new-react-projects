import Bubble from "./Bubble"

interface GlassProps {
    bubbles: string[];
    onClick: () => void;
    isSelected: boolean;
}

export default function Glass(props: GlassProps) {
    return (
        <div className={`glass ${props.isSelected ? 'selected' : ''}`} onClick={() => {console.log("A"); props.onClick()}}>
            {props.bubbles.map((bubble, index) => (<Bubble key={index} color={bubble} />))}
        </div>
    )
}