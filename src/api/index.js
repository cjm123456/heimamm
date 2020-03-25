import axios from "axios";
// 按需导入
import { getToken } from "../utils/mytoken";
// 创建axios实例化对象
// 配置基地址以及请求头 
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // cookie 跨域
    withCredentials:true
});
// 获取用户信息
export function apiGetInfo() {
    // window.console.log(getToken());
    return instance({
        url: "/info",
        headers: {
            token: getToken()
        }
    });
}
// 退出登录
export function apiLogout(){
    return instance({
        url:'/logout',
        headers: {
            token: getToken()
        }
    })
}
