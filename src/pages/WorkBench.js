import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import useNameCheck from "../hooks/useNamecheck";
import { boardActions } from "../store/boardSlice";
import Sticker from "../components/Sticker";
import Quote from "../components/Quote";
import Affirmation from "../components/Affirmation";
import Picture from "../components/Picture";
import { toolbarActions } from "../store/toolbarSlice";
export default function WorkBench() {
  const [affirmation, setAffirmation] = useState("");
  const [images, setImages] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  dispatch(boardActions.setLayout(params.element));
  const pictureCollection = useSelector(
    (state) => state.toolbars.showPictureCollection
  );
  const pictureUploadForm = useSelector((state) => state.toolbars.showPicture);
  const [formErrors, setFormErros] = useState("");
  const postShow = useSelector((state) => state.toolbars.showPost);
  const boards = useSelector((state) => state.boards.userBoards);
  const currentBoard = boards.find((b) => b.id === parseInt(params.id));
  const toolbar = useSelector((state) => state.utilities.toolbar);

  const { quote, posts } = currentBoard;
  console.log(currentBoard);

  //custom Hook that checks the name of the board
  const nameCheck = useNameCheck(currentBoard);

  //STICKERS part
  const renderStickers = currentBoard.stickers.map((sticker) => (
    <Sticker
      key={sticker.id}
      sticker={sticker}
      currentBoardId={currentBoard.id}
    />
  ));

  //AFFIRMATIONS part
  const affirmationList = posts.map((post) => (
    <Affirmation key={post} post={post} currentBoardId={currentBoard.id} />
  ));

  const renderQuote = () => {
    if (currentBoard.quote) {
      return <Quote quote={quote} currentBoardId={currentBoard.id} />;
    } else {
      return;
    }
  };

  function onAddAffirmation(e, id) {
    e.preventDefault();
    if (affirmation) {
      dispatch(
        boardActions.addAffirmation({
          paragraph: affirmation,
          category: params.element,
          id,
        })
      );
      setFormErros("");
    } else {
      setFormErros("Affirmation can't be empty.");
      setTimeout(() => setFormErros(""), 3000);
    }
    setAffirmation("");
  }

  const renderAffirmationInput = () => {
    return (
      <div>
        <form onSubmit={(e) => onAddAffirmation(e, currentBoard.id)}>
          <input
          className="input-field"
            name="post"
            onChange={(e) => {
              setAffirmation(e.target.value);
            }}
            placeholder="compose your affirmation..."
            value={affirmation}
          ></input>
          <button className="btn btn-white" type="submit">Add</button>
        </form>
      </div>
    );
  };

  //IMAGES part
  const renderFrames = () => {
    if (currentBoard.frames) {
      return currentBoard.frames.map((f) => (
        <Picture key={f.id} frame={f} currentBoardId={currentBoard.id} />
      ));
    } else {
      return;
    }
  };

  function onAddImage(e) {
    e.preventDefault();
    if (images.length === 0) {
      console.log("Please add files to upload");
    } else {
      const form = new FormData();
      images.images.map((i) => form.append("images[]", i));
      fetch(`/boards/${currentBoard.id}`, {
        method: "PATCH",
        body: form,
      })
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(boardActions.updateCurrentBoardImages(data));
          dispatch(toolbarActions.tooglePictureCollection());
          console.log(data);
        });
    }
  }

  function onImageChange(e) {
    // console.log(e.target.files[0]);
    setImages({ images: Array.from(e.target.files) });
    // setImages(e.target.files[0]);
  }

  const renderImageUpload = () => {
    return (
      <form onSubmit={onAddImage}>
        <input
        className="input-field"
          type="file"
          name="images"
          placeholder="upload image..."
          onChange={onImageChange}
          multiple={true}
        />
        <button className="btn btn-white" type="submit">Add new</button>
      </form>
    );
  };

  function addToFrames(image) {
    console.log(image);
    dispatch(
      boardActions.addToFrames({
        boardId: currentBoard.id,
        frame: image,
      })
    );
  }

  //PICTURE COLLECTION
  const renderPictureCollection = () => {
    console.log("rendering pic collection");
    if (currentBoard.images) {
      return currentBoard.images.map((i) => (
        <div key={i.id}>
          <img
            className="thumbnail"
            src={i.url}
            alt="pic"
            onClick={() => addToFrames(i)}
          ></img>
        </div>
      ));
    } else {
      console.log("you dont have any yet");
      return <div>You dont have any pictures yet</div>;
    }
  };

  //Rendering workbench toogle
  const renderWorkench = () => {
    if (postShow) {
      return renderAffirmationInput();
    } else if (pictureUploadForm) {
      return renderImageUpload();
    } else if (pictureCollection) {
      return renderPictureCollection();
    } else {
      return;
    }
  };

  return (
    <div className={`${params.element}-container`}>
      {formErrors ? <div>{formErrors}</div> : null}
      {toolbar ? (
        <>
          <div className="images-block">
            {renderFrames()}
            {renderStickers}
            {affirmationList}
            {renderQuote()}
          </div>
        </>
      ) : null}

      <div>{nameCheck}</div>

      <div className="palette">{renderWorkench()}</div>
    </div>
  );
}
