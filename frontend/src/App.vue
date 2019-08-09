<template>
  <div id="app">
    <!-- <router-link to="/login">Go to Foo</router-link>
    <router-link to="/register">Go to Bar</router-link> -->
    <Nav></Nav>
    <router-view></router-view>

    
  </div>
</template>

<script>
import Nav from "./views/Nav";
export default {
  name: "app",
  components: {
    Nav
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  width: 1200px;
  margin: 0 auto;
  
}
</style>
