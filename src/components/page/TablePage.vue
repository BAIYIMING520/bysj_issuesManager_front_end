<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-document"></i> issues查看
                </el-breadcrumb-item>
                <el-breadcrumb-item>IssuesTables</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="crumbs">
            </div>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <!--这里绑定了query参数中的查询函数-->
                <el-select v-model="para1" placeholder="过滤类型" class="handle-select mr10">
                    <!--这里选择返回的参数类型-->
                    <el-option key="1" label="issue列表名" value="tablesName"></el-option>
                    <el-option key="2" label="开发商" value="builder"></el-option>
                    <el-option key="3" label="列表号" value="tablesId"></el-option>
                </el-select>
                <el-input v-model="para2" placeholder="输入参数" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <!--table data用来指定数据源-->
            <el-table
                :data="tableData" 
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="tablesId" label="列表号" width="55" align="center"></el-table-column>
                <el-table-column prop="tablesName" label="issue列表名"></el-table-column>
                <el-table-column prop="builder" label="开发商"></el-table-column>
                <el-table-column prop="date" label="创建日期"></el-table-column>
                <!--这里是编辑和删除-->
                <el-table-column label="操作" width="380" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-folder-opened"
                            @click="getTable(scope.row)"
                        >选择列表</el-button> <!--这里使用选择列表 需要直接完成跳转 然后在本地的local上来渲染参数来指定跳转对应的表-->
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="totalElements"
                    :pagerCount=5
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="issue列表名">
                    <el-input v-model="form.builder"></el-input>
                </el-form-item>
                <el-form-item label="开发商">
                    <el-input v-model="form.tablesName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData, UpdateDate, DeleteData } from '../../api/index';
import bus from '../common/bus'
export default {
    name: 'IssuesTables',
    data() {
        return {
            query: {
                querypara: '',//这里的query para 在后端默认是table 但是如果进行筛选查询 就需要使用 2个字段的参数传入
                pageIndex: 1,
                pageSize: 5
            },
            //querypara里面的参数 使用split 来string分割
            para1:'tablesId',//查询属性
            para2:'',//查询参数
            tableData: [],
            totalElements: 0,
            multipleSelection: [],
            delList: [],
            editVisible: false,
            form: {},//用于对数据库中的表单名字和开发商进行修改
            idx: -1,//用于选择当前的选中的记录的表内number从0开始 最大是pagesize
            userProperty:{}
        };
    },
    created() {
        this.getData();
        this.userProperty=JSON.parse(window.sessionStorage.getItem('userProperty'))
    },
    methods: {
        // 获取 api数据
        getData() {
            fetchData(this.query)//使用axios接口获取数据
            .then(res => {
                //这里获取数据
                const {tables:data} =res
                //data 这里data有content内容选项 包含了content pageable totalPages totalElement size等page java返回属性
                this.tableData = data.content;
                this.totalElements = data.totalElements || 50;
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            var newpara=this.para1.concat(' '+this.para2);
            this.$set(this.query, 'querypara',newpara);
            this.getData();
        },  
        //跳转操作
        getTable(row){
            //使用row中的tablesId 完成跳转
            //这里判断你的读取权限是否有对应读取权限 在对应页面来完成控制 只有helper可以帮忙用来打标签 reader无法用来打标签
            window.sessionStorage.setItem('tablesId',row.tablesId)
            bus.$emit('tableIdChange',row.tablesId)
            this.$router.push('/issues')
            //访问对应的json中的数据 key-map方式
            //使用路由跳转进行表中issues获取
        },
        // 删除操作--------------------------------------------------------------
        handleDelete(index, row) {
            // 二次确认删除
            if(this.userProperty.authority === 'type1'){
                this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
                })
                .then(() => {
                    // 这了进行判断权限 只有type1权限 才可以删除表 否则不成功
                    //console.log(row.tablesId)
                    DeleteData({'tablesId':row.tablesId})
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);  
                    //之后得触发删除数据库操作
                })
                .catch(() => {});
            } else {
                this.$message.error('删除失败,您没有权限删除');
            }
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            if(this.userProperty.authority === 'type1'){
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            } else {
                this.$message.error('删除失败,您没有权限删除');
            } 
            //多项数据库删除操作
        },
        // 编辑操作-------------------------------------------------------------编辑操作
        handleEdit(index, row) {
            if(this.userProperty.authority === 'type1'){
                this.idx = index;
                this.form = row;//这里是一个指针 指向content中的对应的序号元素
                this.editVisible = true;
            } else {
                this.$message.error('修改失败,您没有权限修改');
            } 
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            console.log(this.form)
            //this.$set(this.tableData[this.idx],this.form);
            //还是使用query进行参数传递
            UpdateDate(this.form)
            //重置 触发数据库函数 后将变量清除
            this.idx=-1;
            this.form={};
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
