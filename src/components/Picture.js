import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";

export default function Picture({ frame, currentBoardId }) {
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);
  const dispatch = useDispatch();
  let coordinates = currentBoard.frames.find(
    (i) => i.id === frame.id
  ).coordinates;
  console.log(coordinates);

  function removeFrame(frame) {
    console.log(frame.id);
    dispatch(
      boardActions.removeBoardElement({
        type: "frames",
        typeId: frame.id,
        board: currentBoard.id,
      })
    );
  }
  const updatedCoordinates = useCoordinates(coordinates);

  const bindPicPos = useDrag((params) => {
    dispatch(
      boardActions.setImageCoordinates({
        coordinates: {
          x: params.offset[0],
          y: params.offset[1],
        },
        boardId: currentBoardId,
        frameId: frame.id,
      })
    );
  });

  //send additional prop that will specify class of image size chosen by user. "Large, medium, small" it will render accordingly
  return (
    <div className="draggable-element-container">
    <div
      key={frame.id}
      {...bindPicPos()}
      style={{
        zIndex: 7,
        display: "flex",
        position: "absolute",
        top: updatedCoordinates.y,
        left: updatedCoordinates.x,
      }}
    >
      <img className="App-logo-medium" src={frame.url} alt="photograph" />
      <button
        className="delete-button"
        style={{ display: buttonsDisplay }}
        onClick={() => removeFrame(frame)}
      >
        x
      </button>
    </div>
    </div>
  );
}
