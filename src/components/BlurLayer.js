import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardActions, createBoard } from "../store/boardSlice";
import { Redirect } from "react-router";
import Loader from "./Loader";
export default function BlurLayer({ name, description, symbol, quote }) {
  const [isChosen, setIsChosen] = useState(false);
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.boards.layout);
  const boards = useSelector((state) => state.boards.userBoards);
  const currentBoard = boards.find((b) => b.category === layout);
  const isLoading = useSelector((state) => state.boards.isLoadingBoards);
  function handleLayoutChoice() {
    setIsChosen((mUv) => !mUv);
    dispatch(boardActions.setLayout(name));
    dispatch(createBoard({ category: name, quote: quote }));
    dispatch(boardActions.toogleBoardsLoading());
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!isChosen ? (
            <div className="layout">
              <div className="layout-image">
              <img
                src={symbol}
                style={{ height: "100px", width: "100px" }}
                alt="symbol"
              />
              </div>
              <div className="description-text">{description}</div>
              <button
              className="btn btn-gray"
                // disabled={name === "air" || name === "fire" ? true : false}
                onClick={handleLayoutChoice}
              >
                Choose this layout
              </button>
            </div>
          ) : (
            <Redirect to={`/${name}/${currentBoard.id}`} />
          )}
        </>
      )}
    </>
  );
}
