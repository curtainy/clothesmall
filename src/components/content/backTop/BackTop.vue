<template>
  <div>
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  div{
    position: fixed;
    right: 5px;
    bottom: 45px;
    z-index: 10;
  }
  img{
    width: 43px;
    height: 43px;
  }
</style>
