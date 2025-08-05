import axios from "@/configs/axios.config";

const createReviewAPI = async (
  userID: string,
  userName: string,
  courseID: string,
  comment: string,
  rating: number
) => {
  const data = { userID, userName, courseID, comment, rating };
  const urlBackend = "/v1/api/review";
  return axios.post<IBackendRes<IReview>>(urlBackend, data);
};

const getReviewAPI = async (id: string) => {
  const urlBackend = `/v1/api/review/course/${id}`;
  return axios.get<IBackendRes<IReview[]>>(urlBackend);
};

const deleteReviewAPI = async (id: string) => {
  const urlBackend = `/v1/api/review/${id}`;
  return axios.delete<IBackendRes<IDelete>>(urlBackend);
};

const getAllReviewAPI = async () => {
  const urlBackend = "/v1/api/review";
  return axios.get<IBackendRes<IReview>>(urlBackend);
};
export default {
  createReviewAPI,
  getReviewAPI,
  deleteReviewAPI,
  getAllReviewAPI,
};
