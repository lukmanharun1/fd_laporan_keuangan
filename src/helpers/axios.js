import axios from "helpers/axios";

import { REACT_APP_HOST } from "config";

const instances = axios.create({
  baseURL: `${REACT_APP_HOST}`,
});

// Add a request interceptor
const token = localStorage.getItem("token");
if (token) {
  instances.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // =================
      config.headers = {
        Authorization: localStorage.getItem("token"),
      };
      // =================
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
}

export default instances;
