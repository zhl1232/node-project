<!--
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-07-27 18:33:13
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 17:37:48
 * @Description: file content
 * @Versions: 1.0.0
 -->
<template>
  <div class="container">
    <h1>注册</h1>
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
      <el-form-item label="验证码" placeholder="请输入邮箱验证码">
        <el-row>
          <el-col :span="18">
            <el-input v-model="form.verifyCode"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="getVerifyCode" style="width:123px">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="密码" placeholder="请输入密码，不少于8位">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" placeholder="请再次输入密码">
        <el-input v-model="form.affirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="text">已有注册帐号，去登录</el-button>
        <el-button type="primary" @click="onSubmit">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { register, getVerifyCode, login } from "@/api/user";
import { async } from "q";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        verifyCode: "",
        password: "",
        affirmPassword: ""
      }
    };
  },
  methods: {
    onSubmit() {
      register(this.form)
        .then(res => {
          this.$message.success("注册成功");

          login(this.form).then(res => {
            // this.$message.success("登录成功");
            this.$store.commit("login");
            this.$router.push("/");
          });
        })
        .catch(res => {
          console.log("error");
        });
    },
    getVerifyCode() {
      getVerifyCode(this.form.email)
        .then(res => {
          console.log(res);
        })
        .catch(res => {});
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
