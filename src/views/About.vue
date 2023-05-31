<template>
  <div>这是关于页面
    <router-link to="/about/a">关于页-a</router-link>
    <router-link to="/about/b">关于页-b</router-link>
    <router-link to="/about/c">关于页-c</router-link>
    <!-- <router-link to="/about/d">关于页-d</router-link> -->
    <router-view c=3></router-view>
  </div>
</template>