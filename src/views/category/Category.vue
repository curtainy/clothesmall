<template>
  <div id="category">
    <category-bar/>
    <slide-bar :slideList="categories" @selectItem="selectItem"/>
    <scroll class="scroll" ref="scroll">
      <slide-item-category :subcategories="showSubcategory"/>
      <tab-control :titles="['流行','新品','热销']"/>
      <goods-list :goods="showCategoryDetail"/>
    </scroll>
  </div>
</template>

<script>
  
  import CategoryBar from './childComps/CategoryBar'
  import SlideBar from './childComps/SlideBar'
  import Scroll from 'components/common/scroll/Scroll'
  import SlideItemCategory from './childComps/SlideItemCategory'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'

  import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'
  import { debounce } from 'common/utils'

  export default {
    name: "Category",
    components: {
      CategoryBar,
      SlideBar,
      Scroll,
      SlideItemCategory,
      TabControl,
      GoodsList
    },
     data() {
		  return {
        //侧边栏数据
        categories: [],
        //侧边栏选中项对应的数据
        categoryData: {},
        //侧边栏当前的选中项
        currentIndex: -1,
        //tabcontrol当前的选中项
        currentType: 'pop'
      }
    },
    created() {
		  //请求分类数据
      this._getCategory()
    },
    mounted(){
      //监听图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh(),100)
      this.$bus.$on('categoryDetailImgLoad',() => {
         refresh()
      })
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
			    // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
       //-----------------------------事件监听--------------------------
       /**
        * 选中侧边栏的某一项
        */
      selectItem(index) {
        this._getSubcategories(index)
      },
      /**
       * 点击tabcontrol
       */
      click(index){
        switch(index){
          case 0: this.currentType = 'pop'; break;
          case 1: this.currentType = 'new'; break;
          case 2: this.currentType = 'sell'; break;
          default:
        }
      },
      /**
       * 右上的图片加载
       */
      categoryContentImgLoad(){
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
#category{
  height: calc(100vh - 49px);
  position: relative;
}
.scroll{
  display: inline-block;
  width: 75%;
  height: calc(100vh - 44px - 49px);
}
</style>