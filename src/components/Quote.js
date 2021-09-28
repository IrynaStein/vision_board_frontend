import { useState } from "react"
import { useDrag } from "@use-gesture/react"
export default function Quote({quote}){
    const [quotePos, setQuotePos] = useState({
        x: 0,
        y: 0
    })
    console.log(quotePos)
    const bindLogoPos = useDrag((params)=>{
        setQuotePos({
            x: params.offset[0],
            y: params.offset[1]
        })
})
   
    return (
        <div className="sticker-container" key={quote}  {...bindLogoPos()} style={{position: "relative", top: quotePos.y, left: quotePos.x}}> 
    <div className="quote" >{quote}</div>
    </div>
    )
}