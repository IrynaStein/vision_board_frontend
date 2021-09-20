import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/utilitySlice";
export default function ToolBar() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout())
  };
  return (
    <div className="toolbar">
      ToolBar
      <div>
        <Link to="/air">Air</Link>
        <Link to="/earth">Earth</Link>
        <Link to="/fire">Fire</Link>
        <Link to="/water">Water</Link>
      </div>
      <input placeholder="affirmation..."></input>
      <button>Add Sticker</button>
      <button>Add Picture</button>
      <button>Add Quote</button>
      _________
      <div className="utilities-edit">
        <button>Clear</button>
        <button>Save</button>
        <button>Edit</button>
        <button>Download</button>
      </div>
      _________
      <Link to="/home">?</Link>
      <div>
        {user ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <div>
            <Link to="/login">Login</Link>or <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}
