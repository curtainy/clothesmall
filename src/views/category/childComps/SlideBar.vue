<template>
  <div class="slide_bar">
    <scroll class="scroll">
      <div v-for="(item,index) in slideList" :key="index" 
           class="slide_item" 
           :class="{active: currentIndex === index}"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </scroll>
  </div>
</template>

<script>
 
import Scroll from 'components/common/scroll/Scroll' 

export default {
  name: 'SlideBar',
  data(){
    return{
      currentIndex: 0
    }
  },
  props: {
    slideList: {
      type: Array,
       default(){
         return []
       }
    }
  },
  components: {
    Scroll
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      //点击菜单时，将对应的index返回
      this.$emit('selectItem',index)
    }
  }
}
</script>

<style>
.slide_bar{
  display: inline-block;
 width: 25%;
 height: calc(100vh - 44px - 49px);
}
 .scroll{
  height: 100%;
  width: 100%;
}
.slide_item{
  background-color: ghostwhite;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 13px;
  line-height: 40px;
}
.active{
  background-color: #fff;
  color: var(--color-high-text);
  border-left: 2px solid var(--color-tint);
} 
</style>