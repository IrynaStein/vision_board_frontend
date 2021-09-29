// import { useState } from "react"
import { useDrag } from "@use-gesture/react"
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";

export default function Affirmation({post, currentBoardId}){

const currentBoard = useSelector((state) =>
state.boards.userBoards.find((b) => b.id === currentBoardId)
);
const dispatch = useDispatch();

let coordinates = currentBoard.posts.find(
(p) => p.id === post.id
).coordinates;

const updatedCoordinates = useCoordinates(coordinates);

const bindPostPos = useDrag((params) => {
dispatch(
  boardActions.setPostCoordinates({
    coordinates: {
      x: params.offset[0],
      y: params.offset[1],
    },
    boardId: currentBoardId,
    postId: post.id,
  })
);
});

    return (
        <div className="affirmation" {...bindPostPos()} style={{position: "relative", top: updatedCoordinates.y, left: updatedCoordinates.x, font: "The BraggestDemo"}}>{post.paragraph}</div>
    )
}