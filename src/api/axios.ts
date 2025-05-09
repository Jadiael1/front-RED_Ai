import axios from "axios";
import { setupInterceptors } from "../utils/interceptors.ts";

const api = axios.create({
  baseURL: "https://api-redai.juvhost.com/api/v1",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json; charset=utf-8",
  },
  timeout: 10000,
});

setupInterceptors(api);

export default api;
