import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import apiKey from "../api";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions, boardDelete } from "../store/boardSlice";
import BoardList from "./BoardsList";
import { utilityActions } from "../store/utilitySlice";

export default function ToolBar() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const layout = useSelector((state) => state.boards.layout);
  const toolbar = useSelector((state) => state.utilities.toolbar);
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.category === layout)
  );
  // console.log("TOOLBAR BOARD", currentBoard);
  // function onChangeQuote() {
  //   fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "quotes15.p.rapidapi.com",
  //       "x-rapidapi-key": apiKey,
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data)
  //       dispatch(boardActions.setNewQuote({
  //         quote: data.content,
  //         quoteId: data.id,
  //         category: layout
  //       }));
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  //When the API is ready this function will call for a new quote
  // function onChangeQuote(){
  //   console.log("changing quote")
  // }

  function onSave() {
    console.log("saving...");
    const boardObj = {
      name: currentBoard.name,
      category: currentBoard.category,
      stickers: currentBoard.stickers,
      posts: currentBoard.posts,
      quote: currentBoard.quote,
      frames: currentBoard.frames,
    };
    fetch(`/boards/${currentBoard.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(boardObj),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("SAVED DATA", data);
        dispatch(boardActions.updateBoard(data));
      });
  }

  function onDelete() {
    dispatch(boardDelete(currentBoard.id));
    dispatch(utilityActions.showTools(false));
    history.push("/home");
  }

  function handleReset(name) {
    console.log(name);
    dispatch(boardActions.setLayout(name));
    dispatch(toolbarActions.resetLayoutShow());
    dispatch(utilityActions.showTools(false));
  }

  // function stickersHandler(){
  //   dispatch(toolbarActions.toogleStickers(true))
  //   dispatch(boardActions.addStickers(layout))
  // }

  // function clearHandler() {
  //   console.log(layout);
  //   dispatch(boardActions.clearBoard(layout));
  //   dispatch(toolbarActions.toogleStickers(false));
  // }

  return (
    <div className="toolbar">
      {/* <img src="https://live.staticflickr.com/65535/51549405587_90a9bf23f2_o.png"/> */}
      <div className="element-link-container">
        <Link
          to="/water"
          onClick={() => handleReset("water")}
          className="element-link"
        >
          <img
            src="https://live.staticflickr.com/65535/51553944286_0035bcbf8b_o.png"
            alt="water symbol"
          />
        </Link>
        <Link
          to="/earth"
          onClick={() => handleReset("earth")}
          className="element-link"
        >
          <img
            src="https://live.staticflickr.com/65535/51554193913_2e00b6c28f_o.png"
            alt="earth symbol"
          />
        </Link>
        <Link
          to="/air"
          onClick={() => handleReset("air")}
          className="element-link"
        >
          <img
            src="https://live.staticflickr.com/65535/51554861770_61b6a63938_o.png"
            alt="air symbol"
          />
        </Link>
        <Link
          to="/fire"
          onClick={() => handleReset("fire")}
          className="element-link"
        >
          <img
            src="https://live.staticflickr.com/65535/51554861705_13ea37ee6a_o.png"
            alt="fire symbol"
          />
        </Link>
      </div>
      <div className="btn-display">
      <button
      className="btn btn-white"
        disabled={!user || !toolbar}
        onClick={() => dispatch(toolbarActions.tooglePosts())}
      >
        Compose affirmation
      </button>
      <button
      className="btn btn-white"
        disabled={!user || !toolbar}
        onClick={() => dispatch(toolbarActions.tooglePictures())}
      >
        Add Pictures
      </button>
      <button
      className="btn btn-white"
        disabled={!user || !toolbar}
        onClick={() => dispatch(toolbarActions.tooglePictureCollection())}
      >
        Picture collection
      </button>
      </div>
      {/* <button
        disabled={!user || showStickers || !toolbar}
        onClick={stickersHandler}
      >
       Load Stickers
      </button> */}
      {/* <button disabled={!user || !toolbar} onClick={onChangeQuote}>
       Change Quote
      </button>  */}
      {/* <button disabled={!user || !toolbar} onClick={clearHandler}>
        Clear All
      </button> */}
      <div className="btn-display">
      <button 
      className="btn btn-white"
      disabled={!user || !toolbar} onClick={onSave}>
        Save
      </button>
      {buttonsDisplay === "none" ? (
        <button
        className="btn btn-white"
          disabled={!user || !toolbar}
          onClick={() => dispatch(toolbarActions.setButtonsDisplay("block"))}
        >
          Edit
        </button>
      ) : (
        <button
        className="btn btn-white"
          disabled={!user || !toolbar}
          onClick={() => dispatch(toolbarActions.setButtonsDisplay("none"))}
        >
          Done editing
        </button>
      )}
      <button 
      className="btn btn-white"
      disabled={!user || !toolbar} onClick={() => onDelete()}>
        Delete this board
      </button>
      </div>
      {user ? <BoardList /> : null}
    </div>
  );
}
