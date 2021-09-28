import { useState } from "react"
import { useDrag } from "@use-gesture/react"
export default function Sticker({sticker}){
    const [stickerPos, setStickerPos] = useState({
        x: 0,
        y: 0
    })
    console.log(sticker.id, stickerPos)
    const bindStickerPos = useDrag((params)=>{
        setStickerPos({
            x: params.offset[0],
            y: params.offset[1]
        })
})
   
    return (
        <div className="sticker-container" key={sticker.id}  {...bindStickerPos()} style={{position: "relative", top: stickerPos.y, left: stickerPos.x}}> 
      <img className="App-logo" src={sticker.image_url} alt="sticker"></img> 
    </div>
    )
}
