import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs, deleteJob } from "../../services/jobService";

function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getMyJobs();
            setJobs(data);
        } catch (error) {
            console.log(error);
            alert("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this job?")) return;

        try {
            await deleteJob(id);
            alert("Job deleted successfully");
            fetchJobs();
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <h3>Loading jobs...</h3>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">My Jobs</h2>

                <Link
                    to="/recruiter/create-job"
                    className="btn btn-primary"
                >
                    + Create Job
                </Link>

            </div>

            {jobs.length === 0 ? (

                <div className="alert alert-info">
                    You haven't posted any jobs yet.
                </div>

            ) : (

                <div className="row">

                    {jobs.map((job) => (

                        <div className="col-lg-6 mb-4" key={job._id}>

                            <div className="card shadow border-0 h-100">

                                <div className="card-body">

                                    <h4 className="fw-bold">
                                        {job.title}
                                    </h4>

                                    <h6 className="text-primary">
                                        {job.company}
                                    </h6>

                                    <p className="text-muted">
                                        {job.description}
                                    </p>

                                    <p>
                                        📍 {job.location}
                                    </p>

                                    <p>
                                        💰 ₹{job.salary}
                                    </p>

                                    <div className="d-grid gap-2 mt-3">

                                        <Link
                                            to={`/recruiter/edit-job/${job._id}`}
                                            className="btn btn-warning"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            to={`/recruiter/applicants/${job._id}`}
                                            className="btn btn-info"
                                        >
                                            View Applicants
                                        </Link>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(job._id)}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default MyJobs;