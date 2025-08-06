import axios from "@/configs/axios.config";

const createSubmissionAPI = async (
  userId: string,
  lessonId: string,
  score: number
) => {
  const data = { userId, lessonId, score };
  const urlBackend = "/v1/api/submission";
  return axios.post<IBackendRes<ISubmission>>(urlBackend, data);
};

const getSubmissionByUserIdAPI = async (userId: string) => {
  const urlBackend = `/v1/api/submission/user/${userId}`;
  return axios.get<IBackendRes<ISubmission[]>>(urlBackend);
};

const getAllSubmissionAPI = async () => {
  const urlBackend = "/v1/api/submission";
  return axios.get<IBackendRes<ISubmission[]>>(urlBackend);
};

export default {
  createSubmissionAPI,
  getSubmissionByUserIdAPI,
  getAllSubmissionAPI,
};
