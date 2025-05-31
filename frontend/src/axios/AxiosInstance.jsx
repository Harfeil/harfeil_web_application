import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Change to your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here if needed
  },
  // You can add timeout, withCredentials, etc. here
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;