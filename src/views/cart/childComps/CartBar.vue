<template>
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBar",
    components: {
      NavBar
    },
    computed: {
      /**
       * 【mapGetters】：将store中的getter映射到局部计算属性
       * 方式：数组、对象（可改名）
       */
      ...mapGetters(['cartList','cartLength'])
    }
  }
</script>

<style scoped>
  .cart-bar{
    background-color: var(--color-tint);
    text-align: center;
    color: #fff;
  }
</style>
