import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/m3',
    timeout: 5000
  })

  //2.axios的拦截器
  //(1)请求拦截
  instance.interceptors.request.use(config => {
    //1.比如config中的一些信息不符合服务器的要求

    //2.比如每次发送网络请求时，都希望在界面显示一个请求图标

    //3.比如某些网络请求必须携带一些信息（登录需携带token）

    //如果不进行return,则会请求失败
    return config
  },error => {
    console.log(err)
  })
  //(2)响应拦截
  instance.interceptors.response.use(res =>{
    //真正用到的是res.data

    //必须将res返回，否则会promise中的resolve参数data为undefined
    return res.data
  },err =>{
    console.log(err);
  })

  //3.发送请求
  return instance(config)
}


export function request1(config){
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    }
  })
  
  return instance(config)
}