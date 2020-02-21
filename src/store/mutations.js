import {ADD_COUNT,ADD_PRODUCT} from "./mutations-type"

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
  }
}
