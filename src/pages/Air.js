import { useSelector, useDispatch } from "react-redux"
import './Elements.css'
import BlurLayer from "../components/BlurLayer"
import { boardActions } from "../store/boardSlice"
export default function Air(){

    const errors = useSelector((state) => state.boards.errors);
    const initialQuote = useSelector((state) =>
      state.utilities.initialQuotes.find((q) => q.category === "air")
    );
    const user = useSelector((state) => state.utilities.user);
   
    const dispatch = useDispatch();
  
  
    function handleReset() {
      dispatch(boardActions.partialReset());
      dispatch(boardActions.setUserBoards(user.boards));
    }

const symbol = "https://live.staticflickr.com/65535/51499946401_80628c9579_o.png"


const description = "Air element is associated with the breath of life and attributed to cleansing power. Air symbolizes communication, intelligence, perception, knowledge, learning, thinking, imagination, creativity, harmony, and travel. This source of life can also, at times, become a force of terrible destruction. Air is associated with the Spring season and its corresponding direction is East. The Air symbol is an upright triangle with a horizontal line going through it."
return (
    <div className="air-container">
      {errors.length === 0 ? (
        <>
         <div className="quote">{initialQuote.paragraph}</div> 
            <BlurLayer
              name="air"
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
