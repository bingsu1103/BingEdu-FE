import axios from "@/configs/axios.config";

const createCourseAPI = async (data: object) => {
  const urlBackend = "/v1/api/course";
  return axios.post<IBackendRes<ICourses>>(urlBackend, data);
};

const updateCourseAPI = async (payload: object) => {
  const urlBackend = "/v1/api/course";
  return axios.put<IBackendRes<IUpdate>>(urlBackend, payload);
};

const getCourseAPI = async (id: string) => {
  const urlBackend = `/v1/api/course/id/${id}`;
  return axios.get<IBackendRes<ICourses>>(urlBackend);
};
const getAllCoursesAPI = async () => {
  const urlBackend = "/v1/api/course/multiple";
  return axios.get<IBackendRes<ICourses[]>>(urlBackend);
};

const deleteCoursesAPI = async (id: string) => {
  const urlBackend = `/v1/api/course/id/${id}`;
  return axios.delete<IBackendRes<IDelete>>(urlBackend);
};
export default {
  getAllCoursesAPI,
  getCourseAPI,
  deleteCoursesAPI,
  createCourseAPI,
  updateCourseAPI,
};
