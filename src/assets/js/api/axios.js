import axios from "axios";
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
    withCredentials: true,
    withXSRFToken: true,
})
export default axiosClient;