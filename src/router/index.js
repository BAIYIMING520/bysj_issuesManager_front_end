import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes=[
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/table',
                component: () => import(/* webpackChunkName: "table" */ '../components/page/TablePage.vue'),
                meta: { title: 'issues库列表' }
            },
            {
                path: '/issues',
                component: () => import(/* webpackChunkName: "table" */ '../components/page/IssuesPage.vue'),
                meta: { title: 'issues列表' }
            },
            {
                path: '/data',
                component: () => import(/* webpackChunkName: "table" */ '../components/page/ShowIssue.vue'),
                meta: { title: '查看指定issue' }
            },
            {
                path: '/tabs',
                component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                meta: { title: 'tab选项卡' }
            },
            {
                path: '/publishMessage',
                component: () => import(/* webpackChunkName: "publishMessage" */ '../components/page/publishMessage.vue'), //publishMessage
                meta: { title: 'publishMessage' }
            },
            {
                path: '/createTag',
                component: () => import(/* webpackChunkName: "form" */ '../components/page/createTag.vue'),
                meta: { title: '新建issue标签' }
            },
            {
                // 文件上传组件
                path: '/upload',
                component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                meta: { title: '新Issue表上传' }
            },
            {
                // 标签库
                path: '/showTag',
                component: () => import(/* webpackChunkName: "upload" */ '../components/page/showTags.vue'),
                meta: { title: '查看标签库' }
            },
            {
                // vue-schart
                path: '/charts1',
                component: () => import(/* webpackChunkName: "chart" */ '../components/page/WholeCharts.vue'),
                meta: { title: '全局列表分析' }
            },
            {
                // vue-schart
                path: '/charts2',
                component: () => import(/* webpackChunkName: "chart" */ '../components/page/tableCharts.vue'),
                meta: { title: '指定类表数据分析' }
            },
 
            {
                // 拖拽列表
                path: '/drag',
                component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                meta: { title: '拖拽列表' }
            },      
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/403',
                component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'), //publishMessage
                meta: { title: '403' }
            }
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new Router({
    routes
  })

//使用钩子函数对路由进行权限跳转    路由导航
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = window.sessionStorage.getItem('username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
                    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已 
                    // 这里需要更多的东西
        role === 'admin' ? next() : next('/403');
    } else {
                    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容 如果不可以 则不放行
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

export default router