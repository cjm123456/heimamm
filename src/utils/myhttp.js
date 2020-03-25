import axios from "axios";

import { getToken } from "./mytoken";

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
});

// 请求拦截器
instance.interceptors.request.use(
    function(config) {
        config.headers.token = getToken();
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);

export default instance