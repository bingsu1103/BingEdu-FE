import axios from "../configs/axios.config";

const getUserAPI = async (id: string) => {
  const urlBackend = `/v1/api/user/id/${id}`;
  return axios.get<IBackendRes<IUser>>(urlBackend);
};
const getAllUser = async () => {
  const urlBackend = "/v1/api/user";
  return axios.get<IBackendRes<IUser[]>>(urlBackend);
};
const getUserWithPaginateAPI = async (
  page: number,
  limit: number,
  search: string
) => {
  const urlBackend = `/v1/api/user/paginate`;
  return axios.get<IBackendRes<IPaginate>>(urlBackend, {
    params: {
      page: page,
      limit: limit,
      search: search || "",
    },
  });
};
export default { getUserAPI, getAllUser, getUserWithPaginateAPI };
