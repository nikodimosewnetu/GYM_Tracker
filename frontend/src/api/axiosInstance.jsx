
import axios from 'axios';

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: 'https://gym-tracker-4.onrender.com/api/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});
export default axiosInstance;
