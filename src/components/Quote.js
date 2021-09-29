import { useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useDrag } from "@use-gesture/react"
import useCoordinates from "../hooks/useCoordinates";
import { boardActions } from "../store/boardSlice";

export default function Quote({quote, currentBoardId}){

    const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const dispatch = useDispatch();
  let coordinates = currentBoard.quote.coordinates;

  const updatedCoordinates = useCoordinates(coordinates);

    const bindQuotePos = useDrag((params) => {
        dispatch(
          boardActions.setQuoteCoordinates({
            coordinates: {
              x: params.offset[0],
              y: params.offset[1],
            },
            boardId: currentBoardId,
          })
        );
      });
   
    return (
        <div className="sticker-container" key={quote.id}  {...bindQuotePos()} style={{position: "relative", top: updatedCoordinates.y, left: updatedCoordinates.x}}> 
    <div className="quote" >{quote.paragraph}</div>
    </div>
    )
}