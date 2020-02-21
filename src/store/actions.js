import {ADD_COUNT,ADD_PRODUCT} from "./mutations-type"

export default {
  addCart(context,payload){
   return new Promise((resolve,reject) => {
     //1.判断购物车是否已经存在该商品
     let oldProduct = context.state.cartList.find((product)=>{
       return product.id === payload.id
     })

     if(oldProduct){//存在，数量+1
       context.commit(ADD_COUNT,oldProduct)
       resolve('购物车中商品数量+1')
     }else{//不存在，商品添加到购物车
       context.commit(ADD_PRODUCT,payload)
       resolve('成功添加到购物车')
     }
   })
  }
}