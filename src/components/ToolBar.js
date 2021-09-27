import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/utilitySlice";
import apiKey from "../api";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions } from "../store/boardSlice";
import BoardList from "./BoardsList";
import Loader from "./Loader";
// import { Modal } from "semantic-ui-react";
export default function ToolBar() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  const [showBoards, setShowBoards] = useState(false);
  const isLoading = useSelector(state => state.boards.userBoards)
  const showStickers = useSelector(state=> state.toolbars.showSticker)
  const logoutHandler = () => {
    dispatch(userLogout());
    dispatch(boardActions.reset());
    dispatch(toolbarActions.resetLayoutShow());
  };

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

  function handleReset(name) {
    console.log(name)
    dispatch(boardActions.setLayout(name));
    dispatch(toolbarActions.resetLayoutShow())
  }

  function stickersHandler(){
    dispatch(toolbarActions.toogleStickers(true))
  }

  function handleClick() {
    dispatch(boardActions.setUserBoards(user.boards));
    setShowBoards(true);
  }

  return (
    // <>{isLoading? <Loader/>:
    <div className="toolbar">
      ToolBar
      <div className="element-link-container">
        {/* <Modal /> */}
        <Link to="/water" onClick={()=>handleReset("water")} className="element-link"> 
          <img
            src="https://live.staticflickr.com/65535/51499110765_a3f537a2c4_o.png"
            alt="water symbol"
          />
        </Link>
        <Link to="/earth" onClick={()=>handleReset("earth")}className="element-link">
          <img
            src="https://live.staticflickr.com/65535/51498899924_746037b32f_o.png"
            alt="earth symbol"
          />
        </Link>
        <Link to="/air" onClick={()=>handleReset("air")} className="element-link">
          <img
            src="https://live.staticflickr.com/65535/51498405518_35f832371a_o.png"
            alt="air symbol"
          />
        </Link>
        <Link to="/fire" onClick={()=>handleReset("fire")} className="element-link">
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
        onClick={() => dispatch(toolbarActions.tooglePictures())}
      >
        
        Add Picture
      </button>
      <button
        disabled={!user || showStickers}
        onClick={stickersHandler}
      >
       Load Stickers
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
          {!showBoards ? <button onClick={handleClick}>
           My boards
          </button> : null}
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
    // }
    // </>
  );
}
