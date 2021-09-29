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
  const [showPictures, setShowPictures] = useState(false)
  const [message, setMessage] = useState(false)
  const params = useParams();
  const dispatch = useDispatch();
  dispatch(boardActions.setLayout(params.element))
  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);
  const boards = useSelector((state) => state.boards.userBoards);
  const currentBoard = boards.find((b) => b.id === parseInt(params.id));
//image prop is going to have an array
  const { quote, posts, image } = currentBoard;
  console.log(currentBoard);

  //custom Hook that checks the name of the board
  const nameCheck = useNameCheck(currentBoard);

  const stickers = currentBoard.stickers

  //STICKERS part
  const renderStickers = stickers.map((sticker) => (
    <Sticker key={sticker.id} sticker={sticker} currentBoardId={currentBoard.id}/>
  ));

  //AFFIRMATIONS part
  const affirmationList = posts.map((post) => (
    <Affirmation key={post} text={post} currentBoardId={currentBoard.id}/>
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
    if (images.length === 0){
      console.log("Please add files to upload")
    }else{
      console.log("SUBMIT", images);
      const form = new FormData()
      form.append("image", images)
      console.log(currentBoard.id)
      fetch(`/boards/${currentBoard.id}`, {
        method: "PATCH",
        body: form  
      })
      .then(resp => resp.json())
      .then(data => {
        // debugger
        dispatch(boardActions.updateCurrentBoardImages(data))
        setShowPictures(true)
        console.log(data)})
    }
    
  }

  function onFileChange(e) {
    console.log(e.target.files[0]);
    setImages(e.target.files[0]);
  }


  function onLoadPictures(){
    if (currentBoard.image){
      setShowPictures(true)
    }
   else {
     setMessage(true)
   }
  }
  const renderImageUpload = () => {
    return (
      <>
      <form onSubmit={onAddImage}>
        <input
          type="file"
          name="image"
          placeholder="upload image..."
          onChange={onFileChange}
        />
        <button type='submit'>Add new</button>
      </form>
      or
      <button onClick={onLoadPictures}>Load existing pictures</button>
      </>
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
     {message? <div>
       <>You dont have any images yet</>
       <button onClick={() =>setMessage(false)}>X</button>
       </div> : null}
       {showPictures? <Picture image={image}/> : null}
       {stickerShow ? <div>{renderStickers}</div> : null}
      <Quote quote={quote} currentBoardId={currentBoard.id}/>
      <div>{affirmationList}</div>
      <div>{nameCheck}</div>
     
     
      <div className="palette">{renderWorkench()}</div>
    </div>
  );
}
