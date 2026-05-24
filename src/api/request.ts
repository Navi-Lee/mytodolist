import axios from "axios";
const sendAndGet = axios.create({
  baseURL: "./api",
  timeout: 4000,
});

sendAndGet.interceptors.request.use((x) => {
  console.log("这是一个axios请求,可惜没有后端，所以说会返回一个404错误", x);
  return x;
});
sendAndGet.interceptors.response.use((x) => {
  return x.data;
});

export default sendAndGet;
