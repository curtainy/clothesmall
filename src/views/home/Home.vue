<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick"
                 ref="tabOne"
                 v-show="isTabshow"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scrollTop="scrollTop"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <home-recommend :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabTwo"/>
      <goods-list :goods="goodsDataList"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goodsList/GoodsList"
  import Scroll from "components/common/scroll/Scroll"


  import HomeSwiper from './childComponents/HomeSwiper'
  import HomeRecommend from "./childComponents/HomeRecommend"
  import FeatureView from "./childComponents/FeatureView"

  import {getHomeMultidata,getHomeGoods} from "network/home"
  import {debounce} from 'common/utils'
  import {backTopMixin} from "common/mixins"


  export default {
    name: "Home",
    data(){
      return {
        //轮播图的数据
        banners: [],
        //圆形图片的数据
        recommends: [],
        //当前处于热门、新品、流行哪种类型
        currentType: 'pop',
        //从后台获取到的三种类型的数据
        goods: {
          pop: {page: 0, list: []},
          sell: {page: 0, list: []},
          new: {page: 0, list: []}
        },
        //tab-control距离顶部的总距离
        tabOffsetTop: 0,
        //隐藏掉的tab-control是否显示
        isTabshow: false,
        //保存当前页面所处位置
        saveY: 0
      }
    },
    computed:{
      goodsDataList(){
        return this.goods[this.currentType].list
      }
    },
    mixins: [backTopMixin],
    components: {
      TabControl,
      NavBar,
      HomeSwiper,
      GoodsList,
      HomeRecommend,
      FeatureView,
      Scroll,
    },
    created() {
      //请求轮播图数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      this.getHomeGoods('new')
    },
    mounted() {
      //放在mounted是为了保证能拿到this.$refs.scroll,而不是undefined
      //监听item中img加载，刷新BScroll中的scrollerHeight重新计算
      const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('homeItemImgLoad',()=>{
        refresh()
      })
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
      /**
       * 按钮点击事件的方法
       */
       tabClick(index){
         switch (index) {
           case 0: this.currentType = 'pop';break
           case 1: this.currentType = 'new';break
           case 2: this.currentType = 'sell';break
         }
         //保证两个tab-control组件上的点击事件是一致的
         this.$refs.tabOne.currentIndex = index
         this.$refs.tabTwo.currentIndex = index
       },

      /**
       * 发送请求获取数据的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          //箭头函数没有this，此时的this是外部作用域即组件实例
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++
        })
      },

      /**
       * 子组件发送的事件
       */
      //获取当前位置信息
      scrollTop(position){
        //是否显示回到顶部的按钮
        this.isShowBackTop = -position.y > 1000
        //是否将隐藏的tab-control显示
        this.isTabshow = -position.y > this.tabOffsetTop
      },
      //下拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImgLoad(){
        //获取tabControl距顶部的距离
        //组件没有offsetTop属性，需通过$el拿到组件中的元素
        this.tabOffsetTop = this.$refs.tabTwo.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    /*margin-top: 44px;*/
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }

  /*吸顶效果已经不起作用了，position: sticky只有在父类的overflow为默认值visible时才有效*/
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*}*/

  /*通过计算的方法得到滚动得高度*/
  /*.content{*/
  /*  height: calc(100vh - 93px);*/
  /*  margin-top: 44px;*/
  /*}*/

/*  通过绝对定位的方法得到滚动的高度*/
  .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }

  .tab-control{
    /*相对于原来位置不变*/
    position: relative;
    /*只有在进行定位时才起作用*/
    z-index: 15;
  }
</style>
