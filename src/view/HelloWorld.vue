<template>
  <div class="main-container" >
    <header-view :isLarge="isLarge" :contentWidth="contentWidth" :isShow="isShow"/>
    <category-view :isLarge="isLarge" :topHeight="topHeight" />
    <kill-view ref="killView" :isLarge="isLarge" @scrollTop="scrollTop" :type="type"/>
    <special-view ref="specialView" :isLarge="isLarge" :isLoad="specialLoad"/>
    <discover-view ref="discoverView" :contentWidth="contentWidth" :isLoad="discoverLoad"/>
    <product-view ref="productView" :contentWidth="contentWidth" :isLoad="productLoad"/>
    <channel-view ref="channelView" :contentWidth="contentWidth" :isLoad="channelLoad"/>
    <recommended-view ref="recommendedView" :contentWidth="contentWidth" :isLoad="recommendedLoad" :page="page"/>
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
          discoverLoad:false,
          productLoad:false,
          channelLoad:false,
          recommendedLoad:false,
          page:0,
          pageHeight:0,
          isShow:false,
          topHeight:0,
          isScrollTop:false,
          type:-1,
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
      removeBanner(){
        var box=document.getElementById("desc");
        console.log(box.innerText)
        if (box != null){
          box.hidden  = true
          //box.parentNode.removeChild(box);
        }
      },
      scrollTop(num){
        let top = 0
        if (num == 0){
          top = document.documentElement.scrollTop || document.body.scrollTop;
          // 实现滚动效果
          const timeTop = setInterval(() => {
            document.body.scrollTop = document.documentElement.scrollTop = top -= 100;
            if (top <= 0) {
              clearInterval(timeTop);
            }
          }, 10);

        }else {

          const timeTop = setInterval(() => {
            if (num-top<100){
              document.body.scrollTop = document.documentElement.scrollTop = top += 50;
            }else {
              document.body.scrollTop = document.documentElement.scrollTop = top += 100;
            }
            if (top >= num) {
              clearInterval(timeTop);
            }
          }, 10);
        }


      },
      handleScroll(){
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 可视高
        const clientH = window.innerHeight || document.documentElement.clientHeight;
        let kill = this.$refs.killView.$el.getBoundingClientRect()
        let special = this.$refs.specialView.$el.getBoundingClientRect()
        let discover = this.$refs.discoverView.$el.getBoundingClientRect()
        let product = this.$refs.productView.$el.getBoundingClientRect()
        let channel = this.$refs.channelView.$el.getBoundingClientRect()
        let recommend = this.$refs.recommendedView.$el.getBoundingClientRect()



        if (special.top<clientH){
          if (!this.specialLoad){
            this.specialLoad = true
          }
        }
        if (discover.top<clientH){
          if (!this.discoverLoad){
            this.discoverLoad = true
          }
        }
        if (product.top<clientH){
          if (!this.productLoad){
            this.productLoad = true
          }
        }
        if (channel.top<clientH){
          if (!this.channelLoad){
            this.channelLoad = true
          }
        }
        if (recommend.top<clientH){
          if (!this.recommendedLoad){
            this.recommendedLoad = true
          }
        }
        if (kill.top<0){
          if (!this.isShow){
            this.isShow = true
          }
          if (this.type != 0){
            this.type = 0
          }
        }else {
          if (this.isShow){
            this.isShow = false
          }
          if (this.type != -1){
            this.type = -1
          }
          this.topHeight = scrollTop
          return
        }
        if (special.top<0){
          if (this.type != 1){
            this.type = 1
          }
        }else {
          if (this.type != 0){
            this.type = 0
          }
          return;
        }
        if (channel.top<0){
          if (this.type != 2){
            this.type = 2
          }
        }else {
          if (this.type != 1){
            this.type = 1
          }
          return;
        }
        if (recommend.top<0){
          if (this.type != 3){
            this.type = 3
          }
          if (scrollTop+windowHeight>scrollHeight-300){
            if (scrollTop-this.pageHeight>300){
              this.page += 1
            }
            this.pageHeight = scrollTop
          }
        }else {
          if (this.type != 2){
            this.type = 2
          }
        }

      }
    },
    destroyed() {
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

