import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/utilitySlice";
export default function ToolBar() {
  const user = useSelector((state) => state.utilities.user);
  const dispatch = useDispatch();
  const boards = useSelector(state => state.utilities.board)
  console.log("TOOLBAR/boards", boards)
  const logoutHandler = () => {
    dispatch(userLogout());
  };

  return (
    <div className="toolbar">
      ToolBar
      <div className="element-link-container">
      <Link to="/water" className="element-link"><img src="https://live.staticflickr.com/65535/51499110765_a3f537a2c4_o.png"/></Link>
        <Link to="/fire" className="element-link"><img src="https://live.staticflickr.com/65535/51498183701_90f7ba7f6e_o.png"/></Link>
        <Link to="/air" className="element-link"><img src="https://live.staticflickr.com/65535/51498405518_35f832371a_o.png"/></Link>
        <Link to="/earth" className="element-link"><img src="https://live.staticflickr.com/65535/51498899924_746037b32f_o.png"/></Link>
        
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


