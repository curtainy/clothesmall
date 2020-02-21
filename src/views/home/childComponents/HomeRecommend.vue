<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends:{
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;

    padding: 10px 0 17px 0;
    border-bottom: 6px solid beige;
  }
  .recommend-item{
    flex-grow: 1;
    font-size: 7px;
  }
  .recommend-item img{
    width: 60px;
    height: 60px;
    margin-bottom: 3px;
  }
</style>
