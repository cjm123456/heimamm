<template>
    <div>
        <!-- :close-on-click-modal="false" 注意 要绑定后属性值才是布尔值,否则是字符串值 -->
        <el-dialog title="用户注册" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" name="image" :action="imgUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
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
                <el-form-item label="图形码" prop="code" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="17">
                            <el-input v-model="form.code" autocomplete="off"></el-input>
                        </el-col>
                        <el-col :span="7" class="imgBox">
                            <img :src="imgUrl" @click="imgClick" class="captchaCode" alt="">
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="验证码" prop="logincode" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="17">
                            <el-input v-model="form.logincode" autocomplete="off"></el-input>
                        </el-col>
                        <el-col :span="7" class="imgBox">
                            <!-- disabled  禁用表单按钮 -->
                            <!-- 要想使用数据 先要绑定一下 -->
                            <el-button class="btnCode" :disabled="time!=0" @click="getCode">
                                {{time==0?'获取验证码':time+'s后重新获取'}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="btnCancel">取 消</el-button>
                <el-button type="primary" @click.prevent="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    // 从export 导出 引入时 要解构一下
    import { apiGetCode, apiRegister } from '../../../api/register'
    // 导入验证规则
    import { checkEmail, checkPhone } from '@/utils/myCheck'
    export default {
        data() {
            // 自定义规则要在这里定义或者在外面全局定义
            // // 验证邮箱
            // var checkEmail = function (rule, value, callback) {
            //     var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            //     if (reg.test(value)) {
            //         callback()
            //     } else {
            //         callback(new Error('邮箱不合法'))
            //     }
            // }
            // // 验证手机号
            // var checkPhone = function (rule, value, callback) {
            //     var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            //     if (reg.test(value)) {
            //         callback()
            //     } else {
            //         callback(new Error('手机号不合法'))
            //     }
            // }
            return {
                form: {
                    nickname: '',
                    email: '',
                    phone: '',
                    password: '',
                    code: '',
                    logincode: '',
                    avatar: null
                },
                // 验证规则
                rules: {
                    avatar: [
                        { required: true, message: '请上传头像', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        // 自定义规则
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入图形码', trigger: 'blur' },
                        { min: 4, max: 4, message: '长度在4个字符', trigger: 'blur' }
                    ],
                    logincode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 4, max: 4, message: '长度在4个字符', trigger: 'blur' }
                    ],
                },
                dialogFormVisible: false,
                formLabelWidth: '67px',
                imgUrl: process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now(),
                timer: 0,
                time: 0,
                // 上传文件url地址
                imgUpload: process.env.VUE_APP_URL + '/uploads',
                // 头像预览路径
                imageUrl: ''
            }
        },
        methods: {
            onSubmit() {
                // 点击确定, 手动开启表单验证
                this.$refs.form.validate(valid => {
                    if (valid) {
                        // 验证成功
                        // 拿到参数,发送axios请求
                        apiRegister({
                            username: this.form.nickname,
                            phone: this.form.phone,
                            email: this.form.email,
                            avatar: this.form.avatar,
                            password: this.form.password,
                            rcode: this.form.logincode
                        }).then(res => {
                            window.console.log(res);
                            if (res.data.code == 200) {
                                this.$message.success('注册成功')
                                // 重置表单数据 并移除 验证提示
                                this.$refs.form.resetFields()
                                // 移除头像预览路径
                                this.imageUrl = null
                            } else {
                                this.$message.error(res.data.message)
                            }
                        })
                    } else {
                        // 验证失败
                        this.$message.error('验证失败')
                    }
                })
            },
            // 取消按钮
            btnCancel() {
                this.dialogFormVisible = false
                // 重置表单数据 并移除 验证提示
                this.$refs.form.resetFields()
                // 移除头像预览路径
                this.imageUrl = null
            },
            // 点击图片 获取验证码图片路径
            imgClick() {
                // process.env.VUE_APP_URL  环境变量
                // 防止同一ip地址多次访问
                // 解决方法 
                // 方法1 请求地址后面加 随机数
                // 方法2 请求地址后面加 时间戳   使用随机数会有可能重复, 所以推荐使用 时间戳
                this.imgUrl = process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now()
            },
            // 获取验证码
            getCode() {
                // 对手机号进行验证
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
                if (!reg.test(this.form.phone)) {
                    return this.$message.error('手机号不合法')
                }
                if (this.form.code.trim().length != 4) {
                    return this.$message.error('图形验证码不合法')
                }
                // 给 time赋值 60秒
                this.time = 60
                this.timer = setInterval(() => {
                    if (this.time > 0) {
                        this.time--
                    } else {
                        // time == 0 时 停止计时器
                        // 清除计时器
                        clearInterval(this.timer)
                    }
                }, 100)
                // axios({
                //     method: 'post',
                //     url: process.env.VUE_APP_ONLINEURL + '/sendsms',
                //     data: {
                //         code: this.form.code,
                //         phone: this.form.phone
                //     },
                //     // 解决跨域
                //     // ajax请求需要携带cookie 过去
                //     withCredentials: true
                // }).then(res => {
                //     window.console.log(res);
                // }).catch(err => {
                //     window.console.log(err);
                // })
                // window.console.log(axiosApi);
                // 封装后使用
                apiGetCode({
                    code: this.form.code,
                    phone: this.form.phone
                }).then(res => {
                    // window.console.log(res);
                    if (res.data.code == 200) {
                        this.$message.success('验证码为:' + res.data.data.captcha)
                    } else {
                        this.$message.error(res.data.message)
                    }
                }).catch(err => {
                    window.console.log(err);
                })
            },
            // 图片上传成功后的回调函数
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                // window.console.log(res);
                // 把返回来的图片路径(在服务器里面) 保存起来  后面再次验证的时候需要用到该变量
                this.form.avatar = res.data.file_path
                // 因为验证触发条件是失去焦点,  但是上传组件 没有失去焦点,所以不会自动触发第二次验证
                // 上传头像组件 检验方法只会调用一次,第二次无法自动触发
                // 这时 利用表单方法 validateField()  验证单一字段,再次触发验证
                this.$refs.form.validateField('avatar')
            },
            // 图片上传之前的回调函数
            beforeAvatarUpload(file) {
                // 图片格式
                const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
                // 图片大小  /1024 KB   /1024/1024 M
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
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

        // 上传图片组件
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409eff;
        }
        // 上传头像 居中
        .avatar-uploader {
            text-align: center;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>