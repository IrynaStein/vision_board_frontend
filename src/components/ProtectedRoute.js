
import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.utilities.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/home" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

