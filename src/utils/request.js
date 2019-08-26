import axios from 'axios';
import qs from 'Qs';
import { Message } from 'element-ui';
const headers = {
    www: 'application/x-www-form-urlencoded;charset=UTF-8',
    json: 'application/json;charset=UTF-8',
    form: 'multipart/form-data'
};
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    // baseURL: 'https://www.apollo-wms.com',
    baseURL: 'http://localhost:16443',
    timeout: 5000
})

service.interceptors.request.use(config => {
    console.log(config);
    //拦截设置请求头
    switch (config.type) {
        case 'json': config.headers["Content-Type"] = headers.json; break;
        case 'www':
            config.headers["Content-Type"] = headers.www;
            config.data = qs.stringify(config.data);
            break;
        case 'form': config.headers["Content-Type"] = headers.form; break;
        default: break;
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if (response.status === 200) {
        console.log('请求成功');
        // response.data数据结构{meta:{},data:''}
        if (response.data.meta.success == false) {//拦截判断
            console.log(response.data.meta.code);
            switch (response.data.meta.code) {
                case '1000'://登录过期

                    break;
                case '600'://登录错误信息
                    Message.warning(response.data.meta.message);
                    break;
                default: break;
            }
            Promise.reject();
        } else if (response.data.meta.success == true) {
            return response.data.data;//
        }
    } else {
        console.log('服务器繁忙请稍后重试！');
        Message.error('服务器繁忙请稍后重试！');
        Promise.reject();
    }
}, error => {
    console.log(error.response);
    switch (error.response.status) {//http状态码拦截提示
        case 404:
            Message.error('链接找不到了！');
            break;
        default:
            Message.error('服务器繁忙请稍后重试！');
            break;
    }
    return Promise.reject();
})

export default service;