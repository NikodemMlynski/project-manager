import { useParams } from "react-router-dom"

export default function ProjectPage() {
    const {id} = useParams();
    return <h1>ProjectPage: {id}</h1>
}