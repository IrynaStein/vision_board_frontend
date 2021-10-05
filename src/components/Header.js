import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userLogout } from "../store/utilitySlice";
import { boardActions } from "../store/boardSlice";
import { toolbarActions } from "../store/toolbarSlice";

export default function Header() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(userLogout());
    dispatch(boardActions.reset());
    dispatch(toolbarActions.resetLayoutShow());
    history.push("/home");
  };
  return (
    <div>
      {user ? (
         <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <button  className="btn btn-white" onClick={logoutHandler}>Logout</button>
          <Link className="btn btn-white" to="/home">Home</Link>
        </div>
      ) : (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Link className="btn btn-white" to="/login">Login</Link> <Link className="btn btn-white" to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
}
