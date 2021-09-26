import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/utilitySlice";
import apiKey from "../api";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions } from "../store/boardSlice";
import BoardList from "./BoardsList";
// import { Modal } from "semantic-ui-react";
export default function ToolBar() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  const [showBoards, setShowBoards] = useState(false);
  const logoutHandler = () => {
    dispatch(userLogout());
    dispatch(boardActions.resetBoardSliceState());
    dispatch(toolbarActions.resetLayoutShow());
  };
const currentBoard = useSelector(state => state.boards.currentBoard)
  // function handleClick() {
  //   fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "quotes15.p.rapidapi.com",
  //       "x-rapidapi-key": apiKey,
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  function handleReset() {
    dispatch(boardActions.setLayout(""));
    dispatch(boardActions.setCurrentBoard({}));
  }

  function stickersHandler(){
    dispatch(toolbarActions.toogleStickers())
    // debugger
    dispatch(boardActions.currentBoardStickers(currentBoard.category))
  }

  function handleClick() {
    dispatch(boardActions.setUserBoards(user.boards));
    setShowBoards((mUv) => !mUv);
  }
  return (
    <div className="toolbar">
      ToolBar
      <div className="element-link-container">
        {/* <Modal /> */}
        <Link to="/water" onClick={()=> handleReset()} className="element-link">
          <img
            src="https://live.staticflickr.com/65535/51499110765_a3f537a2c4_o.png"
            alt="water symbol"
          />
        </Link>
        <Link to="/earth" onClick={()=>handleReset()} className="element-link">
          <img
            src="https://live.staticflickr.com/65535/51498899924_746037b32f_o.png"
            alt="earth symbol"
          />
        </Link>
        <Link to="/air" onClick={()=>handleReset()} className="element-link">
          <img
            src="https://live.staticflickr.com/65535/51498405518_35f832371a_o.png"
            alt="air symbol"
          />
        </Link>
        <Link to="/fire" onClick={()=>handleReset()} className="element-link">
          <img
            src="https://live.staticflickr.com/65535/51498183701_90f7ba7f6e_o.png"
            alt="fire symbol"
          />
        </Link>
      </div>
      <button
        disabled={!user}
        onClick={() => dispatch(toolbarActions.tooglePosts())}
      >
        Compose affirmation
      </button>
      <button
        disabled={!user}
        onClick={() => dispatch(toolbarActions.toogleStickers())}
      >
        
        Add Picture
      </button>
      <button
        disabled={!user}
        onClick={stickersHandler}
      >
       Show Stickers
      </button>
      <button disabled={!user} onClick={handleClick}>
        Change Quote
      </button>
      _________
      <div className="utilities-edit">
        <button disabled={!user}>Clear</button>
        <button disabled={!user}>Save</button>
        <button disabled={!user}>Edit</button>
        <button disabled={!user}>Download</button>
      </div>
      ____________________
      {user ? (
        <>
          <button onClick={handleClick}>
            {showBoards ? "hide my boards" : "show my boards"}
          </button>
          {showBoards ? <BoardList /> : null}
        </>
      ) : null}
      _________
      <Link to="/home">?</Link>
      <div>
        {user ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <div>
            <Link to="/login">Login</Link>or <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}
