import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getJobs } from "../services/jobService";
import { getMyApplications } from "../services/applicationService";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState(0);
  const [allJobs, setAllJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const tips = [
    "Keep your resume updated for every application.",
    "Practice common interview questions regularly.",
    "Customize your resume before applying.",
    "Keep your GitHub projects updated.",
    "Learn the basics of DSA and System Design.",
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const jobData = await getJobs();
      const applicationData = await getMyApplications();

      setAllJobs(jobData);
      setRecommendedJobs(jobData.slice(-3).reverse());
      setApplications(applicationData.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Hero Banner */}
      <div
        className="rounded-4 p-5 mb-5 text-white shadow"
        style={{
          background: "linear-gradient(135deg, #2563eb, #4f46e5)",
        }}
      >
        <h1 className="fw-bold">
          Welcome, {user?.name} 👋
        </h1>

        <p className="fs-5 mt-3">
          Ready to discover your next career opportunity?
        </p>

        <Link
          to="/jobs"
          className="btn btn-light btn-lg mt-3"
        >
          Browse Jobs
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-5">

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">

              <h1>👤</h1>

              <h4 className="mb-3">
                Profile
              </h4>

              <hr />

              <p>
                <strong>Name:</strong> {user?.name}
              </p>

              <p className="mb-0">
                <strong>Role:</strong> Job Seeker
              </p>

            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">

              <h1>📄</h1>

              <h4 className="mb-3">
                Applications
              </h4>

              <hr />

              <h1 className="text-primary">
                {applications}
              </h1>

            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body text-center">

              <h1>💼</h1>

              <h4 className="mb-3">
                Available Jobs
              </h4>

              <hr />

              <h1 className="text-success">
                {allJobs.length}
              </h1>

            </div>
          </div>
        </div>

      </div>

      {/* Recommended Jobs */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Recommended Jobs
        </h2>

        <Link
          to="/jobs"
          className="btn btn-outline-primary"
        >
          View All
        </Link>

      </div>

      <div className="row">

        {recommendedJobs.map((job) => (

          <div
            className="col-lg-4 col-md-6 mb-4"
            key={job._id}
          >

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  {job.title}
                </h5>

                <h6 className="text-primary">
                  {job.company}
                </h6>

                <p className="text-muted">
                  📍 {job.location}
                </p>

                <p className="fw-bold text-success">
                  ₹{job.salary}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Interview Tip */}
      <div
        className="card border-0 shadow mt-5"
        style={{
          background: "#f8f9ff",
        }}
      >

        <div className="card-body p-4">

          <h3>
            💡 Interview Tip of the Day
          </h3>

          <p className="fs-5 mb-0">
            {randomTip}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;