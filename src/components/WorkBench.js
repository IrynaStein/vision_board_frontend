import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Sticker from "./Sticker";
export default function WorkBench() {
  let params = useParams()
  console.log(params)
 
  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);
// const currentBoard = useSelector(state => state.boards.currentBoard)
const boards = useSelector(state => state.utilities.user.boards)
const currentBoard = boards.find((b) => b.id === parseInt(params.id))
  // debugger;
const {quote, posts} = currentBoard
// debugger
const stickers = useSelector((state) =>
    state.boards.stickers.filter((s) => s.category === params.element)
  );
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
    <div className={`${params.element}-container`}>
      <div className="canvas">{quote.paragraph}</div>
      <div className="palette">{renderWorkench()}</div>
    </div>
  );
}
