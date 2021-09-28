import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../store/boardSlice";
import { toolbarActions } from "../store/toolbarSlice";
export default function BoardIcon({ boards }) {
  // const layout = useSelector(state =>state.boards.layout)
  const stickers = useSelector(state => state.boards.stickers)
  // const sticker = stickers[Math.floor(Math.random()*stickers.length)].image_url

  const pickSticker = (category) => {
const currentStickers = stickers.filter(s => s.category === category)
return  currentStickers[Math.floor(Math.random()*currentStickers.length)].image_url
}



  const dispatch = useDispatch();
console.log(boards)
  const renderBoards = boards.map((board) => (
    <Link
      to={`/${board.category}/${board.id}`}
      onClick={() => {
        dispatch(boardActions.setLayout(board.category))
        dispatch(toolbarActions.resetLayoutShow())
      }}
      key={board.id}
    >
      <div className="board-icon">
        <img src={pickSticker(board.category)} alt ="sticker"/>
        {board.name}
      </div>
    </Link>
  ));

  return renderBoards;
}
