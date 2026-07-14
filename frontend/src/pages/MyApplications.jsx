import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        My Applications
      </h2>

      {applications.length === 0 ? (

        <div className="alert alert-info">
          You haven't applied for any jobs yet.
        </div>

      ) : (

        <div className="row">

          {applications.map((application) => (

            <div
              className="col-lg-6 mb-4"
              key={application._id}
            >

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    {application.job.title}
                  </h4>

                  <h6 className="text-primary">
                    {application.job.company}
                  </h6>

                  <p>
                    📍 {application.job.location}
                  </p>

                  <p>
                    Status :
                    <strong> {application.status}</strong>
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyApplications;