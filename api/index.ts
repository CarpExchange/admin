import { API_URL } from "../env";
import axios from "axios";

const getToken = async () => {
  const kriptUser = await localStorage.getItem("user_info");
  // console.log(kriptUser, "kriptUser");
  if (kriptUser) {
    return JSON.parse(kriptUser).access_token;
  } else {
    return "";
  }
};

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${await getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authApi;

const authFileUpload = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

authFileUpload.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${await getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { authFileUpload };
