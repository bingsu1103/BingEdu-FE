import axios from "@/configs/axios.config";

const createPaymentAPI = async (
  userId: string,
  courseId: string,
  method: string
) => {
  const payload = { userId, courseId, method };
  const urlBackend = "/v1/api/payment";
  return axios.post<IBackendRes<IPayment>>(urlBackend, payload);
};

const updatePaymentAPI = async (id: string, data: object) => {
  const urlBackend = "/v1/api/payment";
  const payload = { id, ...data };
  return axios.put(urlBackend, payload);
};

const getAllPaymentAPI = async () => {
  const urlBackend = "/v1/api/payment";
  return axios.get(urlBackend);
};

const getPaymentAPI = async (id: string) => {
  const urlBackend = `/v1/api/payment/id/${id}`;
  return axios.get(urlBackend);
};

const createVNPUrlAPI = async (amount: number, id: string) => {
  const payload = { amount, id };
  const urlBackend = "/v1/api/payment/vnpay/create";
  return axios.post<IBackendRes<string>>(urlBackend, payload);
};

export default {
  createVNPUrlAPI,
  getPaymentAPI,
  updatePaymentAPI,
  getAllPaymentAPI,
  createPaymentAPI,
};
