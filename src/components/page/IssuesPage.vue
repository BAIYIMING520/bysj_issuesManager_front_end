<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-document"></i> issues查看
                </el-breadcrumb-item>
                <el-breadcrumb-item> selectIssues</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="crumbs">
            </div>
        </div>
        <div class="container">
            <div class="bigSearchInput">
                <!--这里的input框中 element ui是把高度锁定了几个式样 分别是 medium small mini-->
                <el-input placeholder="请输入搜索的issue的名字" v-model="TitleTemple" class="handle-input mr10">
                </el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <!--这里主要是完成搜索和列表过滤 type priority status-->
            <div class="handle-box">
                <div style="margin-bottom:20px">
                    <!--这里是多级筛选-->
                    <span style="padding-right:10px; padding-left:10px">类型</span>
                    <el-select v-model="Type" clearable placeholder="请选择">
                        <el-option
                        v-for="item in TypeOpt"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                    <span style="padding-right:10px; padding-left:10px">优先级</span>
                    <el-select v-model="Priority" clearable placeholder="请选择">
                        <el-option
                        v-for="item in PriorityOpt"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                    <span style="padding-right:10px; padding-left:10px">状态</span>
                    <el-select v-model="Status" clearable placeholder="请选择">
                        <el-option
                        v-for="item in StatusOpt"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                    <el-switch
                        v-model="filter"
                        active-text="未打上标签数据"
                        inactive-text="当前条件全部数据" style="float:right; padding-left:250px ">
                    </el-switch>
                </div>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                    style="margin-left:20px"
                >批量删除</el-button>
            </div>

            <el-table
                :data="tableData" 
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="dataId" label="标号" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="issue标题"></el-table-column>
                <el-table-column prop="type" label="类型" width="110"></el-table-column>
                <el-table-column prop="priority" label="优先级" width="100"></el-table-column>
                <el-table-column prop="status" label="状态" width="100"></el-table-column>
                <el-table-column prop="created" label="发布时间" width="100"></el-table-column>
                <el-table-column prop="updated" label="跟新时间" width="100"></el-table-column>

                <el-table-column label="操作" width="180" align="center"> 
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-folder-opened"
                            @click="getIssue(scope.row)"
                        >查看issue</el-button>
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
                    :pager-counter=7
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchData_T2I } from '../../api/index';
import bus from '../common/bus'
export default {
    name: 'selectIssues',
    data() {
        return {
            query: {
                querypara:{
                    'tablesId':0,
                    'Type':'',//这里是字符串 但是是空字符串
                    'Priority':'',
                    'Status':'',
                    'title':''},//这里的query para 在后端默认是table 但是如果进行筛选查询 就需要使用 2个字段的参数传入
                pageIndex: 1,
                pageSize: 8
            },
            //querypara里面的参数 使用split 来string分割
            tableData: [],
            totalElements: 0,
            multipleSelection: [],
            delList: [],
            editVisible: false,
            form: {},//用于对数据库中的表单名字和开发商进行修改
            idx: -1,//用于选择当前的选中的记录的表内number从0开始 最大是pagesize
            //-------------搜索栏
            filter:true,
            Type:'',
            //{value: ,label:},{value: ,label:}
            TypeOpt:[{value:1 ,label:'Improvement'},{value:2 ,label:'Bug'},{value:3 ,label:'Task'},{value:4 ,label:'Sub-task'}],
            Priority:'',
            PriorityOpt:[{value:1 ,label:'Minor'},{value:2 ,label:'Major'},{value:3 ,label:'Trivial'},{value:4 ,label:'Critical'}],
            Status:'',
            StatusOpt:[{value:1,label:'Resolved'},{value:2 ,label:'Patch Available'},{value:3 ,label:'Closed'}],
            TitleTemple:''
        };
    },
    created() {
        //初始化过程中给定对应的tables中的数据调取
        let tableId=window.sessionStorage.getItem('tablesId')
        this.query.querypara.tablesId=parseInt(tableId)
        //在发送中 将query.querypara string化在 在整体String化再传递 到对面再去解析
        this.getData();
    },
    mounted() {
        bus.$on('tableIdChange', NewTableId =>{ 
            //箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
            this.query.querypara.tablesId=NewTableId;
            window.sessionStorage.setItem('tablesId',NewTableId)
            this.getData()
        })  
    },
    methods: {
        // 获取 api数据
        getData() {
            fetchData_T2I(this.query)//使用axios接口获取数据
            .then(res => {
                //这里获取数据
                const {issueData:data} =res
                //data 这里data有content内容选项 包含了content pageable totalPages totalElement size等page java返回属性
                this.tableData = data.content;
                this.totalElements = data.totalElements || 50;
                this.query.querypara=JSON.parse(this.query.querypara)
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
            this.$set(this.query.querypara, 'title',this.TitleTemple);
            this.query.querypara.Type=this.Type
            this.query.querypara.Priority=this.Priority
            this.query.querypara.Status=this.Status
            this.query.querypara.title=this.title
            this.getData();
     
        },  
        //跳转操作
        getIssue(row){
            window.sessionStorage.setItem('dataId',row.dataId)
            this.$router.push('/data')
        },
        // 删除操作--------------------------------------------------------------
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    DeleteData({'tablesId':row.tablesId})
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    //之后得触发删除数据库操作
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
            //多项数据库删除操作

        },
        // 编辑操作-------------------------------------------------------------编辑操作
    }
};
</script>

<style scoped>
.bigSearchInput{
    width: 70%;
    margin-top: 15px;
    margin-bottom: 20px;
    position: relative;
    transform: translate(40%);
}
.bigSearchInput .el-select{
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.handle-box {
    display: inline-block;
    margin-bottom: 20px;
    width:100%
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 600px;
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
.spaceblank{
    width: 15px;
    
}

</style>
