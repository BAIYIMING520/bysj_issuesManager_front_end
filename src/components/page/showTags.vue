<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-document"></i> 查看标签库
                </el-breadcrumb-item>
                <el-breadcrumb-item>查看标签库</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="crumbs">
            </div>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--这里绑定了query参数中的查询函数-->
                <el-select v-model="para1" placeholder="过滤类型" clearable class="handle-select mr10">
                    <!--这里选择返回的参数类型-->
                    <el-option v-for="(item, index) in warningLevel" :key="index" :label="item.level" :value="item.value"></el-option>   
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
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="tagId" label="标签编号" width="55" align="center"></el-table-column>
                <el-table-column prop="tagName" label="标签名称" width="250"></el-table-column>
                <el-table-column prop="description" label="标签内容" >
                    <template slot-scope="scope">
                        <span v-html="scope.row.description"></span><!--转换标签-->
                    </template>
                </el-table-column>
                <el-table-column prop="color" label="严重级别" width="100"></el-table-column>
                <el-table-column prop="date" label="日期" width="120"></el-table-column>
                <!--这里是编辑和删除-->
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
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
    </div>
</template>

<script>
import { fetchData, UpdateDate, DeleteData, fetchData_Tags } from '../../api/index';
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
            para1:'',//查询属性
            para2:'',//查询参数
            tableData: [],
            totalElements: 0,
            form: {},//用于对数据库中的表单名字和开发商进行修改
            idx: -1,//用于选择当前的选中的记录的表内number从0开始 最大是pagesize
            warningLevel:{
                1:{
                    color:'red',
                    level:'致命缺陷',
                    value:1
                },
                2:{
                    color:'orange',
                    level:'严重缺陷',
                    value:2
                },
                3:{
                    color:'yellow',
                    level:'一般缺陷',
                    value:3
                },
                4:{
                    color:'blue',
                    level:'值得关注的缺陷',
                    value:4
                },
                5:{
                    color:'green',
                    level:'可以忽略的缺陷',
                    value:5
                }       
            },
        };
    },
    created() {
        this.getData();
        this.userProperty=JSON.parse(window.sessionStorage.getItem('userProperty'))
        console.log(this.tableData)
    },
    methods: {
        // 获取 api数据
        getData() {
            fetchData_Tags(this.query)//使用axios接口获取数据
            .then(res => {
                const{ tags:data }=res
                this.tableData=data.content;
                //data 这里data有content内容选项 包含了content pageable totalPages totalElement size等page java返回属性
                this.totalElements = data.totalElements || 15;
                let i=0;
                for(i=0;i<this.tableData.length;i++){
                    let template=this.tableData[i].color
                    this.tableData[i].color=this.warningLevel[template].level     
                }
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
            var newpara=this.para1+' '+this.para2
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
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 200px;
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
