import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import apiKey from "../api";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions } from "../store/boardSlice";

import BoardList from "./BoardsList";
import { utilityActions } from "../store/utilitySlice";

// import { Modal } from "semantic-ui-react";
export default function ToolBar() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  const layout = useSelector(state=> state.boards.layout)
  const showStickers = useSelector(state=> state.toolbars.showSticker)
const toolbar = useSelector(state => state.utilities.toolbar)
console.log("TOOLS",toolbar)
  function onChangeQuote() {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        dispatch(boardActions.setNewQuote({
          quote: data.content,
          quoteId: data.id,
          category: layout
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleReset(name) {
    console.log(name)
    dispatch(boardActions.setLayout(name));
    dispatch(toolbarActions.resetLayoutShow())
    dispatch(utilityActions.showTools(false))
  }

  function stickersHandler(){
    dispatch(toolbarActions.toogleStickers(true))
    dispatch(boardActions.addStickers(layout))
  }


  function clearHandler(){
    console.log(layout)
    dispatch(boardActions.clearBoard(layout))
    dispatch(toolbarActions.toogleStickers(false))
  }


  return (
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
        disabled={!user || !toolbar}
        onClick={() => dispatch(toolbarActions.tooglePosts())}
      >
        Compose affirmation
      </button>

      <button
        disabled={!user || !toolbar}
        onClick={() => dispatch(toolbarActions.tooglePictures())}
      >
        Add Pictures
      </button>

      <button
        disabled={!user || !toolbar}
        onClick={() => dispatch(toolbarActions.tooglePictureCollection())}
      >
        Load picture collection
      </button>
      
      {/* <button
        disabled={!user || showStickers || !toolbar}
        onClick={stickersHandler}
      >
       Load Stickers
      </button> */}
      {/* <button disabled={!user || !toolbar} onClick={onChangeQuote}>
        Change Quote
      </button> */}
      ____________________
     
        <button disabled={!user || !toolbar} onClick={clearHandler}>Clear All</button>
     
      ____________________

     {user? <BoardList /> : null} 
     
    </div>
   
  );
}
