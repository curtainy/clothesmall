export default {
  //购物车信息
  cartList(state){
    return state.cartList
  },
  //购物车里衣服种类
  cartLength(state){
    return state.cartList.length
  },
  //需支付的价钱和件数
  cartPay(state){
    let cartPay = {
      cartPayPrice: 0,
      cartPayCount: 0
    }
    cartPay.cartPayPrice = state.cartList.filter(item => {
      return item.checked
    }).reduce((prePrice,item) => {
      cartPay.cartPayCount++
      return prePrice +item.price*item.count
    },0).toFixed(2)
    return cartPay
  }
}
