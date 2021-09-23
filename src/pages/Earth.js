import { useSelector } from "react-redux"
import './Elements.css'
import './Frames.css'
import BlurLayer from "../components/BlurLayer"
import WorkBench from "../components/WorkBench"
export default function Earth(){

    const quote = useSelector(state=> state.boards.quote)
    const layout = useSelector(state => state.boards.layout)
    const stickers = useSelector(state => state.boards.stickers)
    console.log(stickers)
    const initialQuote = {cat:"earth",
    text: "Climb mountains not so the world can see you, but so you can see the world"}
    const symbol = "https://live.staticflickr.com/65535/51499151717_78d72f7b43_o.png"
    

    const description = "The Earth element has cleaning power. It symbolizes prosperity, fertility, stability, orderliness, groundedness, sustenance, creativity, physical abundance, nourishment, solidity, dependability, security, permanence, intuition, introspection, and wisdom. The season related to Earth is Winter and the associated direction is North. The element is symbolically represented by an inverted triangle with a horizontal line running through it."

    return (
        <div className='earth-container'>
        {quote === "" ? <h3>{initialQuote.text}</h3> : <h3>{quote}</h3>}
        {layout === "" ? 
        <BlurLayer name="earth" description={description} symbol={symbol}/> : <WorkBench stickers={stickers}/>}
        </div>
    )
}