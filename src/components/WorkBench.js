import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import useNameCheck from "../hooks/useNamecheck";
import { boardActions } from "../store/boardSlice";
import Sticker from "./Sticker";
import Quote from "./Quote";
import Affirmation from "./Affirmation";
import axios from "axios";
export default function WorkBench() {
  const [affirmation, setAffirmation] = useState("");
  const [images, setImages] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);
  const boards = useSelector((state) => state.boards.userBoards);
  const currentBoard = boards.find((b) => b.id === parseInt(params.id));

  const { quote, posts } = currentBoard;
  console.log(currentBoard);
  const nameCheck = useNameCheck(currentBoard);
  // const stickers = useSelector((state) =>
  //   state.boards.stickers.filter((s) => s.category === params.element)
  // );
  // debugger
  const stickers = currentBoard.stickers

  //STICKERS part
  const renderStickers = stickers.map((sticker) => (
    <Sticker key={sticker.id} sticker={sticker} />
  ));

  //AFFIRMATIONS part
  const affirmationList = posts.map((post) => (
    <Affirmation key={post} text={post} />
  ));

  function onAddAffirmation(e, id) {
    e.preventDefault();
    console.log(affirmation);
    console.log(id);
    dispatch(boardActions.addAffirmation({ post: affirmation, id }));
    setAffirmation("");
  }

  const renderAffirmationInput = () => {
    return (
      <div>
        <form onSubmit={(e) => onAddAffirmation(e, currentBoard.id)}>
          <input
            name="post"
            onChange={(e) => {
              setAffirmation(e.target.value);
            }}
            placeholder="compose your affirmation..."
            value={affirmation}
          ></input>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };

  //IMAGES part
  function onAddImage(e) {
    e.preventDefault();
    console.log("SUBMIT", images);
  }
  function onFileChange(e) {
    console.log(e.target.files[0]);
    setImages(e.target.files[0]);
  }

  const renderImageUpload = () => {
    return (
      <form onSubmit={onAddImage}>
        <input
          type="file"
          name="image"
          placeholder="upload image..."
          onChange={onFileChange}
        />
        <button>Add</button>
      </form>
    );
  };

  //Rendering workbench toogle
  const renderWorkench = () => {
    if (postShow) {
      return renderAffirmationInput();
    } else if (pictureShow) {
      return renderImageUpload();
    } else {
      return;
    }
  };

  return (
    <div className={`${params.element}-container`}>
      <Quote quote={quote.paragraph} />
      <div>{affirmationList}</div>
      <div>{nameCheck}</div>
      {stickerShow ? <div>{renderStickers}</div> : null}
      <div className="palette">{renderWorkench()}</div>
    </div>
  );
}
