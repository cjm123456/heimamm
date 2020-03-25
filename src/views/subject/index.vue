<template>
    <div>
        <!-- 头部 -->
        <el-card>
            <!-- 行内表单 -->
            <el-form :inline="true" :model="obj" class="demo-form-inline">
                <el-form-item label="学科编号">
                    <el-input class="w90" v-model="obj.rid" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="学科名称">
                    <el-input class="w140" v-model="obj.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="创建者">
                    <el-input class="w90" v-model="obj.username" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select class="w140" v-model="obj.status" placeholder="">
                        <el-option label="所有" value=""></el-option>
                        <el-option label="禁用" value="0"></el-option>
                        <el-option label="启用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearSearch">清除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addDialog">+新增学科</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 表格 -->
        <el-card class="tableBox">
            <el-table :data="subjectList" style="width: 100%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="rid" label="学科编号">
                </el-table-column>
                <el-table-column prop="name" label="学科名称">
                </el-table-column>
                <el-table-column prop="short_name" label="简称">
                </el-table-column>
                <!-- prop 为数组显示的内容 -->
                <!-- label 是列的标题 -->
                <el-table-column prop="username" label="创建者">
                </el-table-column>
                <!-- 注意 不用prop 设置内容 通过 template 来进行内容设置  -->
                <el-table-column label="创建日期" width="180px">
                    <template slot-scope="scope">
                        {{scope.row.create_tiem | mytime}}
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.status==0?'禁用':'启用' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;&nbsp;&nbsp;
                        <!-- 把数据源传到 点击事件里面 -->
                        <el-link type="primary" @click="notUse(scope.row)">
                            {{scope.row.status==0?'启用':'禁用'}}
                        </el-link>&nbsp;&nbsp;&nbsp;
                        <el-link type="primary" @click="delSubject(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="obj.page" :page-sizes="sizesArr" :page-size="sizePage"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <addSubject ref="addSubject"></addSubject>
        <editSubject ref=editSubject></editSubject>
    </div>
</template>
<script>
    import { apiSubjectlist, apiStatus, apiDelSubject } from '@/api/subject'
    import addSubject from './components/addSubject.vue'
    import editSubject from './components/editSubject'
    export default {
        data() {
            return {
                // 每页显示多少条
                sizesArr: [2, 4, 8],
                // 当前选择每页多少条
                sizePage: 4,
                // 总条数
                total: 0,
                // 接受学科列表数据
                subjectList: [],
                // 发送请求学科列表数据
                obj: {
                    // 学科名称
                    name: '',
                    // 当前页码
                    page: 1,
                    // 页容量
                    limit: 4,
                    // 学科编号
                    rid: '',
                    // 创建者
                    username: '',
                    // 状态
                    status: ''
                }

            }
        },
        methods: {
            // 页码容量改变
            handleSizeChange(index) {
                // 既要更改分页里面的页容量数据,也要更改 请求数据对象里面的 页容量
                this.sizePage = index
                this.obj.limit = index
                // 重新获取数据
                this.getSubjectList()
            },
            // 当前页码改变
            handleCurrentChange(index) {
                this.currentPage = index
                this.obj.page = index
                // 重新获取数据
                this.getSubjectList()
            },
            // 获取学科数据要经常使用,这里进行封装
            getSubjectList() {
                // 发送ajax请求, 拿到学科列表
                // 虽然这里不需要传参数,但是还是要放一个空对象, 不然会报错
                apiSubjectlist(this.obj).then(res => {
                    // window.console.log(res);
                    this.subjectList = res.data.data.items
                    // window.console.log(typeof res.data.data.pagination.page);
                    // 注意这里的 返回数据里面的page 是字符串 格式, 而currentPage 需要的是数值型,所以这里进行格式转换
                    // this.currentPage = parseInt(res.data.data.pagination.page)
                    this.total = res.data.data.pagination.total
                }).catch(err => {
                    window.console.log(err);
                })
            },
            // 禁用点击事件
            notUse(data) {
                apiStatus(data.id).then(res => {
                    // window.console.log(res);
                    if (res.data.code == 200) {
                        if (data.status == 0) {
                            this.$message.success('启用成功')
                        } else {
                            this.$message.success('禁用成功')
                        }
                        // 再次获取数据
                        this.getSubjectList()
                    }
                }).catch(err => {
                    window.console.log(err);
                })
            },
            // 新增学科点击事件
            addDialog() {
                // 新增学科对话框显示
                this.$refs.addSubject.dialogFormVisible = true
            },
            // 搜索按钮 点击事件
            search() {
                this.getSubjectList()
            },
            //清除按钮
            clearSearch() {
                // 重置搜索表单数据
                this.obj.name = '',
                    this.obj.rid = '',
                    this.obj.username = '',
                    this.obj.status = ''
            },
            // 编辑学科
            edit(row) {
                // window.console.log(row);
                this.$refs.editSubject.dialogFormVisible = true
                // 因为它们的数据都是绑定到同一对象 为了避免 editSubject 组件 的数据 影响 subject组件,这里用一个新的对象赋值给editSubject组件的属性
                // this.$refs.editSubject.form=row
                if (row.id != this.$refs.editSubject.form.id) {
                    this.$refs.editSubject.form = JSON.parse(JSON.stringify(row))
                }
            },
            // 删除学科
            delSubject(row) {
                // window.console.log(row);
                // 弹框提示
                this.$confirm('是否删除学科', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除学科请求
                    apiDelSubject(row.id).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // 判断是否是删除最后一页的最后一条数据
                            if (this.subjectList.length == 1) {
                                // 是 请求的页码 要减 1
                                this.obj.page -= 1
                            }
                            // 刷新页面数据
                            this.getSubjectList()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        created() {
            // 一打开页面, 发送请求 获取数据
            this.getSubjectList()
        },
        // 注册组件
        components: {
            addSubject,
            editSubject
        }
    }
</script>
<style lang="less">
    .demo-form-inline {
        .w90 {
            width: 90px;
        }

        .w140 {
            width: 140px;
        }

        // 清除每个 表单域的 底部外间距
        .el-form-item {
            margin-bottom: 0;
        }
    }
    // 中间卡片距离上面卡片 外间距
    .tableBox {
        margin-top: 19px;
    }

    .el-pagination {
        // 可以控制 行内块元素 水平居中
        text-align: center;
        margin-top: 30px;
    }
</style>