import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location.pathname,
          message: "Please sign in to continue.",
        }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;