import axios from "@/configs/axios.config";

const createOrderAPI = async (
  userId: string,
  courseId: string,
  total: number
) => {
  const payload = { userId, courseId, total };
  const urlBackend = "/v1/api/order";
  return axios.post<IBackendRes<IOrder>>(urlBackend, payload);
};

const getOrderAPI = async (id: string) => {
  const urlBackend = `/v1/api/order/id/${id}`;
  return axios.get<IBackendRes<IOrder>>(urlBackend);
};

const deleteOrderAPI = async (id: string) => {
  const urlBackend = `/v1/api/order/id/${id}`;
  return axios.delete<IBackendRes<IDelete>>(urlBackend);
};

const getAllOrderAPI = async () => {
  const urlBackend = "/v1/api/order";
  return axios.get<IBackendRes<IOrder>>(urlBackend);
};

const getOrderByUserIdAPI = async (userId: string) => {
  const urlBackend = `/v1/api/order/userId/${userId}`;
  return axios.get<IBackendRes<IOrder[]>>(urlBackend);
};

export default {
  createOrderAPI,
  deleteOrderAPI,
  getAllOrderAPI,
  getOrderAPI,
  getOrderByUserIdAPI,
};
