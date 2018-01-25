import axios from 'axios'
import {Message} from 'element-ui'
import qs from 'qs'

let url = location.href;
let regExp = function (url) {
    let regExp = /form-data/
    return regExp.test(url);
}
let baseURL = '';
if (url.indexOf('127.0.0.1') != -1) {
    baseURL = '/api';
    // baseURL = '';
    // baseURL = 'http://analy.asuscomm.com:8082/';
} else {
    baseURL = ''
}

axios.defaults.baseURL = baseURL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params._ = Date.now();// 防止请求缓存
    if (!regExp(config.headers['Content-Type'])) {
        config.data = config.data && qs.stringify(config.data)// post处理
    }

    // 在发送请求之前做些什么
    return config;
}, function (error) {

    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    // debugger;
    let data = response.data;
    if (response.status === 200) {
        if (data.status == 0) {
            Message({
                showClose: true,
                message: data.msg,
                type: 'error'
            })
            return new Promise(() => {
            });
        }
    }
    // 对响应数据做点什么
    return data;
}, function (error) {

    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;
