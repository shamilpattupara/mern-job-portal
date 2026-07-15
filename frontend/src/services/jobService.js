import axios from "axios";

const API_URL = "https://mern-job-portal-oedk.onrender.com/api/jobs";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get all jobs
export const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single job
export const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create job
export const createJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// Recruiter's jobs
export const getMyJobs = async () => {
  const response = await axios.get(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// Delete job
export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

// Update job
export const updateJob = async (id, jobData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.data;
};