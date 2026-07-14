import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getJobs } from "../services/jobService";
import { applyJob } from "../services/applicationService";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        try {
            const response = await applyJob(jobId);

            toast.success(response.message);

        } catch (error) {

            const message = error.response?.data?.message;

            if (
                message === "Invalid token" ||
                message === "No token, access denied"
            ) {
                toast.error("Please login first to apply for a job.");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);

                return;
            }

            toast.error(message || "Application Failed");
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <h2>Loading Jobs...</h2>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">
                    Available Jobs
                </h2>

                <span className="badge bg-primary fs-6">
                    {jobs.length} Jobs
                </span>

            </div>

            {jobs.length === 0 ? (

                <div className="alert alert-info">
                    No jobs available right now.
                </div>

            ) : (

                <div className="row">

                    {jobs.map((job) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={job._id}
                        >

                            <div className="card shadow border-0 h-100">

                                <div className="card-body d-flex flex-column">

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

                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => handleApply(job._id)}
                                    >
                                        Apply Now
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Jobs;