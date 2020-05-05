import {request1, request} from './request'

//登录
export function login(data){
  return request1({
    method: 'post',
    url: '/login',
    data: data
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