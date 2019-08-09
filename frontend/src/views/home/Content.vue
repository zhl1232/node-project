<!--
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-03 19:48:05
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 18:29:33
 * @Description: file content
 * @Versions: 1.0.0
 -->
<template>
  <div class="container">
    <div class="show">
      <el-carousel :interval="4000" type="card" height="260px">
        <el-carousel-item v-for="item in newContent" :key="item.ID">
          <img :src="transform(item.thumb)" @click="read(item.ID)" />
          <h3 class="medium">{{ item.title }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hot">
      <div v-for="item in list" :key="item.ID" class="hot-items">
        <div class="title">{{item.title}}</div>
        <div class="author">{{item.author}}</div>
        <div class="time">{{timeTransform(item.time)}}</div>
        <div class="content" v-html="item.content"></div>
      </div>
    </div>
    <div class="new">
      <div v-for="item in list" :key="item.ID" class="new-items">
        <img :src="transform(item.thumb)" alt />
        <div>
          <div class="title" @click="read(item.ID)">{{item.title}}</div>
          <div class="author">{{item.author}}</div>
          <div class="time">{{timeTransform(item.time)}}</div>
          <div class="content" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContent, getNewContent } from "@/api/article";
import { formatTime } from "@/utils/index";
export default {
  data() {
    return {
      list: {},
      newContent: {}
    };
  },
  methods: {
    timeTransform(time) {
      return formatTime(new Date(time));
    },
    read(id) {
      this.$router.push({ path: "/article/details", query: { id: id } });
    },
    transform(url) {
      return process.env.VUE_APP_BASE_API + url;
    }
  },
  computed: {},
  created() {
    getContent().then(res => {
      this.list = res.data;
    });
    getNewContent().then(res => {
      res.data.length = 5;
      this.newContent = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  position: relative;
  .show {
    width: 800px;
    .el-carousel__item {
      h3 {
        position: absolute;
        bottom: 5px;
        left: 10px;
        color: #fff;
        font-size: 24px;
        opacity: 0.9;
        margin: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .hot {
    width: 370px;
    height: 1000px;
    // background: #ff0;
    position: absolute;
    right: 0;
    top: 0;
    &-items {
      height: 200px;
    }
    .content {
      height: 65px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
  .new {
    width: 780px;
    height: 1000px;
    &-items {
      height: 200px;
      display: flex;
      padding: 5px;
      img {
        height: 130px;
        width: 250px;
        margin-right: 15px;
      }
      .title {
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
      }
      .title:hover {
        color: rgb(7, 151, 247);
      }
      .author,
      .time {
        display: inline;
      }
      .author {
        margin-right: 15px;
      }
      .content {
        margin-top: 15px;
        height: 65px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
</style>
