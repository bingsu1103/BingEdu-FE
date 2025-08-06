import axios from "@/configs/axios.config";

const createLessonAPI = async (data: object) => {
  const urlBackend = "/v1/api/lesson";
  return axios.post<IBackendRes<ILesson>>(urlBackend, data);
};

const deleteLessonAPI = async (id: string) => {
  const urlBackend = `/v1/api/lesson/id/${id}`;
  return axios.delete<IBackendRes<IDelete>>(urlBackend);
};

const getLessonByCourseIdAPI = async (id: string) => {
  const urlBackend = `/v1/api/lesson/course/${id}`;
  return axios.get<IBackendRes<ILesson[]>>(urlBackend);
};

const getAllLessonAPI = async () => {
  const urlBackend = "/v1/api/lesson/multiple";
  return axios.get<IBackendRes<ILesson[]>>(urlBackend);
};
export default {
  createLessonAPI,
  deleteLessonAPI,
  getLessonByCourseIdAPI,
  getAllLessonAPI,
};
