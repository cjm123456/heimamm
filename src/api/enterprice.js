import instance from "../utils/myhttp";

// 企业列表
export function apiGetList({ name, page, limit, eid, username, status }) {
    return instance({
        url: "/enterprise/list",
        params: {
            name,
            page,
            limit,
            eid,
            username,
            status
        }
    });
}

// 企业添加
export function apiAddEnt({ eid, name, short_name, intro, remark }) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data: {
            eid,
            name,
            short_name,
            intro,
            remark
        }
    });
}

// 企业状态设置
export function apiStatus(id) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data: {
            id
        }
    });
}

// 企业删除
export function apiDelEnt(id) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data: {
            id
        }
    });
}

// 企业编辑
export function apiEditEnt({ id, name, tag, short_name, intro, remark }) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data: {
            id,
            name,
            tag,
            short_name,
            intro,
            remark
        }
    });
}
