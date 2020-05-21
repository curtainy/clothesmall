<template>
  <div class="content-item" v-if="goods.count > 0">
    <img src="~assets/img/cart/tick.svg"
         class="icon"
         :class="{active:goods.checked}"
         @click="imgClick(index)">
    <img :src="goods.img" class="image">
    <div class="item-text">
      <div class="title">{{goods.title}}</div>
      <div class="desc">{{goods.desc}}</div>
      <span class="price">￥{{goods.price}}</span>
      <div class="count">
         <div class="btn" @click="add(goods.id)">+</div>
         <span>x{{goods.count}}</span>
         <div class="btn" @click="sub(goods.id)">-</div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import { mapActions } from 'vuex'

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
      ...mapActions(['addCart','deleteCart']),
      //选中商品
      imgClick(index){
        this.$emit('imgClick',index)
      },
      //增加count
      add(id){
        this.addCart({id:id})
      },
      //减少count
      sub(id){
        this.deleteCart(id)
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
    margin-right: 50px;
  }
  .active{
    background-color: var(--color-tint);
  }

  .count{
    display: inline-block;
  }
  .btn{
    width: 20px;
    height: 20px;
    font-size: 15px;
    display: inline-block;
    background-color: gainsboro;
    text-align: center;
    margin-right: 5px;
  }
  .count span{
    padding: 5px;
  }

</style>
