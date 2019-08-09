<!--
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-03 19:39:10
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 17:40:32
 * @Description: file content
 * @Versions: 1.0.0
 -->
<template>
  <div class="container">
    <!-- <img src="http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg" alt=""> -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="hsla(0,0%,100%,.3)"
      text-color="#000"
      active-text-color="rgb(0, 128, 255)"
      :router="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="2">前端开发</el-menu-item>
      <el-menu-item index="2">算法相关</el-menu-item>
      <el-menu-item index="4">node</el-menu-item>
      <el-menu-item index="/article" v-if="loginState">写文章</el-menu-item>
      <el-menu-item index="/register" style="float:right" v-if="!loginState">注册</el-menu-item>
      <el-menu-item index="/login" style="float:right" v-if="!loginState">登录</el-menu-item>
      <el-menu-item style="float:right" v-if="loginState" @click="dialogVisible = true">退出</el-menu-item>
      <el-menu-item index="3" style="float:right" v-if="loginState">消息中心</el-menu-item>
      <el-menu-item index="/personal-center" style="float:right" v-if="loginState">个人中心</el-menu-item>
    </el-menu>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定要退出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      dialogVisible: false
    };
  },
  computed: {
    ...mapState(["loginState"])
  },
  methods: {
    logout() {
      this.dialogVisible = false;
      this.$store.dispatch("LogOut").then(res => {
        this.$router.push("/");
      });
    }
  },
  created() {
    
    
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-image: url("../assets/nav-bg.png");
  ul {
    .el-menu-item:hover {
      background-color: hsla(0, 0%, 100%, 0.6) !important;
      color: rgb(0, 128, 255);
    }
  }
}
</style>
