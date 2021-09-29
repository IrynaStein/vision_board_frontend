import { useState } from "react"
import { useDrag } from "@use-gesture/react"
// import { useSelector, useDispatch } from "react-redux";
// import { boardActions } from "../store/boardSlice";
// import useCoordinates from "../hooks/useCoordinates";

export default function Picture({picture, currentBoardId}){
    const [picPos, setPicPos] = useState({
        x: 0,
        y: 0
    })
    console.log("ISIDE PICTURE COMP")
    // const currentBoard = useSelector((state) =>
    // state.boards.userBoards.find((b) => b.id === currentBoardId)
    // );
    // const dispatch = useDispatch();
    // let coordinates = currentBoard.image.coordinates;
    // const picPos = useCoordinates(coordinates);

    //for when there are multiple images
    // let coordinates = currentBoard.images.find(
    //     (i) => i.id === image.id
    //     ).coordinates;

    // const bindImagePos = useDrag((params) => {
    //     dispatch(
    //       boardActions.setImageCoordinates({
    //         coordinates: {
    //           x: params.offset[0],
    //           y: params.offset[1],
    //         },
    //         boardId: currentBoardId,
    //       })
    //     );
    //   });

      const bindPicPos = useDrag((params)=>{
        setPicPos({
            x: params.offset[0],
            y: params.offset[1]
        })
})

//for when there are multiple images
// const bindImagePos = useDrag((params) => {
// dispatch(
//   boardActions.setImageCoordinates({
//     coordinates: {
//       x: params.offset[0],
//       y: params.offset[1],
//     },
//     boardId: currentBoardId,
//     imageId: image.id,
//   })
// );
// });

    // console.log(image)
    //send additional prop that will specify class of image size chosen by user. "Large, medium, small" it will render accordingly
    return (
        <div className="sticker-container" key={picture.id}  {...bindPicPos()} style={{position: "relative", top: picPos.y, left: picPos.x}}> 
      <img className="App-logo-medium" src={picture.url} alt="photograph"/>
    </div>
       
    )
}