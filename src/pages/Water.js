//this is the only demo component that works without user being logged in. Functionality is limited. Cant save, or download
import { useSelector } from "react-redux"
import './Water.css'
import './Frames.css'
import DemoLayout from "../components/BlurLayer"
import WorkBench from "../components/WorkBench"
export default function Water(){
    const quote = useSelector(state=> state.boards.quotes)
    const layout = useSelector(state => state.boards.layout)
    const stickers = useSelector(state => state.boards.stickers)
console.log(stickers)
    const initialQuote = {cat:"water",
    text: "Lifes' roughset storms prove the strength of our anchors"}
    const symbol = "https://live.staticflickr.com/65535/51500171763_5dc0abac52_o.png"
    const description = "Water is accorded cleansing power. It is symbolic of dreaming, healing, flowing, fluidity, purification, regeneration, stability, strength, change, fertility, devotion, receiving, and unconditional love. It symbolizes death as well as rebirth. It is life-giving, but can also be destructive. Fresh Water stands for life and good health, while polluted/stagnant Water is symbolic of bad health. It is associated with the Autumn season and the West direction. An inverted triangle is the symbolic representation of the Water element."

    return (
        <div className='water-container'>
        {/* <h3>{quote.text}</h3> */}
        {layout === "" ? 
        <DemoLayout name="water" description={description} symbol={symbol}/> : <WorkBench stickers={stickers}/>}
        </div>
    )
}