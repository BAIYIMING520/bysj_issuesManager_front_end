<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="5">
                <el-card shadow="hover" class="mgb20" style="height:360px;">
                    <div class="user-info">
                        <img src="../../assets/img/login-bg.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list" style="border-bottom: 2px solid #ccc;">
                        <p>欢迎回来 {{ name }}</p>
                        <div>
                            <div class="user_detail">
                                <div>当前日期:</div>
                                <div>当前时间:</div>
                            </div>
                            <div class="user_detail">
                                <div>{{ this.currTime.toLocaleDateString() }}</div>
                                <div>{{ timeDisplayArea }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        <div class="user_detail">
                            <div>上次登录日期:</div>

                        </div><!-- 这里可以改成 最近的人的活跃统计 包括最近人的活跃统计 以及最近-->
                        <div class="user_detail">
                            <div>{{ thisUserLastLoginTime }}</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="el-icon-lx-people grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div>最近一周用户访人数</div>
                            <div class="grid-num">{{ Recentuser }}</div>
                        </div>
                    </div>
                </el-card>
                <div style="height:10px">&nbsp</div>
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                        <i class="el-icon-lx-notice grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div>当前系统消息</div>
                            <div class="grid-num">20</div>
                        </div>
                    </div>
                </el-card>  
                <div style="height:10px">&nbsp</div>  
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-3">
                        <i class="el-icon-s-data grid-con-icon"></i>
                        <div class="grid-cont-right">
                            <div>当前系统表格数量</div>
                            <div class="grid-num">{{ pageNum }}</div>
                        </div>
                    </div>
                </el-card>       
            </el-col>
            <el-col :span="12">
                <el-card>
                    <el-calendar v-model="date" style="height:515px;">
                    </el-calendar>
                </el-card>
                <div style="height:10px">&nbsp</div>
                <el-card shadow="hover" style="height:515px;">
                    <div slot="header" class="clearfix">
                        <span>Todo</span>
                        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="addMissionFunc">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope" >
                                <div class="todo-item">{{ scope.row.date_day }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <!-- <i class="el-icon-edit"></i> -->
                                <i class="el-icon-delete" v-on:click="deleteMission(scope.$index,scope.row)"></i>
                            </template> 
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="7">

            <el-dialog title="编辑" :visible.sync="editVisible" width="45%">
                <el-form ref="form" :model="missinTemple" label-width="100px">
                    <el-form-item label="添加新任务">
                        <el-input v-model="missinTemple.title"></el-input>
                    </el-form-item>
                    <!--这里需要加一个结束时间-->
                    <el-form-item label="deadLine">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="missinTemple.date_day"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"
                        ></el-date-picker>
                    </el-form-item>       
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveaddMissionFunc">确 定</el-button>
                </span>
            </el-dialog>
            
            <!-- 考虑做一个甘特图 -->
            <!-- 这里可使用进度表可以写一个循环表格来测试一下-->
            <el-card shadow="hover" >
                <div slot="header" class="clearfix">
                    <span>标签标注完成比例</span> <!--这里根据打标的百分比来获得颜色-->
                </div>
                <div>列表名称:</div>
                <div v-for="(iter,index) in this.Percentage" :key="index">
                    {{ iter[0] }}
                    <el-progress :percentage="iter[2]" :color="iter[3]"></el-progress>
                </div>
            </el-card>
        </el-col>    
        </el-row>   
    </div>
    
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            
            date:new Date(),
            name: window.sessionStorage.getItem('username'),
            role:'',
            todoList: [
                {
                    title: '代做事项:example1',
                    date_day:'2020-04-01',
                    status: false,
                },
                {
                    title: '已做事项:exemple2',
                    date_day:'2020-04-01',
                    status: true,
                },
            ],
            currTime:{},
            updateTimer:{},
            Percentage:[],
            Recentuser:0,
            userId:0,
            thisUserLastLoginTime:'',
            pageNum:0,
            color:{
                acheive:'rgb(2,255,87)',//gree
                acheivebiger:'rgb(178, 241, 199)',//浅绿色
                half:'rgb(243, 255, 72)',
                alittle:'#F56C6C',
                none:'#909399'
            },
            //----弹窗修改
            editVisible: false,
            missinTemple:{
                title:'',
                status: false,
                date_day:''
            }
        };
    },
    components: {
        Schart,
    },
    computed: {
        timeDisplayArea(){ // 时间展示区
            let hours = this.currTime.getHours() > 9 ? this.currTime.getHours() : ('0' + this.currTime.getHours())
            let minutes = this.currTime.getMinutes() > 9 ? this.currTime.getMinutes() : ('0' + this.currTime.getMinutes())
            let seconds = this.currTime.getSeconds() > 9 ? this.currTime.getSeconds() : ('0' + this.currTime.getSeconds())
            return hours + ':' + minutes + ':' + seconds
        },
    },
    created() {
        this.getTime()
        this.authority=window.sessionStorage.getItem('authority');
        this.getrole(this.authority)
        this.updateTimer = setInterval(() => {
            this.currTime = new Date()
        }, 1000)
        this.getPercentage();
        this.getRecentuserAndPagenum();
    },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        deleteMission(index, row){
            console.log(index+''+row)
            this.todoList.splice(index,1)
        },
        addMissionFunc(){
            //重置输入框
            this.missinTemple.title='';
            this.missinTemple.status=false;
            this.editVisible = true;
        },
        saveaddMissionFunc() {
            var strtemple= JSON.stringify(this.missinTemple)
            var temp = JSON.parse(strtemple)
            this.todoList.push(temp)
            this.editVisible = false;
            this.$message.success('添加新任务成功');
            //重置 清除temple
        },
        getTime(){
             this.currTime = new Date();  
        },
        getrole(val) {
            if(val ==='type1')
                return this.role ='超级管理员';
            else if(val === 'type2')
                return this.role ='表管理员'
            else
                return this.role ='读者'
        },
        async getRecentuserAndPagenum(){
            //这里写的是一个传入的userId
            this.userId=window.sessionStorage.getItem('userId');
            const { data:ans }=await this.$http.get('http://localhost:8090/api/getdata/Recentuser?userId='+this.userId)
            this.Recentuser=ans.recentUser
            this.pageNum=ans.pageNum
            this.thisUserLastLoginTime =ans.thisUser
        }, 
        async getPercentage(){
             const {data:ans}=await this.$http.get('http://localhost:8090/api/getdata/Percentage')
             this.Percentage=ans.pecentage
             let i=0; 
             for(i= 0; i < this.Percentage.length; i++){
                
                if(this.Percentage[i][2]===100.0)
                    this.Percentage[i][3]=this.color.acheive
                else if(this.Percentage[i][2]<100.0&&this.Percentage[i][2]>75.0)
                    this.Percentage[i][3]=this.color.acheivebiger
                else if(this.Percentage[i][2]>50.0&&this.Percentage[i][2]<75.0)
                    this.Percentage[i][3]=this.color.half
                else if(this.Percentage[i][2]<50.0&&this.Percentage[i][2]>25.0)
                    this.Percentage[i][3]=this.color.alittle
                else if(this.Percentage[i][2]<25.0)
                    this.Percentage[i][3]=this.color.none
             }
        },
        getRecentMessage(){
            //这里需要添加当前的系统消息
        },
        addMission(){

        }
        
    },
    mounted() {
        window.setTimeout(this.getTime(),100);
    },
};
</script>


<style scoped>

.user_detail{
    width: 110px;
    display:inline-block;
    align-content:center;
}
.user_detail div{
    display:block;
    width: 100px;
}



.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 70px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 60px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}


.grid-con-2 .grid-con-icon {
    background: rgb(206, 247, 129);
}


.grid-con-3 .grid-con-icon {
    background: rgb(208, 233, 95);
}



.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
.sub_text{
    color:#000;
    font-size:18px;
    font-weight:bold
}
.color_test{
    color: rgb(94, 255, 0);
}
</style>
