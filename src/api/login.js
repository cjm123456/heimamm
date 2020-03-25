import axios from "axios";
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL
});
export function apiLogin({ phone, password, code }) {
    return instance({
        url: "/login",
        method: "post",
        data: {
            phone,
            password,
            code
        },
        withCredentials:true
    });
}
