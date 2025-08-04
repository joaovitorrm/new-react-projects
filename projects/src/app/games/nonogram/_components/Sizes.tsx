

interface Props {
    onChangeSize: (size: number) => void;
    size: number;
}

export default function Sizes(props: Props) {

    return (
        <div className="sizes">
            {Array(3).fill(0).map((_, index) => (
                <div key={index}>
                    <input 
                        type="radio" 
                        name="size" 
                        id={`size-${(index + 1) * 5}x${(index + 1) * 5}`}
                        checked={props.size === (index + 1) * 5} 
                        onChange={() => props.onChangeSize((index + 1) * 5)}
                    />
                    <label htmlFor={`size-${(index + 1) * 5}x${(index + 1) * 5}`}>{`${(index + 1) * 5}x${(index + 1) * 5}`}</label>
                </div>
            ))}


            {/* <input type="radio" name="size" id="size-10x10" checked={props.size === 10} />
            <label htmlFor="size-10x10" onClick={() => props.onChangeSize(10)}>10x10</label>

            <input type="radio" name="size" id="size-15x15" checked={props.size === 15} />
            <label htmlFor="size-15x15" onClick={() => props.onChangeSize(15)}>15x15</label> */}
        </div>
    )
}