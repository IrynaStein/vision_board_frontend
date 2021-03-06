import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";
import image from '../assets/x-delete.png'

export default function Affirmation({ post, currentBoardId }) {
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  const buttonsDisplay = useSelector((state) => state.toolbars.buttonsDisplay);
  const dispatch = useDispatch();
// console.log("POST id", post.id)
  let coordinates = currentBoard.posts.find(
    (p) => p.id === post.id
  ).coordinates;
  function removeAffirmation(post) {
    dispatch(
      boardActions.removeBoardElement({
        type: "posts",
        typeId: post.id,
        board: currentBoard.id,
      })
    );
  }
  const updatedCoordinates = useCoordinates(coordinates);

  const bindPostPos = useDrag(({delta}) => {
    dispatch(
      boardActions.setPostCoordinates({
        coordinates: {
          x: delta[0],
          y: delta[1],
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
       <img src={image} style={{width: "30px"}}alt="delete" />
      </button>
    </div>
    </div>
  );
}
