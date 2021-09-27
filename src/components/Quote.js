import { useState } from "react"
import { useDrag } from "@use-gesture/react"
export default function useQuote({quote}){
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
        <div className="sticker-container" key={quote.id}  {...bindLogoPos()} style={{position: "relative", top: quotePos.y, left: quotePos.x}}> 
     {quote.paragraph}
    </div>
    )
}