<template>
  <div class="main-container">
    <header-view :isLarge="isLarge" :contentWidth="contentWidth"/>
    <category-view :isLarge="isLarge"/>
    <kill-view :isLarge="isLarge"/>
    <special-view id="specialView" :isLarge="isLarge" :isLoad="specialLoad"/>
    <discover-view id="discoverView" :contentWidth="contentWidth"/>
    <product-view id="productView" :contentWidth="contentWidth"/>
    <channel-view id="channelView" :isLarge="isLarge"/>
    <recommended-view id="recommendedView" :isLarge="isLarge"/>
  </div>
</template>
<script>
  import HeaderView from '@/components/header'
  import CategoryView from '@/components/category'
  import KillView from '@/components/kill'
  import SpecialView from '@/components/special'
  import DiscoverView from '@/components/discover'
  import ProductView from '@/components/newProduct'
  import ChannelView from '@/components/channel'
  import RecommendedView from '@/components/recommended'
  export default {
      components:{HeaderView,CategoryView,KillView,SpecialView,DiscoverView,ProductView,ChannelView,RecommendedView},
      data() {
        return {
          isLarge: false,
          contentWidth: 990,
          screenWidth: 0,
          specialLoad:false,
        }
      },

      mounted() {
        const that = this
        window.onresize = () => {
          return (() => {
            if (document.body.clientWidth > 1350) {
              that.isLarge = true
              that.contentWidth = 1190
            } else {
              that.isLarge = false
              that.contentWidth = 990
            }
            that.screenWidth = document.body.clientWidth
          })();
        };
        window.addEventListener('scroll',this.handleScroll)
      },
    methods:{
      handleScroll(){
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop>=100){
          this.specialLoad = true
        }
        console.log(scrollTop)
      }
    },destroyed() {
        window.removeEventListener('scroll',this.handleScroll)
    }
  }

</script>
<style scoped lang="scss">
  .main-container{
    background: rgb(242,242,242);
  }

.toolbar-wrap{
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 100%;
  z-index: 100;
  .toolbar{
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    border-right: 6px solid #7a6e6e;
    transition: right .3s ease-in-out 0s;
  }
  .toolbar-panel{
    position: absolute;
    left: 6px;
    top: 0;
    width: 270px;
    height: 100%;
    z-index: 2;
    background: #eceaea;
  }
  .toolbar-open{
    right: 255px;
    width: 255px;
  }
  .toolbar-header{
    position: absolute;
    top: 0;
    right: -6px;
    width: 90px;
    height: 200px;
    background: url("//m.360buyimg.com/babel/jfs/t1/130619/38/12848/17465/5f8d4db2E505ea222/23c1f4b1bae4ee35.png");
    cursor: pointer;
  }
}

</style>

