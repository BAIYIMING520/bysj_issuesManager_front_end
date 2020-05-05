<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> issues查看
                </el-breadcrumb-item>
                <el-breadcrumb-item>查看issue</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row >
                <el-col :span="4" >
                    <el-card style="width:250px">
                        <div slot="header" class="clearfix">
                            <span>issue属性</span>
                        </div>
                        <div>
                            <div><span>Issue id: </span><span>{{ issue.dataId }}</span></div>
                            <div><span>Issue 类型: </span><span>{{ issue.type }}</span></div>
                            <div><span>Issue 优先级: </span><span>{{ issue.priority }}</span></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card class="box-card" style="width:250px;margin-bottom:10px">
                        <div slot="header" class="clearfix">
                            <span>reporter</span>
                        </div>
                        <div>
                            <div><span>reporter name: </span><span>{{ issue.reporter }}</span></div>
                            <div><span>created date: </span><span>{{ issue.created}}</span></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card class="box-card" style="width:250px;margin-bottom:20px">
                        <div slot="header" class="clearfix">
                            <span>assignee</span>
                        </div>
                        <div>
                            <div><span>assignee name:</span><span>{{ issue.assignee }}</span></div>
                            <div><span>updated date:  </span><span>{{ issue.updated }}</span></div>
                            <div><span>status:  </span><span>{{ issue.status }}</span></div>
                            <div><span>resolution:  </span><span>{{ issue.resolution }}</span></div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12" >
                    <el-card class="box-card" style="margin-bottom:20px">
                        <div slot="header" class="clearfix" >
                            <div><span>标题</span><el-divider direction="vertical"></el-divider><span>{{ issue.title }}</span></div>    
                        </div>
                        <div>
                            <div><span>简述</span><el-divider direction="vertical"></el-divider><span>{{ issue.body }}</span></div>
                        </div>
                    </el-card>  
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="24">
                <el-col :span="6"> 
                    <el-card style="height:600px">
                        <div style="padding-bottom:10px; text-align:center"><p>标签标定</p></div>
                        <el-divider></el-divider>
                        <!--这里需要改造成可以重复打标签的还是不要重复打标签 我觉得是不需要重复打标签的-->
                        <div v-if="issue.tagId !=''">
                            <!--这里写的应该读取其中的   .tagName  .level .color .description-->
                            <div class="description">
                                <span>问题类型:</span>
                                <span>{{ this.TagOfIssue.name  }}</span>
                            </div>
                            <div class="description">
                                <span>严重程度:</span>
                                <span>{{ this.TagOfIssue.level }}</span>
                            </div>    
                            <div>
                                <div>建议解决方式:</div>
                                <div v-html="this.TagOfIssue.description"></div>
                                <!-- <div>{{ this.TagOfIssue.description }}</div>   -->
                                <!--这了应该还有重新提交标签的方法 但是后面再做-->
                            </div>                      
                        </div>
                        <div v-else>
                            <div v-if="authority ==='type1'||authority ==='type2'">
                                <div>暂无标签</div> <!-- 这里完成一定 -->
                                <div style="padding-top:20px">可以进行打标签</div>
                                <el-select v-model="TypeValue" placeholder="请选择" style="padding-top:20px; width:240px" clearable>
                                    <el-option
                                    v-for="(item,index) in TagListArray"
                                    :key="index"
                                    :label="item.tagName"
                                    :value="index">
                                    </el-option>
                                </el-select>
                                <div style="float:right;padding-top:20px">
                                    <el-button round v-on:click="submitTag">提交</el-button>
                                </div> 
                            </div>
                            <div v-else>
                                <div>暂且无推荐解决手段</div>
                            </div>
                        </div>     
                    </el-card>          
                </el-col>
                <el-col :span="18">
                    <el-card>
                        <div>评论区</div>   
                        <el-divider></el-divider>
                        <el-row :gutter="24">
                            <el-col :span="2">
                                <el-avatar :size="50" :src="pic_path" :fit="fit_pattern" style="display:inline-box" >{{ userName }}</el-avatar>
                            </el-col>
                            <el-col :span="22">
                                <el-input
                                    type="textarea"
                                    placeholder="请输入评论内容"
                                    v-model="addDescription"
                                    maxlength="100"
                                    show-word-limit>
                                </el-input>
                            </el-col>
                        </el-row>
                        <div style="height:15px;padding-top:10px">
                            <div style="float:right;">
                                <el-button type="primary" style="padding-top:10px" v-on:click="submitDes">提交评论</el-button>
                            </div>
                        </div> 
                        <el-divider></el-divider>
                        <!--评论区-->
                        <div v-for="(item, index) in this.desList" :key="index" style="padding-bottom:10px">
                            <el-card style="border-radius: 4px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
                                <el-row :gutter="24">
                                    <el-col :span="2">
                                        <el-avatar :size="50" :src="pic_path" :fit="fit_pattern" style="display:inline-box" >{{ item[1] }}</el-avatar>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="author-name">{{ item[1] }}</div>
                                        <div class="author-date">{{ item[0].date }}</div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div><span>支持</span><i class="el-icon-caret-top"></i></div>
                                    </el-col>
                                </el-row>                     
                                <el-divider></el-divider>
                                {{ item[0].description }}
                            </el-card>
                        </div>    
                        <!--评论区-->
                            <el-pagination
                            :page-size="query_des.pageSize"
                            :current-page="query_des.pageIndex"
                            :pagerCount=5
                            :total="totalElements"
                            layout="prev, pager, next"
                            @current-change="handlePageChange">
                            </el-pagination>
                    </el-card>
                 </el-col>
            </el-row>
        </div>
    </div>       
</template>
<script>
import { fetchData_I, fetchData_T, fetchData_DesUname, fetchData_Des, saveDes} from '../../api/index'

export default {
    data () {
      return {
        TypeValue:'',
        issue:{},
        addDescription:'',
        query_issue:{},
        authority:'',
        query_tag:{},
        TagListArray:[],
        userName:'',
        fit_pattern:'fill',
        pic_path:'../../assets/img/login-bg.png',
        tagTmeple:{},
        desList:[], //这里需要添加一个支持数 之后在数据库中可以增加
        totalElements:50,
        color_pattern:{
            1:{
                color:'red',
                level:'致命缺陷'
            },
            2:{
                color:'orange',
                level:'严重缺陷'
            },
            3:{
                color:'yellow',
                level:'一般缺陷'
            },
            4:{
                color:'blue',
                level:'值得关注的缺陷'
            },
            5:{
                color:'green',
                level:'可以忽略的缺陷'
            }       
        },
        TagOfIssue:{
            level:'',
            description:'',
            name:''
        },
        query_des: {
                querypara: '',
                pageIndex: 1,
                pageSize: 8
        },
        submit_des: {
                description:'',
                dataId:0,
                userId:0
        }
      }
    },
    created() {
        this.query_issue={}
        this.query_issue.dataId = parseInt(window.sessionStorage.getItem('dataId'));
        this.authority=window.sessionStorage.getItem('authority')//方便权限管理
        this.userName=JSON.parse((window.sessionStorage.getItem('userProperty'))).username;
        //------data id 获取
        this.query_des.querypara=this.query_issue.dataId
        this.getDes();
        //-----------------------
        this.GetTagOfIssue();//这里在获得issue和tag后再获得当前
        
    },
    methods: {
        async getIssue(){
            await fetchData_I(this.query_issue)//使用axios接口获取数据
             .then(res => {
                 //这里获取数据
                 const{ issue:data } =res
                 this.issue = data;
             });
        },
        async getDes(){
            await fetchData_DesUname(this.query_des)
            .then(res =>{  
                const {userNameAndDes:data}=res
                this.desList=data.content// 其中有三个数据节点 content pageable
                this.totalElements = data.totalElements||50 
            })
        },
        async getTag(){
            await fetchData_T(this.query_tag)
            .then(res => {
                const {TagList:data}=res
                this.TagListArray=data
            });
        },
        async submitDes(){
            this.submit_des.description=this.addDescription
            this.submit_des.dataId=this.issue.dataId
            this.submit_des.userId=window.sessionStorage.getItem('userId')
            await saveDes(this.submit_des)
            .then(res =>{  
                this.$message.success('提交评论成功！');//这里提交评论后再次获得评论来刷新一下
                this.addDescription='';//清空
                this.query_des.querypara=this.issue.dataId;//这了注意 一定要传入dataId 你需要注意api参数
                this.getDes(this.issue.tagId);
            })
        },
        GetTagOfIssue(){ //注意传回来的tag list是从0开始的 但是数据库中的tag标号是从1开始的 所以记得要-1
            this.$http.all([this.getIssue(), this.getTag()])
            .then(res => {
                if(this.issue.tagId!=0){
                    let i=0;
                    let temple={}
                    for(i=0;i<this.TagListArray.length;i++)
                    {
                        if(this.TagListArray[i].tagId === this.issue.tagId)
                        {
                            temple=this.TagListArray[i]
                            break;
                        }
                    }
                    this.TagOfIssue.name= temple.tagName
                    this.TagOfIssue.description= temple.description
                    this.TagOfIssue.level=this.color_pattern[temple.color].level
                }
            })      
        },
        submitTag(){
            //这类完成提交数据
            //1.变换本地数据 2.提交数据 3.弹窗 4.获取新的数据
            //提交需要进行一次判断
            if(this.TypeValue === '' ){
                this.$message.error('提交失败，请选择后再提交！')
            }else{
                this.$http.get('http://localhost:8090/api/savedata/saveTagOfIssue?dataId='+this.issue.dataId+'&tagId='+(this.TypeValue+1))
                .then(res => {
                    this.$message.success('提交标签成功')
                    this.GetTagOfIssue();//再次获得新数据渲染
                })
            }
        },
        handlePageChange(val){
            this.$set(this.query_des, 'pageIndex', val);
            this.getDes();
        }
    },  
    mounted() {   

    },
}
</script>
<style scoped>
.description{
    padding-bottom: 20px;
}
.description span{
    padding-right: 20px;
    
}
.dividerLine{
    margin-top: 10px;
    margin-bottom: 10px;
}
.text {
    font-size: 14px;
}
.item {
    margin-bottom: 18px;
  }
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  /* .box-card {
    width: 480px;
  } */

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .middle_text{
      align:center;
  }
.author-name{
    color:#000;
    font-size:18px;
    font-weight:bold
}
.author-time{
    font-size:14px;
}  
</style>

