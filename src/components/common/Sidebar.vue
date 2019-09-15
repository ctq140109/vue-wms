<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in menu">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <!-- <template v-for="item in menus">
                <template v-if="item.childMenus.length > 0">
                    <el-submenu :index="item.urlPath" :key="item.urlPath">
                        <template slot="title">
                            <template v-show="item.imageStroePath">
                                <i :class="item.imageStroePath"></i>
                            </template>
                            <span slot="title">{{ item.menuName }}</span>
                        </template>
                        <template v-for="subItem in item.childMenus">
                            <el-submenu
                                v-if="subItem.childMenus.length > 0"
                                :index="subItem.urlPath"
                                :key="subItem.urlPath"
                            >
                                <template slot="title">{{ subItem.menuName }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.childMenus"
                                    :key="i"
                                    :index="threeItem.urlPath"
                                >{{ threeItem.menuName }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.urlPath"
                                :key="subItem.urlPath"
                            >{{ subItem.menuName }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.urlPath" :key="item.urlPath">
                        <template v-show="item.imageStroePath">
                            <i :class="item.imageStroePath"></i>
                        </template>
                        <span slot="title">{{ item.menuName }}</span>
                    </el-menu-item>
                </template>
            </template> -->
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            menu: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '基础表格'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: 'tab选项卡'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    subs: [
                        {
                            index: 'form',
                            title: '基本表单'
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            subs: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                },
                                {
                                    index: 'test',
                                    title: '测试页'
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'icon',
                    title: '自定义图标'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表'
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '国际化功能'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/donate',
                    title: '支持作者'
                }
            ],
            menus: [
                {
                    id: 1,
                    menuName: '系统设置',
                    urlPath: 'system',
                    imageStroePath: 'el-icon-lx-home',
                    parentId: 0,
                    orderNumber: 0,
                    state: true,
                    createTime: '2019-03-11 04:46:45',
                    cancelTime: null,
                    description: null,
                    childMenus: [
                        {
                            id: 5,
                            menuName: '企业角色',
                            urlPath: 'companyRole-manage',
                            imageStroePath: 'el-icon-lx-home',
                            parentId: 1,
                            orderNumber: 0,
                            state: true,
                            createTime: '2019-03-18 08:33:38',
                            cancelTime: null,
                            description: null,
                            childMenus: []
                        },
                        {
                            id: 6,
                            menuName: '企业管理',
                            urlPath: 'company-manage',
                            imageStroePath: 'el-icon-lx-home',
                            parentId: 1,
                            orderNumber: 0,
                            state: true,
                            createTime: null,
                            cancelTime: null,
                            description: null,
                            childMenus: []
                        },
                        {
                            id: 7,
                            menuName: '员工角色',
                            urlPath: 'staffRole-manage',
                            imageStroePath: null,
                            parentId: 1,
                            orderNumber: 1,
                            state: true,
                            createTime: null,
                            cancelTime: null,
                            description: null,
                            childMenus: []
                        },
                        {
                            id: 8,
                            menuName: '员工管理',
                            urlPath: 'staff-manage',
                            imageStroePath: null,
                            parentId: 1,
                            orderNumber: 2,
                            state: true,
                            createTime: null,
                            cancelTime: null,
                            description: null,
                            childMenus: []
                        }
                    ]
                },
                {
                    id: 2,
                    menuName: '业务设置',
                    urlPath: 'business',
                    imageStroePath: 'el-icon-lx-home',
                    parentId: 0,
                    orderNumber: 1,
                    state: true,
                    createTime: '2019-03-11 04:51:36',
                    cancelTime: null,
                    description: null,
                    childMenus: [
                        {
                            id: 17,
                            menuName: '货物品名管理',
                            urlPath: 'goods-manage',
                            imageStroePath: null,
                            parentId: 2,
                            orderNumber: 11,
                            state: true,
                            createTime: null,
                            cancelTime: null,
                            description: null,
                            childMenus: []
                        },
                        {
                            id: 18,
                            menuName: '单位类型管理',
                            urlPath: 'unitType-manage',
                            imageStroePath: '',
                            parentId: 2,
                            orderNumber: 12,
                            state: true,
                            createTime: '2019-04-16 09:52:34',
                            cancelTime: '2019-04-16T01:52:38.000+0000',
                            description: '',
                            childMenus: []
                        },
                        {
                            id: 19,
                            menuName: '单位管理',
                            urlPath: 'unit-manage',
                            imageStroePath: '',
                            parentId: 2,
                            orderNumber: 13,
                            state: true,
                            createTime: '2019-04-25 09:52:41',
                            cancelTime: '2019-04-25T01:52:44.000+0000',
                            description: '',
                            childMenus: []
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods:{
        getRoleMenu(){
            
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
        });
        //获取当前角色菜单
        this.getRoleMenu();
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
