<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#303133"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            username:'testuser',
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-warning',
                    title: '消息区域',
                    index: '2', //index: 'tabs',
                    subs:[
                        {
                            icon:'el-icon-warning',
                            index: 'tabs',
                            title: '查看消息'
                        },
                        {
                            icon:'el-icon-document',
                            index: 'publishMessage',
                            title: '发布消息'
                        }
                    ]
                },
                {
                    icon: 'el-icon-document',
                    index: '3',
                    title: 'issues查看',
                    subs: [
                        {
                            icon:'el-icon-document',
                            index: 'table',
                            title: 'issues库列表' //IssuesTables selectIssues   publishMessage
                        },
                        {
                            icon:'el-icon-document',
                            index: 'issues',
                            title: 'issues列表'
                        },
                        {
                            icon:'el-icon-document',
                            index: 'data',
                            title: '查看指定issue'
                        }
                    ]
                },
                {
                    icon: 'el-icon-upload',
                    index: 'upload',
                    title: '新Issue表上传'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '5',
                    title: '标签库',
                    subs: [
                        {
                            index: 'createTag',
                            title: '新建立issue标签'
                        },
                        {
                            index: 'showTag',
                            title: '查看标签库'
                        }
                    ]
                },
                {
                    icon: 'el-icon-data-line',
                    index: '6',
                    title: '数据分析',
                    subs:[
                        {
                            index:'charts1',
                            title:'全局数据库分析'
                        },
                        {
                            index:'charts2',
                            title:'指定数据库分析'
                        }
                    ]
                },
                {
                    icon: 'el-icon-rank',
                    index: '7',
                    title: 'todolist',
                    subs: [ //这里可以来一个任务指派操作
                        {
                            index: 'drag',
                            title: 'todolist'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 150px;
}
.sidebar > ul {
    height: 100%;
}
</style>
