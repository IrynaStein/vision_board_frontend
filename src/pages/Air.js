import { useSelector } from "react-redux"
import DemoLayout from "../components/DemoLayout"
export default function Air(){
const quote = useSelector(state => state.boards.quotes)
console.log(quote)
    return (
        <div className="layout">
        <h1>Air Page</h1>
        <DemoLayout name="air"/>
        </div>
    )
}