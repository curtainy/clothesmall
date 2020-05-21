import {ADD_COUNT,ADD_PRODUCT, SUB_COUNT, SUB_PRODUCT} from "./mutations-type"

import {addGoods,updateCount,deleteGoods} from 'network/other'

export default {
  //添加商品到购物车
  addCart(context,payload){
   return new Promise((resolve,reject) => {
     //1.判断购物车是否已经存在该商品
     let oldProduct = context.state.cartList.find((product)=>{
       return product.id === payload.id
     })

     if(oldProduct){//存在
       //购物车中商品数量+1
       context.commit(ADD_COUNT,oldProduct)

       //判断当前是否是登录状态
       if(context.state.isLoad){
         //数据库中商品数量+1
         var obj = {newCount: oldProduct.count, data: {userId: context.state.userId, id: payload.id}}
         
         updateCount(obj).then((data) => {
          resolve('商品数量+1')
         },(err) => {
           console.log(err)
         })
       }else{
         resolve('商品数量+1')
       }
     }else{
       //不存在，商品添加到购物车
       context.commit(ADD_PRODUCT,payload)

       //判断当前是否为登录状态
       if(context.state.isLoad){
         //商品添加到数据库中
         payload.userId = context.state.userId
         addGoods(payload).then((data) => {
          resolve('添加成功')
         },(err) => {
           resolve('服务器发生错误')
         })
       }else{
        resolve('添加成功')
       }
     }
   })
  },

  //删除购物车中的商品
  //payload为商品id
  deleteCart(context,payload){
    let index = 0
    let oldProduct = context.state.cartList.find((product)=>{
      index++
      return product.id === payload
    })
    //购物车中商品数量>1
    if(oldProduct.count > 1){
      context.commit(SUB_COUNT,oldProduct)
    
      //当前是否为登录状态
      if(context.state.isLoad){
        var obj = {newCount: oldProduct.count, data: {userId: context.state.userId, id: payload}}
        updateCount(obj).then((data) => {
          console.log(data)
        },(err) => {
          console.log(err)
        })
      }
    }else if(oldProduct.count == 1){
      context.commit(SUB_PRODUCT,index-1)
       //当前是否为登录状态
       if(context.state.isLoad){
        const data = {userId: context.state.userId, id: payload}
        deleteGoods(data).then((data) => {
          console.log(data)
        },(err) => {
          console.log(err)
        })
      }
    }
  }
}
