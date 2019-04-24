import axios from "axios";
import qs from "qs";
import { SERVER_BASE_URL } from "consts";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";

export const http = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 15000,
  headers: {},
  xsrfCookieName: "_csrf",
  withCredentials: true,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  }
});

export const noCredentials = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 15000,
  headers: {},
  xsrfCookieName: "_csrf",
  withCredentials: false,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  }
});

export default http;
