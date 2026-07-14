import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3 text-primary"
          to="/"
        >
          💼 Job Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link fw-semibold" to="/jobs">
                Jobs
              </Link>
            </li>

            {token && user?.role === "user" && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link fw-semibold"
                  to="/my-applications"
                >
                  My Applications
                </Link>
              </li>
            )}

            {token && user?.role === "recruiter" && (
              <li className="nav-item mx-2">
                <Link
                  className="nav-link fw-semibold"
                  to="/recruiter/dashboard"
                >
                  Recruiter Dashboard
                </Link>
              </li>
            )}

            {!token ? (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link fw-semibold" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item ms-3">
                  <Link
                    to="/register"
                    className="text-decoration-none"
                  >
                    <button className="primary-btn">
                      Register
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item ms-3">
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;