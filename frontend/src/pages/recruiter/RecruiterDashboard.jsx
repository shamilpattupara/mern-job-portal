import { Link } from "react-router-dom";

function RecruiterDashboard() {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">

        <h1 className="fw-bold display-5">
          Recruiter Dashboard
        </h1>

        <p className="text-muted fs-5">
          Manage your jobs and applications from one place.
        </p>

      </div>

      <div className="row g-4">

        {/* Create Job */}
        <div className="col-md-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body text-center p-4">

              <div className="display-4 mb-3">
                💼
              </div>

              <h4>Create Job</h4>

              <p className="text-muted">
                Post a new job opportunity for candidates.
              </p>

              <Link
                to="/recruiter/create-job"
                className="btn btn-primary w-100"
              >
                Create Job
              </Link>

            </div>

          </div>

        </div>

        {/* My Jobs */}
        <div className="col-md-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body text-center p-4">

              <div className="display-4 mb-3">
                📋
              </div>

              <h4>Manage Jobs</h4>

              <p className="text-muted">
                Edit, delete and manage all your jobs.
              </p>

              <Link
                to="/recruiter/my-jobs"
                className="btn btn-success w-100"
              >
                My Jobs
              </Link>

            </div>

          </div>

        </div>

        {/* Applications */}
        <div className="col-md-4">

          <div className="card shadow border-0 h-100">

            <div className="card-body text-center p-4">

              <div className="display-4 mb-3">
                👥
              </div>

              <h4>Applications</h4>

              <p className="text-muted">
                Review applicants from your posted jobs.
              </p>

              <Link
                to="/recruiter/my-jobs"
                className="btn btn-info w-100"
              >
                View Applicants
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RecruiterDashboard;