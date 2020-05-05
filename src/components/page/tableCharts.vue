<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i>数据分析 
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
                    <div class="container">
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <div>
                                    选择属性：
                                    <el-select v-model="queryform.selectOption" placeholder="过滤类型" class="handle-select mr10" style="padding-bottom:20px">
                                        <!--这里选择返回的参数类型-->
                                        <el-option key="1" label="类型" value="type"></el-option>
                                        <el-option key="2" label="优先级" value="priority"></el-option>
                                        <el-option key="3" label="状态" value="status"></el-option>
                                        <el-option key="4" label="标签" value="tag"></el-option>
                                    </el-select>  
                                </div>                
                                <el-table
                                    :data="tableData" 
                                    border
                                    class="table"
                                    ref="multipleTable"
                                    header-cell-class-name="table-header"
                                >
                                    <el-table-column prop="tablesId" label="列表号" width="60" align="center"></el-table-column>
                                    <el-table-column prop="tablesName" label="issue列表名"></el-table-column>
                                    <!--这里是编辑和删除-->
                                    <el-table-column label="查询对应数据分析" align="center">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="text"
                                                icon="el-icon-folder-opened"
                                                @click="getAnalysis(scope.row)"
                                            >选择列表进行分析</el-button> <!--这里使用选择列表 需要直接完成跳转 然后在本地的local上来渲染参数来指定跳转对应的表-->
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
                            </el-col>
                            <el-col :span="18">
                                <barSequenceAndPie 
                                    :title='defaultType1'
                                    :name_value_array='defaultType2'
                                ></barSequenceAndPie>
                            </el-col>
                        </el-row>
                        <!-- <issueRankBar></issueRankBar> -->
                    </div>
                </div>
        <!-- <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="全局数据库分析" name="first">数据分析</el-tab-pane>
            <el-tab-pane label="指定列表数据库分析" name="second">
                
            </el-tab-pane>
            <el-tab-pane label="甘特图" name="third">甘特图</el-tab-pane>
        </el-tabs> -->
    </div>
   
    <!--这里最重要的问题是如何分装数据参数 以及select来渲染其中的函数 所以需要将echart组件进行封装-->
    <!-- vue组件分装 然后在这个主要函数中添加api获取数据之后再使用select进行展示-->
    <!-- 页面设计 -->
</template>

<script>
import { fetchData } from '../../api/index';
import barSequenceAndPie from './dataanalysis/barSequenceAndPie'
import bus from '../common/bus';
export default {
    name: 'tableCharts',
    components:{
        "barSequenceAndPie":barSequenceAndPie,
    },
    data() {
        return {
            //-----------------查询列表参数
            tableData: [],
            query: {
                querypara: '',
                pageIndex: 1,
                pageSize: 6
            },
            totalElements: 0,
            queryform:{
                tablesId:-1,
                selectOption:'',
            },
            //-----------------------
            defaultType1:"测试标题",
            defaultType2:[{ name: '测试数据1',value: 19325},{ name: '测试数据2',value: 23438},{ name: '测试数据3',value: 31000},{ name: '测试数据4',value: 121594},{ name: '测试数据5',value: 134141}],
            //-------------------tabs参数
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab, event){
            console.log(tab, event);
        },
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
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        getAnalysis(row){
            this.queryform.tablesId=row.tablesId
            if(this.queryform.selectOption===''){
                this.$message.success('请选择筛选类型后再查询')
            }
            else{
                console.log(this.queryform)
                //这里调用 然后获取数据后在再then渲染
                this.$http.post('http://localhost:8090/api/getAnalysis/getTableAnalysisBydefault',this.queryform)
                .then(res => {
                    this.defaultType1='列表名:'+row.tablesName+' 属性：'+this.queryform.selectOption;
                    this.defaultType2=res.data
                    console.log(this.defaultType2)
                    bus.$emit('SetAgain')
                })
            }
        }
    },
    created(){
        
    },
    mounted() {
      this.getData()
      
    }
};
</script>

<style scoped>
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 600px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>