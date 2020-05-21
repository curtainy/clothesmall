<template>
  <div class="cart-bottom">
    <div class="bottom-left">
        <img src="~assets/img/cart/tick.svg"
             class="icon" @click="allChecked"
             :class="{active:isAllChecked}">
        <span class="all-checked">全选</span>
        <span class="pay">合计：￥{{cartPay.cartPayPrice}}</span>
    </div>
    <div class="bottom-right" @click="payClick">去结算({{cartPay.cartPayCount}})</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottom",
    data(){
      return{
        //是否全选
        isChecked: false
      }
    },
    computed: {
      ...mapGetters(['cartList','cartLength','cartPay']),

      //购物车中的商品是否全选
      isAllChecked(){
        this.isChecked =  this.cartList.length && this.cartList.every(item => {
          return item.checked
        })
        return this.isChecked
      }
    },
    methods: {
      //点击全选按钮
      allChecked(){
        this.isChecked = !this.isChecked
        this.$store.commit('cartAllChecked',this.isChecked)
      },
      //点击去结算
      payClick(){
        //如果没有选要购买的商品
        if(this.cartPay.cartPayCount === 0){
          //发送一个添加商品toast消息
          this.$toast.show('请先选择要购买商品')
        }else if(!this.$store.state.isLoad){
          //先登录
          this.$toast.show('请先登录')
        }else{
          //发送一个添加银行卡的toast消息
          this.$toast.show('还未添加银行卡')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom{
    height: 40px;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;

    display: flex;
    font-size: 15px;
    line-height: 40px;
  }
  .bottom-right{
    flex: 1;
    background-color: #bd2c00;
    color: white;
    text-align: center;
  }
  .bottom-left{
    flex: 2;
    background-color: rgba(100,100,100,.1);
  }
  .icon{
    border-radius: 50%;
    border: 2px solid darkgray;
    margin-right: 8px;

    position: relative;
    top: 4px;
    left: 3px;
  }
  .pay{
    margin-left: 15px;
  }
  .active{
    background-color: var(--color-tint);
  }

</style>
