import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Sticker from "./Sticker";
export default function WorkBench({ currentBoard, stickers}) {

  const params = useParams()
  // debugger
  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);
  // debugger;
const {quote, posts} = currentBoard
// debugger
  const renderStickers = stickers.map((sticker) => (
    <Sticker key={sticker.id} sticker={sticker}/>
  ));

  
  const renderAffirmationInput = () => {
    return <input placeholder="compose your affirmation..."></input>;
  };

  const renderImageUpload = () =>{
    return <input type="file" placeholder="upload image..."></input>
  }
  const renderWorkench = () => {
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
      <div className="canvas">{quote.paragraph}</div>
      <div className="palette">{renderWorkench()}</div>
    </>
  );
}
