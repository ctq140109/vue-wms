<template>
    <div class="login-wrap">
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
                        <!-- @keyup.enter.native="submitForm()" -->
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
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import { login, getRoles } from '../../api/index.js';
export default {
    data: function() {
        return {
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
                    let param = Object.assign(this.param);
                    login(param)
                        .then(res => {
                            console.log('登录成功', res);
                            // this.$message.success('登录成功');
                            // localStorage.setItem('ms_username', this.param.username);
                            // this.$router.push('/');
                        })
                        .catch(err => {
                            console.log('登录失败', err);
                        });
                } else {
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
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>