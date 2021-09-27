import { useSelector, useDispatch } from "react-redux";
import "./Elements.css";
import "./Frames.css";
import BlurLayer from "../components/BlurLayer";
import { boardActions } from "../store/boardSlice";

export default function Water() {

  const errors = useSelector((state) => state.boards.errors);
  const initialQuote = useSelector((state) =>
    state.utilities.initialQuotes.find((q) => q.category === "water")
  );
  const user = useSelector((state) => state.utilities.user);
 
  const dispatch = useDispatch();


  function handleReset() {
    dispatch(boardActions.partialReset());
    dispatch(boardActions.setUserBoards(user.boards));
  }

  const symbol =
    "https://live.staticflickr.com/65535/51500171763_5dc0abac52_o.png";

  const description =
    "Water is accorded cleansing power. It is symbolic of dreaming, healing, flowing, fluidity, purification, regeneration, stability, strength, change, fertility, devotion, receiving, and unconditional love. It symbolizes death as well as rebirth. It is life-giving, but can also be destructive. Fresh Water stands for life and good health, while polluted/stagnant Water is symbolic of bad health. It is associated with the Autumn season and the West direction. An inverted triangle is the symbolic representation of the Water element.";

  return (
    <div className="water-container">
      {errors.length === 0 ? (
        <>
         <div className="quote">{initialQuote.paragraph}</div> 
            <BlurLayer
              name="water"
              description={description}
              symbol={symbol}
              quote={initialQuote.id}
            />
        </>
      ) : (
        <div>
          {errors}
          <button onClick={handleReset}>Ok</button>
        </div>
      )}
    </div>
  );
}
