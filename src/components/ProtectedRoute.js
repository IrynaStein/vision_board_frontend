import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
import Loader from "./Loader";
const ProtectedRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.utilities.user);
  const isLoading = useSelector((state) => state.utilities.isLoading)
  return (
      <>
    {isLoading ? <Loader/> :
    <Route
      render={() => {
        //   debugger;
        if (user) { 
          return <Component />;
        } else {
          return <Redirect to="/home" />;
        }
      }}
    />}
    </>
  );
};

export default ProtectedRoute;
