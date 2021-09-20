//this is the only demo component that works without user being logged in. Functionality is limited. Cant save, or download
import { useState } from "react"
export default function Water(){
    const [quote, setQuote] = useState("Lifes' roughset storms prove the strength of our anchors")

    return (
        <div>
        <h3>{quote}</h3>
        </div>
    )
}