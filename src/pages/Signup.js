import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { userSignup } from "../store/utilitySlice";
import { getStickers } from "../store/boardSlice";
import { Link } from "react-router-dom";
export default function Signup(){
const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(userSignup(data));
    dispatch(getStickers())
    reset();
  };
    return (
      <div className="homepage">
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
        {...register("name", { required: "Please enter your name." })}
        placeholder="enter name..."
      ></input>
      <input
        {...register("email", { required: "Please enter your email." })}
        placeholder="enter email..."
      ></input>
      <input
        {...register("username", { required: "Please choose username." })}
        placeholder="choose username..."
      ></input>
      <input
        {...register("password", { required: "Please enter your password." })}
        placeholder="enter password..."
        type="password"
      ></input>
      <input
        {...register("password_confirmation", { required: "Please re-enter your password." })}
        placeholder="re-enter password..."
        type="password"
      ></input>
      <button className="btn btn-white">Signup</button>
    </form>
    <Link className="footer-primary-main" to='/home'>Home</Link>
    </div>
    )
}