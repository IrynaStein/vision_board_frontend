import { useSelector } from "react-redux";
import Sticker from "./Sticker";
export default function WorkBench({ stickers }) {
  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);

  console.log("WORKBENCH", stickers);
  const renderStickers = stickers.map((sticker) => (
    <Sticker key={sticker.id} sticker={sticker}/>
  ));

  
  const renderAffirmationInput = () => {
    return <input placeholder="compose your affirmation..."></input>;
  };

  const renderImageUpload = () =>{
    return <input type="file" placeholder="upload image..."></input>
  }
  const renderWorbench = () => {
    if (stickerShow) {
      return renderStickers;
    } else if (postShow) {
      return renderAffirmationInput();
    } else if (pictureShow){
      return renderImageUpload();
    }else {
        return 
    }
  };

  return (
    <>
      <div className="canvas">Canvas area</div>
      <div className="palette">{renderWorbench()}</div>
    </>
  );
}
