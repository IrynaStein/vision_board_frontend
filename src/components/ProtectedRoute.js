import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.utilities.user);
  return (
    <Route
      render={() => {
        //   debugger;
        if (user) { 
          return <Component />;
        } else {
          return <Redirect to="/home" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
