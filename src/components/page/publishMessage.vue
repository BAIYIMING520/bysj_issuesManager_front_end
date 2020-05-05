<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 创建消息
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建消息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box ThisPosChange">
                <el-form ref="PublishMessage" :model="PublishMessage" label-width="100px">
                    <el-form-item label="新消息内容">
                        <el-input v-model="PublishMessage.messageDes"></el-input>
                    </el-form-item>  
                    <el-form-item label="消息类型选择">
                        <el-select v-model="PublishMessage.type" placeholder="请选择">
                            
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择发布用户" v-if="PublishMessage.type===2">
                        <el-select v-model="PublishMessage.userId" placeholder="请选择">
                            <el-option
                                v-for="item in userOptions"
                                :key="item.userId"
                                :label="item.username"
                                :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建日期">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="PublishMessage.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="PublishMessage.date2"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <!--用一个select框子来显示  这里可以使用符合使用框 -->
                    <el-form-item style="float:right;margin-top:5px">
                        <el-button type="primary" @click="onSubmit">发布消息</el-button>
                    </el-form-item>
                    <div style="height:20px"></div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            SystemMark:'[系统消息]',
            PublishMessage: {
                messageDes: '',
                date1: '',
                date2: '',//发布的时间显示
                type: '',// 发布的类型
                userId:0
            },
            typeOptions:[{
                value: 1,
                label: '系统消息(广播)'
            },{
                value: 2,
                label: '用户消息(单播)'
            }],
            userOptions:[]       
        };
    },
    created() {
        this.getUserList();//获取数据进行发布

    },
    methods: {
        onSubmit() {
            if(this.PublishMessage.messageDes===''||this.PublishMessage.date1===''||this.PublishMessage.date2===''||this.PublishMessage.type===''){
                this.$message.error('有参数没有填写,请查询后再提交') 
                //首先检测其中是否是空白没有填写
            }else if(this.PublishMessage.type===2&&this.PublishMessage.userId===''){
                this.$message.error('有参数没有填写,请查询后再提交') //检验参数是否是完整的
                //这里做一次转换检
            }else{
                if(this.PublishMessage.type===1)
                {
                    this.PublishMessage.messageDes=this.SystemMark.concat(this.PublishMessage.messageDes)
                }
                console.log(this.PublishMessage)
                this.publishMessageFunc()//发布任务
            } 
        },
        async getUserList(){
            const{ data:res }= await this.$http.get('http://localhost:8090/api/getdata/getUserList')
            this.userOptions=res.userList;
        },
        async publishMessageFunc(){
            await this.$http.post('http://localhost:8090/api/savedata/PublishMessage',this.PublishMessage)//发布message在那边获取数据
            .then( res =>{
                this.$message.success('发布任务成功')
                this.PublishMessage={ //表单重置
                    messageDes: '',
                    date1: '',
                    date2: '',
                    type: '',
                    userId:0
                }
            })
        }
    }
};
</script>
<style scoped>
.ThisPosChange{

}
.middlePos{
  
}
.test{
    color: rgb(179, 8, 8);
}
</style>