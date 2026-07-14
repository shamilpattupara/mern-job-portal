import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/jobService";

function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createJob(job);

      alert("Job Created Successfully!");

      navigate("/recruiter/my-jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0 p-4">

            <h2 className="text-center mb-4">
              Create New Job
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
                Create Job
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CreateJob;