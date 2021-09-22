export default function WorkBench({stickers}){
    console.log("WORKBENCH",stickers)
    const renderStickers = stickers.map((sticker)=>
        <div className="sticker-container">
            <img src={sticker.image_url}></img>
            </div>
    )
    return(
        <>
        <div className="canvas">Canvas area</div>
        <div className='palette'>{renderStickers}</div>
        </>
    )
}