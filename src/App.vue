<template>
  <div id="app">
    <router-link to="/about">关于页面</router-link>
    <router-link to="/">首页</router-link>
    <router-view a=1 b =2></router-view>
  </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted() {
    // console.log('this._routerRoot._router', this._routerRoot._router)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
