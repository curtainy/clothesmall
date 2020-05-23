<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar :class="{hidden: isHidden}"/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  data(){
    return {
      isHidden: false
    }
  },
  components: {
    MainTabBar
  },
  mounted(){
    // 在登陆注册界面隐藏<main-tab-bar/>
    this.$router.beforeEach((to,from,next)=>{
      // console.log(to)
      if(to.path == '/login' || to.path == '/register'){
        this.isHidden = true
      }else{
        this.isHidden = false
      }
      next()
    })
  }
}
</script>

<style>
  @import "assets/css/base.css";
  .hidden{
    visibility: hidden;
  }
</style>
