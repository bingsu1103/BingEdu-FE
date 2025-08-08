import axios from "@/configs/axios.config";
const getQuestionByLessonIdAPI = async (lessonId: string) => {
  const urlBackend = `/v1/api/question/lesson/${lessonId}`;
  return axios.get<IBackendRes<IQuestion[]>>(urlBackend);
};

const getQuestionByLessonIdWithAnswerAPI = async (lessonId: string) => {
  const urlBackend = `/v1/api/question/lesson/answer/${lessonId}`;
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
  return axios.post<IBackendRes<IQuestion[]>>(urlBackend, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateQuestionAPI = async (id: string, updateData: object) => {
  const data = { ...updateData, id };
  const urlBackend = "/v1/api/question";
  return axios.put<IBackendRes<IUpdate>>(urlBackend, data);
};

const deleteQuestionAPI = async (id: string) => {
  const urlBackend = `/v1/api/question/id/${id}`;
  return axios.delete<IBackendRes<IDelete>>(urlBackend);
};
export default {
  getQuestionByLessonIdAPI,
  createListQuestionAPI,
  updateQuestionAPI,
  deleteQuestionAPI,
  getQuestionByLessonIdWithAnswerAPI,
};
