import BackTop from "components/content/backTop/BackTop"

export const backTopMixin = {
  data(){
    return {
      //点击回到顶部的组件是否显示
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  //如果被混入的组件中也有同名的methods方法，则会覆盖其中的同名方法
  methods:{
    //在需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}
