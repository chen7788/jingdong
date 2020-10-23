<template>
  <div class="main-container">
    <div class="header-ad">
      <div class="header-ad-a">
        <a :href="herf" class="header-ad-b">
        </a>
        <a-icon type="close" style="float: right;margin-top: 10px;margin-right: 10px;background: lightgray"></a-icon>
        <a style="float: right;margin-right: 10px;margin-top: 17px" ref="https://pro.jd.com/mall/active/3qEpS4aUfRjsa8cg4X3sKUTBQLdA/index.html">
          <img src="//img12.360buyimg.com/babel/jfs/t1/133936/21/12940/3424/5f8e9e23E336431f8/7c1d1877ae1bc9f5.png.webp">
        </a>
        <a style="float: right;margin-right: 10px;margin-top: 17px" ref="https://pro.jd.com/mall/active/G6dB2UyBBfwfTVCBp3iMQQQ6GHi/index.html">
          <img src="//img14.360buyimg.com/babel/jfs/t1/141432/3/11358/3473/5f8ed3fbE4ec417c8/db36e61bd2e973f8.png.webp">
        </a>
      </div>
    </div>
    <div class="nav-container">
        <div class="address">
          <i class="iconfont icon-position" style="color: red"></i>
          <span>广东</span>
        </div>
      <div class="nav-right">
        <div class="item" v-for="item in addressList">
          <a-divider type="vertical"></a-divider>
          <div class="content" >
            <i :ref="item.url" v-if="item.isUrl">{{item.name}}</i>
            <span v-else>{{item.name}}</span>
            <a-icon v-if="item.icon" type="down"></a-icon>
          </div>


        </div>
      </div>
    </div>
    <div class="header">
      <div class="header-container">
        <div class="header-left">
          <img src="//img10.360buyimg.com/img/jfs/t1/124600/14/15671/184916/5f8d7112E7f52db74/60ee6ba8e8e5ce3a.gif" width="100%" height="135%">
        </div>
        <div class="header-center">

        </div>
        <div class="header-right">
          <a href=""></a>
        </div>
      </div>
    </div>
    <div class="focus-container">
      <a :href="herf">
      </a>
      <div class="banner-container">
        <div class="banner-left">
          <a-list item-layout="horizontal" :data-source="data" :split="listSplit" size="small">
            <a-list-item style="height: 25px" slot="renderItem" slot-scope="item,index">
              <a-list-item-meta>
                <a slot="title" href="https://www.antdv.com/">{{ item | filterItemName }}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div class="banner-center">
            <a-carousel v-if="bannerList.length>0" ref="carousel" effect="fade" arrows autoplay>
              <div
                slot="prevArrow"
                slot-scope="props"
                class="custom-slick-arrow"
                style="left: 0px;zIndex: 1"
              >
                <a-button type="primary" icon="left" class="left-button"/>
              </div>
              <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 15px">
                <a-button type="primary" icon="right" class="right-button"/>
              </div>
              <i v-for="item in bannerList" style="display: block;position: relative">
                <img :src="item[0].src">
              </i>
            </a-carousel>
          <div class="banner-center-right">
            <div :class="index==1 ? 'banner-right-item' : '' "  v-for="(item,index) in bannerRightImages">
              <img :src="item.src" style="width: 190px;height: 150px">
            </div>
          </div>
        </div>
        <div class="banner-right">
        </div>
      </div>
    </div>
    <div class="toolbar-wrap" :class="toolbarIsOpen?'toolBar-open':''">
        <div class="toolbar" :class="toolbarIsOpen?'toolBar-open':''">
          <div class="toolbar-panel"></div>
          <div class="toolbar-header"></div>
        </div>
    </div>
  </div>
</template>
<script>
  import { getCategory,getFocusBanner,getFocusBannerRight,getHelloService } from "../api/home";
  import {getParenthesesStr} from "../util";
  import '../assets/font/iconfont.css'

  export default {
    data(){
      return {
        isLarge:true,
        screenWidth:0,
        listSplit:false,
        data:[],
        bannerList:[],
        bannerRightList:[],
        bannerRightImages:[],
        timer:'',
        toolbarIsOpen:true,
        addressList:[
          {
            name:'我的订单',
            icon:false,
            isUrl:true,
            url:'//order.jd.com/center/list.action'
          },
          {
            name:'我的京东',
            icon:true,
            isUrl:false
          },
          {
            name:'京东会员',
            icon:false,
            isUrl:true,
            url:'//vip.jd.com/'
          },
          {
            name:'企业采购',
            icon:true,
            isUrl:false
          },
          {
            name:'客服服务',
            icon:true,
            isUrl:false
          },
          {
            name:'网站导航',
            icon:true,
            isUrl:false
          },
          {
            name:'手机京东',
            icon:false,
            isUrl:false
          },
        ],
        herf:'https://pro.jd.com/mall/active/7P8nSbxpPbTXJxvTSobyGWSjHAM/index.html?babelChannel=ttt3'
      }
    },
    filters:{
      filterItemName(val){
        let name = ''
        if (Array.isArray(val.s)){
          for (let item of val.s) {
            let arr = item.n.split('|')
            if (name !== ''){
              name += '/' + arr[1]
            }else {
              name +=  arr[1];
            }
          }
        }else {
         let arr = val.s.n.split('|')
          name = arr[1]
        }
        return name
      }
  },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          if (document.body.clientWidth >1350){
            that.isLarge = true
          }else {
            that.isLarge = false
          }
          that.screenWidth = document.body.clientWidth
        })();
      };
      this.timer = setInterval(that.setBannerCenterRightData,3000)
    },
    created() {
      this.listData(),
        this.bannerListData(),
        this.bannerRightData()
    },
    methods:{
      listData(){
        var that = this
        getCategory().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
           let str = getParenthesesStr(reader.result)
            that.data  = JSON.parse(str).data
          }
        })
      },
      bannerListData(){
        var that = this
        getFocusBanner().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.bannerList  = JSON.parse(str).data
          }
        })
      },
      bannerRightData(){
        var that = this
        getFocusBannerRight().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.bannerRightList  = JSON.parse(str).data
            that.bannerRightImages = that.bannerRightList.slice(0,3)
          }
        })
      },
      helloService(){
        var that = this
        getHelloService().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.bannerRightList  = JSON.parse(str).data
            that.bannerRightImages = that.bannerRightList.slice(0,3)
          }
        })
      },
      setBannerCenterRightData(){
        if (this.bannerRightImages.length==0){
          return
        }
        let model = this.bannerRightImages[2]
        let arr = []
        let index = this.bannerRightList.length
        for (let i = 0; i < this.bannerRightList.length; i++) {
          let item = this.bannerRightList[i]
          if (model.src === item.src){
            index = i
          }
          if (i>index){
            if (arr.length<3){
              arr.push(item)
            }else {
              break;
            }
          }
        }
        if (arr.length==1){
          arr.push( this.bannerRightList[0])
          arr.push( this.bannerRightList[2])
        }
        if (arr.length==2){
          arr.push( this.bannerRightList[0])
        }
        if (arr.length==0){
          arr.push( this.bannerRightList[0])
          arr.push( this.bannerRightList[1])
          arr.push( this.bannerRightList[2])
        }
        this.bannerRightImages = arr
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "./src/styles/variables";

  .header-container{
    width: $headerW;

    .header-left{
      width: $headerLeftW;
    }
    .header-right{
      width: $headerLeftW;
    }
  }

  .banner-container{
    width: $headerW;
    .banner-left{
      width: $headerLeftW;
    }
    .banner-right{
      width: $headerLeftW;
    }
  }
  .header-ad-a{
    width: $headerW;
    height: 100%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
  .nav-container{
    width: $headerW;
    height: 30px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

  }
.nav-right{
  height: 100%;
  display: flex;
  padding-right: 20px;
  align-items: center;
  .item{
    display: flex;
    align-items: center;
    justify-content: center;
    .content{
      margin-left: 5px;
      margin-right: 5px;
    }
    i{
      margin-top: 5px;
    }
  }
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
  .banner-center {
    .left-button {
      width: 25px;
      height: 35px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-bottom-right-radius: 17.5px;
      border-top-right-radius: 17.5px;
      padding-left: 0px;
    }
    .right-button{
      width: 25px;
      height: 35px;
      border-bottom-left-radius: 17.5px;
      border-top-left-radius: 17.5px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      padding-left: 3px;
    }
  }


</style>
<style scoped>
  .main-container{
    height: 100vh;
    background: lightgray;
  }
  .header-ad{
    width: 100%;
    height: 80px;
    background-image: url("//img30.360buyimg.com/babel/jfs/t1/126613/20/15520/34635/5f8e827bE19ae2009/841f6585d2eb5678.jpg!q70.jpg.webp");
  }
  .header-ad-b{
    width: 190px;
    height: 100%;
    float: left;
    background-image: url("//img13.360buyimg.com/img/jfs/t1/128768/1/15594/11305/5f8d3e38E02f2c1af/c6defae33727923e.jpg.webp");
  }

  .header-container{
    height: 141px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
  .header{
    width: 100%;
    background: white;
  }

  .header-left{
    height: 120px;
    overflow: hidden;
    background: greenyellow;
  }
  .header-center{
    height: 120px;
    width: 100%;
    position: relative;
    background: aliceblue;
  }

  .header-right{
    height: 120px;
    background-image: url(https://img13.360buyimg.com/babel/jfs/t1/134687/1/12919/39958/5f8e90a1E75455839/5de1c29e222dcd59.png.webp);
  }
  .focus-container{
    width: 100%;
    height: 710px;
    margin-top: 10px;
    position: absolute;
    overflow: hidden;
    background: url("//img11.360buyimg.com/img/jfs/t1/143343/25/11427/490459/5f8e9d0bEb58f3546/73690b41a95a75f4.png.webp") 50% 0px no-repeat;
  }
  .banner-right-item{
    margin-top: 10px;
    margin-bottom: 10px;

  }
  .banner-container{
    height: 470px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    align-items: center;
  }

  .banner-left{
    height: 100%;
    overflow: hidden;
    background: white;
    margin-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    padding-left: 15px;
  }
  .banner-center{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: start;
  }
  .carousel-container{
    width: 100%;
    height: 100%;
  }
  .banner-center-right{
    float: right;
    width: 190px;
    height: 100%;
    margin-left: 10px;
  }
  .banner-right{
    height: 100%;
    margin-left: 10px;
    background: aquamarine;
  }
  .ant-carousel >>> .slick-slide {
    text-align: center;
    overflow: hidden;
  }
  .ant-carousel{
    height: 100%;
    width: 590px;
  }
  .ant-carousel >>> .custom-slick-arrow {
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }

</style>
