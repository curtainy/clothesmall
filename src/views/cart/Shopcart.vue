<template>
  <div id="shop-cart">
    <cart-bar/>
    <scroll class="cart-scroll">
      <cart-goods/>
    </scroll>
    <cart-bottom/>
  </div>
</template>

<script>
  import CartBar from "./childComps/CartBar"
  import CartGoods from "./childComps/CartGoods"
  import CartBottom from "./childComps/CartBottom"

  import Scroll from "components/common/scroll/Scroll"

  export default {
    name: "Shopcart",
    components: {
      CartBar,
      CartGoods,
      Scroll,
      CartBottom
    }
  }
</script>

<style scoped>
  #shop-cart{
    height: 100vh;
    position: relative;
  }
  .cart-scroll{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
  }
</style>
