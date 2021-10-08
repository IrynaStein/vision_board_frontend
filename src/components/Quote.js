import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "@use-gesture/react";
import useCoordinates from "../hooks/useCoordinates";
import { boardActions } from "../store/boardSlice";

export default function Quote({ quote, currentBoardId }) {
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);
  const dispatch = useDispatch();
  let coordinates = currentBoard.quote.coordinates;

  const updatedCoordinates = useCoordinates(coordinates);

  function removeQuote(quote) {
    dispatch(
      boardActions.removeBoardElement({
        type: "quote",
        typeId: quote.id,
        board: currentBoard.id,
      })
    );
  }

  const bindQuotePos = useDrag(({delta}) => {
    dispatch(
      boardActions.setQuoteCoordinates({
        coordinates: {
          x: delta[0],
          y: delta[1],
        },
        boardId: currentBoardId,
      })
    );
  });

  return (
    <div
    className="draggable-element-container"
      >
    <div
      className="quote"
      key={quote.id}
      {...bindQuotePos()}
      style={{
        display: "inline-block",
        zIndex: 5,
        position: "absolute",
        top: updatedCoordinates.y,
        left: updatedCoordinates.x,
      }}
    >
      {quote.paragraph}
      {/* <button
        className="delete-button"
        style={{ display: buttonsDisplay }}
        onClick={() => removeQuote(quote)}
      >
        x
      </button> */}
    </div>
    </div>
  );
}
