import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";
import image from '../assets/x-delete.png'

export default function Sticker({ sticker, currentBoardId }) {

  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);

  const dispatch = useDispatch();

  let coordinates = currentBoard.stickers.find(
    (s) => s.id === sticker.id
  ).coordinates;

  const updatedCoordinates = useCoordinates(coordinates);

  function removeSticker(sticker) {
    dispatch(
      boardActions.removeBoardElement({
        type: "stickers",
        typeId: sticker.id,
        board: currentBoard.id,
      })
    );
  }
  const bindStickerPos = useDrag(({delta}) => { 
      dispatch(
          boardActions.setStickerCoordinates({
            coordinates: {
              x: delta[0],
              y: delta[1]
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
        zIndex: 4,
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
          <img src={image} style={{width: "30px"}}alt="delete" />
        </button>
      </div>
    </div>
  );
}