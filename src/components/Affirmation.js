import { useState } from "react"
import { useDrag } from "@use-gesture/react"
export default function Affirmation(text){
    // debugger
    const [logoPos, setLogoPos] = useState({
        x: 0,
        y: 0
    })
    console.log(logoPos)
    console.log(text)
    const bindLogoPos = useDrag((params)=>{
        setLogoPos({
            x: params.offset[0],
            y: params.offset[1]
        })
})
    return (
        <div className="affirmation" {...bindLogoPos()} style={{position: "relative", top: logoPos.y, left: logoPos.x, font: "The BraggestDemo"}}>{text.text}</div>
    )
}