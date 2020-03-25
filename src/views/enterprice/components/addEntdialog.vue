<template>
    <div class="addDialog">
        <el-dialog title="新增企业" :visible.sync="dialogFormVisible">
            <el-form ref="form" :rules="rules" :model="form">
                <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
                    <el-input v-model="form.eid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
                    <el-input v-model="form.short_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
                    <el-input v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { apiAddEnt } from '@/api/enterprice'
    export default {
        data() {
            return {
                // 对话框是否显示
                dialogFormVisible: false,
                form: {
                    eid: '',
                    name: '',
                    short_name: '',
                    intro: '',
                    remark: ''
                },
                rules: {
                    eid: [
                        { required: true, message: '请输入企业编号', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' }
                    ],
                    short_name: [
                        { required: true, message: '请输入企业简称', trigger: 'blur' }
                    ],
                    intro: [
                        { required: true, message: '请输入企业介绍', trigger: 'blur' }
                    ],
                    // 给一个空数组, 这样就有了校验规则, 用resetFields() 方法时, 也可以把它的内容给清空掉
                    remark:[]
                },
                // 表单控件标题 宽度
                formLabelWidth: '120px'
            };
        },
        methods: {
            // 确定按钮
            add() {
              this.$refs.form.validate(valid=>{
                  if(valid){
                    //发送请求
                    apiAddEnt(this.form).then(res=>{
                        // window.console.log(res);
                        if(res.data.code==200){
                            // 提示信息
                            this.$message.success('新增成功')
                            // 关闭对话框
                            this.dialogFormVisible=false
                            // 清除表单数据
                            this.$refs.form.resetFields()
                        }else{
                            this.$message.error(res.data.message)
                        }
                    })
                  }
              })
            }
        },
    }
</script>
<style lang="less">
    .addDialog {
        // 权重不够,提高权重
        .el-icon-close.el-dialog__close {
            color: #fff;
        }
    }
</style>