import axios from "axios";

//  Axios instance bana liya
const axiosInstance = axios.create({
  baseURL: "https://blockblitz.onrender.com/api/v1/", // apne backend ka URL daalna
  withCredentials: true, // cookies ke sath request bhejne ke liye automatically 
});

//  Optional: Response interceptor — agar access token expire ho gaya toh refresh token se retry karenge
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // agar token expired hai aur request already retry nahi hui
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refresh token endpoint call
        await axiosInstance.get("user/refresh-token");
        // retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


// Axios Instance Setup – Steps

// 1 Axios instance banao — ek hi global config jisme baseURL aur credentials set ho.
// 2 Interceptor add karo — har response ke baad error check kare.
// 3 401 (Unauthorized) handle karo — token expire ho to refresh-token API call karo.
// 4 Original request retry karo — naya token milne ke baad same request fir se bhejo.
// 5 Instance export karo — aur sab jagah normal axios ki jagah isi instance ko use karo.