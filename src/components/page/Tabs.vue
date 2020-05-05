<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>消息区域</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unreadMessage.length})`" name="first">
                    <el-table :data="unreadMessage" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row[5]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="180">
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row[4]}}</span>
                                <!-- <el-table-column prop="date" width="180"></el-table-column> -->
                            </template>
                        </el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="handleAllRead">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${readMessage.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="readMessage" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row[5]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="150">
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row[4]}}</span>
                                    <!-- <el-table-column prop="date" width="150"></el-table-column> -->
                                </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" >删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycleMessage.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycleMessage" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row[5]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="150">
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row[4]}}</span>
                                    <!-- <el-table-column prop="date" width="150"></el-table-column> -->
                                </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                // unread: [{
                //     date: '2018-04-19 20:00:00',
                //     title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                // },{
                //     date: '2018-04-19 21:00:00',
                //     title: '今晚12点整发大红包，先到先得',
                // },{
                //     date: '2018-04-19 21:00:00',
                //     title: '今晚12大红包，先到先得',
                // },
                // {
                //     date: '2018-04-19 21:00:00',
                //     title: '今晚12',
                // }],
                // read: [{
                //     date: '2018-04-19 20:00:00',
                //     title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                // }],
                // recycle: [{
                //     date: '2018-04-19 20:00:00',
                //     title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                // }],
                unreadMessage:[],
                readMessage:[],
                recycleMessage:[]
            }
        },
        methods: {
            handleRead(index) {
                const item = this.unreadMessage.splice(index, 1);
                this.readMessage = item.concat(this.readMessage);//
                this.setMessageStatus(item[0][1]);
            },
            handleDel(index) {
                const item = this.readMessage.splice(index, 1);
                this.recycleMessage = item.concat(this.recycleMessage);
            },
            handleRestore(index) {
                const item = this.recycleMessage.splice(index, 1);
                this.readMessage = item.concat(this.readMessage);
            },
            handleAllRead(){
                let i =0;
                let temple={};
                let length=this.unreadMessage.length
                for(i=0;i<length;i++){
                    temple=this.unreadMessage.pop()
                    this.readMessage.push(temple)//这里删除函数还需要触发修改一下数据库 可以使用循环发送异步通知来完成删除
                }
                this.$message.sucess('全部删除成功')
            },
            async getMessageList(){
                let userId=window.sessionStorage.getItem('userId')
                this.$http.get('http://localhost:8090/api/getdata/getMessageList?userId='+userId)
                .then(res => {
                    this.unreadMessage=res.data.messageList
                })
            },
            setMessageStatus(val){
                //需要知道其中返回的数据的数据格式  //messageId | umId | status | userId | date | messageDes
                this.$http.get('http://localhost:8090/api/savedata/setUserMessageList?umId='+val)//传输umId到后端这样就会现在在提醒你了
            }
        },
        created() {
            this.getMessageList();
        },
        computed: {
            unreadNum(){
                return this.unreadMessage.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

