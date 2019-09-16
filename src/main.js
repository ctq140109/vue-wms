import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | apollo-wms`;
    let isLogin = sessionStorage.getItem('bm_user');
    console.log(to.path);
    if (to.path === '/login' || to.path === '/lease-login') {
        // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
        if (isLogin) {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
        if (!isLogin) {
            next({ path: '/login' })
        } else {
            // 加载动态菜单和路由
            // addDynamicMenuAndRoutes()
            next()
        }
    }
});
/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes() {
    api.menu.findMenuTree()
        .then((res) => {
            store.commit('setMenuTree', res.data)
            // 添加动态路由
            let dynamicRoutes = addDynamicRoutes(res.data)
            router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
            router.addRoutes(router.options.routes);
        })
        .catch(function (res) {
            alert(res);
        });
}
new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
