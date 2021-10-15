import { useSelector, useDispatch } from "react-redux";
import { utilityActions } from "../store/utilitySlice";
import { boardActions } from "../store/boardSlice";
export default function HomePage() {
  const user = useSelector((state) => state.utilities.user);
const errors = useSelector(state => state.utilities.errors)
const boardErrors = useSelector(state => state.boards.errors)
const dispatch = useDispatch()
  return (
    <div className="homepage">
      <h1 className="heading-primary">
        <span className="heading-primary-main">Dream-Create-Receive</span>
        <span className="heading-primary-sub">
          compose affirmations <br /> manifest dreams <br /> get inspired{" "}
        </span>
      </h1>

      <div className="homepage-body-text-one">
        <p>Choose one of four elemental layouts</p>

        <p>Upload pictures for visualization</p>
        <p>Compose your own affirmations</p>
        <p>Add theme stickers</p>
      </div>
      <div className="homepage-body-text-two">
        <p>
          Edit board by removing elements or save it to continue creating later
        </p>
        <p>
          Download your board as an image and share with someone special
          or have close to you all the time so you can visualize your dreams
          anytime anywhere
        </p>
      </div>
      {errors.length > 0 ? <div className="error logout-message">{errors}<br/><button className="btn btn-gray" onClick={()=>dispatch(utilityActions.clearErrors())}>Ok</button></div> : null}
      {boardErrors.length > 0 ? <div className="error logout-message">{boardErrors}<br/><button className="btn btn-gray" onClick={()=>dispatch(boardActions.clearErrorMessages())}>Ok</button></div> : null}
      {user ? null : (
        <h3 className="footer-primary-main">
          {" "}
         <span className="footer-primary-main-hand">&#9754; </span>Login or Signup to start
        </h3>
      )}
    </div>
  );
}
