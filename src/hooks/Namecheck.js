import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoard } from "../store/boardSlice";

export default function useNameCheck(currentBoard) {
  const [hideInput, setHideInput] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  
  function handleChange(e) {
    console.log(e.target.value);
    setForm({ name: e.target.value });
  }
  function handleSubmit(e, id) {
    e.preventDefault();
    dispatch(updateBoard({ load: form, id: id }));
    setHideInput(true);
  }
  function onSame() {
    setHideInput(true);
  }
  function boardNameCheck(name) {
    return name.match("Untitled-board-");
  }

  return (
    <>
      {" "}
      {!hideInput ? (
        <>
          {!boardNameCheck(currentBoard.name) ? (
            <>
              <div>Last time you were manifesting:</div>
              <div>{currentBoard.name}</div>
            </>
          ) : null}
          <form
            className="nameForm"
            onSubmit={(e) => handleSubmit(e, currentBoard.id)}
          >
            <label for="nameChange">What are you manifesting today?</label>
            <input
              id="nameChange"
              onChange={handleChange}
              name="name"
              value={form.name}
            ></input>
            <div>
              <button type="submit">Ok</button>
              {boardNameCheck(currentBoard.name)? null : <button onClick={onSame}>Same</button>}
            </div>
          </form>{" "}
        </>
      ) : null}{" "}
    </>
  );
}
