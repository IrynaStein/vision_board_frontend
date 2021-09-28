import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { userSignup } from "../store/utilitySlice";
export default function Signup(){
const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(userSignup(data));
    reset();
  };
    return (
      <div className="signuppage">
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
      ></input>
      <input
        {...register("password_confirmation", { required: "Please re-enter your password." })}
        placeholder="re-enter password..."
      ></input>
      <button basic color='purple'>Signup</button>
    </form>
    </div>
    )
}