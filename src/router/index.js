import Vue from 'vue'
import VueRouter from 'vue-router'

const home = ()=> import('views/home/Home')
const profile = ()=> import('views/profile/Profile')
const shopCart = ()=> import('views/cart/Shopcart')
const category = ()=> import('views/category/Category')
const detail = ()=> import('views/detail/Detail')
const login = ()=> import('views/profile/childComps/Login')
const register = ()=> import('views/profile/childComps/Register')

//1.插入路由
Vue.use(VueRouter)

//2.创建VueRouter实例
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/profile',
    component: profile,
  },
  {
    path: '/shopCart',
    component: shopCart
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/detail/:id',
    component: detail
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.导出
export default router
