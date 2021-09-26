import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
export default function BoardIcon({ boards }) {
    const dispatch = useDispatch()
    function handleClick(board){
        console.log("BOARDICON navigating")
        console.log(board.category)
        dispatch(boardActions.setCurrentBoard(board))
        dispatch(boardActions.setLayout(board.category))
    }
  const renderBoards = boards.map((board) => (
     <Link to={board.category} onClick={()=>handleClick(board)}key={board.id}>{board.category}<br/>{board.name}</Link>
  ));
//   const renderBoards = boards.map((board) => (
//     <Link to={`${board.category}/${board.id}`} onClick={()=>handleClick(board)}key={board.id}>{board.category}<br/>{board.name}</Link>
//  ));
  return renderBoards;
}
