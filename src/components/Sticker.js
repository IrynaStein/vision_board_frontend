import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";

export default function Sticker({ sticker, currentBoardId }) {
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const dispatch = useDispatch();

  let coordinates = currentBoard.stickers.find(
    (s) => s.id === sticker.id
  ).coordinates;

  const updatedCoordinates = useCoordinates(coordinates);

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
      className="sticker-container"
      key={sticker.id}
      {...bindStickerPos()}
      style={{
        position: "relative",
        top: updatedCoordinates.y,
        left: updatedCoordinates.x,
      }}
    >
      <img className="App-logo" src={sticker.image_url} alt="sticker"></img>
    </div>
  );
}
