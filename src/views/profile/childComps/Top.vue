<template>
  <div class="login">
    <div class="login-top">
      <img src="~assets/img/profile/avatar.svg">
      <div class="top-text">
        <div v-if="!this.username">
          <span @click="loginBtn">登录/</span>
          <span @click="postBtn">注册</span>
        </div>
        <div v-else>
          <span>{{this.username}}</span>
          <span class="quit" @click="quitBtn">退出</span>
        </div>
        <img src="~assets/img/profile/phone.svg">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="login-bottom">
      <div>
        <div><span class="number">0.00</span>元</div>
        <span>我的余额</span>
      </div>
      <div>
        <div><span class="number">0</span>个</div>
        <span>我的优惠</span>
      </div><div>
      <div><span class="number">0</span>分</div>
      <span>我的积分</span>
    </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  import {getUser , removeUser} from 'common/user_utils'

  export default {
    name: "Top",
    data(){
      return {
        username: ''
      }
    },
    mounted(){
      //判断是否有localStorage
      const user = getUser()
      if(user){
        this.username = user.username
      }

      this.$bus.$on('getUsername',(username) => {
        console.log(username)
        this.username = username
      })
    },
    methods: {
      loginBtn(){
        this.$router.push('/login')
      },
      postBtn(){
        this.$router.push('/register')
      },
      quitBtn(){
        removeUser()
        this.username = ''
      }
    }
  }
</script>

<style scoped>
  .login-top{
    height: 80px;
    padding: 10px;
    position: relative;
    background-color: var(--color-tint);
    border-top: 1px solid lightcoral;
  }
  .login-top img{
    height: 60px;
  }
  .top-text{
    position: absolute;
    top: 10px;
    right: 0px;
    bottom: 10px;
    left: 80px;

    color: #fff;
  }

  .top-text div{
    font-size: 17px;
    margin-top: 8px;
    margin-bottom: 5px;
  }
  .top-text img{
    height: 14px;
    position: relative;
    bottom: -2px;
  }
  .top-text span{
    font-size: 13px;
  }

  .login-bottom{
    height: 80px;
    display: flex;
    padding-top: 25px;
    padding-bottom: 10px;
  }
  .login-bottom div{
    flex: 1;
    text-align: center;
  }
  .login-bottom>div:nth-child(2){
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
  }
  .number{
    color: var(--color-high-text);
  }
  .quit{
    margin-left: 10px;
  }
</style>
