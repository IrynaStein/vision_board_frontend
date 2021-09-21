//this is the only demo component that works without user being logged in. Functionality is limited. Cant save, or download
import { useSelector } from "react-redux"
import './Water.css'
import './Frames.css'
import DemoLayout from "../components/DemoLayout"
export default function Water(){
    const quote = useSelector(state=> state.boards.quotes.find((q)=> q.cat === "water"))

    const stickers = useSelector(state => state.boards.stickers)
    const description = "Water is accorded cleansing power. It is symbolic of dreaming, healing, flowing, fluidity, purification, regeneration, stability, strength, change, fertility, devotion, receiving, and unconditional love. It symbolizes death as well as rebirth. It is life-giving, but can also be destructive. Fresh Water stands for life and good health, while polluted/stagnant Water is symbolic of bad health. It is associated with the Autumn season and the West direction. An inverted triangle is the symbolic representation of the Water element."

    return (
        <div className='water-container'>
        <h3>{quote.text}</h3>
        <DemoLayout name="water" description={description}/>
        <div className="stickers">{stickers}</div>
        <div class="frame1"></div>
        <div class="frame2"></div>
        <div class="frame3"></div>
        </div>
    )
}