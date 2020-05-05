<template>
    <div>
        <div id="IssueRankBar" :style="{height: '500px'}"></div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String, 
            required:true
        },
        nameArray:{
            type:Array,
            required:true//传入一个table 分别是每一种类型中的数据是多少
        },
        dataList:{
            type:Array,
            required:true//传入一个table 分别是每一种类型中的数据是多少
        }
    },
    data(){
        return{
            YnameData:[],//表名称
            series:[]
        }
    },
    methods:{
        handleData(){
            //这类需要一个data转换 转换成每一个type类型下的每张表的数据向量 
            this.series=[];//清除原始数据
            this.YnameData=[]
            this.dataList.sort(function(a,b){
                return a.total-b.total;    // -1 降序排列 
            })
            //nameArray 利用这个来初始化 注意深度拷贝问题
            let temp=new Object();
            {//temp初始化  
                temp.name= '',
                temp.type= 'bar',
                temp.stack ='总量',
                temp.label= {
                    show: true,
                    position: 'insideRight'
                },
                temp.data= []
                for(let i=0;i<this.dataList.length;i++){
                    temp.data.push(0)
                }
            }
            for(let iter in this.nameArray){
                let tempJson=JSON.stringify(temp)
                tempJson=JSON.parse(tempJson)
                tempJson.name=this.nameArray[iter]
                this.series.push(tempJson)
            }//完成初始化   ----------------------------------
            //-------tets code                  //this.YnameData
            // for(let iter in this.nameArray){
            //     console.log(this.series[iter].name)
            // }
            for(let i in this.dataList){
                this.YnameData.push(this.dataList[i].tablesName)//放置列表名
                for(let j in this.dataList[i].KVarray)
                {
                    // i: data list中的标号 也就是列表标号 j是写的是其对应的 key-value对
                    //name array和list object的序列是一个同样的顺序序列
                    let pos=this.nameArray.indexOf((this.dataList[i].KVarray[j].name)) //name bug value 35键值对
                    this.series[pos].data[i]=this.dataList[i].KVarray[j].value
                }
            }//完成数据reshape
            // for(let iter in this.nameArray){
            //     console.log(this.nameArray[iter])
            //     //this.series[iter].data[iter2]
            //     for(let iter2=0;iter2< this.dataList.length;iter2++)
            //     {
            //         console.log(this.series.data)
            //     }
            // }
        },
        drawIssueRankBar(){
            let IssueRankBar =this.$echarts.init(document.getElementById('IssueRankBar'));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: this.nameArray //->x_name
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: this.YnameData//['周一', '周二', '周三', '周四', '周五', '周六', '周日'] // y_name
                },
                series: this.series
                    // { //测试数据
                    //     name: '直接访问',
                    //     type: 'bar',
                    //     stack: '总量',
                    //     label: {
                    //         show: true,
                    //         position: 'insideRight'
                    //     },
                    //     data: [320, 302, 301, 334, 390, 330, 320]
                    // },
            }
            IssueRankBar.setOption(option)
        },
        setData(){
            this.handleData();
            this.drawIssueRankBar()//这里写的是
        }
    },
    created() {
        this.setData()
    },
    mounted() {
        this.setData()
    },
    watch:{
        title:function(newVal,oldVal){
            this.setData()
        }
    }
}
</script>
<style scoped>

</style>