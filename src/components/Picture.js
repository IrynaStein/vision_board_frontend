import { useState } from "react"
import { useDrag } from "@use-gesture/react"
export default function Picture({image}){
    const [picPos, setPicPos] = useState({
        x: 0,
        y: 0
    })
    console.log(picPos)
    const bindPicPos = useDrag((params)=>{
        setPicPos({
            x: params.offset[0],
            y: params.offset[1]
        })
})
    console.log(image)
    //send additional prop that will specify class of image size chosen by user. "Large, medium, small" it will render accordingly
    return (
        <div className="sticker-container" key={image.id}  {...bindPicPos()} style={{position: "relative", top: picPos.y, left: picPos.x}}> 
      <img className="App-logo-medium" src={image.url} alt="photograph"/>
    </div>
       
    )
}