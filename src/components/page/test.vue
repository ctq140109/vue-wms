<template>
    <section>
        <div>测试{{title}}</div>
        <el-row>
            <el-button @click="dianji()">默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
    </section>
</template>
<script>
export default {
    data() {
        return {
            title: '123'
        };
    },
    methods: {
        dianji(){
            alert('点击');
        }
    }
};
</script>
<style scoped>
</style>