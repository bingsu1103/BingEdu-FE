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

const deleteOrderAPI = async (id: string) => {
  const urlBackend = `/v1/api/order/id/${id}`;
  return axios.delete(urlBackend);
};

const getAllOrderAPI = async () => {
  const urlBackend = "/v1/api/order";
  return axios.get(urlBackend);
};

export default { createOrderAPI, deleteOrderAPI, getAllOrderAPI };
