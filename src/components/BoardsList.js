import { useSelector } from "react-redux"
import BoardIcon from './BoardIcon'
export default function BoardList(){
    const boards = useSelector(state => state.boards.userBoards)
    const user = useSelector(state => state.boards.userBoards)
return (
    <div>
    {user && boards.length > 0? <BoardIcon boards={boards}/> : "You dont have any boards yet. Create one and start manifesting"}
   </div> 
)
}
