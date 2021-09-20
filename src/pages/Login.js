import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/utilitySlice";

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    dispatch(userLogin(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Please enter your username." })}
        placeholder="enter username..."
      ></input>
      <input
        {...register("password", { required: "Please enter your password." })}
        placeholder="enter password..."
      ></input>
      <button>Login</button>
    </form>
  );
}
