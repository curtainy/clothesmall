<template>
   <div class="register_form">
    <div class="register">
      <form>
        <input type="text" placeholder="请输入账号" @focus="userInput" autofocus>
        <span>{{msg}}</span><br><br>
        <input type="password" placeholder="请输入密码" @focus="errInput">
        <span>{{errorMsg}}</span><br><br>
        <input type="password" placeholder="确认密码" @focus="cfmInput">
        <span>{{confirmMsg}}</span><br><br>
        <div class="postBtn" @click="postBtn"><span>注册</span></div>
      </form>
    </div>
    <div class="bottom"></div>
   </div>
</template>

<script>

import {register} from 'network/other'
import {saveUser} from 'common/user_utils'

export default {
  data(){
    return {
      msg: '',
      confirmMsg: '',
      errorMsg: ''
    }
  },
  methods: {
    userInput(){
      this.msg = ''
    },
    cfmInput(){
      this.confirmMsg = ''
    },
    errInput(){
      this.errorMsg = ''
    },
    postBtn(){
      const inputs = document.getElementsByTagName('input')
      //获取账号
      const username = inputs[0].value
      //获取密码
      const password = inputs[1].value
      //确认密码
      const confirm = inputs[2].value
      
      

      // console.log(username,password,confirm)
      if(password === confirm){
        //密码（不少于6位，且由数字和字符组成）
        if(password.length >= 6 && password.search(/[a-zA-Z]/)!=-1
           && password.search(/\d/)!=-1){

          const data = {username,password}
          //发送请求
          register(data).then((msg) => {
            const user = msg.data
            if(user.code != 0) this.msg = user.msg
            else if(user.code == 0){
              //将用户信息存储起来
              saveUser(user.data)
              //将用户名传递给profile页面
              this.$bus.$emit('getUsername',user.data.username)
              //初始化state中的数据
              this.$store.commit('initState')
              //路由跳转到/profile
              this.$router.push('/profile')
            }
          },(error) => {
            console.log('error')
          })
        }else{
          this.errorMsg = '密码由不少于6位数字和字母组成'
        }  
      }else{
        this.confirmMsg = '请重新确认密码'
      }
    }
  }
}
</script>

<style>
.register_form{
  width: 100wh;
  height: 100vh;
  position: relative;
  background-color: rgba(246,216,222,0.3);
}
.register{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-70%);
  width: 200px;
  height: 200px;
}
.register span{
  font-size: 12px;
  color: var(--color-tint);
}
.postBtn{
  padding: 5px;
  width: 200px;
  /* background-color: gainsboro; */
  background-color: var(--color-tint);
}
.postBtn span{
  margin-left: 80px;
  font-size: 15px;
  color: #fff;
}
.bottom{
   height: 49px;
    background-color: rgba(246,216,222,0.3);

    /*相对于浏览器窗口进行定位*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
}
</style>