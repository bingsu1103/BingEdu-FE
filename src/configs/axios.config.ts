import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const handleRefreshToken = async () => {
  const res = await instance.post("/v1/api/auth/refresh_token");
  if (res && res.data) {
    return res.data.access_token;
  } else return null;
};

instance.interceptors.request.use(
  function (config: any) {
    const token = localStorage.getItem("access_token");
    const auth = token ? `Bearer ${token}` : "";
    config.headers["Authorization"] = auth;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: any) {
    if (response && response.data) return response.data;
    return response;
  },
  async function (error: any) {
    if (error.config && error.response && +error.response.status === 401) {
      const access_token = await handleRefreshToken();
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return instance.request(error.config);
      }
    }
    if (error && error.response && error.response.data)
      return error.response.data;
    return Promise.reject(error);
  }
);

export default instance;
