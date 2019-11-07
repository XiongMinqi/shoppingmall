import axios from "axios";

const server = axios.create({
  baseURL: "/api",
  timeout: 20000 //超时
});

// http response  拦截器
server.interceptors.response.use(response => {
  return response.data;
});

export default server;
