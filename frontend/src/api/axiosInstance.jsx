<<<<<<< HEAD
// src/api/axiosInstance.js
import axios from 'axios';

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: 'https://gym-tracker-4.onrender.com/api/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default axiosInstance;
=======
// src/api/axiosInstance.js
import axios from 'axios';

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: 'https://gym-tracker-4.onrender.com/api/',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default axiosInstance;
>>>>>>> d2f59208269c9df6dc2ac1181177afcf371e2dc2
