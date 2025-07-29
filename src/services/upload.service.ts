import axios from "@/configs/axios.config";

const uploadFile = async (file: File) => {
  const urlBackend = "/v1/api/upload/upload-img";
  const formData = new FormData();
  formData.append("image", file);
  return axios.post(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export default uploadFile;
