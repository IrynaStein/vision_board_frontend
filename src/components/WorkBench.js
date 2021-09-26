import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Sticker from "./Sticker";
export default function WorkBench() {
  // let params = useParams();
  // const params = useParams()
  const {element, id} = useParams()
  // console.log(params);

  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);
  const boards = useSelector((state) => state.boards.userBoards);
  const currentBoard = boards.find((b) => b.id === parseInt(id));
 
  const {quote, posts} = currentBoard
 
  const stickers = useSelector((state) =>
    state.boards.stickers.filter((s) => s.category === element)
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
    <div className={`${element}-container`}>
      <h3>{quote.paragraph}</h3>
      <div className="palette">{renderWorkench()}</div>
    </div>
  );
}
