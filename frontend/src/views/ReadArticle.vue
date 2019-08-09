<template>
  <div class="container" >
    <div v-html="content"></div>
  </div>
</template>

<script>
import { getContent } from "@/api/article";
export default {
  data() {
    return {
      content: ""
    }
  },
  created() {
    console.log(this.$route);
    
    getContent(this.$route.query).then(res => {
        console.log(res);
        this.content = res.data[0].content
      })
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px 40px;
}
</style>
