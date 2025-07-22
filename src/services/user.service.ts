import axios from "../configs/axios.config";

const fetchAccountAPI = async () => {
  const urlBackend = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend, {
    headers: {
      delay: 1000,
    },
  });
};

const getUserAPI = async (id: string) => {
  const urlBackend = `/api/v1/user/id/${id}`;
  return axios.get<IBackendRes<IUser>>(urlBackend);
};
export default { fetchAccountAPI, getUserAPI };
