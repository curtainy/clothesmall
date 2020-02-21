<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="!isActive"><slot name="item-img"></slot></div>
    <div v-else><slot name="item-img-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabberItem",
    props: {
      path: String,
      activeColor:{
        type: String,
        default: 'red'
      }
    },
    // data(){
    //   return {
    //     isActive: false
    //   }
    // },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) != -1;
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {};
      }
    },
    methods: {
      btnClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex-grow: 1;
    text-align: center;
    font-size: 15px;
  }
  .tab-bar-item img{
    height: 25px;
    width: 25px;

    margin-top: 1px;
    vertical-align: middle;
  }
</style>
