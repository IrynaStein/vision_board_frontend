import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function ToolBar() {
const user = useSelector(state => state.utilities.user)
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

    <Link to="/home">
        ?
    </Link>
    <div>
      {user? <button>Logout</button> : <div><button>Login</button>or <button>Signup</button></div>}
    </div>
    </div>
  );
}
