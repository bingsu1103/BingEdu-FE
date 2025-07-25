import axios from "../configs/axios.config";

const getUserAPI = async (id: string) => {
  const urlBackend = `/v1/api/user/id/${id}`;
  return axios.get<IBackendRes<IUser>>(urlBackend);
};
export default { getUserAPI };
