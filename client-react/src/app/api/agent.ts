import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";

console.log(window.location);
axios.defaults.baseURL = "http://10.0.0.79:8081/api/";

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 401 &&
    headers["www-authenticate"] ===
      'Bearer error="invalid_token", error_description="The token is expired"'
  ) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired, please login again");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" }
      })
      .then(responseBody);
  }
};

const User = {
  current: (): Promise<IUser> => requests.get("/users/current"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/register`, user)
};

export default {
  User
};
