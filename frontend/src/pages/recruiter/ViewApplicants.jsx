import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getApplicants,
    updateApplicationStatus,
} from "../../services/applicationService";

function ViewApplicants() {
    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplicants();
    }, []);

    const loadApplicants = async () => {
        try {
            const data = await getApplicants(jobId);
            setApplications(data);
        } catch (error) {
            alert("Failed to load applicants");
        } finally {
            setLoading(false);
        }
    };


    const handleStatus = async (applicationId, status) => {
        try {
            await updateApplicationStatus(applicationId, status);

            alert(`Application ${status}`);

            loadApplicants();
        } catch (error) {
            alert(error.response?.data?.message || "Update failed");
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
                Applicants
            </h2>

            {applications.length === 0 ? (

                <div className="alert alert-info">
                    No applicants found.
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

                                    <h4>{application.user.name}</h4>

                                    <p>
                                        <strong>Email:</strong> {application.user.email}
                                    </p>

                                    <p>
                                        <strong>Status:</strong> {application.status}
                                    </p>

                                    {application.status === "pending" && (
                                        <div className="d-flex gap-2 mt-3">

                                            <button
                                                className="btn btn-success flex-fill"
                                                onClick={() =>
                                                    handleStatus(application._id, "accepted")
                                                }
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="btn btn-danger flex-fill"
                                                onClick={() =>
                                                    handleStatus(application._id, "rejected")
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default ViewApplicants;