<template>
  <div class="content-item">
    <img src="~assets/img/cart/tick.svg"
         class="icon"
         :class="{active:goods.checked}"
         @click="imgClick(index)">
    <img :src="goods.img" class="image">
    <div class="item-text">
      <div class="title">{{goods.title}}</div>
      <div class="desc">{{goods.desc}}</div>
      <span class="price">￥{{goods.price}}</span>
      <span class="count">x{{goods.count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartContentItem",
    props: {
     goods:{
       type: Object,
       default(){
         return {}
       }
     },
     index: null
    },
    methods: {
      imgClick(index){
        this.$emit('imgClick',index)
      }
    }
  }
</script>

<style scoped>
  .content-item{
    height: 100px;
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid darkgray;

    position: relative;
  }
  .image{
    height: 80px;
    position: absolute;
    top: 10px;
    border-radius: 5px;
  }
  .icon{
    border-radius: 50%;
    border: 2px solid gainsboro;
    margin: 40px 3px 30px 3px;
  }
  .item-text{
    position: absolute;
    right: 10px;
    top: 10px;
    bottom: 10px;
    left: 90px;
    overflow: hidden;
  }
  .title,.desc{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title{
    font-size: 15px;
    color: black;
    margin-bottom: 15px;
  }
  .desc{
    font-size: 13px;
    margin-bottom: 15px;
  }
  .price{
    color: var(--color-high-text);
    margin-right: 140px;
  }
  .active{
    background-color: var(--color-tint);
  }

</style>
