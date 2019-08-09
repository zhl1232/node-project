<!--
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-03 18:51:47
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 15:21:18
 * @Description: file content
 * @Versions: 1.0.0
 -->
<template>
  <div class="container">
    <h1>登录</h1>
    <el-form ref="form" :model="form" label-position="top" @keyup.enter.native="onSubmit">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" placeholder="请输入密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item style="text-align:center">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      } 
    };
  },
  methods: {
    onSubmit() {
      login(this.form)
        .then(res => {
          this.$message.success("登录成功");
          this.$store.commit("login");
          this.$router.push("/");
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 500px;
  margin: 80px auto;
  h1 {
    text-align: center;
  }
}
</style>
