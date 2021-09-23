import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import './Elements.css'
import WorkBench from "../components/WorkBench"
import BlurLayer from "../components/BlurLayer"
import { toolbarActions } from "../store/toolbarSlice"
import { boardActions } from "../store/boardSlice"

export default function Fire(){
    const initialQuote = {cat:"fire",text: "The finest steel has to go through the hottest fire"}
    const quote = useSelector(state=> state.boards.quote)
    const layout = useSelector(state => state.boards.layout)
    const stickers = useSelector(state => state.boards.stickers)
    console.log(stickers)
    const dispatch = useDispatch()

useEffect(() => {
    dispatch(toolbarActions.resetLayoutShow())
    dispatch(boardActions.setLayout(""))
}, [dispatch])
    const symbol = "https://live.staticflickr.com/65535/51499946366_7736fe5630_o.png"
    

    const description = "This element is considered to be the first element that was born when the universe was created. Fire is attributed to transformational and purifying powers. It can give warmth and enable life, and it can also burn and destroy. In the spiritual plane, Fire stands for Light and in the physical plane, it is the Sun or Flame. The element symbolizes incredible energy, activity, creativity, passion, freedom, power, love, vision, anger, strength, will, assertiveness, courage, and dynamism. It is associated with the Summer season and its corresponding direction is South. The symbolic representation of Fire is a triangle pointing upwards."

    return (
        <div className='fire-container'>
        {quote === "" ? <h3>{initialQuote.text}</h3> : <h3>{quote}</h3>}
        {layout === "" ? 
        <BlurLayer name="fire" description={description} symbol={symbol}/> : <WorkBench stickers={stickers}/>}
        </div>
    )
}

