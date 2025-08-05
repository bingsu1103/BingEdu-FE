import axios from "@/configs/axios.config";
const createMultipleAnswerAPI = async (listAnswers: IAnswerPost[]) => {
  const urlBackend = "/v1/api/answer/multiple";
  return axios.post<IBackendRes<IAnswer[]>>(urlBackend, listAnswers);
};
const getAnswerByLessonIdAPI = async (id: string, userId: string) => {
  const urlBackend = `/v1/api/answer/lesson/${id}/user/${userId}`;
  return axios.get<IBackendRes<IAnswer[]>>(urlBackend);
};
export default { createMultipleAnswerAPI, getAnswerByLessonIdAPI };
