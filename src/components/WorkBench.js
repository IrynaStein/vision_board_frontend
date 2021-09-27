import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import useNameCheck from "../hooks/useNamecheck";
import { boardActions } from "../store/boardSlice";
import Sticker from "./Sticker";
import Quote from './Quote'
import Affirmation from "./Affirmation";
export default function WorkBench() {
  const params = useParams();
const dispatch = useDispatch()
const [affirmation, setAffirmation] = useState('')
  const stickerShow = useSelector((state) => state.toolbars.showSticker);
  const pictureShow = useSelector((state) => state.toolbars.showPicture);
  const postShow = useSelector((state) => state.toolbars.showPost);
  const user = useSelector(state => state.utilities.user)
  const boards = useSelector((state) => state.boards.userBoards);
  // const boards = useSelector(state=> state.user.boards)
  // debugger
  const currentBoard = boards.find((b) => b.id === parseInt(params.id));
// debugger
  const { quote, posts } = currentBoard;
  console.log(currentBoard)
  const nameCheck = useNameCheck(currentBoard);
  const stickers = useSelector((state) =>
    state.boards.stickers.filter((s) => s.category === params.element)
  );
  const renderStickers = stickers.map((sticker) => (
    <Sticker key={sticker.id} sticker={sticker} />
  ));

  const affirmationList = posts.map((post) => (
    <Affirmation key={post} text={post}/>
    ))
console.log("AFF LIST",affirmationList)
  function onAddAffirmation(e, id){
    e.preventDefault()
    console.log(affirmation)
    console.log(id)
    dispatch(boardActions.addAffirmation({post: affirmation, id}))
    setAffirmation('')
  }

  const renderAffirmationInput = () => {
    return <div>
      <form onSubmit={(e)=> onAddAffirmation(e, currentBoard.id)}>
      <input name="post" onChange={(e)=> {setAffirmation(e.target.value)}}placeholder="compose your affirmation..." value={affirmation}></input>
      <button type="submit">Add</button>
      </form>
    </div>;
  };

  const renderImageUpload = () => {
    return <input type="file" placeholder="upload image..."></input>;
  };

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
      <Quote quote={quote}/>
      <div>{affirmationList}</div>
      <div>{nameCheck}</div>
      {stickerShow ? <div>{renderStickers}</div> : null}
      <div className="palette">{renderWorkench()}</div>
    </div>
  );
}
