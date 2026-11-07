import { BASE_API_URL } from "../env";
import axios from "axios";
// import { IDEMPOTENCY_HEADER, createIdempotencyKey } from "@/lib/idempotency";

const WALLET_WRITE_PATTERNS = [
  /\/admin\/[^/]+\/exchange-rate(\?|$)/i,
  /\/admin\/[^/]+\/processing-fee(\?|$)/i,
  /\/admin\/[^/]+\/airtime-rate(\?|$)/i,
];

const shouldAttachIdempotencyKey = (url?: string, method?: string) => {
  if (!url) return false;

  const normalizedMethod = (method || "GET").toUpperCase();
  if (normalizedMethod !== "POST" && normalizedMethod !== "PUT") {
    return false;
  }

  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  return WALLET_WRITE_PATTERNS.some((pattern) => pattern.test(normalizedUrl));
};

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
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${await getToken()}`;
    }

    // if (
    //   shouldAttachIdempotencyKey(config.url, config.method) &&
    //   !config.headers[IDEMPOTENCY_HEADER]
    // ) {
    //   config.headers[IDEMPOTENCY_HEADER] = createIdempotencyKey();
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authApi;

const authFileUpload = axios.create({
  baseURL: BASE_API_URL,
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
