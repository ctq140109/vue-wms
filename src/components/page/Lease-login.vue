<template>
    <section>
        <div class="full-page-bg">
            <h1>斑马酒仓WMS管理系统</h1>
            <h4 @click="toLogin">前往运营登录</h4>
        </div>
        <div class="containers">
            <div class="left-logo">
                <img src="../../assets/logo/200-200.png" alt />
            </div>
            <div id="login-box">
                <div class="login-header">租户登录</div>
                <el-form
                    :model="param"
                    :rules="rules"
                    ref="login"
                    label-width="0px"
                    class="login-form"
                    @submit.native.prevent
                >
                    <el-form-item prop="account">
                        <el-input v-model="param.account" placeholder="请输入账户名">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="param.password">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input v-model="param.code" placeholder="请输入企业标识码">
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="login-btn">
                        <el-button
                            type="success"
                            native-type="submit"
                            v-loading="loading"
                            @click="submitForm"
                        >登录</el-button>
                    </el-form-item>
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
            param: {
                account: '',
                password: '',
                code: '',
                companyRoleId: 3
            },
            rules: {
                account: [
                    { required: true, message: '账户名不能为空', trigger: 'blur' },
                    { pattern: /^[a-zA-Z0-9_]{3,16}$/, message: '账户格式：3到16位（字母，数字或下划线）' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '密码格式：6到20位（字母或数字）' }
                ],
                code: [{ required: true, message: '企业标识码不能为空', trigger: 'blur' }]
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
                            console.log(data.user.companyId);
                            getCompanyType({ id: data.user.companyId })
                                .then(res => {
                                    this.$message.success('登录成功');
                                    data.user.type = res.type;
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
                }
            });
        },
        toLogin() {
            this.$router.push('/login');
        }
    },
    mounted() {}
};
</script>

<style scoped>
.full-page-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff url('../../assets/logo/backgroud.png') 50% 50% no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}
.full-page-bg h1 {
    margin-bottom: 500px;
    color: white;
    font-size: 38px;
}
.full-page-bg h4 {
    position: absolute;
    top: 0;
    right: 0;
    margin: 30px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    z-index: 100;
    cursor: pointer;
}
.full-page-bg h4:hover {
    padding-bottom: 3px;
    border-bottom: 1px solid #fff;
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
    /* background: rgb(24, 144, 255); */
    background: rgba(61, 187, 43, 1);
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
    color: rgba(61, 187, 43, 1);
    font-size: 20px;
}
.login-footer {
    height: 40px;
    line-height: 40px;
    color: gray;
}
.login-form {
    padding: 50px;
    width: calc(100% - 100px);
    height: calc(100% - 180px);
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