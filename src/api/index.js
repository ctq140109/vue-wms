import request from '../utils/request';
//获取企业角色
export const getRoles = () => {
    return request({
        url: '/ApolloManagement/companyRole/findCompanyRole',
        method: 'post'
    })
}
//获取公司类型
export const getCompanyType = (query) => {
    return request({
        url: '/ApolloManagement/company/getCompanyType',
        data: query
    })
}
//登录
export const login = (query) => {
    return request({
        url: '/ApolloManagement/login/loginUser',
        method: 'post',
        data: query,
        type: 'www'
    })
}
//退出登录
export const loginOut = () => {
    return request({
        url: '/ApolloManagement/login/loginOut'
    })
}