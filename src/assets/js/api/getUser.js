import axios from "axios";

// Base configuration without the token
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'ngrok-skip-browser-warning': 'true',
    },
});

// Add interceptor to dynamically add the token and CSRF token on each request
axiosClient.interceptors.request.use(async (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default axiosClient;