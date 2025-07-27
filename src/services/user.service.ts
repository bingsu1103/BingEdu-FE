import axios from "../configs/axios.config";

const createUserAPI = async (data: object) => {
  const urlBackend = "/v1/api/user";
  return axios.post<IBackendRes<IUser>>(urlBackend, data);
};

const updateUserAPI = async (data: object) => {
  const urlBackend = "/v1/api/user";
  return axios.put<IBackendRes<IUpdate>>(urlBackend, data);
};

const getUserAPI = async (id: string) => {
  const urlBackend = `/v1/api/user/id/${id}`;
  return axios.get<IBackendRes<IUser>>(urlBackend);
};

const getAllUser = async () => {
  const urlBackend = "/v1/api/user";
  return axios.get<IBackendRes<IUser[]>>(urlBackend);
};

const deleteUserAPI = async (id: string) => {
  const urlBackend = `/v1/api/user/id/${id}`;
  return axios.delete<IBackendRes<IUpdate>>(urlBackend);
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
export default {
  getUserAPI,
  getAllUser,
  getUserWithPaginateAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
};
