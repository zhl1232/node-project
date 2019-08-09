<template>
  <div class="container">
    <h3>{{title}}</h3>
    <div @mouseenter="modifFlag = true" @mouseleave="modifFlag = false">
      <div>
        <div v-if="userInfo[argument]" class="inline">{{userInfo[argument]}}</div>
        <el-button type="text" @click="flag = true" v-else class="inline">填写</el-button>
        <span
          class="inline"
          style="margin-left: 10px"
          type="text"
          v-if="modifFlag == true && flag == false && userInfo[argument]"
          @click="flag = true;modifFlag = false"
        >修改</span>
      </div>
      <div v-if="flag">
        <el-input v-model="tempUserInfo[argument]" style="margin:10px 0"></el-input>
        <el-button type="primary" @click="modifUserInfo">保存</el-button>
        <el-button @click="flag = false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { modifUserInfo } from "../../api/user";
export default {
  props: ["title", "argument", "userInfo"],
  data() {
    return {
      flag: false,
      modifFlag: false,
      tempUserInfo: {}
    };
  },
  methods: {
    modifUserInfo() {
      modifUserInfo(this.tempUserInfo).then(res => {
        this.userInfo[this.argument] = res.data;
        this.flag = false;
      });
    }
  },
  created() {
    console.log(this.title, this.argument, this.userInfo);
  }
};
</script>

<style lang="scss" scoped>
.container {
  border-bottom: 1px solid #c9c9c9;
  padding-bottom: 10px;
  margin: 10px 0;
  h3 {
    margin-bottom: 5px;
  }
}
.inline {
  display: inline;
  line-height: 24px;
}
span {
  color: #409EFF;
  cursor: pointer;
}
</style>
