import axios from "axios";

const API_URL = "http://mern-job-portal-oedk.onrender.com/api/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};