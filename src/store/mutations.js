import { ADD_COUNT,ADD_PRODUCT, SUB_COUNT, SUB_PRODUCT } from "./mutations-type"

import {findGoods} from 'network/other'
import {getUser} from 'common/user_utils'

export default {
  [ADD_COUNT](state,payload){
     payload.count++
  },
  [ADD_PRODUCT](state,payload){
    state.cartList.push(payload)
  },
  cartOneChecked(state,index){
    state.cartList[index].checked = !state.cartList[index].checked
  },
  cartAllChecked(state,flag){
     for(let item of state.cartList){
       item.checked = flag
     }
  },
  //商品数量-1
  [SUB_COUNT](state,payload){
    payload.count--
  },
  //商品-1
  [SUB_PRODUCT](state,payload){
    state.cartList.splice(payload,1)
  },
  clearState(state){
    while(state.cartList.length){
      state.cartList.pop()
    }
    state.userId = ''
    state.isLoad = false
  },
  initState(state){
    state.userId = getUser()._id
    state.isLoad = true
    
    //从数据库中获取购物车中商品信息
    findGoods({userId:state.userId}).then((data) => {
      const carts = data.data.data
      while(carts.length){
        state.cartList.push(carts.shift())
      }
    },(err) => {
      console.log(err)
    })
  }
}
