import axios from "@/configs/axios.config";
const createMultipleAnswerAPI = async (listAnswers: IAnswer[]) => {
  const urlBackend = "/v1/api/answer/multiple";
  return axios.post(urlBackend, listAnswers);
};
export default { createMultipleAnswerAPI };
