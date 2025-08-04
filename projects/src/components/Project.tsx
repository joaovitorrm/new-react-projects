import Link from "next/link";

interface ProjectProps {
    name: string;
    description: string;
    link: string;
}

export default function Project(props: ProjectProps) {
    return (
        <div className="project">
            <h1 className="name">{props.name}</h1>
            <p className="description">{props.description}</p>
            <span>
                <Link className="link" href={`games/${props.link}`}>Link</Link>
            </span>            
        </div>
    )
}