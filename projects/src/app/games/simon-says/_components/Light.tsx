
interface LightProps {
    color: string;
    isActive: boolean;
    onClick: () => void;
}

export default function Light(props: LightProps) {
    return (
        <div className={`light ${props.color} ${props.isActive ? 'active' : ''}`} onClick={props.onClick}></div>
    )
}