import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { utilityActions } from "../store/utilitySlice";
import { boardActions } from "../store/boardSlice";
import { getStickers } from "../store/boardSlice";
import { Link } from "react-router-dom";
export default function Login() {
 
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();

    fetch('/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then((resp) => {
      if (resp.ok){
        resp.json().then(data => {
          dispatch(utilityActions.setUser(data.user))
          dispatch(boardActions.setUserBoards(data.user.boards))
          dispatch(utilityActions.setInitialQuotes(data.quotes))
          dispatch(utilityActions.toogleLoading(false))
        })
      }
      else {
        dispatch(utilityActions.toogleLoading(false))
      }
    })
    dispatch(getStickers())
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
        type="password"
      ></input>
      <button type='submit'>Login</button>
    </form>
    <Link to='/home'>Home</Link>
    </div>
  );
}
