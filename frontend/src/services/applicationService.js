import axios from "axios";

const API_URL = "http://mern-job-portal-oedk.onrender.com/api/applications";

const getToken = () => {
  return localStorage.getItem("token");
};

// Apply for a job
export const applyJob = async (jobId) => {
  const response = await axios.post(
    API_URL,
    { jobId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};

// Get my applications
export const getMyApplications = async () => {
  const response = await axios.get(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// Get applicants for a specific job
export const getApplicants = async (jobId) => {
  const response = await axios.get(`${API_URL}/job/${jobId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// Accept or Reject application
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await axios.patch(
    `${API_URL}/${applicationId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};