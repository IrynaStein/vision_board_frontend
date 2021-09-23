import { useSelector } from "react-redux"
export default function WorkBench({stickers}){
const stickerShow = useSelector(state => state.toolbars.showSticker)
const pictureShow = useSelector(state => state.toolbars.showPicture)
const postShow = useSelector(state => state.toolbars.showPost)

    console.log("WORKBENCH",stickers)
    const renderStickers = stickers.map((sticker)=>
        <div className="sticker-container" key={sticker.id}>
            <img src={sticker.image_url} alt="sticker"></img>
            </div>
    )
const renderAffirmation = () => {
    return <input></input>
}

const renderWorbench = () => {
    if (stickerShow){
        return renderStickers
    }
    else {
        return renderAffirmation()
    }
}

    return(
        <>
        <div className="canvas">Canvas area</div>
        <div className='palette'>{renderWorbench()}</div>
        </>
    )
}