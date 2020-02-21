<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '我是弹窗',time = 1500){
        this.isShow = true
        this.message = message

        setTimeout(()=>{
          this.isShow = false
          this.message = ''
        },time)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    /*向左上移动自身宽高的一半*/
    transform: translate(-50%,-50%);
    z-index: 10;

    font-size: 15px;
    color: white;
    background-color: rgba(0,0,0,.7);
    padding: 10px;
    border-radius: 5px;
  }
</style>
