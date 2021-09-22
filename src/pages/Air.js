import { useSelector } from "react-redux"
import DemoLayout from "../components/BlurLayer"
export default function Air(){
const quote = useSelector(state => state.boards.quotes)
const initialQuote = {cat:"air",text: "Happiness comes the way the wind blows"}
console.log(quote)
    return (
        <div className="layout">
        <h1>Air Page</h1>
        <DemoLayout name="air"/>
        </div>
    )
}