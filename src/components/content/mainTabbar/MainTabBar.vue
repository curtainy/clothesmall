<template>
  <tab-bar>
    <tabbar-item path="/home">
      <img src="~assets/img/tabbar/home.svg" slot="item-img">
      <img src="~assets/img/tabbar/home_active.svg" slot="item-img-active">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category">
      <img src="~assets/img/tabbar/category.svg" slot="item-img" >
      <img src="~assets/img/tabbar/category_active.svg" slot="item-img-active" >
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/shopCart">
      <img src="~assets/img/tabbar/shopcart.svg" slot="item-img">
      <img src="~assets/img/tabbar/shopcart_active.svg" slot="item-img-active">
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" slot="item-img">
      <img src="~assets/img/tabbar/profile_active.svg" slot="item-img-active">
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tab-bar>
</template>

<script>
  import tabBar from "components/common/tabbar/TabBar"
  import tabbarItem from 'components/common/tabbar/TabbarItem'
  export default {
    name: "mainTabBar",
    components: {
      tabBar,
      tabbarItem
    }
  }

</script>

<style scoped>

</style>
