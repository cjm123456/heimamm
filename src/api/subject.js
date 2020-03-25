import axios from "axios";

import { getToken } from "../utils/mytoken";

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

// 学科列表
export function apiSubjectlist({ name, page, limit, rid, username, status }) {
    return instance({
        url: "/subject/list",
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    });
}

// 学科状态设置
export function apiStatus(id) {
    return instance({
        url: "/subject/status",
        method: "post",
        data: {
            id
        }
    });
}

// 新增学科
export function apiAddSubject({ rid, name, short_name, intro, remark }) {
    return instance({
        url: "/subject/add",
        method: "post",
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    });
}

// 编辑学科
export function apiEditSubject({ id,rid, name, short_name, intro, remark }) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data: {
            id,
            rid,
            name,
            short_name,
            intro,
            remark
        }
    });
}

// 删除学科
export function apiDelSubject(id){
    return instance({
        url:'/subject/remove',
        method:'post',
        data:{
            id
        }
    })
}
