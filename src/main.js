import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload"
import toast from "components/common/toast"

Vue.config.devtools = true
Vue.config.productionTip = false

/**
 * 【事件总线】：通过this.$bus.$emit('事件名')发送事件
 *             通过this.$bus.$on(事件名，函数)接收事件
 * 【注】：this.$bus默认为空，Vue的实例可做事件总线
 *
 * 天秀！！！
 */
Vue.prototype.$bus = new Vue()

/**
 * 【解决移动端300ms延时】：
 *     [1]下载fastclick  [2]导入
 *     [3]调用attach()
 */
FastClick.attach(document.body)

/**
 * 【图片懒加载】：只有在需要显示的时候才加载
 *      [1]下载vue-lazyload    [2]导入
 *      [3]使用Vue.use()下载插件
 */
Vue.use(VueLazyload)

//安装toast（本质上执行toast.install)
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
