<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goods" :goodsItem="item" :key="index"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"

  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list{
    /*column-count: 2;*/
    /*width: 98%;*/
    /*text-align: center;*/

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
