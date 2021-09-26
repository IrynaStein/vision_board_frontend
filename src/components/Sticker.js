import { useState } from "react"
import { useDrag } from "@use-gesture/react"
export default function Sticker({sticker}){
    const [logoPos, setLogoPos] = useState({
        x: 0,
        y: 0
    })
    console.log(logoPos)
    const bindLogoPos = useDrag((params)=>{
        setLogoPos({
            x: params.offset[0],
            y: params.offset[1]
        })
})
   
    return (
        <div className="sticker-container" key={sticker.id}  {...bindLogoPos()} style={{position: "relative", top: logoPos.y, left: logoPos.x}}> 
      <img className="App-logo" src={sticker.image_url} alt="sticker"></img> 
    </div>
    )
}
