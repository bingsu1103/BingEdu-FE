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
  return axios.put<IBackendRes<IUpdate>>(urlBackend, payload);
};

const getAllPaymentAPI = async () => {
  const urlBackend = "/v1/api/payment";
  return axios.get<IBackendRes<IPayment[]>>(urlBackend);
};

const getPaymentAPI = async (id: string) => {
  const urlBackend = `/v1/api/payment/id/${id}`;
  return axios.get<IBackendRes<IPayment>>(urlBackend);
};

const createVNPUrlAPI = async (amount: number, id: string) => {
  const payload = { amount, id };
  const urlBackend = "/v1/api/payment/vnpay/create";
  return axios.post<IBackendRes<string>>(urlBackend, payload);
};

const getPaymentByUserIdAPI = async (userId: string) => {
  const urlBackend = `/v1/api/payment/userId/${userId}`;
  return axios.get<IBackendRes<IPayment[]>>(urlBackend);
};

const getPaymentWithPaginateAPI = async (
  page: number,
  limit: number,
  search: string
) => {
  const urlBackend = `/v1/api/payment/paginate`;
  return axios.get<IBackendRes<IPaginate>>(urlBackend, {
    params: {
      page: page,
      limit: limit,
      search: search || "",
    },
  });
};
export default {
  createVNPUrlAPI,
  getPaymentAPI,
  updatePaymentAPI,
  getAllPaymentAPI,
  createPaymentAPI,
  getPaymentByUserIdAPI,
  getPaymentWithPaginateAPI,
};
