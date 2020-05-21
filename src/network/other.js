import {request1} from './request'

//登录
export function login(data){
  return request1({
    method: 'post',
    url: '/login',
    data
  })
}

//注册
export function register(data){
  return request1({
    method: 'post',
    url: '/register',
    data
  })
}

//获取购物车商品信息
export function findGoods(data){
  return request1({
    method: 'post',
    url: '/findGoods',
    data
  })
}

//购物车中添加商品
export function addGoods(product){
  return request1({
    method: 'post',
    url: '/addGoods',
    data: product
  })
}

//修改商品数量
export function updateCount(data){
  return request1({
    method: 'post',
    url: '/updateCount',
    data
  })
}

//删除商品
export function deleteGoods(data){
  return request1({
    method:'post',
    url: '/deleteGoods',
    data
  })
}