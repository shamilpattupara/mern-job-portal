import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a role is required, check it
  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;