<template>
  <div class="message">
    <div class="my-message">
      <img src="~assets/img/profile/message.svg">
      <span>我的消息</span>
    </div>
    <div class="my-pointer">
      <img src="~assets/img/profile/pointer.svg">
      <span>积分商城</span>
    </div>
    <div class="my-vip">
      <img src="~assets/img/profile/vip.svg">
      <span>会员卡</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Message"
  }
</script>

<style scoped>
  .message{
    border-top: 10px solid #f6f6f6;
  }
  .message img{
    height: 17px;
    position: relative;
    top: 2px;
    padding-right: 5px;
    padding-left: 7px;
  }
  .message div{
    border-bottom: 1px solid lightgray;
    padding-top: 10px;
    padding-bottom: 10px;

    font-size: 15px;
  }

</style>
