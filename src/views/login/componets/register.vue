<template>
    <div>
        <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="昵称" prop="nickname" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图形码" prop="captchaCode" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="17">
                            <el-input v-model="form.captchaCode" autocomplete="off"></el-input>
                        </el-col>
                        <el-col :span="7" class="imgBox">
                            <img src="../../../assets/login_captcha.png" class="captchaCode" alt="">
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="17">
                            <el-input v-model="form.code" autocomplete="off"></el-input>
                        </el-col>
                        <el-col :span="7" class="imgBox">
                            <button class="btnCode">获取验证码</button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="btnCancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    nickname: '',
                    email: '',
                    phone: '',
                    passsword: '',
                    captchaCode: '',
                    code: '',
                },
                rules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                    ],
                    passsword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    captchaCode: [
                        { required: true, message: '请输入图形码', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
                dialogFormVisible: false,
                formLabelWidth: '67px',
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$messages({
                            message: '验证成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error('验证失败')
                    }
                })
            },
            // 取消按钮
            btnCancel() {
                this.dialogFormVisible = false
                // 重置表单数据 并移除 验证提示
                this.$refs.form.resetFields()
            }
        },
    }
</script>
<style lang="less">
    // 权重不够,再最外层 拿一个类过来 增加权重
    .el-dialog {
        /* 控制头部 */
        .el-dialog__header {
            text-align: center;
            padding: 0;
            height: 53px;
            line-height: 53px;
            background: linear-gradient(to right, #01c5fb, #1396fd);
            .el-dialog__title {
                color: #fff;
            }
        }
        // 底部按钮
        .dialog-footer {
            text-align: center;
        }

        .imgBox {
            text-align: right;
            .captchaCode {
                height: 40px;
            }
            .btnCode {
                width: 156px;
                height: 40px;
            }
        }
    }
</style>