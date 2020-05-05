import axios from 'axios';

const service = axios.create({
    // 本地的springboot都是在这个端口下开放api函数的
    baseURL: 'http://localhost:8090/api',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        config.headers.Authorization=window.sessionStorage.getItem('token') //这里用于验证token方式
        return config; 
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
