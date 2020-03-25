<template>
    <div class="login">
        <!-- 左边登录框 -->
        <div class="leftbox">
            <div class="title">
                <img src="../../assets/login_logo.png" class="titleLogo" alt="">
                <span class="titleName">黑马面面</span>
                <span class="titleLine"></span>
                <span class="titleLogin">用户登录</span>
            </div>
            <el-form class="elForm" ref="form" :rules="rules" :model="form" label-width="0px">
                <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row>
                        <el-col :span="16">
                            <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.code">
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <img class="captcha" :src="imgUrl" @click="imgClick" alt="">
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="isCheck" class="checkboxText">
                    <el-checkbox-group v-model="form.isCheck">
                        <!-- isCheck 里面写什么, label 对应写什么,就会选择指定的多选框 -->
                        <el-checkbox label="yes">
                            我已阅读并同意
                            <el-link type="primary">用户协议</el-link>
                            和
                            <el-link type="primary">隐私条款</el-link>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button class="btnWitgh" type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="btnWitgh" type="primary" @click="toRegister">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 右边图片 -->
        <img src="../../assets/login_banner_ele.png" class="rightimg" alt="">
        <!-- 注册框 -->
        <register ref="register"></register>
    </div>
</template>
<script>
    // 导入组件
    import register from './componets/register'
    // @ 表示 src 这个根目录
    // 导入验证规则
    import { checkPhone } from '@/utils/myCheck'
    // 导入api方法
    import { apiLogin } from '@/api/login'
    // 导入token 方法
    import { setToken } from '@/utils/mytoken'
    export default {
        data() {
            return {
                form: {
                    // 为了避免频繁输入, 这里先把超级管理员账号写死了
                    phone: "18511111111",
                    password: "12345678",
                    code: "",
                    isCheck: ['yes']
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    password: [
                        {
                            required: true,
                            message: "请输入密码",
                            trigger: "blur"
                        },
                        {
                            min: 5,
                            max: 10,
                            message: "长度在 5 到 10 个字符",
                            trigger: "blur"
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: "请输入验证码",
                            trigger: "blur"
                        },
                        {
                            min: 4,
                            max: 4,
                            message: "长度在4个字符",
                            trigger: "blur"
                        },
                    ],
                    isCheck: [
                        { type: 'array', required: true, message: '请同意协议', trigger: 'change' }
                    ],
                },
                // 验证码路径
                imgUrl: process.env.VUE_APP_URL + '/captcha?type=login&t=' + Date.now()
            };
        },
        methods: {
            // 点击登录按钮
            onSubmit() {
                this.$refs.form.validate(valid => {
                    // window.console.log(valid);
                    if (valid) {
                        // alert('验证成功')
                        apiLogin({
                            phone: this.form.phone,
                            password: this.form.password,
                            code: this.form.code
                        }).then(res => {
                            // window.console.log(res);
                            if (res.data.code == 200) {
                                this.$message.success('登录成功')
                                // 把返回的token保存到本地存储里面
                                // localStorage.setItem('heimamm',res.data.data.token)
                                window.console.log(res.data.data.token);
                                setToken(res.data.data.token)
                                // 跳转到首页
                                this.$router.push('/index')
                            } else {
                                this.$message.error(res.data.message)
                            }
                        })
                    } else {
                        // alert('验证失败')
                        this.$message.error('验证失败')
                    }
                })
            },
            // 点击注册按钮
            toRegister() {
                this.$refs.register.dialogFormVisible = true;
            },
            // 点击图片刷新验证码
            imgClick() {
                // alert(11)
                // 注意要带时间戳
                this.imgUrl = process.env.VUE_APP_URL + '/captcha?type=login&t=' + Date.now()
            }
        },
        components: {
            register
        }
    };
</script>
<style lang="less">
    .login {
        height: 100%;
        background: linear-gradient(
            225deg,
            rgba(1, 198, 250, 1),
            rgba(20, 147, 250, 1)
        );
        display: flex;
        // space-around 左右两边的间距相等
        justify-content: space-around;
        align-items: center;

        .leftbox {
            width: 478px;
            height: 550px;
            background: rgba(245, 245, 245, 1);
            padding: 48px 42px 86px;
            // 内减模型
            box-sizing: border-box;

            .title {
                display: flex;
                align-items: center;

                .titleName {
                    font-size: 24px;
                    font-family: SourceHanSansCN;
                    font-weight: 400;
                    color: rgba(12, 12, 12, 1);
                    margin-left: 16px;
                }

                .titleLine {
                    width: 1px;
                    height: 28px;
                    background: rgba(199, 199, 199, 1);
                    margin: 0 14px;
                }

                .titleLogin {
                    font-size: 22px;
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: rgba(12, 12, 12, 1);
                }
            }

            .elForm {
                margin-top: 29px;
                // 按钮的宽度
                .btnWitgh {
                    width: 100%;
                }
                // 协议的行高
                .el-form-item__content {
                    line-height: 0;
                }
                .el-checkbox__label {
                    height: 20px;
                    line-height: 20px;
                    color: #666;
                }
                // 设置验证码图片
                .captcha {
                    width: 100%;
                    height: 40px;
                }

                .checkboxText {
                    vertical-align: middle;
                }
            }
        }

        .rightimg {
            width: 633px;
            height: 435px;
        }
    }
</style>