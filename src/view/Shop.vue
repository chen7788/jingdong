<template>
  <div class="shop-container">
    <header-menu :contentWidth="contentWidth" :isShow="true"/>
    <div class="header">
      <div class="header-left">
        <div class="logo-container"></div>
        <div class="title">
          <a href="//www.jd.com/allSortaspx">
            全部分类
            <i :class="categoryIcon" style=""></i>
          </a>
        </div>
      </div>
        <div class="header-center">
          <div class="input-container">
            <div class="input-border">
              <a-input-search class="input" :placeholder="hotKeys==null?'':hotKeys[0].name" size="large" @search="onSearch">
                <a-button slot="enterButton" type="primary" class="input-button" >搜全站</a-button>
              </a-input-search>
              <a-button slot="enterButton" type="primary" class="input-button-shop" >搜本店</a-button>
            </div>

          </div>
          <div v-if="hotKeys!=null" class="search-hotKey" >
            <span v-for="item in hotKeys.slice(1,hotKeys.length)" style="margin-left: 10px">{{item.name}}</span>
          </div>
        </div>
      <div>
        <a class="header-right">
            <i class="iconfont icon-position" style="color: red"></i>
            <span>我的购物车
              <div class="bage">0</div>
            </span>
            <i class="iconfont icon-arrow-right" style="margin-left: 15px"></i>
        </a>
      </div>
    </div>
    <div class="header-image">
      <div v-for="item in images">
        <img :src="item">
      </div>
    </div>
    <div class="nav-container">
      <div class="item" v-for="item in navList">{{item}}</div>
    </div>
    <div class="address">
      <a-breadcrumb class="left" separator=">">
        <a-breadcrumb-item>家用电器</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">生活电器</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">空气净化器</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">美的（Midea）</a></a-breadcrumb-item>
        <a-breadcrumb-item>美的KJ210G-C46</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="right">
        <a>自营</a>
        <a>美的京东自营官方旗舰店</a>
        <a>
          <i class="iconfont icon-position" style="color: red;margin-left: 10px"></i>
          <span>联系客服</span>
        </a>
        <a>
          <i class="iconfont icon-position" style="color: red;margin-left: 10px"></i>
          <span>收藏店铺</span>
        </a>
      </div>
    </div>
    <div class="buy-container">
      <div class="left">
        <pic-zoom :url="zoomImage" :bigUrl="bigUrl" :scale="1"></pic-zoom>
        <div class="slider-container">
          <div class="left-point" @click.capture="handleLastImage"></div>
          <div  class="center">
            <a-carousel ref="carousel">
              <div class="item" v-for="item in someList" :key="index">
                <div class="item-content" >
                  <img v-for="(model,index) in item"  :src="model" width="50px" height="50px" :class="index==imageHoverIndex?'img-b':'img-a'" style="margin-top: 2px" @mouseover="handleHover(index,model)">
                </div>

              </div>
            </a-carousel>
          </div>
          <div class="right-point" @click.capture="handleNextImage"></div>
        </div>
          <div class="play-button" @click="handlePlay"></div>
        <video-player v-if="isPlay"  class="video-player vjs-custom-skin" :class="isVideoButton?'video-pause':'video-play'"
                       ref="videoPlayer"
                       :playsinline="true"
                       :options="playerOptions"
                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)"
                      @ended="onPlayerEnded($event)"
        >

        </video-player>
        <div v-if="isPlay" class="close-button" @click="handleCloseVideo"></div>
      </div>
      <div class="center">
        <div class="title">
          <img src="//img10.360buyimg.com/img/jfs/t8485/356/1281159143/15432/343a6ec9/59b73dbaN9c878bcc.png" alt="京东超市">
          <span>美的（Midea）空气净化器 除甲醛 除菌 除雾霾卧室家用除毛发负离子清新除灰尘除烟味</span>
        </div>
        <div class="desc" v-if="productInfo != null" v-html="productInfo.ad">
        <div class="miaosha">

        </div>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
    <div class="toolbar-wrap">
      <div class="toolbar">
        <div class="item">
          <i class="iconfont icon-position" style="color: white"></i>
        </div>
        <div class="item">
          <i class="iconfont icon-position" style="color: white"></i>
        </div>
        <div class="item">
          <i class="iconfont icon-position" style="color: white"></i>
        </div>
        <div class="item">
          <i class="iconfont icon-position" style="color: white"></i>
        </div>
        <div class="item">
          <i class="iconfont icon-position" style="color: white"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderMenu from '@/components/header/headMenu'
import {getShopHotKey, getShopInfo,getShopPlay} from "@/api/home";
import PicZoom from "vue-piczoom"
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

let playerInfo = {
  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
  autoplay: true, //如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: false, // 导致视频一结束就重新开始。
  preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  sources: [],
  poster: "", //你的封面地址
  // width: document.documentElement.clientWidth,
  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true  //全屏按钮
  }
}
export default {
name: "Shop",
components:{HeaderMenu,PicZoom,videoPlayer },
  data(){
  return{
    isLarge: false,
    contentWidth: 990,
    screenWidth: 0,
    isCategoryHover:false,
    hotKeys:null,
    productInfo:null,
    carouselIndex:0,
    isPlay:false,
    playerOptions:null,
    isVideoButton:false,
    navList:['空调','冰箱/冷柜','洗衣机','热水器','厨房大家电','净/饮水机','厨房小家电','微波炉/烤箱','生活小家电','吸尘器/扫地机','个人健康','中央空调/空气能'],
    images:[
      '//img14.360buyimg.com/cms/jfs/t1/163287/14/3381/26183/600a79e4E09468d41/b8f5c5c5ba5f17f8.jpg',
      '//img13.360buyimg.com/cms/jfs/t1/141588/11/16418/15201/5fc5e09eEbc0dfec0/42dba91b188b9dce.gif',
      '//img11.360buyimg.com/cms/jfs/t1/150536/12/15851/9783/60095562E2ee87d58/92411801a407a7ba.jpg',
      '//img10.360buyimg.com/cms/jfs/t1/153337/33/15113/17363/60095562E19a3a49a/b8304f9af9195516.jpg',
      '//img14.360buyimg.com/cms/jfs/t1/150630/6/15964/14532/60095562Ec1c5eaf3/cdc99ff1e8512810.jpg'
    ],
    bigUrl:'https://img13.360buyimg.com//n0/jfs/t1/156093/32/8623/70400/6017e0a0Eaac4de48/9c4d4675aa76dc97.jpg',
    configs: {
      width:350,
      height:350,
      maskWidth:100,
      maskHeight:100,
      maskColor:'red',
      maskOpacity:0.2,

    },
    someList:[
      [
        '//img13.360buyimg.com/n1/jfs/t1/157988/23/4807/70603/600e24f8Eb8dec571/99978c7bfd605e90.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/159353/26/4499/112208/600a9c0fE0f9a4468/ce06e98f34efdd75.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/169432/22/3857/123241/600aab29E30477042/4f49834146334e48.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/120140/27/8288/85402/5f20dbf4E969353ca/67a7e29c16a4d0dd.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/149371/11/4012/230076/5f20dbf4E3e8e8893/e361be4f241eec44.jpg',
      ],
      [
        '//img13.360buyimg.com/n1/jfs/t1/117372/26/14471/108014/5f35142dE1bda47da/e6955c7f9d9bbd44.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/127393/23/8140/94036/5f20dbf4E5a7ff137/e219cbd39603c914.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/144356/17/3943/98934/5f20dbf4E8a9e56e9/02f30a1a83478eff.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/150216/7/3941/98008/5f20dbf4E1d6b747e/78d989c9a76bd294.jpg',
        '//img13.360buyimg.com/n1/jfs/t1/111451/15/13391/113285/5f20dbf4E783a0953/f178a6a571bd6678.jpg'
      ]
    ],
    imageHoverIndex:0,
    zoomImage:'//img13.360buyimg.com/n1/jfs/t1/156093/32/8623/70400/6017e0a0Eaac4de48/9c4d4675aa76dc97.jpg'
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
    that.loadHotKey()
    that.loadProductInfo()
    if (that.playerOptions == null){
      that.loadPlayData()
    }
  },
  computed:{
    categoryIcon(){
      if (this.isCategoryHover){
        return 'icon-arrow-up-bold'
      }
      return 'icon-arrow-down-bold'
    }
  },
  destroyed() {
    window.removeEventListener('scroll',this.handleScroll)
  },
  methods: {
    loadHotKey() {
      let that = this
      getShopHotKey().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          that.hotKeys = JSON.parse(str)
        }
      })
    },
    loadPlayData() {
      let that = this
      getShopPlay().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          let model = JSON.parse(str)
          playerInfo.sources=[{src:model.playUrl,type:'video/mp4'}]
          playerInfo.poster = model.imageUrl
          that.playerOptions = playerInfo
        }
      })
    },
    loadProductInfo() {
      let that = this
      getShopInfo().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          that.productInfo = JSON.parse(str)
        }
      })
    },
    handleHover(index,path){
      this.imageHoverIndex = index
      this.zoomImage = path
    },
    handleLastImage(){
      if (this.carouselIndex == 1){
        this.$refs.carousel.prev()
        this.carouselIndex = 0
      }
    },
    handleNextImage(){
      if (this.carouselIndex == 0){
        this.$refs.carousel.next()
        this.carouselIndex = 1
      }
    },
    handlePlay(){
      this.isPlay = true
    },
    onPlayerPlay(player) {
      this.isVideoButton = false
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      this.isVideoButton = true// console.log('player pause!', player)
    },
    onPlayerEnd(player) {
      this.isPlay = false
      // console.log('player pause!', player)
    },
    handleCloseVideo(){
      this.isPlay = false
    }
  }
}
</script>

<style lang="scss">
.ant-input{
  border-radius: 0;
  height: 32px;
  line-height: 32px;
  border: none;
  font-size: 13px;
}
.ant-input:focus{
  border: none;
  box-shadow: none;
}
::v-deep .ant-badge-count{

  padding-top: 0;
  padding-bottom: 0;
}
.swiper-container-horizontal>.slider-pagination-bullets{
  display: none;
}
.video-pause{
  .vjs-big-play-button{
    display: block;
    left: 135px;
    top: 154px;
  }
}
.video-play{
  .vjs-big-play-button{
    display: none;
  }
}
.video-js.vjs-4-3, .video-js.vjs-16-9, .video-js.vjs-fluid{
  height: 350px;
}
.mouse-cover-canvas{
  position: absolute;
  width: 540px;
  top: 320px !important;
  left: 100%;
  border: 1px solid rgb(238,238,238);
  z-index: 99999;
  display: none;
}
</style>
<style lang="scss" scoped>
@import '@/styles/variables.scss';


.shop-container{
  position: relative;
}
 .header{
   display: flex;
   align-items: center;
   justify-content: center;
   .header-center{
     margin-top: 25px;
     .input-container{
       width: 490px;
       background: #B61D1D;
       .input-button{
         height: 32px;
         width: 50px;background: #B61D1D;border: none;border-radius: 0;
         font-size: 13px;
         padding-left: 7px;
       }

       .input-border{

         display: flex;
         .input{
           border: 2px solid #B61D1D;
         }
       }
       .input-button-shop{
         height: 36px;
         width: 50px;background: gray;border: none;border-radius: 0;
         font-size: 13px;
         padding-left: 7px;
       }
     }
     .search-hotKey{
       text-align: left;
       margin-top: 2px;
     }
   }

 }
 .header-left{
   display: flex;
   padding: 20px 0;
   align-items: center;


   .logo-container{
     width: 150px;
     height: 60px;
     background: url(//misc.360buyimg.com/jdf/1.0.0/unit/global-header/1.0.0/i/jdlogo-201708-@1x.png) no-repeat 0 0;
   }
   .title{
     color: #ccc;
     width: 75px;
     margin-right: 135px;
     height: 25px;
     line-height: 25px;
     padding: 0 5px;
     margin-left: 20px;
     border: #7a6e6e solid 1px;
     a{
       font-size: 12px;
       color: #2f3430;
     }
   };
 }
 .header-right{
   display: flex;
   align-items: center;
   justify-content: center;
   margin-left: 50px;
   align-items: center;
  border: #7a6e6e solid 1px;
   height: 36px;
   width: 141px;
   color: #666666;
   span{
     position: relative;
     margin-left: 3px;
     .bage{
       position: absolute;
       right: -15px;
       top: -10px;
       background: red;
       color: white;
       padding: 1px 2px;
       font-size: 12px;
       line-height: 12px;
       border-radius: 7px 7px 7px 0;
       min-width: 16px;
       text-align: center;
     }
   };

 }
 .header-image{
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .nav-container{
   display: flex;
   position: relative;
   justify-content: center;
    margin: 0 auto;
   background: cornflowerblue;
   min-width: max-content;
   .item{
     font-size: 14px;
     color: white;
     background: cornflowerblue;
     line-height: 40px;
     padding: 0 20px;
   }
 }
 .address{
  width: $shopW;
   margin: 0 auto;
   .left{
     float: left;
     line-height: 40px;
   }
   .right{
     float: right;
     line-height: 40px;
   }
 }
 .buy-container{
   width: $shopW;
   margin: 10px auto;
   display: flex;
   justify-content: center;
   height: 600px;

   .left {
     width: 350px;
     height: 350px;
     background: #666666;
     position: relative;

     .slider-container{
       margin-top: 10px;
       height: 54px;
       display: flex;
       justify-content: center;
       align-items: center;
       position: relative;

       .left-point{
         width: 22px;
         height: 32px;
         margin-top: 5px;
         background: url(//static.360buyimg.com/item/unite/1.0.116/components/default-soa/preview/i/disabled-prev.png);
       }
       .center{
         overflow: hidden;
         padding: 0 8px;

         .item{
           height: 54px;
           background: white;

           .item-content{
             display: flex;align-items: center;justify-content: space-around;
             cursor: pointer;
             .img-a{
               border: white solid 2px;
             }
             .img-b{
               border: #e1251b solid 2px;
             }
           }
         }
       }
       .right-point{
         width: 22px;
         height: 32px;
         margin-top: 5px;
         background: url(//static.360buyimg.com/item/unite/1.0.116/components/default-soa/preview/i/hover-next.png);
       }
     }
       .play-button{
         cursor: pointer;
         display: inline-block;
         position: absolute;
         bottom: 62px;
         width: 50px;
         height: 50px;
         background: url(//static.360buyimg.com/item/unite/1.0.116/components/default-soa/preview/i/main-circles.png) 0 -55px no-repeat;
       }
     .video-player{
       position: absolute;
       top: 0;
       left: 0;
       width: 350px;
       height: 350px;
     }
     .close-button{
       position: absolute;
       right: 10px;
       top: 10px;
       width: 12px;
       height: 12px;
       background-image: url(//static.360buyimg.com/item/unite/1.0.116/components/default-soa/preview/i/__sprite.png);
       background-position: -58px -40px;

     }
   }
   .center{
     padding-left: 20px;
     padding-right: 20px;
     flex: 1;
     .title{
       font: 700 16px Arial,"microsoft yahei";
       color: #666;
       padding-top: 10px;
       line-height: 28px;
       margin-bottom: 5px;
       text-align: left;
     }
     .desc{
       text-align: left;
       color: #e1251b;
     }
   }
   .right{
     width: 210px;
     background: #9a6e3a;
   }
 }
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 54px;
  line-height: 54px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.toolbar-wrap{
  position: absolute;
  top: 0;
  right: 0;
  border-right: 6px solid #7a6e6e;
  height: 100%;

  .toolbar{
    position: absolute;
    top: 50%;
    left: -29px;
    width: 35px;
    margin-top: -100px;

    .item{
      height: 35px;
      background: #7a6e6e;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px 0 0 3px;
      margin-bottom: 1px;
    }
  }
}
</style>
