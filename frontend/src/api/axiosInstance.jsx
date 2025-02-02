import axios from 'axios';

// Fetch the token each time an API request is made
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
