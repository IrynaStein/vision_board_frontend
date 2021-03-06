import { useSelector } from "react-redux";
import BoardIcon from "./BoardIcon";
export default function BoardList() {
  const boards = useSelector((state) => state.boards.userBoards);
  const user = useSelector((state) => state.boards.userBoards);
  return (
    <div className="boards-list">
      {user && boards.length > 0 ? (
        <BoardIcon boards={boards} />
      ) : (
        <div style={{padding: "7px", color: "#646568", fontSize: "12px"}}>You dont have any boards yet. Create one and start manifesting</div>
      )}
    </div>
  );
}
