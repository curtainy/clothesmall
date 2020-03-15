<template>
<div class="item_category">
  <div class="sub_content" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad"/>
        <div>{{item.title}}</div>
      </a>
  </div>
</div>
</template>

<script>


export default {
  name: 'SlideItemCategory',
  props: {
    subcategories: {
      type: Object,
      default: {}
    }
  },
  methods:{
    imgLoad(){
      this.$emit('categoryContentImgLoad')
    }
  }
}
</script>

<style>
.item_category{
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.sub_content{
  flex: 48%;
  margin-bottom: 10px;
}
.sub_content img{
  width: 100%;
} 
.sub_content div{
  text-align: center;
  font-size: 10px;
}
</style>