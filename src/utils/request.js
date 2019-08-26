import axios from 'axios';
import qs from 'Qs';
import { Message } from 'element-ui';
const headers = {
    www: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    json: { 'Content-Type': 'application/json;charset=UTF-8' },
    form: { 'Content-Type': 'multipart/form-data' }
};
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    // baseURL: 'https://www.apollo-wms.com',
    baseURL: 'http://localhost:16443',
    // headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
    // headers:{'Content-Type':'application/json;charset=UTF-8'},
    // headers:{'Content-Type':'multipart/form-data'},
    timeout: 5000
})

service.interceptors.request.use(config => {
    console.log(config);
    //拦截设置请求头
    switch (config.type) {
        case 'json': config.headers["Content-Type"] = 'application/json;charset=UTF-8'; break;
        case 'www': 
            config.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
            config.data = qs.stringify(config.data);
            break;
        case 'form': config.headers["Content-Type"] = 'multipart/form-data'; break;
        default:break;
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if (response.status === 200) {
        // response.data数据结构{meta:{},data:''}
        if (response.data.meta.success == false) {//拦截判断
            switch (response.data.meta.code) {
                case 1000://登录过期

                    break;
                case 600://登录错误信息
                    this.$message.error(response.data.meta.message);
                    break;
                default: break;
            }
            Promise.reject();
        } else if (response.data.meta.success == true) {
            return response.data.data;//
        }
    } else {
        console.log('服务器繁忙请稍后重试！');
        switch (response.status) {//http状态码拦截提示
            case 403:
                break;
            case 404:
                // this.message.error('链接找不到了！');
                // this.$message.error(response.statusText + '链接找不到了！' + response.url);
                break;
            case 500:
                console.log('服务器繁忙请稍后重试！');
                // this.$message.error(response.statusText + '服务器繁忙请稍后重试！' + response.url);
                break;
            case 504:
                // this.$message.error(response.statusText + '网络连接超时！请稍后重试！' + response.url);
                break;
            default:
                // this.$message.error(response.statusText + response.url);
                break;
        }
        Promise.reject();
    }
}, error => {
    console.log(error);
    Message.error('链接找不到了！');
    return Promise.reject();
})

export default service;