// import Draggable, {DraggableCore} from 'react-draggable';
import { useState } from "react"
import { useDrag } from "@use-gesture/react"
export default function Sticker({sticker}){
    const [logoPos, setLogoPos] = useState({
        x: 0,
        y: 0
    })
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


// <a data-flickr-embed="true" href="https://www.flickr.com/photos/193358520@N03/51508747110/in/dateposted-public/" title="leaf"><img src="https://live.staticflickr.com/65535/51508747110_13a7864a12_s.jpg" width="75" height="75" alt="leaf"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

{/* <a data-flickr-embed="true" href="https://www.flickr.com/photos/193358520@N03/51289242035/in/dateposted-public/" title="Blue Iris copy"><img src="https://live.staticflickr.com/65535/51289242035_fec5d96ac4_s.jpg" width="75" height="75" alt="Blue Iris copy"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script> */}