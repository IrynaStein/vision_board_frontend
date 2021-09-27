import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.utilities.user);
  console.log("PROTECTEDROUTE",user)
  return (
    <Route
    {...rest}
      render={(props) => {
        //   debugger;
        if (user) { 
          return <Component {...props}/>;
        } else {
          return <Redirect to="/home" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
