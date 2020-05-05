<template>
    <div class="wrapper">
        <v-head :user-property="userProperty"></v-head> 
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in"> <!--transition标签用于过度动画-->
                    <keep-alive :include="tagsList"><!--失活组件将会被缓存到tag的list中 也就是tag上显示的那样-->
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
    <!-- 这里需要在home组件中进行渲染部分的变量 -->
</template>


<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            userProperty:{
                username:'error',
                tableId:-1,//这里 -1是可以是不能操作的 当时0的时候 可以操作所有的表 当是大于0的时候 能操作对于的表
                authority:'type3',//级别最低的等级
                token:'',
                authorityType:''
            },
            //-----------------
            TestJson:{
                para1:11111,
                para2:'testSTR'
            }
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    computed: {
        initialProperty() {
            let username = window.sessionStorage.getItem('username');
            let authorityType='';
            let authority=window.sessionStorage.getItem('authority')
            let token=window.sessionStorage.getItem('token')
            let tableId=window.sessionStorage.getItem('tableId')
            this.userProperty.username=username;
            this.userProperty.authority=authority;
            this.userProperty.token=token;
            this.userProperty.tableId=tableId;
            if (authority === 'type2'){
                this.userProperty.authorityType='helper'
            }else if (authority === 'type1'){
                this.userProperty.authorityType='admin'
            }else {
                this.userProperty.authorityType='reader'
            }
            let userProperty=JSON.stringify(this.userProperty)
            window.sessionStorage.setItem('userProperty',userProperty)
            return this.userProperty;
            //这直接将这个东西存在sessionStorage中方便占用
        }
    },
    created() {
        this.initialProperty;
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);//这个写的有点聪明 其实利用编译器从左到右编译特性 如果前面为空直接返回 后面就不push
            }
            this.tagsList = arr;
        });
        //-----------------------------这里是测试json的代码 尝试使用axios来发送数据 测试成功
        //let resp=this.$http({method: 'POST',url:'http://localhost:8090/jsonTest',headers:{'Content-Type':'application/json; charset=utf-8'},data:JSON.stringify(this.TestJson)})
    }
};
</script>
