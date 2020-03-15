<template>
  <div>
    <NavBar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="detail">
        <div v-for="(item,index) in titles" :key="index"
             :class="{active: currentIndex === index}"
             class="detail-item" @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailBar",
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        this.$emit('titleChoose',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .active{
    color: var(--color-high-text);
  }
  .detail{
    display: flex;
    font-size: 14px;
  }
  .detail-item{
    flex: 1;
  }
  .left img{
    margin-top: 12px;
  }
</style>
