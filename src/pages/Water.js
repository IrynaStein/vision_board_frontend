//this is the only demo component that works without user being logged in. Functionality is limited. Cant save, or download

//Conside refactoring so all components are dynamically rendered depending on the user choice. Have one component for water, air.... that renders other components
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Elements.css";
import "./Frames.css";
import BlurLayer from "../components/BlurLayer";
import WorkBench from "../components/WorkBench";
import { toolbarActions } from "../store/toolbarSlice";
import { boardActions } from "../store/boardSlice";

export default function Water() {
  const quote = useSelector((state) => state.boards.quote);
  const layout = useSelector((state) => state.boards.layout);
  const stickers = useSelector((state) => state.boards.stickers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toolbarActions.resetLayoutShow());
    dispatch(boardActions.setLayout(""));
  }, [dispatch]);

  const initialQuote = useSelector((state) =>
    state.utilities.initialQuotes.find((q) => q.category === "water")
  );

  const symbol =
    "https://live.staticflickr.com/65535/51500171763_5dc0abac52_o.png";

  const description =
    "Water is accorded cleansing power. It is symbolic of dreaming, healing, flowing, fluidity, purification, regeneration, stability, strength, change, fertility, devotion, receiving, and unconditional love. It symbolizes death as well as rebirth. It is life-giving, but can also be destructive. Fresh Water stands for life and good health, while polluted/stagnant Water is symbolic of bad health. It is associated with the Autumn season and the West direction. An inverted triangle is the symbolic representation of the Water element.";

  return (
    <div className="water-container">
      {quote === "" ? <h3>{initialQuote.paragraph}</h3> : <h3>{quote}</h3>}
      {layout === "" ? (
        <BlurLayer name="water" description={description} symbol={symbol} quote={initialQuote.id} />
      ) : (
        <WorkBench stickers={stickers} />
      )}
    </div>
  );
}
