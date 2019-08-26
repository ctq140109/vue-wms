import request from '../utils/request';
import qs from 'Qs';
const headers = {
    www: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    json: { 'Content-Type': 'application/json;charset=UTF-8' },
    form: { 'Content-Type': 'multipart/form-data' }
};
// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }
//获取企业角色
export const getRoles = (query) => {
    return request({
        url: '/ApolloManagement/companyRole/findCompanyRole',
        method: 'post',
        data: query,
        type:'json'
    })
}
//登录
export const login = (query) => {
    return request({
        url: '/ApolloManagement/login/loginUser',
        method: 'post',
        data: query,
        type:'www'
    })
}