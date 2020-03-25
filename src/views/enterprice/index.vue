<template>
    <div>
        <!-- 头部 -->
        <el-card>
            <!-- 行内表单 -->
            <el-form :inline="true" :model="obj" class="demo-form-inline">
                <el-form-item label="企业编号">
                    <el-input class="w90" v-model="obj.eid" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="企业名称">
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
                    <el-button type="primary" @click="addDialog">+新增企业</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 表格 -->
        <el-card class="tableBox">
            <el-table :data="entList" style="width: 100%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="eid" label="企业编号">
                </el-table-column>
                <el-table-column prop="name" label="企业名称">
                </el-table-column>
                <el-table-column prop="short_name" label="简称">
                </el-table-column>
                <!-- prop 为数组显示的内容 -->
                <!-- label 是列的标题 -->
                <el-table-column prop="intro" label="创建者">
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
                        <el-link type="primary" @click="delEnt(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="obj.page" :page-sizes="sizesArr" :page-size="obj.limit"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <processEnt ref="processEnt"></processEnt>
    </div>
</template>
<script>
    import { apiGetList, apiStatus, apiDelEnt } from '@/api/enterprice.js'
    import processEnt from './components/processEnt.vue'
    export default {
        data() {
            return {
                obj: {
                    name: '',
                    page: 1,
                    limit: 4,
                    eid: '',
                    username: '',
                    status: ''
                },
                // 获取的数据
                entList: [],
                // 分页总条数
                total: 0,
                sizesArr: [2, 4, 8]
            }
        },
        methods: {
            // 删除数据
            delEnt(row) {
                this.$confirm('是否确定删除数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 发送请求
                    apiDelEnt(row.id).then(res=>{
                        window.console.log(res);
                        if(res.data.code==200){
                            this.$message.success('删除成功 ')
                            // 重新获取数据
                            this.getEntList()
                        }else{
                            this.$message.error(res.data.message)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 禁用或启用
            notUse(row) {
                // window.console.log(row);
                // 发送请求
                apiStatus(row.id).then(res => {
                    if (res.data.code == 200) {
                        // 通过原来的状态 判断 提示信息
                        if (row.status == 0) {
                            this.$message.success('启用成功')
                        } else {
                            this.$message.success('禁用成功')
                        }
                        // 重新获取数据
                        this.getEntList()
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            // 按条件搜索
            search() {
                // 获取数据
                this.getEntList()
            },
            // 清除搜索内容
            clearSearch() {
                this.obj.name = ''
                this.obj.eid = ''
                this.obj.username = ''
                this.obj.status = ''
            },
            // 页容量改变事件
            handleSizeChange(index) {
                // index 修改 页容量的值
                this.obj.limit = index
                // 重新获取数据
                this.getEntList()
            },
            // 页码改变事件
            handleCurrentChange(index) {
                 // index 修改 当前页码的值
                this.obj.page = index
                // 重新获取数据
                this.getEntList()
            },
            // 获取企业列表
            getEntList() {
                apiGetList(this.obj).then(res => {
                    // window.console.log(res);
                    this.entList = res.data.data.items
                    // 给分页的总条数 赋值
                    this.total = res.data.data.pagination.total
                })
            },
            // 新增企业 按钮
            addDialog() {
                this.$refs.processEnt.dialogFormVisible = true
                this.$refs.processEnt.isEdit=false
            }
        },
        created() {
            // 发送请求,获取学科列表数据 
            this.getEntList()
        },
        components: {
            processEnt
        }
    }
</script>
<style>
</style>