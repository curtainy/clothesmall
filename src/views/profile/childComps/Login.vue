<template>
  <div class="login_form">
    <div class="form">
      <form>
        <input type="text" placeholder="请输入账号" autofocus @focus="getFocus">
        <span class="error">{{this.msg}}</span><br><br>
        <input type="password" placeholder="请输入密码" @focus="getFocus">
        <span class="error">{{this.msg}}</span><br><br>
        <div class="log" @click="loginBtn"><span>登录</span></div>
        <div class="add">
          <span class="no_post" @click="registerBtn">还未注册</span>
          <span class="forget">忘记密码</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {login} from 'network/other'
import {saveUser,getUser} from 'common/user_utils'

export default {
  data(){
    return {
      msg: ''
    }
  },
  methods: {
    loginBtn(){
      var inputs = document.getElementsByTagName('input')
      var username = inputs[0].value
      var password = inputs[1].value
      
      //登录
      const data = {username,password}

      login(data).then((msg) => {
        const user = msg.data
        if(user.code == 0){
          //存储用户信息
          saveUser(user.data)
          // console.log(user)
          //将用户名传递给profile页面
          this.$bus.$emit('getUsername',user.data.username)
          // console.log(getUser())
          //路由跳转到/profile
          this.$router.push('/profile')
          //state中数据初始化
          this.$store.commit('initState')
        }else{
          this.msg = user.msg
        }
      })

    },
    registerBtn(){
      this.$router.push('/register')
    },
    getFocus(){
      this.msg = ''
    }
  }
}
</script>

<style>
.login_form{
  width: 100wh;
  height: 100vh;
  position: relative;
  background-color: rgba(246,216,222,0.3);
}
.form{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-70%);
  width: 200px;
  height: 200px;
}
.log{
  padding: 5px;
  width: 200px;
  background-color: var(--color-tint);
}
.log span{
  color: #fff;
  margin-left: 80px;
  font-size: 15px;
}
.add{
  font-size: 12px;
  width: 200px;
  margin-top: 3px;
}
.no_post{
  float: left;
}
.forget{
  float:right;
}
.error{
  font-size: 13px;
  color: var(--color-tint);
}
</style>