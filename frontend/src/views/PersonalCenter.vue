<!--
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-04 14:58:13
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 17:30:12
 * @Description: file content
 * @Versions: 1.0.0
 -->
<template>
  <div class="wrap">
    <img src="../assets/nav-bg.png" alt width="1200" />
    <el-upload
      class="avatar-uploader"
      :action="IMG_BASE_API"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div class="avatar-wrap" v-if="imageUrl">
        <img :src="imageUrl" class="avatar" />
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <div class="content">
      <Items title="昵称" argument="nikename" :userInfo.sync="userInfo"></Items>

      <Items title="email" argument="email" :userInfo.sync="userInfo"></Items>

      <Items title="个人简介" argument="individualresume" :userInfo.sync="userInfo"></Items>
    </div>
  </div>
</template>

<script>
import Items from "./components/PersonalCenterItems";
import { getUserInfo, modifUserInfo } from "../api/user";
import { getContent } from "../api/article";
export default {
  components: {
    Items
  },
  data() {
    return {
      imageUrl: "",
      userInfo: {},
      tempUserInfo: {},
      flag: false,
      IMG_BASE_API: process.env.VUE_APP_IMG_API + "api/upload-profile"
    };
  },
  computed: {},
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res.data);

      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    modifUserInfo() {
      modifUserInfo(this.tempUserInfo).then(res => {
        Object.assign(this.userInfo, res.data);
      });
    },
  },
  created() {
    getUserInfo().then(res => {
      if (res.profile) {
        this.imageUrl = process.env.VUE_APP_BASE_API + res.profile;
      }
      this.userInfo = res;
      console.log(this.userInfo.username);
    });
    console.log(this.userInfo.username, "username");
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.wrap {
  margin: 20px auto;
  position: relative;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    background: #fff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #8c939d;
    position: relative;
    left: 20px;
    top: -20px;
  }
  .avatar-wrap {
    position: relative;
    left: 40px;
    top: -20px;
    width: 178px;
    height: 178px;
    box-shadow: 0 0 0 6px #fff;
    border-radius: 5px;
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      border-radius: 5px;
    }
  }
  .content {
    position: absolute;
    right: 110px;
    top: 170px;
    width: 800px;
    height: 800px;
  }
}
</style>
