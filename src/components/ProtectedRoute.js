import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.utilities.user);
  console.log(user)
  return (
    <Route
      render={() => {
        if (user) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
