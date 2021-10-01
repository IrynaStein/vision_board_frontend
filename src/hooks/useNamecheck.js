import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoard } from "../store/boardSlice";
import { toolbarActions } from "../store/toolbarSlice";
import { utilityActions } from "../store/utilitySlice";

export default function useNameCheck(currentBoard) {
  const [hideInput, setHideInput] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });
  const [formErrors, setFormErrors] = useState('')
  const dispatch = useDispatch();
  
  function handleChange(e) {
      console.log(e.target.value);
      setForm({ name: e.target.value });
  }

  function handleSubmit(e, id) {
    e.preventDefault();
    if (form.name){
      dispatch(updateBoard({ load: form, id }));
      setHideInput(true);
      setFormErrors('')
      setForm({name: ''})
      dispatch(utilityActions.showTools(true))
    }else {
      setFormErrors(`Please enter your manifestation or choose "Same" to continue without changes`)
    } 
  }
  function onSame() {
    setHideInput(true);
    setFormErrors('')
    dispatch(utilityActions.showTools(true))
  }
  function boardNameCheck(name) {
    return name.match("Untitled-board-");
  }

  return (
    <>
      {" "}
     <div> {formErrors? <div>{formErrors}</div>: null}</div>
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