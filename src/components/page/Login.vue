<template>
    <!-- <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">Apollo仓储管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="account">
                    <el-input v-model="param.account" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="param.code" placeholder="请输入企业标识码">
                        <el-button slot="prepend" icon="el-icon-key"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="companyRoleId">
                    <el-select v-model="param.companyRoleId" clearable placeholder="请选择角色">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.companyRoleName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" v-loading="loading" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>-->
    <section>
        <div class="full-page-bg">
            <h1>斑马酒仓WMS管理系统</h1>
        </div>
        <div class="containers">
            <div class="left-logo">
                <img src="../../assets/logo/200-200.png" alt />
            </div>
            <div id="login-box">
                <div class="login-header">用户登录</div>
                <el-form
                    :model="param"
                    :rules="rules"
                    ref="login"
                    label-width="0px"
                    class="login-form"
                >
                    <el-form-item prop="account">
                        <el-input v-model="param.account" placeholder="请输入用户名">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="param.password">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input v-model="param.code" placeholder="请输入企业标识码">
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="companyRoleId">
                        <el-select v-model="param.companyRoleId" clearable placeholder="请选择角色">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.companyRoleName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" v-loading="loading" @click="submitForm()">登录</el-button>
                    </div>
                </el-form>
                <div class="login-footer">
                    <small>
                        Copyright © 2019
                        <i>Apollo-wms.com</i> All rights reserved
                    </small>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { login, getRoles, getCompanyType } from '../../api/index.js';
export default {
    data: function() {
        return {
            loading: false,
            roleList: [], //用户角色列表
            param: {
                account: '',
                password: '',
                code: '',
                companyRoleId: ''
            },
            rules: {
                account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入企业标识码', trigger: 'blur' }],
                companyRoleId: [{ required: true, message: '请选择角色', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let param = Object.assign(this.param);
                    login(param)
                        .then(data => {
                            getCompanyType()
                                .then(res => {
                                    console.log(res);
                                    this.$message.success('登录成功');
                                    sessionStorage.setItem('bm_user', JSON.stringify(data.user));
                                    sessionStorage.setItem('bm_menu', JSON.stringify(data.menu));
                                    sessionStorage.setItem('bm_roleId', JSON.stringify(data.roleId));
                                    this.loading = false;
                                    this.$router.push('/');
                                })
                                .catch(err => {
                                    this.loading = false;
                                });
                        })
                        .catch(err => {
                            this.loading = false;
                        });
                } else {
                    this.loading = false;
                    this.$message.error('请完善登录信息！');
                    return false;
                }
            });
        }
    },
    mounted() {
        getRoles({})
            .then(res => {
                console.log('角色列表', res);
                this.roleList = res;
            })
            .catch(err => {
                console.log('获取失败', err);
            });
    }
};
</script>

<style scoped>
.full-page-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -100;
    background: url('../../assets/logo/bg5.jpg') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.full-page-bg h1 {
    margin-bottom: 500px;
    color: white;
    font-size: 38px;
}
.containers {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 800px;
    height: 400px;
    background: white;
}
.left-logo {
    width: 50%;
    height: 100%;
    float: left;
    background: rgb(24, 144, 255);
    display: flex;
    align-items: center;
    justify-content: center;
}
#login-box {
    width: 50%;
    height: 100%;
    float: right;
}
.login-header,
.login-footer {
    width: 100%;
    background: rgb(242, 242, 242);
    text-align: center;
}
.login-header {
    height: 40px;
    line-height: 40px;
    color: rgb(24, 144, 255);
    font-size: 20px;
}
.login-footer {
    height: 40px;
    line-height: 40px;
    color: gray;
}
.login-form {
    padding: 20px 50px;
    width: calc(100% - 100px);
    height: calc(100% - 120px);
}
.el-form-item {
    margin-bottom: 30px !important;
}
.el-select {
    display: block !important;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
}
</style>