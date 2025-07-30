import axios from "@/configs/axios.config";
const getQuestionByLessonIdAPI = async (lessonId: string) => {
  const urlBackend = `/v1/api/question/lesson/${lessonId}`;
  return axios.get(urlBackend);
};
export default { getQuestionByLessonIdAPI };
