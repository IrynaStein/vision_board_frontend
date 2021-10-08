import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { userSignup, utilityActions } from "../store/utilitySlice";
import { getStickers } from "../store/boardSlice";
import { Link } from "react-router-dom";
export default function Signup(){
const { register, handleSubmit, reset, formState: {errors} } = useForm();
const submissionErrors = useSelector(state => state.utilities.errors)
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(userSignup(data));
    dispatch(getStickers())
    reset();
  };


    return (
      <div className="homepage">
        <form className="login-form"  onSubmit={handleSubmit(onSubmit)}>
            <input
        {...register("name", { required: "Please enter your name" })}
        className="input-field"
        placeholder="enter name..."
      >
      </input>
      {errors.name && <p className="input-warning-messages">{errors.name.message}</p>}
      <input
        {...register("email", { required: "Please enter your email" })}
        placeholder="enter email..."
        className="input-field"
      ></input>
      {errors.email && <p className="input-warning-messages">{errors.email.message}</p>}
      <input
        {...register("username", { required: "Please choose username" })}
        placeholder="choose username..."
        className="input-field"
      ></input>
      {errors.username && <p className="input-warning-messages">{errors.username.message}</p>}
      <input
        {...register("password", { required: "Please enter your password" })}
        placeholder="enter password..."
        type="password"
        className="input-field"
      ></input>
      {errors.password && <p className="input-warning-messages">{errors.password.message}</p>}
      <input
        {...register("password_confirmation", { required: "Please re-enter your password" })}
        placeholder="re-enter password..."
        type="password"
        className="input-field"
      ></input>
      {errors.password_confirmation && <p className="input-warning-messages">{errors.password_confirmation.message}</p>}
      <button className="btn btn-white">Signup</button>
    </form>
    {submissionErrors.length > 0 ? <div className="error signup-message">{submissionErrors}<br/><button className="btn btn-gray" onClick={()=>dispatch(utilityActions.clearErrors())}>Ok</button></div> : null}
    <Link className="footer-primary-main" to='/home'>Home</Link>
    </div>
    )
}