import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useNameCheck from "../pages/Namecheck";
import Sticker from "./Sticker";
export default function WorkBench() {

  const params = useParams()


  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);
  const boards = useSelector((state) => state.boards.userBoards);
  const currentBoard = boards.find((b) => b.id === parseInt(params.id));
 
  const {quote, posts} = currentBoard
 const nameCheck = useNameCheck(currentBoard)
  const stickers = useSelector((state) =>
    state.boards.stickers.filter((s) => s.category === params.element)
  );
  const renderStickers = stickers.map((sticker) => (
    <Sticker key={sticker.id} sticker={sticker} />
  ));

  const renderAffirmationInput = () => {
    return <input placeholder="compose your affirmation..."></input>;
  };

  const renderImageUpload = () => {
    return <input type="file" placeholder="upload image..."></input>;
  };
  const renderWorkench = () => {
    if (stickerShow) {
      return renderStickers;
    } else if (postShow) {
      return renderAffirmationInput();
    } else if (pictureShow) {
      return renderImageUpload();
    } else {
      return;
    }
  };

  return (
    <div className={`${params.element}-container`}>
      <h3>{quote.paragraph}</h3>
      <div>{nameCheck}</div>
      <div className="palette">{renderWorkench()}</div>
    </div>
  );
}
