import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Elements.css";
import "./Frames.css";
import BlurLayer from "../components/BlurLayer";
import WorkBench from "../components/WorkBench";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions } from "../store/boardSlice";
import { updateBoard } from "../store/boardSlice";
export default function Earth() {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.boards.quote);
  const layout = useSelector((state) => state.boards.layout);
  const stickers = useSelector((state) =>
    state.boards.stickers.filter((s) => s.category === "earth")
  );
  const errors = useSelector(state => state.boards.errors)
  const currentBoard = useSelector((state) => state.boards.currentBoard);
  const [form, setForm] = useState({
    name: "",
  });
  const [hideInput, setHideInput] = useState(false);
  useEffect(() => {
    // dispatch(toolbarActions.resetLayoutShow());
    if (!currentBoard) {
      dispatch(boardActions.setLayout(""));
    }
  }, [dispatch, currentBoard]);

  const boardNameCheck = (name) => {
    if (errors.length > 0) {
      return errors;
    } else {
      return name.match("Untitled-board-");
    }
  };

  const initialQuote = useSelector((state) =>
    state.utilities.initialQuotes.find((q) => q.category === "earth")
  );
  const symbol =
    "https://live.staticflickr.com/65535/51499151717_78d72f7b43_o.png";

  const description =
    "The Earth element has cleaning power. It symbolizes prosperity, fertility, stability, orderliness, groundedness, sustenance, creativity, physical abundance, nourishment, solidity, dependability, security, permanence, intuition, introspection, and wisdom. The season related to Earth is Winter and the associated direction is North. The element is symbolically represented by an inverted triangle with a horizontal line running through it.";

  function handleChange(e) {
    console.log(e.target.value);
    setForm({ name: e.target.value });
  }
  function handleSubmit(e, id) {
    e.preventDefault();
    dispatch(updateBoard({ load: form, id: id }));
    setHideInput(true);
  }

  return (
    <>
    {errors.length === 0 ? 
    <div className="earth-container">
      {quote === "" ? <h3>{initialQuote.paragraph}</h3> : <h3>{quote}</h3>}
      {layout === "" ? (
        <BlurLayer
          name="earth"
          description={description}
          symbol={symbol}
          quote={initialQuote.id}
        />
      ) : (
        <>
          {hideInput ? null : (
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
                <button type="submit">Ok</button>
              </form>{" "}
            </>
          )}

          <WorkBench stickers={stickers} />
        </>
      )}
    </div> :
    <div>{errors}</div>}
    </>
  );
}
