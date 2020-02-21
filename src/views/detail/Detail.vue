<template>
 <div id="detail">
   <detail-bar @titleChoose="titleChoose" ref="bar"/>
   <scroll class="detail-scroll" ref="scroll"
           @scrollTop="scrollTop" :probe-type="3">
     <detail-swiper :imgs="topImgs"/>
     <detail-base-info :baseInfo="baseInfo"/>
     <detail-shop-info :shop="shop"/>
     <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
     <detail-param-info :param-info="paramInfo" ref="param"/>
     <detail-comment-info :comment-info="commentInfo" ref="comment"/>
     <goods-list :goods="recommendInfo" ref="recommend"/>
   </scroll>
   <back-top @click.native="backTop" v-show="isShowBackTop"/>
   <detail-bottom-bar class="bottom-bar" @addToCart="addCart"/>
<!--   <toast :is-show="isShow"/>-->
 </div>
</template>

<script>
  import DetailBar from "./childComps/DetailBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"


  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goodsList/GoodsList"


  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
  import {debounce} from "common/utils"
  import {backTopMixin} from "common/mixins"

  // import Toast from "components/content/toast/Toast"


  export default {
    name: "Detail",
    data(){
      return {
        //当前商品的id
        itemId: null,
        //顶端的轮播图
        topImgs: [],
        //轮播图下面的基本信息
        baseInfo: {},
        //店家的信息
        shop: {},
        //衣服展示
        detailInfo: {},
        //衣服参数
        paramInfo: {},
        //评论
        commentInfo: {},
        //推荐
        recommendInfo: [],
        //组件距顶端距离
        titleOffsetTop: [],
        isShow: false
      }
    },
    mixins: [backTopMixin],
    components: {
      // Toast,
      DetailBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    created() {
      //获取点击图片的id
      this.itemId = this.$route.params.id

      getDetail(this.itemId).then(res => {
       //获取轮播图数据
       this.topImgs.push(...res.result.itemInfo.topImages)
       //获取商品信息
       this.baseInfo = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
       //获取店家信息
       this.shop = new Shop(res.result.shopInfo)
       //保存商品的详情信息
       this.detailInfo = res.result.detailInfo
       //保存参数信息
       this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
       //保存评论信息
       this.commentInfo = res.result.rate.list[0]
     }),

       getRecommend().then(res => {
         this.recommendInfo = res.data.list
       })
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('detailImgLoad',()=>{
        refresh()
      })
    },
    methods: {
      imgLoad(){
        //所有图片记载完进行一次刷新
        this.$refs.scroll.refresh()
        /**
         * 【问题】：在哪里才能获取到正确的offsetTop???
         * 【答】：1.created()不行，根本不能获取元素
         *        2.mounted也不行，数据还没有获取到
         *        3.获取到数据的回调也不行，DOM还没有渲染完
         *        4.$nextTick也不行，DOM渲染完，但图片的高度没有计算在内
         *        5.在图片加载完之后，获取的高度才是正确的
         */
        //计算子组件距顶端距离
        this.titleOffsetTop.push(0)  //商品
        this.titleOffsetTop.push(this.$refs.param.$el.offsetTop) //参数
        this.titleOffsetTop.push(this.$refs.comment.$el.offsetTop) //评论
        this.titleOffsetTop.push(this.$refs.recommend.$el.offsetTop) //推荐
      },
      titleChoose(index){
        //根据顶部detail bar的选择，跳到指定位置
        this.$refs.scroll.scrollTo(0,-this.titleOffsetTop[index])
      },
      //当前滚动位置
      scrollTop(position){
        //设置回到顶部的按钮是否显示
        this.isShowBackTop = -position.y > 1000
        //根据位置改变detail bar的选择
        //方式一：暴力if else
        // if(-position.y < this.titleOffsetTop[1]){
        //   this.$refs.bar.currentIndex = 0
        // }else if(-position.y < this.titleOffsetTop[2]){
        //   this.$refs.bar.currentIndex = 1
        // }else if(-position.y < this.titleOffsetTop[3]){
        //   this.$refs.bar.currentIndex = 2
        // }else{
        //   this.$refs.bar.currentIndex = 3
        // }
        //方式二：数组追加一个Number.MAX_VALUE  (js中能表示的最大的值)
        this.titleOffsetTop.push(Number.MAX_VALUE)
        for(let i = 0; i < this.titleOffsetTop.length-1; i++){
          if(-position.y >= this.titleOffsetTop[i]
            && -position.y < this.titleOffsetTop[i+1]){
            this.$refs.bar.currentIndex = i
          }
        }
        this.titleOffsetTop.pop()
      },
      //商品添加到购物车
      addCart(){
        //1.获取购物车需要展示的信息
        const product = {
          id: this.itemId,
          img: this.topImgs[0],
          title: this.baseInfo.title,
          desc: this.baseInfo.desc,
          price: this.baseInfo.realPrice
        }
        //2.将信息添加到store上
        this.$store.dispatch('addCart',product).then(res => {
          //3.发送一条toast
          this.$toast.show(res)
        })
        // console.log(this.$toast);
        // this.$toast.show('成功添加到购物车')

      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    height: 100vh;
    background-color: #fff;
  }
  .detail-scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .bottom-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
