//this is the only demo component that works without user being logged in. Functionality is limited. Cant save, or download

//Conside refactoring so all components are dynamically rendered depending on the user choice. Have one component for water, air.... that renders other components
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Elements.css";
import "./Frames.css";
import BlurLayer from "../components/BlurLayer";
import WorkBench from "../components/WorkBench";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions } from "../store/boardSlice";
import { updateBoard } from "../store/boardSlice";

export default function Water() {
  const quote = useSelector((state) => state.boards.quote);
  const layout = useSelector((state) => state.boards.layout);
  const stickers = useSelector((state) =>
    state.boards.stickers.filter((s) => s.category === "water")
  );
  const currentBoard = useSelector((state) => state.boards.currentBoard);
  console.log("BOARD", currentBoard);
  const errors = useSelector((state) => state.boards.errors);
  const initialQuote = useSelector((state) =>
    state.utilities.initialQuotes.find((q) => q.category === "water")
  );
  const [form, setForm] = useState({
    name: "",
  });

  const [hideInput, setHideInput] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(toolbarActions.resetLayoutShow());
    if (!currentBoard) {
      dispatch(boardActions.setLayout(""));
    }
  }, [dispatch, currentBoard]);
// debugger;

function handleReset(){
  // dispatch(boardActions.resetBoardSliceState())
  dispatch(boardActions.reset())
}
  function boardNameCheck(name){
    if (Object.keys(currentBoard).length > 0 && errors.length === 0){
      return name.match("Untitled-board-")}
  };

  const symbol =
    "https://live.staticflickr.com/65535/51500171763_5dc0abac52_o.png";

  const description =
    "Water is accorded cleansing power. It is symbolic of dreaming, healing, flowing, fluidity, purification, regeneration, stability, strength, change, fertility, devotion, receiving, and unconditional love. It symbolizes death as well as rebirth. It is life-giving, but can also be destructive. Fresh Water stands for life and good health, while polluted/stagnant Water is symbolic of bad health. It is associated with the Autumn season and the West direction. An inverted triangle is the symbolic representation of the Water element.";

  function handleChange(e) {
    console.log(e.target.value);
    setForm({ name: e.target.value });
  }
  function handleSubmit(e, id) {
    e.preventDefault();
    // console.log(form)
    // console.log(id)
    dispatch(updateBoard({ load: form, id: id }));
    setHideInput(true);
  }
 
  return (
  
        <div className="water-container">
          {errors.length === 0 ? <>
          {quote === "" ? <h3>{initialQuote.paragraph}</h3> : <h3>{quote}</h3>}
          {layout === "" ? (
            <BlurLayer
              name="water"
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
                    <label for="nameChange">
                      What are you manifesting today?
                    </label>
                    <input
                      id="nameChange"
                      onChange={handleChange}
                      name="name"
                      value={form.name}
                    ></input>
                    <div>
                    <button type="submit">Ok</button>
                    <button onClick={()=>setHideInput(true)}>Same</button>
                    </div>
                  </form>{" "}
                </>
              )}

              <WorkBench stickers={stickers} />
            </>
          )}</> : <div>{errors}<button onClick={handleReset}>Ok</button></div>}
        </div>
      ) 
}
