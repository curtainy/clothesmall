import Vue from 'vue'
import VueX from 'vuex'

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

import {getUser} from 'common/user_utils'
import {findGoods} from 'network/other'

//1.下载插件
Vue.use(VueX)

//2.创建store对象
const state = {
  cartList: [],
  userId: getUser()._id,
  isLoad: false
}


//用户登录状态
if(state.userId !== undefined){
  state.userId = getUser()._id
  state.isLoad = true
  //从数据库中获取购物车中商品信息
  findGoods({userId:state.userId}).then((data) => {
     state.cartList = data.data.data
   },(err) => {
    console.log(err)
  })
}


const store = new VueX.Store({
  state,
  mutations,
  actions,
  getters
})

//3.导出store对象
export default store
