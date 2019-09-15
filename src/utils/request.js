import axios from 'axios';
import qs from 'Qs';
import { Message, MessageBox } from 'element-ui';
import router from '../router/index';
import { baseUrl } from './baseUrl';
const headers = {
    www: 'application/x-www-form-urlencoded;charset=UTF-8',
    json: 'application/json;charset=UTF-8',
    form: 'multipart/form-data'
};
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: baseUrl,
    timeout: 5000
})

service.interceptors.request.use(config => {
    console.log(config);
    //拦截get请求参数
    switch (config.method) {
        case 'get':
            if (config.url.indexOf('?') === -1) {
                config.url += '?' + qs.stringify(config.data);
            }
            break;
        case 'post': break;
        default: break;
    }
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
    console.log('请求结果', response);
    if (response.status === 200) {
        console.log('请求成功', response.data.meta.success);
        // response.data数据结构{meta:{},data:[]}
        if (response.data.meta.success == false) {//拦截判断
            console.log(response.data.meta.code);
            switch (response.data.meta.code) {
                case '1000'://登录过期
                    console.log('登录过期');
                    MessageBox.alert('当前登录已过期，请重新登录', '登录过期', {
                        confirmButtonText: '确定',
                        showClose: false,
                        type: 'warning',
                        callback: function () {
                            console.log('退出登录');
                            sessionStorage.removeItem('bm_user');
                            sessionStorage.removeItem('bm_menu');
                            sessionStorage.removeItem('bm_roleId');
                            router.push('/login');
                        }
                    });
                    break;
                case '600'://登录错误信息
                    Message.warning(response.data.meta.message);
                    break;
                default: break;
            }
            return Promise.reject();
        } else if (response.data.meta.success == true) {
            return response.data.data;//
        }
    } else {
        Message.error('服务器繁忙请稍后重试！');
        return Promise.reject();
    }
}, error => {
    console.log(error.response);
    //接受后台抛出的错误信息
    //根据error.response.meta判断是否需要拦截抛出的信息
    if (error.response.data.meta) {//存在meta，抛出meta内的提示信息
        switch (error.response.data.meta.code) {//根据code拦截
            case '600'://登录错误信息
                Message.warning(error.response.data.meta.message);
                break;
            default:
                Message.error('服务器繁忙请稍后重试！');
                break;
        }
    } else {//不存在meta,做统一拦截处理
        switch (error.response.status) {//http状态码拦截提示
            case 404:
                Message.error('链接找不到了！');
                break;
            default:
                Message.error('服务器繁忙请稍后重试！');
                break;
        }
    }
    return Promise.reject();
})

export default service;