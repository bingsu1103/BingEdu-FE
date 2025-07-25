import axios from "../configs/axios.config";

const fetchAccountAPI = async () => {
  const urlBackend = "/v1/api/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend, {
    headers: {
      delay: 1000,
    },
  });
};

const signupAPI = async (
  email: string,
  password: string,
  phone: string,
  username: string
) => {
  const urlBackend = "/v1/api/auth/register";
  const data = { email, password, phone, name: username };
  return axios.post(urlBackend, data);
};

const loginAPI = async (email: string, password: string) => {
  const urlBackend = "/v1/api/auth/login";
  return axios.post<IBackendRes<ILogin>>(urlBackend, { email, password });
};

const logoutAPI = async () => {
  const urlBackend = "/v1/api/auth/logout";
  return axios.post<IBackendRes<ILogout>>(urlBackend);
};

const forgotPasswordAPI = async (email: string) => {
  const urlBackend = "/v1/api/auth/forgot_password";
  return axios.post<IBackendRes<null>>(urlBackend, { email });
};

const verifyOtpAPI = async (email: string, otp: string) => {
  const urlBackend = "/v1/api/auth/verifyOTP";
  return axios.post<IBackendRes<IVerifyOtp>>(urlBackend, { email, otp });
};

const resetPasswordAPI = async (
  email: string,
  newPassword: string,
  verify_token: string
) => {
  const urlBackend = "/v1/api/auth/reset_password";
  return axios.post<IBackendRes<null>>(urlBackend, {
    email,
    newPassword,
    verify_token,
  });
};

const checkPermissionAPI = async (verify_token: string) => {
  const urlBackend = "/v1/api/auth/check_permission";
  return axios.post<IBackendRes<null>>(urlBackend, { verify_token });
};
export default {
  fetchAccountAPI,
  loginAPI,
  logoutAPI,
  signupAPI,
  forgotPasswordAPI,
  verifyOtpAPI,
  resetPasswordAPI,
  checkPermissionAPI,
};
