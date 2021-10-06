import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoard } from "../store/boardSlice";
import { utilityActions } from "../store/utilitySlice";

export default function useNameCheck(currentBoard) {
  const [hideInput, setHideInput] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });
  const [formErrors, setFormErrors] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setForm({ name: e.target.value });
  }

  function handleSubmit(e, id) {
    e.preventDefault();
    if (form.name) {
      dispatch(updateBoard({ load: form, id }));
      setHideInput(true);
      setFormErrors("");
      setForm({ name: "" });
      dispatch(utilityActions.showTools(true));
    } else {
      setFormErrors(
        `Please enter your manifestation or choose "Same" to continue without changes`
      );
    }
  }
  function onSame() {
    setHideInput(true);
    setFormErrors("");
    dispatch(utilityActions.showTools(true));
  }
  function boardNameCheck(name) {
    return name.match("Untitled-board-");
  }

  return (
    <>
      {" "}
      <div> {formErrors ? <div className="error bottom-message">{formErrors}</div> : null}</div>
      {!hideInput ? (
        <div className="nameForm">
          {!boardNameCheck(currentBoard.name) ? (
            <>
              Last time you were manifesting:
              <br/>
              <span style={{ fontFamily: "Mandhor", color: "white", fontSize: "30px"}}>{currentBoard.name}</span>
            </>
          ) : null}
          <form
            onSubmit={(e) => handleSubmit(e, currentBoard.id)}
          >
            What are you manifesting today?
            <br/>
            <input
            className="input-field"
              id="nameChange"
              onChange={handleChange}
              name="name"
              value={form.name}
            ></input>
            <div>
              <button className="btn btn-white" type="submit">Ok</button>
              {boardNameCheck(currentBoard.name) ? null : (
                <button className="btn btn-white" onClick={onSame}>Same</button>
              )}
            </div>
          </form>{" "}
        </div>
      ) : null}{" "}
    </>
  );
}
