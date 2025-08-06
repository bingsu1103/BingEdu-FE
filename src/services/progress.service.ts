import axios from "@/configs/axios.config";
const createLessonProgressAPI = async (userId: string, lessonId: string) => {
  const data = { userId, lessonId };
  const urlBackend = "/v1/api/progress/lessons";
  return axios.post(urlBackend, data);
};

const getLessonProgressAPI = async (userId: string, lessonId: string) => {
  const urlBackend = `/v1/api/progress/lessons/userId/${userId}/lessonId/${lessonId}`;
  return axios.get(urlBackend);
};

const createCourseProgressAPI = async (
  userId: string,
  lessonId: string,
  coursesId: string
) => {
  const data = { userId, lessonId, coursesId };
  const urlBackend = "/v1/api/progress/courses";
  return axios.post<IBackendRes<IProgressCourses>>(urlBackend, data);
};

const updateCourseProgressAPI = async (
  userId: string,
  lessonId: string,
  coursesId: string
) => {
  const data = { userId, lessonId, coursesId };
  const urlBackend = "/v1/api/progress/courses";
  return axios.put<IBackendRes<IUpdate>>(urlBackend, data);
};

const getCourseProgressAPI = async (userId: string, coursesId: string) => {
  const urlBackend = `/v1/api/progress/courses/userId/${userId}/coursesId/${coursesId}`;
  return axios.get<IBackendRes<IProgressCourses>>(urlBackend);
};

const getCourseProgressByUserAPI = async (userId: string) => {
  const urlBackend = `/v1/api/progress/courses/userId/${userId}`;
  return axios.get<IBackendRes<IProgressCourses[]>>(urlBackend);
};
export default {
  createLessonProgressAPI,
  getLessonProgressAPI,
  createCourseProgressAPI,
  updateCourseProgressAPI,
  getCourseProgressAPI,
  getCourseProgressByUserAPI,
};
