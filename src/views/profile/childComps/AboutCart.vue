<template>
  <div class="about-cart">
    <div>
      <img src="~assets/img/profile/cart.svg">
      <span>我的购物车</span>
    </div>
    <div>
      <img src="~assets/img/profile/shopping.svg">
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AboutCart"
  }
</script>

<style scoped>
  .about-cart{
    border-top: 10px solid #f6f6f6;
  }
  .about-cart img{
    height: 17px;
    position: relative;
    top: 2px;
    padding-right: 5px;
    padding-left: 7px;
  }
  .about-cart div{
    border-bottom: 1px solid lightgray;
    padding-top: 10px;
    padding-bottom: 10px;

    font-size: 15px;
  }

</style>
