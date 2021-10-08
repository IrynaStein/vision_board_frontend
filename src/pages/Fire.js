import { useSelector, useDispatch } from "react-redux"
import './Elements.css'
import BlurLayer from "../components/BlurLayer"
import { boardActions } from "../store/boardSlice"

export default function Fire(){

    const errors = useSelector((state) => state.boards.errors);
    const initialQuote = useSelector((state) =>
      state.utilities.initialQuotes.find((q) => q.category === "fire")
    );

    const user = useSelector((state) => state.utilities.user);
   
    const dispatch = useDispatch();
  
    function handleReset() {
        dispatch(boardActions.partialReset());
        dispatch(boardActions.setUserBoards(user.boards));
      }


    const symbol = "https://live.staticflickr.com/65535/51499946366_7736fe5630_o.png"
    

    const description = "Fire element is considered to be the first element that was born when the universe was created. Fire is attributed to transformational and purifying powers. It can give warmth and enable life, and it can also burn and destroy. In the spiritual plane, Fire stands for Light and in the physical plane, it is the Sun or Flame. The element symbolizes incredible energy, activity, creativity, passion, freedom, power, love, vision, anger, strength, will, assertiveness, courage, and dynamism. It is associated with the Summer season and its corresponding direction is South. The symbolic representation of Fire is a triangle pointing upwards."

    return (
        <div className="fire-container">
          {errors.length === 0 ? (
            <>
             <div className="quote">{initialQuote.paragraph}</div> 
                <BlurLayer
                  name="fire"
                  description={description}
                  symbol={symbol}
                  quote={initialQuote}
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

