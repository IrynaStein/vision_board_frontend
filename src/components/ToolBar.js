import {Link} from 'react-router-dom'
export default function ToolBar() {
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
    <button>Logout</button>
    </div>
  );
}
