import axios from "@/configs/axios.config";

const getAllCoursesAPI = async () => {
  const urlBackend = "/v1/api/course/multiple";
  return axios.get(urlBackend);
};
export default { getAllCoursesAPI };
