import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosClient;
