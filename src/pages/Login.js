import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/utilitySlice";
import { boardActions } from "../store/boardSlice";
export default function Login() {
  const user = useSelector(state => state.utilities.user)
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(userLogin(data))
    reset();
  };

  return (
    <div className='loginpage'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Please enter your username." })}
        placeholder="enter username..."
      ></input>
      <input
        {...register("password", { required: "Please enter your password." })}
        placeholder="enter password..."
      ></input>
      <button type='submit'>Login</button>
    </form>
    </div>
  );
}
