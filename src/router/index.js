import VueRouter from "vue-router";
import Vue from "vue";
import login from "../views/login/index";
import index from "../views/index/index";
import chart from "../views/chart/index.vue";
import user from "../views/user/index.vue";
import question from "../views/question/index.vue";
import enterprice from "../views/enterprice/index.vue";
import subject from "../views/subject/index.vue";

// 导入nprogress
import NProgress from "nprogress/nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        // 路由重定向
        {
            path: "/",
            redirect: "/login"
        },
        // 登录页面
        {
            path: "/login",
            component: login
        },
        // 首页
        {
            path: "/index",
            component: index,
            children: [
                {
                    path: "chart",
                    component: chart,
                    meta: { title: "数据概览" }
                },
                { path: "user", component: user, meta: { title: "用户列表" } },
                {
                    path: "question",
                    component: question,
                    meta: { title: "题库列表" }
                },
                {
                    path: "enterprice",
                    component: enterprice,
                    meta: { title: "企业列表" }
                },
                {
                    path: "subject",
                    component: subject,
                    meta: { title: "学科列表" }
                }
            ]
        }
    ]
});

import { getToken } from "../utils/mytoken.js";
import { apiGetInfo } from "../api/index.js";
// js文件中使用elementUi的message
import { Message } from "element-ui";
// 默认导入 store
import store from "../store/index";

// 前置导航守卫
router.beforeEach((to, from, next) => {
    // 设置网页标题
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    // next 要求一定是第三个参数, 所以这里 的 to from 不能删除
    // window.console.log(to);
    // window.console.log(from);
    NProgress.start();
    // 判断是否是登录页面
    if (to.path == "/login") {
        next();
    } else {
        // 判断token 是否存在
        if (!getToken()) {
            // 打回登录页面之前要先关闭进度条
            NProgress.done();
            // 提示用户
            Message.error("你还没有登录");
            // 打回登录页面
            next("/login");
        } else {
            // 判断token的真假
            apiGetInfo().then(res => {
                // 登录成功
                if (res.data.code == 200) {
                    // window.console.log(res);
                    // 把用户信息保存到 vuex的 仓库中
                    store.commit("setUserInfo", {
                        username: res.data.data.username,
                        avatar:
                            process.env.VUE_APP_URL + "/" + res.data.data.avatar
                    });
                    // window.console.log(store.state.username);
                    next();
                } else if (res.data.code == 206) {
                    // 跳转页面 注意一定要关闭进度条, 不然会出现多个进度条, 会出错
                    NProgress.done();
                    Message.error("你还没有登录");
                    // token错误,打回登录页面
                    next("/login");
                }
            });
        }
    }
});

// 后置钩子
router.afterEach(() => {
    // 定义变量 未使用会报错, 所以这里 把  to from 删除掉
    // window.console.log(to);
    // window.console.log(from);
    NProgress.done();
});

export default router;
