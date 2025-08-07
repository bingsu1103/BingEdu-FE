import axios from "@/configs/axios.config";

const uploadImage = async (file: File) => {
  const urlBackend = "/v1/api/upload/upload-img";
  const formData = new FormData();
  formData.append("image", file);
  return axios.post(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const uploadAvatar = async (file: File) => {
  const urlBackend = "/v1/api/upload/upload-avatar";
  const formData = new FormData();
  formData.append("image", file);
  return axios.post(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const uploadAudio = async (file: File) => {
  const urlBackend = "/v1/api/upload/upload-audio";
  const formData = new FormData();
  formData.append("audio", file);
  return axios.post(urlBackend, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export default { uploadAvatar, uploadAudio, uploadImage };
