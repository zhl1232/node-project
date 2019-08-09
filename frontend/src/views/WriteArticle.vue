<!--
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-08-08 23:37:32
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 17:25:36
 * @Description: file content
 * @Versions: 1.0.0
 -->
<template>
  <el-form class="components-container">
    <div class="title">
      <el-row>
        <el-col :span="21">
          <el-input v-model="title" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="2" style="margin-left: 20px">
          <el-button type="danger" @click="onSubmit">发布文章</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="editor-container">
      <!-- <el-tag class="tag-title">Basic:</el-tag> -->
      <markdown-editor ref="markdownEditor" v-model="content" :language="language" height="800px" />
    </div>

    <el-dialog title="选择文章分类" :visible.sync="dialogFormVisible">
      <el-form label-position="top">
        <el-form-item label="文章分类">
          <el-select v-model="type" placeholder="请选择文章分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传文章缩略图">
          <el-upload
            :action="IMG_BASE_API"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="publish">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 
    <el-button
      style="margin-top:80px;"
      type="primary"
      icon="el-icon-document"
      @click="getHtml"
    >Get HTML</el-button>
    <div v-html="html" />-->
  </el-form>
</template>

<script>
import MarkdownEditor from "./components/MarkdownEditor";
import { publishContent } from "../api/article";
const content = `
**This is test**

* vue
* element
* webpack

`;
export default {
  name: "MarkdownDemo",
  components: { MarkdownEditor },
  data() {
    return {
      content: content,
      html: "",
      dialogFormVisible: false, // 类型和缩略图选择弹出窗
      options: [
        {
          value: "1",
          label: "前端开发"
        },
        {
          value: "2",
          label: "算法相关"
        },
        {
          value: "3",
          label: "node"
        }
      ],

      languageTypeList: {
        en: "en_US",
        zh: "zh_CN",
        es: "es_ES"
      },
      title: "默认标题",
      type: "",
      thumb: "",
      dialogImageUrl: "",
      dialogVisible: false,
      IMG_BASE_API: process.env.VUE_APP_IMG_API + "api/upload"
    };
  },
  computed: {
    language() {
      return this.languageTypeList["zh"];
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.thumb = response.data.url
    },
    onSubmit() {
      this.dialogFormVisible = true;
    },
    publish() {
      this.dialogFormVisible = false

      let data = {
        title: this.title,
        content: this.$refs.markdownEditor.getHtml(),
        type: this.type,
        thumb: this.thumb
      };
      publishContent(data).then(res => {
        console.log(res);
        this.$router.push("/");
      });
    }
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
.components-container {
  .title {
    padding: 10px 0;
    background: #e9e8e8;
  }
  .editor-container {
    margin-bottom: 30px;
  }
  .tag-title {
    margin-bottom: 5px;
  }
  .publish {
    position: absolute;
    top: 200px;
    background: #fff;
  }
}
</style>
