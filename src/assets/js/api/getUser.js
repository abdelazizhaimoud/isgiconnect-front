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
    // withCredentials: true,
    withXSRFToken: true,
});

// Add interceptor to dynamically add the token and CSRF token on each request
axiosClient.interceptors.request.use(async (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // For any request that isn't GET, HEAD, OPTIONS, or TRACE, we need a CSRF token
    if (!['get', 'head', 'options', 'trace'].includes(config.method.toLowerCase())) {
        // First ensure we have a fresh CSRF token
        await axios.get('/sanctum/csrf-cookie', {
            baseURL: import.meta.env.VITE_BACKEND_URL,
            withCredentials: true
        });
        
        // Get the CSRF token from cookies
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
            
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
        }
    }
    
    return config;
}, error => Promise.reject(error));

export default axiosClient;