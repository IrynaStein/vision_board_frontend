import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import useNameCheck from "../hooks/useNamecheck";
import { boardActions } from "../store/boardSlice";
import Sticker from "../components/Sticker";
import Quote from "../components/Quote";
import Affirmation from "../components/Affirmation";
import Picture from "../components/Picture";
export default function WorkBench() {
  const [affirmation, setAffirmation] = useState("");
  const [images, setImages] = useState([]);
  const [showPictures, setShowPictures] = useState(false);
  const [message, setMessage] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  dispatch(boardActions.setLayout(params.element));
  //might not need stickers. will have to do a full clean up
  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureCollection = useSelector(state => state.toolbars.showPictureCollection)
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const [formErrors, setFormErros] = useState('')
  const postShow = useSelector((state) => state.toolbars.showPost);
  const boards = useSelector((state) => state.boards.userBoards);
  const currentBoard = boards.find((b) => b.id === parseInt(params.id));
  const toolbar = useSelector(state =>state.utilities.toolbar)
  
  const { quote, posts } = currentBoard;
  console.log(currentBoard);
  const user = useSelector((state) => state.utilities.user);
  //custom Hook that checks the name of the board
  const nameCheck = useNameCheck(currentBoard);

  const stickers = currentBoard.stickers;
  const pictures = currentBoard.images;
  //STICKERS part
  const renderStickers = stickers.map((sticker) => (
    <Sticker
      key={sticker.id}
      sticker={sticker}
      currentBoardId={currentBoard.id}
    />
  ));

  //AFFIRMATIONS part
  const affirmationList = posts.map((post) => (
    <Affirmation 
    key={post} 
    post={post} 
    currentBoardId={currentBoard.id} 
    />
  ));

  function onAddAffirmation(e, id) {
    e.preventDefault();
    if(affirmation){
      dispatch(
        boardActions.addAffirmation({
          paragraph: affirmation,
          category: params.element,
          id,
        })
       
      );
      setFormErros('')
    }else {
      setFormErros("Affirmation can't be empty.")
      setTimeout(()=> setFormErros(''), 3000) 
    }
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
  const renderImages = () => {
    if (currentBoard.images){
      return pictures.map((p) => (
          <Picture 
          key={p.id} 
          picture={p} 
          currentBoardId={currentBoard.id} 
          />))
    }else {
      return 
    }
  }

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
          setShowPictures(true);
          console.log(data);
        });
    }
  }

  function onImageChange(e) {
    // console.log(e.target.files[0]);
    setImages({ images: Array.from(e.target.files) });
    // setImages(e.target.files[0]);
  }

  function onLoadPictures() {
    if (currentBoard.images) {
      setShowPictures(true);
    } else {
      setMessage(true);
    }
  }
  const renderImageUpload = () => {
    return (
      <>
        <form onSubmit={onAddImage}>
          <input
            type="file"
            name="images"
            placeholder="upload image..."
            onChange={onImageChange}
            multiple={true}
          />
          <button type="submit">Add new</button>
        </form>
        or
        <button onClick={onLoadPictures}>Load existing pictures</button>
      </>
    );
  };

  //PICTURE COLLECTION
const renderPictureCollection = () => {
  // debugger
  console.log("rendering pic collection")
  if (currentBoard.images){
     return currentBoard.images.map((i) => (
        <div key={i.id}><img className='thumbnail'src={i.url} alt="pic"></img></div>
      ))
      // return <div className='pallete'>Picture collection</div>
  }else {
    setFormErros("you dont have any images in your collection.")
  }
}

  //Rendering workbench toogle
  const renderWorkench = () => {
    if (postShow) {
      return renderAffirmationInput();
    } else if (pictureShow) {
      return renderImageUpload();
    } 
    else if(pictureCollection){
      return renderPictureCollection()
    }
    else {
      return;
    }
  };

  //SAVING board
  function onSave() {
    console.log("saving...");
    const boardObj = {
      name: currentBoard.name,
      category: currentBoard.category,
      stickers: currentBoard.stickers,
      posts: currentBoard.posts,
      quote: currentBoard.quote,
      pictures: currentBoard.images
    }
    console.log(boardObj)
    fetch(`/boards/${currentBoard.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(boardObj)
    })
    .then(resp => resp.json())
    //will dispatch saveBoard method or repurpose same updateBoard
    .then(data => console.log(data))
  }

  return (
    <div className={`${params.element}-container`}>
      {formErrors? <div>{formErrors}</div> :null}
      {message ? (
        <div>
          <>You dont have any images yet</>
          <button onClick={() => setMessage(false)}>X</button>
        </div>
      ) : null}
      {/* {showPictures ? <div>{renderImages()}</div> : null}
      {stickerShow ? <div>{renderStickers}</div> : null} */}
      {toolbar? <>
      <div>{renderImages()}</div>
      <div>{renderStickers}</div>
      </> :null}
      <Quote quote={quote} currentBoardId={currentBoard.id} />
      <div>{affirmationList}</div>
      <div>{nameCheck}</div>

      <div className="palette">{renderWorkench()}</div>
      {/* <div className="save-edit">
        <button disabled={!user} onClick={onSave}>
          Save
        </button>
        <button disabled={!user}>Edit</button>
      </div> */}
    </div>
  );
}