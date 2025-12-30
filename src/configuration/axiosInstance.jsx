import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: localStorage.getItem("refresh"),
          }
        );

        localStorage.setItem("access", res.data.access);
        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
