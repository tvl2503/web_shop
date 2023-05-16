import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from './auth/authSlice';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: "json",
  });
  axiosClient.defaults.timeout = 20000;
  axiosClient.defaults.headers.post["Content-Type"] = "application/json";
  if (typeof window === "object") {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
}

axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token")
    console.log(token);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  (response) =>{
    return response;
  },
  error => {
    const { code } = error?.response?.data;
    if (code === 401) {
      toast.warning("Phiên đăng nhập hết hạn!")
      const dispatch = useDispatch()
      dispatch(logout())
      return Promise.reject(error)
    }
    return Promise.reject(error);
  },
)

export default axiosClient;