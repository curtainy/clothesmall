<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length !== 0">
    <div class="info-title">{{baseInfo.title}}</div>
    <div class="info-price">
      <span>{{baseInfo.newPrice}}</span>
      <s>{{baseInfo.oldPrice}}</s>
      <div>{{baseInfo.discount}}</div>
    </div>
    <div class="info-message">
      <div>{{baseInfo.columns[0]}}</div>
      <div>{{baseInfo.columns[1]}}</div>
      <div>{{baseInfo.services[baseInfo.services.length -1].name}}</div>
    </div>
    <div class="info-message info-send">
      <div v-for="item in baseInfo.services.length-1" class="send-item">
        <img :src="baseInfo.services[item-1].icon">{{baseInfo.services[item-1].name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      baseInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info{
    padding: 6px;
  }
  .info-title{
    font-size: 16px;
    color: black;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .info-price span{
    font-size: 25px;
    color: var(--color-high-text);
  }
  .info-price s{
    font-size: 15px;
    padding-left: 7px;
    padding-right: 7px;
  }
  .info-price div{
    display: inline-block;
    background-color: var(--color-high-text);
    color: white;
    font-size: 15px;
    border-radius: 5px;
  }
  .info-message{
    margin-top: 20px;
    font-size: 10px;
    display: flex;
    justify-content: space-between;
  }
  .info-message>div{
    flex: 1;
  }
  .info-message>div:first-child{
    text-align: left;
  }
  .info-message>div:nth-child(2){
    text-align: center;
  }
  .info-message>div:last-child{
    text-align: right;
  }
  .info-send{
    margin-top: 10px;
    color: black;
    padding-top: 20px;
    padding-bottom: 25px;
    border-top: 1px solid beige;
    border-bottom: 2px solid beige;
  }
  .info-send img{
    width: 11px;
  }

</style>
