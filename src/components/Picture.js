import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";
import image from '../assets/x-delete.png'

export default function Picture({ frame, currentBoardId }) {
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);
  const dispatch = useDispatch();
  let coordinates = currentBoard.frames.find(
    (i) => i.id === frame.id
  ).coordinates;

  function removeFrame(frame) {
    dispatch(
      boardActions.removeBoardElement({
        type: "frames",
        typeId: frame.id,
        board: currentBoard.id,
      })
    );
  }
  const updatedCoordinates = useCoordinates(coordinates);

  const bindPicPos = useDrag(({delta}) => {
    dispatch(
      boardActions.setImageCoordinates({
        coordinates: {
          x: delta[0],
          y: delta[1],
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
        zIndex: 3,
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
       <img src={image} style={{width: "30px"}}alt="delete" />
      </button>
    </div>
    </div>
  );
}
