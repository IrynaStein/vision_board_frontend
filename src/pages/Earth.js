import { useSelector, useDispatch } from "react-redux";
import "./Elements.css";
import "./Frames.css";
import BlurLayer from "../components/BlurLayer";
import { boardActions } from "../store/boardSlice";
export default function Earth() {
 
  const dispatch = useDispatch();
 
  const errors = useSelector(state => state.boards.errors)
  const user = useSelector((state) => state.utilities.user);
 
  function handleReset() {
    dispatch(boardActions.clearErrorMessages());
    dispatch(boardActions.setUserBoards(user.boards));
  }
  const initialQuote = useSelector((state) =>
    state.utilities.initialQuotes.find((q) => q.category === "earth")
  );
  const symbol =
    "https://live.staticflickr.com/65535/51499151717_78d72f7b43_o.png";

  const description =
    "The Earth element has cleaning power. It symbolizes prosperity, fertility, stability, orderliness, groundedness, sustenance, creativity, physical abundance, nourishment, solidity, dependability, security, permanence, intuition, introspection, and wisdom. The season related to Earth is Winter and the associated direction is North. The element is symbolically represented by an inverted triangle with a horizontal line running through it.";

  return (
    <div className="earth-container">
      {errors.length === 0 ? (
        <>
         <div className="quote">{initialQuote.paragraph}</div> 
            <BlurLayer
              name="earth"
              description={description}
              symbol={symbol}
              quote={initialQuote}
            />
        </>
      ) : (
        <div className="error top-message">
          {errors}
          <br/>
          <button className="btn btn-gray" onClick={handleReset}>Ok</button>
        </div>
      )}
    </div>
  );
}
