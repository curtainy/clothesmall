<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        exits: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imgLoad(){
        //保证只发送一次该事件
        if(!this.exits) {
          this.$emit('swiperImgLoad')
          this.exits = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
