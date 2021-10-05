import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";

export default function Sticker({ sticker, currentBoardId }) {
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);
  console.log("BUTTONS", buttonsDisplay);
  const dispatch = useDispatch();

  let coordinates = currentBoard.stickers.find(
    (s) => s.id === sticker.id
  ).coordinates;

  const updatedCoordinates = useCoordinates(coordinates);

  function removeSticker(sticker) {
    console.log(sticker.id);
    dispatch(
      boardActions.removeBoardElement({
        type: "stickers",
        typeId: sticker.id,
        board: currentBoard.id,
      })
    );
  }
  const bindStickerPos = useDrag((params) => {
    dispatch(
      boardActions.setStickerCoordinates({
        coordinates: {
          x: params.offset[0],
          y: params.offset[1],
        },
        boardId: currentBoardId,
        stickerId: sticker.id,
      })
    );
  });

  return (
    <div
      key={sticker.id}
      {...bindStickerPos()}
      style={{
        display: "inline-block",
        zIndex: 8,
        position: "absolute",
        top: updatedCoordinates.y,
        left: updatedCoordinates.x,
      }}
    >
      <div
        className="draggable-element-container"
      >
        <img
          className="App-logo"
          src={sticker.image_url}
          alt="sticker"
          style={{ postion: "absolute" }}
        ></img>
        <button
          className="delete-button"
          style={{ display: buttonsDisplay }}
          onClick={() => removeSticker(sticker)}
        >
          x
        </button>
      </div>
    </div>
  );
}
