
import { useDrag } from "@use-gesture/react"
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from "../hooks/useCoordinates";

export default function Picture({picture, currentBoardId}){
    const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
    );
    const dispatch = useDispatch();
    let coordinates = currentBoard.images.find(
        (i) => i.id === picture.id
        ).coordinates;
        console.log(coordinates)

    const updatedCoordinates = useCoordinates(coordinates);

    const bindPicPos = useDrag((params) => {
        dispatch(
          boardActions.setImageCoordinates({
            coordinates: {
              x: params.offset[0],
              y: params.offset[1],
            },
            boardId: currentBoardId,
            pictureId: picture.id
          })
        );
      });

    //send additional prop that will specify class of image size chosen by user. "Large, medium, small" it will render accordingly
    return (
        <div className="sticker-container" key={picture.id}  {...bindPicPos()} style={{position: "relative", top: updatedCoordinates.y, left: updatedCoordinates.x}}> 
      <img className="App-logo-medium" src={picture.url} alt="photograph"/>
    </div>
       
    )
}