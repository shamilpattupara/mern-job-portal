import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const data = await getJobById(id);
      setJob(data);
    } catch (error) {
      alert("Failed to load job");
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(id, job);

      alert("Job Updated Successfully");

      navigate("/recruiter/my-jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0 p-4">

            <h2 className="text-center mb-4">
              Edit Job
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Job Title</label>

                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Company</label>

                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={job.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Description</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Location</label>

                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label>Salary</label>

                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Update Job
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditJob;