import { useSelector, useDispatch } from "react-redux"
import './Elements.css'
import WorkBench from "./WorkBench"
import BlurLayer from "../components/BlurLayer"
import { boardActions } from "../store/boardSlice"
import { toolbarActions } from "../store/toolbarSlice"
export default function Air(){

    const errors = useSelector((state) => state.boards.errors);
    // const initialQuote = useSelector((state) =>
    //   state.utilities.initialQuotes.find((q) => q.category === "water")
    // );
    const user = useSelector((state) => state.utilities.user);
   
    const dispatch = useDispatch();
  
  
    function handleReset() {
      dispatch(boardActions.partialReset());
      dispatch(boardActions.setUserBoards(user.boards));
    }
const initialQuote = {cat:"air",text: "Happiness comes the way the wind blows"}


const symbol = "https://live.staticflickr.com/65535/51499946401_80628c9579_o.png"


const description = "It is associated with the breath of life and attributed to cleansing power. Air symbolizes communication, intelligence, perception, knowledge, learning, thinking, imagination, creativity, harmony, and travel. This source of life can also, at times, become a force of terrible destruction. Air is associated with the Spring season and its corresponding direction is East. The Air symbol is an upright triangle with a horizontal line going through it."
return (
    <div className="air-container">
      {errors.length === 0 ? (
        <>
         {/* <div className="quote">{initialQuote.paragraph}</div>  */}
         <div className="quote">{initialQuote.text}</div>
            <BlurLayer
              name="air"
              description={description}
              symbol={symbol}
            //   quote={initialQuote.id}
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
