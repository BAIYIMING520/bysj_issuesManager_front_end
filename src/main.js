import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';

import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios //将默认的参数配置也改换 默认的http的请求使用的是axios接口 后面写成前端api列表操作


Vue.use(ElementUI, {
    size: 'small'
});

Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
