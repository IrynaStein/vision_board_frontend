import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import './Elements.css'
import WorkBench from "../components/WorkBench"
import BlurLayer from "../components/BlurLayer"
import { boardActions } from "../store/boardSlice"
import { toolbarActions } from "../store/toolbarSlice"
export default function Air(){
const initialQuote = {cat:"air",text: "Happiness comes the way the wind blows"}
const quote = useSelector(state=> state.boards.quote)
const layout = useSelector(state => state.boards.layout)
const stickers = useSelector(state => state.boards.stickers)
const dispatch = useDispatch()

useEffect(() => {
    dispatch(toolbarActions.resetLayoutShow())
    dispatch(boardActions.setLayout(""))
}, [dispatch])

const symbol = "https://live.staticflickr.com/65535/51499946401_80628c9579_o.png"


const description = "It is associated with the breath of life and attributed to cleansing power. Air symbolizes communication, intelligence, perception, knowledge, learning, thinking, imagination, creativity, harmony, and travel. This source of life can also, at times, become a force of terrible destruction. Air is associated with the Spring season and its corresponding direction is East. The Air symbol is an upright triangle with a horizontal line going through it."

    return (
        <div className='air-container'>
        {quote === "" ? <h3>{initialQuote.text}</h3> : <h3>{quote}</h3>}
        {layout === "" ? 
        <BlurLayer name="air" description={description} symbol={symbol}/> : <WorkBench stickers={stickers}/>}
        </div>
    )
}
