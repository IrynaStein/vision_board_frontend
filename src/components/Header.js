import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../store/utilitySlice";
import { boardActions } from "../store/boardSlice";
import { toolbarActions } from "../store/toolbarSlice";

export default function Header(){
    const user = useSelector((state) => state.utilities.user);
const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(userLogout());
        dispatch(boardActions.reset());
        dispatch(toolbarActions.resetLayoutShow());
      };
    return (
   
        <div>
        {user ? (
          <>
          <button onClick={logoutHandler}>Logout</button>
          <Link to="/home">Home</Link>
          </>
        ) : (
          <div>
            <Link to="/login">Login</Link>or <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
       
     
    )
}