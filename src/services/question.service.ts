import axios from "@/configs/axios.config";
const getQuestionByLessonIdAPI = async (lessonId: string) => {
  const urlBackend = `/v1/api/question/lesson/${lessonId}`;
  return axios.get(urlBackend);
};
const createListQuestionAPI = async (file: File) => {
  const urlBackend = "/v1/api/question/multiple";
  const text = await file.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("File is not valid JSON");
  }
  return axios.post(urlBackend, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export default { getQuestionByLessonIdAPI, createListQuestionAPI };
