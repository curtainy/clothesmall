<template>
  <div class="goodsList-item" @click="itemClick">
    <div class="item-img">
      <img :src="showImage" alt="" @load="imgLoad">
    </div>
    <div class="item-info">
      <p class="itemInfo-top">{{goodsItem.title}}</p>
      <div class="itemInfo-bottom">
        <span>￥{{goodsItem.price}}</span>
        <img src="~assets/img/common/collect.svg">
        <span>{{goodsItem.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImage(){
        // return this.goodsItem.image || this.goodsItem.show.img || this.goodsItem.img
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad(){
        //事件总线：$emit发送事件  $on接收事件
        //首页
        if(this.$route.path.indexOf('/home')){
          this.$bus.$emit('homeItemImgLoad')
        }else if(this.$route.path.indexOf('/detail')){
          this.$bus.$emit('detailImgLoad')
        }else if(this.$route.path.indexOf('/category')){
          this.$bus.$emit('categoryDetailImgLoad')
        }
      },
      itemClick(){
        //跳转到详情页
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goodsList-item{
    /*break-inside: avoid;*/
    /*margin: 2%;*/
    /*width: 48%;*/

    width: 48%;
  }
  .item-img{
    width: 100%;
    /*height:237px;*/
  }
  .item-img img{
    width: 100%;
    border-radius: 5px;
  }
  .item-info{
    font-size: 13px;
    text-align: center;
  }
  .itemInfo-top{
    /*一行显示*/
    white-space: nowrap;
    /*多余部分隐藏*/
    overflow: hidden;
    /*溢出部分省略号显示*/
    text-overflow: ellipsis;
  }
  .itemInfo-bottom{
    padding-top: 2px;
  }
  .itemInfo-bottom>span:first-child{
    padding-right: 3px;
    color: var(--color-high-text);
  }
  .itemInfo-bottom img{
    width: 10px;
    height: 10px;
  }
</style>
