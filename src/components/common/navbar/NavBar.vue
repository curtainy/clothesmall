<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;

    box-shadow: 0 1px 1px rgba(100,100,100,.1);

    /*在使用浏览器原生滚动时，为了让nav-bar不随着浏览器一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 5;*/
  }
  .left, .right{
    width: 60px;
  }
  .center{
    flex-grow: 1;
  }
</style>
