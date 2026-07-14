import { Link } from "react-router-dom";

function LatestJobs({ jobs }) {
  return (
    <section className="container section-space">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="section-heading mb-0">
          Latest Jobs
        </h2>

        <Link
          to="/jobs"
          className="btn btn-outline-primary"
        >
          View All Jobs
        </Link>

      </div>

      <div className="row">

        {jobs.length === 0 ? (

          <div className="col-12 text-center">
            <h5>No jobs available.</h5>
          </div>

        ) : (

          jobs.map((job) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={job._id}
            >

              <div className="card custom-card h-100 shadow-sm">

                <div className="card-body p-4">

                  <h4 className="job-title">
                    {job.title}
                  </h4>

                  <p className="mb-2">
                    <strong>🏢 Company:</strong> {job.company}
                  </p>

                  <p className="mb-2">
                    <strong>📍 Location:</strong> {job.location}
                  </p>

                  <p className="text-success fw-bold fs-5">
                    ₹{job.salary}
                  </p>

                  <Link
                    to="/jobs"
                    className="btn btn-primary w-100 mt-3"
                  >
                    Browse Jobs
                  </Link>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default LatestJobs;