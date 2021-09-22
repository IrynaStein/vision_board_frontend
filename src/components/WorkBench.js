export default function WorkBench({stickers}){
    console.log("WORKBENCH",stickers)
    const renderStickers = stickers.map((sticker)=>
        <div className="sticker-container" key={sticker.id}>
            <img src={sticker.image_url} alt="sticker"></img>
            </div>
    )
    return(
        <>
        <div className="canvas">Canvas area</div>
        <div className='palette'>{renderStickers}</div>
        </>
    )
}