import axios from "axios";
// var axiosApi=({code,phone})=>{
//     return axios({
//         method: 'post',
//         url: process.env.VUE_APP_ONLINEURL + '/sendsms',
//         data: {
//             code: code,
//             phone: phone
//         },
//         // 解决跨域
//         // ajax请求需要携带cookie 过去
//         withCredentials: true
//     })
// };
// export {
//     axiosApi
// }

// 封装 获取图形验证码 axios 请求
export function apiGetCode({ code, phone }) {
    return axios({
        method: "post",
        url: process.env.VUE_APP_URL + "/sendsms",
        data: {
            code: code,
            phone: phone
        },
        // 解决跨域
        // ajax请求需要携带cookie 过去
        withCredentials: true
    });
}

// 封装 注册 axios函数
export function apiRegister({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}) {
    return axios({
        method: "post",
        url: process.env.VUE_APP_URL + "/register",
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        }
    });
}
