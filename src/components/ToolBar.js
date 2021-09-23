// import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/utilitySlice";
import BoardIcon from "./BoardIcon";
import apiKey from "../api";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions } from "../store/boardSlice";
// import { Modal } from "semantic-ui-react";
export default function ToolBar() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  // const currentBoard = useSelector(state => state.boards.currentBoard)
  // const [open, setOpen] = useState(false)
  const logoutHandler = () => {
    dispatch(userLogout());
  };

    function handleClick() {
      fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "quotes15.p.rapidapi.com",
          "x-rapidapi-key": apiKey
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

function handleReset(){
    dispatch(boardActions.setLayout(""));
    dispatch(boardActions.setCurrentBoard(''))
}
  return (
    <div className="toolbar">
      ToolBar
      <div className="element-link-container">
       {/* <Modal /> */}
        <Link to="/water" onClick={handleReset}className="element-link">
          <img src="https://live.staticflickr.com/65535/51499110765_a3f537a2c4_o.png" alt="water symbol"/>
        </Link>
        <Link to="/earth" onClick={handleReset} className="element-link">
          <img src="https://live.staticflickr.com/65535/51498899924_746037b32f_o.png" alt="earth symbol"/>
        </Link>
        <Link to="/air" onClick={handleReset} className="element-link">
          <img src="https://live.staticflickr.com/65535/51498405518_35f832371a_o.png" alt="air symbol"/>
        </Link>
        <Link to="/fire" onClick={handleReset} className="element-link">
          <img src="https://live.staticflickr.com/65535/51498183701_90f7ba7f6e_o.png" alt="fire symbol"/>
        </Link>
      </div>
      <button onClick={() => dispatch(toolbarActions.tooglePosts())}>Compose affirmation</button>
      <button onClick={() => dispatch(toolbarActions.toogleStickers())}>Show Stickers</button>
      <button onClick={() => dispatch(toolbarActions.tooglePictures())}>Add Picture</button>
      <button onClick={handleClick}>Change Quote</button>
      _________
      <div className="utilities-edit">
        <button>Clear</button>
        <button>Save</button>
        <button>Edit</button>
        <button>Download</button>
      </div>
      ____________________
      <div>
       {user && user.boards.length > 0? <BoardIcon boards={user.boards}/> : "You dont have any boards yet. Create one and start manifesting"}
      </div>
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
