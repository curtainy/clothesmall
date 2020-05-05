<template>
  <div ref="wrapper" class="wrapper">
      <div>
        <slot></slot>
      </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        bScroll : null,
      }
    },
    props:{
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: false
    },
    methods: {
      scrollTo(x, y, time=300){
        this.bScroll && this.bScroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.bScroll && this.bScroll.finishPullUp()
      },
      refresh(){
        this.bScroll && this.bScroll.refresh()
      },
      getScrollY(){
        return this.bScroll ? this.bScroll.y : 0
      }
    },
    /**
     * 【1】为什么要使用【refs】而不是【querySelector()】????
     * 【答】：使用querySelector拿到的不一定是Scroll组件中class为xxx的元素，
     *        如果Home组件中也有div的class=xxx，则此处可能会拿到Home中的元素对象，
     *        而this.refs中的this存在作用域的问题，只会拿到当前组件中ref=xxx的元素对象
     * 【2】ref绑定在组件中，this.refs拿到的就是组件对象
     *     ref绑定在元素中，this.refs拿到的就是元素对象
     */
    //组件挂载到DOM上面之后再执行,才能拿到DOM中的对象，否则为undefined
    mounted() {
      //1.创建bscroll对象
      this.bScroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      this.bScroll.on('scroll',position =>{
        //传出当前位置信息
        this.$emit('scrollTop',position)
      })

      //3.上拉加载更多
      this.bScroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })

    }
  }
</script>

<style scoped>
  .wrapper{
    overflow: hidden;
  }
</style>
