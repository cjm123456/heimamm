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
                <el-form-item>
                    <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="captchaCode">
                    <el-row>
                        <el-col :span="16">
                            <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captchaCode">
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <img class="captcha" src="../../assets/login_captcha.png" alt="">
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="isCheck" class="checkboxText">
                    <el-checkbox v-model="form.isCheck">
                        我已阅读并同意
                        <el-link type="primary">用户协议</el-link>
                        和
                        <el-link type="primary">隐私条款</el-link>
                    </el-checkbox>
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
    import register from './componets/register'
    export default {
        data() {
            return {
                form: {
                    phone: "",
                    password: "",
                    captchaCode: "",
                    isCheck: []
                },
                rules: {
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
                    captchaCode: [
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
                }
            };
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(valid => {
                    // window.console.log(valid);
                    if (valid) {
                        // alert('验证成功')
                        this.$message({
                            message: '验证成功',
                            type: 'success'
                        })
                    } else {
                        // alert('验证失败')
                        this.$message.error('验证失败')
                    }
                })
            },
            toRegister() {
                this.$refs.register.dialogFormVisible = true;
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