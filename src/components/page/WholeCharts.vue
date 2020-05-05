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
                <el-select v-model="SelectValue" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <issueRankBar
                    :title="defaultType1"
                    :nameArray="defaultType2"
                    :dataList="defaultType3"
                ></issueRankBar>    
                <!-- <issueRankBar></issueRankBar> -->
            </div>
        </div>
    </div>
   
    <!--这里最重要的问题是如何分装数据参数 以及select来渲染其中的函数 所以需要将echart组件进行封装-->
    <!-- vue组件分装 然后在这个主要函数中添加api获取数据之后再使用select进行展示-->
    <!-- 页面设计 -->
</template>

<script>

import issueRankBar from './dataanalysis/issueRank'
import bus from '../common/bus';
export default {
    name: 'tableCharts',
    components:{
        "issueRankBar":issueRankBar
    },
    data() {
        return {
            //-----------------查询列表参数
                SelectValue: 'type',
                Data: [],
                //-----------------------
                defaultType1:"数据库issue数量分析,类型:type",
                defaultType2:['Improvement','Bug','Task','Sub-task','New Feature','Test'],
                defaultType3:[],
                //----------------这里是测试数据---------------下拉框中选项
                options: [
                    {
                        value: 'type',
                        label: '类型'
                    }, 
                    {
                        value: 'priority',
                        label: '优先级'
                    }, 
                    {
                        value: 'status',
                        label: '状态'
                    },
                    {
                        value: 'tag',
                        label: '标签'
                    }
                ]
            }
    },
    methods: {   
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        getDate(val){
            this.$http.get('http://localhost:8090/api/getAnalysis/getTotalAnalysis?type='+val)
            .then( res=>{
                console.log('获取数据')
                this.defaultType1='数据库issue数量分析,类型:'+val
                this.defaultType2=res.data.typeNames
                this.defaultType3=res.data.dataList
            })
        } 
    },
    created(){
        this.getDate(this.SelectValue)//初始化时 按值来分析
    },
    watch:{
        SelectValue:function(newVal,oldVal){
            this.getDate(this.SelectValue)
            
        }
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