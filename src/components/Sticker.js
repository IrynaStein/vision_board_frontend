import { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
import useCoordinates from '../hooks/useCoordinates'
export default function Sticker({ sticker, currentBoardId }) {
//   console.log(sticker, currentBoardId);
  const currentBoard = useSelector((state) =>
    state.boards.userBoards.find((b) => b.id === currentBoardId)
  );
  console.log("CURRENTBOARD", currentBoard);
  const dispatch = useDispatch();
  // const [stickerPos, setStickerPos] = useState({
  //     x: 0,
  //     y: 0
  // })
  let coordinates = currentBoard.stickers.find(
    (s) => s.id === sticker.id
  ).coordinates;
  //  debugger
  console.log("INITIAL STRING", coordinates);
const updatedCoordinates = useCoordinates(coordinates)
  // console.log(sticker.id, stickerPos)
  // console.log(stickerPos)

  const bindStickerPos = useDrag((params) => {
    console.log("Params:", params.offset[0]);
    // setStickerPos({
    //     x: params.offset[0],
    //     y: params.offset[1]
    // })
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

//   function parse(string) {
//       let coordinates2 = {
//           x: 0,
//           y: 0
//       }
//      let array = string.split(', ')
//      console.log(string)
//       for (let elem of array){
//            console.log('X', elem.split(': '))
//           if (elem.split(': ')[0] === "x"){
//               console.log(elem.split(': '))
//               coordinates2.x = parseFloat(elem.split(': ')[1])
//           }
//           else {
//               console.log('Y', elem.split(': '))
//                coordinates2.y = parseFloat(elem.split(': ')[1])
//           }
//       }
//       return coordinates2
//   }

//   function parse(coordinates) {
//     let a = coordinates.split(", ");
//     let b = a.map((coord) => coord.split(":"));
//     let result = {
//       x: parseFloat(b[0][1]),
//       y: parseFloat(b[1][1]),
//     };
//     return result;
//   }

//   console.log("AFTERPARSE", parse(coordinates));

  // parse("x: 0.15, y: 0.75")

  // return (
  //     <div className="sticker-container" key={sticker.id}  {...bindStickerPos()} style={{position: "relative", top: stickerPos.y, left: stickerPos.x}}>
  //   <img className="App-logo" src={sticker.image_url} alt="sticker"></img>
  // </div>
  // )

//   return (
//     <div
//       className="sticker-container"
//       key={sticker.id}
//       {...bindStickerPos()}
//       style={{
//         position: "relative",
//         top: parse(coordinates).y,
//         left: parse(coordinates).x,
//       }}
//     >
//       <img className="App-logo" src={sticker.image_url} alt="sticker"></img>
//     </div>
//   );


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
