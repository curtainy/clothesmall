import { ADD_COUNT,ADD_PRODUCT, SUB_COUNT, SUB_PRODUCT } from "./mutations-type"

export default {
  [ADD_COUNT](state,payload){
     payload.count++
  },
  [ADD_PRODUCT](state,payload){
    payload.count = 1
    payload.checked = true
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
  }
}
