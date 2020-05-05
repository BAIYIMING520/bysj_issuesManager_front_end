<template>
<!--
    1.这里需要用来显示其中 数据排序图和 数据分布图片
    所以使用2个图片来进行演示 使用左右排序
-->
    <div>
        <el-row>
            <div class="grid-content bg-purple-dark" style="text-align: center">
                <span>{{ title }}</span>
            </div>
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">
                    <div id="barSequnce" :style="{height: '500px'}"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">
                    <div id="pie" :style="{height: '500px'}"></div>
                </div>
            </el-col>
        </el-row>  
    </div>
</template>
<script>
import bus from '../../common/bus';
export default {
    props:{
        title:{
            type:String, // 输入title 列表
            required:true
        },
        name_value_array:{
            type:Array,//前者是用于数据的名字 后者是数据  eg:[{ name: 'rose1',value: 40},{ name: 'rose2',value: 40},{ name: 'rose3',value: 40}]
            required:true
        },
    },
    data(){
        return{
            // 测试数据 { name: '巴西',value: 19325},{ name: '印尼',value: 23438},{ name: '美国',value: 31000},{ name: '印度',value: 121594},{ name: '中国',value: 134141}
            nameAndData:[],
            name_data1:[],
            value_data1:[],
        }
    },
    methods:{
        handleData(){
            //val 传入的是一个数组 object数组
            //开始需要sort一下object
            //初始化一下
            let temple=JSON.stringify(this.name_value_array)
            this.nameAndData=JSON.parse(temple)
            this.name_data1=[],
            this.value_data1=[],
            this.nameAndData.sort(function(a,b){
                return a.value-b.value;    // -1 降序排列 
            })
            let _length=this.nameAndData.length;
            let i=0;
            for(i=0;i<_length;i++){
                var dataTemple=this.nameAndData[i];
                this.name_data1.push(dataTemple.name)
                this.value_data1.push(dataTemple.value)
            }
        },
        drawbarSequnce(){
            let barSequnce =this.$echarts.init(document.getElementById('barSequnce'))
            let option = {
                title: {
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: this.name_data1//这里是纵坐标
                },
                series: [
                    //这可以配合图例写多个参数 这里最好使用 一个向量完成数据绑定
                    //这里使用的是单个数据 所以先不使用array
                    {
                         //替换成legend_data
                        type: 'bar',
                        data: this.value_data1
                    }
                ]
            };
            barSequnce.setOption(option);
        },
        drawPie(){
            let pie =this.$echarts.init(document.getElementById('pie'))
            let option = {
                title: {
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: this.name_data1
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: {show: true},
                        saveAsImage: {
                            show: true,
                            type:'png'
                        }
                    }
                },
                series: [
                    //------------删除部分
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['50%', '50%'],
                        roseType: 'area', 
                        data: this.nameAndData //这里是配合legend中的协会才能够
                    }
                ]
            }; 
            pie.setOption(option)
        }
    },
    created(){
        this.handleData(this.name_value_array);
    },
    mounted () {
        //在props的值获取完毕后再调用图片进行渲染
        this.drawbarSequnce()
        this.drawPie()
    },
    watch: {
        name_value_array:function(newVal,oldVal){
            this.handleData();
            this.drawbarSequnce()
            this.drawPie()
        }
    },
}
</script>

<style scoped>
.grid-content {
    min-height: 36px;
}
.bg-purple-dark {
    background: #99a9bf;
}
</style>
