import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../store/boardSlice";
import { toolbarActions } from "../store/toolbarSlice";
export default function BoardIcon({ boards }) {
  const stickers = useSelector((state) => state.boards.stickers);
  const pickSticker = (category) => {
    const currentStickers = stickers.filter((s) => s.category === category);
    return currentStickers[Math.floor(Math.random() * currentStickers.length)]
      .image_url;
  };

  const dispatch = useDispatch();
  console.log(boards);
  const renderBoards = boards.map((board) => (
    <Link
    className="board-icon"
      to={`/${board.category}/${board.id}`}
      onClick={() => {
        dispatch(boardActions.setLayout(board.category));
        dispatch(toolbarActions.resetLayoutShow());
      }}
      key={board.id}
    >
     
        <img src={pickSticker(board.category)} alt="sticker" />
        {board.name}
     
    </Link>
  ));

  return renderBoards;
}
