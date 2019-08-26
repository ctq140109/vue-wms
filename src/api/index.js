import request from '../utils/request';
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