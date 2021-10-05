import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";

export default function Affirmation({ post, currentBoardId }) {
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);
  const dispatch = useDispatch();

  let coordinates = currentBoard.posts.find(
    (p) => p.id === post.id
  ).coordinates;
  function removeAffirmation(post) {
    console.log(post.id);
    dispatch(
      boardActions.removeBoardElement({
        type: "posts",
        typeId: post.id,
        board: currentBoard.id,
      })
    );
  }
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
    <div
       className="draggable-element-container"
      >
    <div
      className="affirmation"
      {...bindPostPos()}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "absolute",
        top: updatedCoordinates.y,
        left: updatedCoordinates.x,
        font: "The BraggestDemo",
      }}
    >
      {post.paragraph}
      <button
        className="delete-button"
        style={{ display: buttonsDisplay }}
        onClick={() => removeAffirmation(post)}
      >
        x
      </button>
    </div>
    </div>
  );
}
