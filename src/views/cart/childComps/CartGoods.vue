<template>
  <div class="cart-goods">
    <cart-goods-item :goods="item" :index="index"
                     v-for="(item,index) in cartList"
                     @imgClick="imgClick" :key="index"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import CartGoodsItem from "./CartGoodsItem"

  export default {
    name: "CartContent",
    computed: {
      ...mapGetters(['cartList','cartLength'])
    },
    components: {
      CartGoodsItem
    },
    methods: {
      imgClick(index){
        this.$store.commit('cartOneChecked',index)
      }
    }
  }
</script>

<style scoped>
  .cart-goods{
    width: 100%;
  }
</style>
