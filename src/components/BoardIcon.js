import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/boardSlice";
export default function BoardIcon({ boards }) {
  const dispatch = useDispatch()
 
  const renderBoards = boards.map((board) => (
    <Link to={`/${board.category}/${board.id}`} onClick={()=>dispatch(boardActions.setLayout(board.category))}key={board.id}>{board.category}<br/>{board.name}</Link>
 ));


  return renderBoards;
}
