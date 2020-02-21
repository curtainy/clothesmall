import Vue from 'vue'
import VueX from 'vuex'

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

//1.下载插件
Vue.use(VueX)

//2.创建store对象
const state = {
  cartList: [],
}
const store = new VueX.Store({
  state,
  mutations,
  actions,
  getters
})

//3.导出store对象
export default store
