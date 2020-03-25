<template>
    <div class="box">
        <el-container>
            <el-header>
                <div class="left">
                    <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
                    <img src="@/assets/index_logo.png" alt="">
                    <span>黑马面面</span>
                </div>
                <div class="right">
                    <!-- 注意 要绑定属性 才可以使用 data的变量,不然就是一个字符串 -->
                    <img :src="$store.state.avatar" alt="">
                    <span class="username">{{$store.state.username}}</span>
                    <el-button type="primary" size="mini" @click="logout">退出</el-button>
                </div>
            </el-header>
            <el-container>
                <!-- width 改在 auto 宽度由内容撑开 -->
                <!-- 如果不这样设置,它的宽度就会太宽了,应该是受到其它样式影响 -->
                <el-aside width="auto">
                    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
                        <el-menu-item index="/index/chart">
                            <i class="el-icon-pie-chart"></i>
                            <span slot="title">数据概览</span>
                        </el-menu-item>
                        <el-menu-item index="/index/user">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户列表</span>
                        </el-menu-item>
                        <el-menu-item index="/index/question">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">题库列表</span>
                        </el-menu-item>
                        <el-menu-item index="/index/enterprice">
                            <i class="el-icon-office-building"></i>
                            <span slot="title">企业列表</span>
                        </el-menu-item>
                        <el-menu-item index="/index/subject">
                            <i class="el-icon-notebook-2"></i>
                            <span slot="title">学科列表</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    // 导入接口文件
    // 按需导入
    import { apiLogout } from '@/api/index'
    import { removeToken } from '@/utils/mytoken'
    export default {
        data() {
            return {
                // 用户信息
                userInfo: '',
                // 用户头像
                imgUrl: '',
                // 侧边栏是否折叠
                isCollapse: false
            }
        },
        methods: {
            logout() {
                // 弹出弹框
                this.$confirm('是否退出', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 退出发送ajax请求
                    apiLogout().then(res => {
                        window.console.log(res);
                        if (res.data.code == 200) {
                            this.$message.success('退出成功')
                            // 删除token 值
                            removeToken()
                            // 跳转到登录页面
                            this.$router.push('/login')
                        }
                    })
                }).catch(() => {
                    this.$message.info('取消退出')
                })
            }
        },
        // created() {
        //     // 判断token 是否存在
        //     if (!getToken()) {
        //         // 提示信息
        //         this.$message.error('你还没有登录,请登录')
        //         // 跳转到登录页面
        //         this.$router.push('/login')
        //         // 终止函数执行
        //         return
        //     }
        //     // 发送axios请求, 获取用户数据
        //     apiGetInfo().then(res => {
        //         // window.console.log(res);
        //         if(res.data.code==200){
        //             // 状态码为200 登录成功
        //             // 获取用户信息
        //             this.userInfo = res.data.data
        //             this.imgUrl = process.env.VUE_APP_URL + '/' + this.userInfo.avatar
        //         }else if(res.data.code==206){
        //             // token 真假判断   
        //             // 没有登录,有可能会伪造一个token,所以这里要进行 token真假判断
        //             this.$message.error('token错误')
        //             // 跳转回登录页面
        //             this.$router.push('/login')
        //         }
        //     }).catch(err => {
        //         window.console.log(err);
        //     })
        // },
    }
</script>
<style lang="less">
    .box {
        height: 100%;
    }
    // 要想实现侧边导航栏折叠效果 下面这个样式 不能少
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-header {
        background-color: #fff;
        color: #333;
        line-height: 60px;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            i {
                font-size: 24px;
            }
            img {
                width: 33px;
                height: 28px;
                margin-left: 22px;
                margin-right: 11px;
            }
            span {
                font: 22px;
                color: #49a1ff;
            }
        }

        .right {
            display: flex;
            align-items: center;

            img {
                width: 43px;
                border-radius: 22px;
            }
            .username {
                font-size: 14px;
                margin-left: 9px;
                margin-right: 38px;
            }
        }
    }

    .el-aside {
        background-color: #fff;
        color: #333;
    }

    .el-main {
        background-color: #e8e9ec;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    /* 让下面的侧边栏 和 主体部分 占据 屏幕高度的100% */
    section.el-container {
        height: 100%;
    }
</style>