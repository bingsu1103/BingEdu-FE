import axios from "@/configs/axios.config";
const getMarkFromAI = async (
  listQuestion: IQuestion[],
  answerToSubmit: IAnswerPost[]
) => {
  const prompt = { listQuestion, answerToSubmit };
  const urlBackend = "/v1/api/ai/mark";
  return axios.post<IBackendRes<IAnswer[]>>(urlBackend, prompt);
};
export default { getMarkFromAI };
