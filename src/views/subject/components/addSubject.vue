<template>
    <div class="addDialog">
        <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
            <el-form ref="form" :rules="rules" :model="form">
                <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
                    <el-input v-model="form.rid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简称" :label-width="formLabelWidth">
                    <el-input v-model="form.short_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科简介" :label-width="formLabelWidth">
                    <el-input v-model="form.intro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学科备注" :label-width="formLabelWidth">
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
    import { apiAddSubject } from '@/api/subject'
    export default {
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    rid: '',
                    name: '',
                    short_name: '',
                    intro: '',
                    remark: '',
                },
                rules: {
                    rid: [
                        { required: true, message: '请输入学科编号', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入学科名称', trigger: 'blur' },
                    ]
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            // 新增学科
            add() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        apiAddSubject(this.form).then(res => {
                            // window.console.log(res);
                            if (res.data.code == 200) {
                                this.$message.success('新增成功')
                                // 重置表单  只能对有校验规则的表单控件清空, 没有校验规则的则不能清空
                                // resetFields  是这个form 元素的方法  所以这里要拿到这个 form的dom元素
                                this.$refs.form.resetFields()
                                this.short_name = ''
                                this.intro = ''
                                this.remark = ''
                                // 关闭对话框
                                this.dialogFormVisible = false
                                // 重新获取数据 刷新页面内容
                                this.$parent.getSubjectList()
                            }
                        })
                    } else {
                        this.$message.error('验证不通过')
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