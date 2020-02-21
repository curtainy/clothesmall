<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles"
         @click="btnClick(index)" :class="{isActive:index === currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default(){
          return []
        }
      }
    },
    methods: {
      btnClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    font-size: 13px;
    text-align: center;
    background-color: white;
    padding: 4px 0 7px 0;
  }
  .tab-control-item{
    flex-grow: 1;
  }
  .isActive{
    color: var(--color-high-text);
  }
  .isActive span{
    padding: 3px;
    border-bottom: 2px solid var(--color-tint);
  }
</style>
