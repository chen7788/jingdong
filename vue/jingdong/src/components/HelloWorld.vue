<template>
  <div class="main-container">
    <div class="header-ad" >
      <div class="header-ad-a" :style="{width:contentWidth}">
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
    <div class="nav-container" :style="{width:contentWidth}">
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

      <div class="header-container" :style="{width:contentWidth}">
        <div class="header-left">
          <img src="//img10.360buyimg.com/img/jfs/t1/124600/14/15671/184916/5f8d7112E7f52db74/60ee6ba8e8e5ce3a.gif" style="display: block; height: 120px; margin: 0px auto; width: 100%;" >
        </div>
        <div class="header-center">
          <div class="search-container">
            <div class="input-container">
              <div class="input">
                <a-input-search :placeholder="placeholder" size="large" @search="onSearch">
                  <i slot="suffix" class="iconfont icon-xiangji"></i>
                  <a-button slot="enterButton" type="primary" class="input-button" icon="search">
                  </a-button>
                </a-input-search>
              </div>
              <div class="search-hotKey" >
                <span style="color: red">{{mutiKey}}</span>
                <span v-for="item in hotKeys" style="margin-left: 10px">{{item.n}}</span>
              </div>
            </div>
            <div class="cart-container">
              <a-badge count="0" show-zero style="width: 18px;height: 14px;">
                <i class="iconfont icon-position" style="color: red"></i>
              </a-badge>
              <a ref="https://cart.jd.com/cart.action" style="color: red">我的购物车</a>
            </div>
            <div v-if="isLarge == false"  class="header-code">
            </div>
            <div>
            </div>
          </div>
          <div class="title-container">
            <a v-for="item in titles" href="item.link">{{item.name}}</a>
          </div>
        </div>
        <div v-if="isLarge" class="header-right">
          <a href=""></a>
        </div>

      </div>
    </div>
    <div class="focus-container" v-show="isLarge">
      <a :href="herf" style="width: 100%;height: 100%;">
      </a>
    </div>
    <div class="banner-container" :style="{width:contentWidth}">
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
        <a-carousel ref="carousel" v-if="bannerList.length>0" effect="fade" arrows>
          <div
            slot="prevArrow"
            slot-scope="props"
            class="custom-slick-arrow"
            style="left: 0px;zIndex: 1"
          >
            <a-button type="primary" icon="left" class="left-button"/>
          </div>
          <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 5px">
            <a-button type="primary" icon="right" class="right-button"/>
          </div>
          <i v-for="item in bannerList">
            <img :src="item[0].src">
          </i>
        </a-carousel>
        <div v-if="isLarge" class="banner-center-right">
          <div :class="index==1 ? 'banner-right-item' : '' "  v-for="(item,index) in bannerRightImages">
            <img :src="item.src" style="width: 190px;height: 150px">
          </div>
        </div>
      </div>
      <div class="banner-right">
        <div class="user-container">
          <div class="user">
            <a class="user-icon" href="//home.jd.com">
              <img style="width: 40px;height: 40px" src="data:image/png;base64,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">
            </a>
            <div>
              <div style="height: 16px;line-height: 16px;font-size: 12px">Hi~欢迎逛京东 </div>
              <div style="text-align: left">
                <span style="font-size: 12px;height: 20px">登录</span>
                <a-divider type="vertical" style="margin: 0;background: #333333"/>
                <span  style="font-size: 12px;height: 20px">注册</span>
              </div>
            </div>
          </div>
          <div style="margin-top: 15px;display: flex;justify-content: center">
            <div style="width: 70px;height: 25px;background: red;border-radius: 12.5px;margin-right: 10px">
              <a href="//xinren.jd.com" style="color: white;font-size: 12px;line-height: 25px;font-weight: bold">新人福利</a>
            </div>
            <div style="width: 70px;height: 25px;background: red;border-radius: 12.5px">
              <a href="//xinren.jd.com" style="color: white;font-size: 12px;line-height: 25px;font-weight: bold">PLUS会员</a>
            </div>

          </div>

        </div>
        <div  style="background: gray;margin-left: 30px;margin-right: 30px;height: 1px"/>
        <div class="news-container">
          <div class="header" style="display: flex;justify-content: space-between;margin-top: 15px;margin-bottom: 10px;padding-left: 15px;padding-right: 15px">
            <div class="title"  style="font-size: 14px;font-weight: bold;">京东快报</div>
            <div class="more" style="display: flex">
              <a href="https://kuaibao.jd.com/?ids=214569150,789182,223349485,790737" style="color: #333333">更多</a>
              <i class="iconfont icon-position"></i>
            </div>
          </div>
          <div class="content" style="padding-left: 15px;padding-right: 15px">
            <div class="item" v-for="(item,index) in news" style="width: 100%;display: flex;margin-bottom: 6px">
              <div style="width: 35px;color: red;margin-right: 10px;font-size: 12px;background: rgba(225,37,27,.08)">{{item | newsTypeFilter(index)}}</div>
              <div style="font-size: 12px;flex: 1;;overflow: hidden;white-space: nowrap;text-overflow:ellipsis">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toolbar-wrap" :class="toolbarIsOpen?'toolBar-open':''">
        <div class="toolbar" :class="toolbarIsOpen?'toolBar-open':''">
          <div class="toolbar-panel"></div>
          <div class="toolbar-header"></div>
        </div>
    </div>
    <div class="seckill" :style="{width:contentWidth}">
        <a class="left" href="//miaosha.jd.com">
          <div style="font-size: 30px;font-weight: 700;margin-top: 31px;color: white">京东秒杀</div>
          <div class="desc" >
            <span >16:00</span>点场 倒计时
          </div>
          <div class="time" >
            <span >00</span>
            <span>00</span>
            <span >00</span>
          </div>
        </a>
        <div class="center">
          <a-carousel ref="carousel2" v-if="killList != null" :style="{width:carouselWidth}" effect="fade" arrows>
            <div
              slot="prevArrow"
              slot-scope="props"
              class="custom-slick-arrow"
              style="left: 0px;zIndex: 1"
            >
              <a-button type="primary" icon="left" class="left-button"/>
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 5px">
              <a-button type="primary" icon="right" class="right-button"/>
            </div>
<!--            <i v-for="item in bannerList">-->
<!--              <img :src="item[0].src">-->
<!--            </i>-->
            <div v-for="item in killBannerList" style="width: 100%;height: 260px">
              <div style="display: flex;justify-content: space-between">
                <div class="item"  v-for="model in item" style="width: 200px;height: 260px;position: relative">
                  <a >
                    <img :src="model.imageurl" width="200px" height="260px">
                  </a>
                </div>
              </div>

            </div>

          </a-carousel>
        </div>
        <div class="right" style="padding: 10px">
          <a-carousel ref="carousel3" effect="fade" autoplay dotsClass="seckill-carousel-dots">
            <div style="width: 170px;height: 240px">
              <div style="width: 120px;height: 120px;margin-right: auto;margin-left: auto;margin-top: 20px">
                <img :src="this.killList.newBrandInfo.goodsInfo.imageurl" width="100%" height="100%">
              </div>
              <div style="width: 100%;height: 90px;margin-top: 10px;background: linear-gradient(180deg,rgba(255,255,255,.5),rgba(220,224,236,.5))">
                <p style="height: 21px;margin-bottom: 0;color: #666666;font-size: 14px">{{this.killList.newBrandInfo.title}}</p>
                <p style="font-weight: 700;height: 21px;margin-bottom: 5px;color: #333333;font-size: 14px">{{this.killList.newBrandInfo.operateWord}}</p>
                <div style="color: red;margin-left: auto;margin-right:auto;border-radius: 14px;width: 82px;height: 24px;line-height: 22px;padding-left: 4px;border: 1px solid #e1251b;">品牌秒杀
                  <i class="iconfont icon-position"></i>
                </div>
              </div>
            </div>
            <div style="width: 170px;height: 240px">
              <div style="width: 120px;height: 120px;margin-right: auto;margin-left: auto;margin-top: 20px">
                <img :src="this.killList.brandInfo.goodsInfo.imageurl" width="100%" height="100%">
              </div>
              <div style="width: 100%;height: 90px;margin-top: 10px;background: linear-gradient(180deg,rgba(255,255,255,.5),rgba(220,224,236,.5))">
                <p style="height: 21px;margin-bottom: 0;color: #666666;font-size: 14px">{{this.killList.brandInfo.title}}</p>
                <p style="font-weight: 700;height: 21px;margin-bottom: 5px;color: #333333;font-size: 14px">{{this.killList.brandInfo.operateWord}}</p>
                <div style="color: red;margin-left: auto;margin-right:auto;border-radius: 14px;width: 82px;height: 24px;line-height: 22px;padding-left: 4px;border: 1px solid #e1251b;">大牌闪购
                  <i class="iconfont icon-position"></i>
                </div>
              </div>
            </div>
          </a-carousel>
        </div>
      <div style="position: absolute;right: -78px;top: 0;background: white;width: 58px">
        <div v-for="i in [0,1,2,3,4,5,6]"></div>
        <div style="height: 38px;margin: 10px;line-height: 19px;font-size: 14px;text-align: center">
          京东秒杀
        </div>
        <div style="height: 58px;width: 100%">
          <img src="//m.360buyimg.com/babel/jfs/t1/146563/14/12376/93383/5f9a7f28Eaf7e5566/0ffc25de241a2cbc.gif" width="100%" height="100%">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { getCategory,getFocusBanner,getFocusBannerRight,getHelloService, getHotwords,
    getHeaderTitle,getNews,getSecKill } from "../api/home";
  import {getParenthesesStr} from "../util";
  import '../assets/font/iconfont.css'

  export default {
    data(){
      return {
        isLarge:false,
        screenWidth:0,
        listSplit:false,
        data:[],
        bannerList:[],
        bannerRightList:[],
        bannerRightImages:[],
        bannerTimer:'',
        toolbarIsOpen:true,
        dataSource:[],
        hotKeys:[],
        placeholder:'',
        mutiKey:'',
        titles:[],
        killList:null,
        news:[],
        hotMutiKeys:[],
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
      },
      newsTypeFilter(val,index){
        if (index<2){
          return '推荐'
        }else {
          return '热门'
        }
        return ''
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
      this.bannerTimer = setInterval(that.setBannerCenterRightData,2000)
    },
    computed:{
      killBannerList:function(){
        if (this.killList == null){
          return []
        }
        if (this.killList.indexMiaoSha.length>0){
          let list = [].concat(this.killList.indexMiaoSha)
          let arr = []
          var num = 3
          let n = 0
          if (this.isLarge){
            num = 4
          }
          let count = parseInt(list.length / num)
          for (let i = 1; i < count; i++) {
            let start = (i-1)*num
            arr[n++] = list.slice(start,start+num)
          }
          let y = list.length - count * num;
          if (y > 0) {
            arr[n++] = list.slice(count * num);
          }
          return arr
        }
        return []
      },
      contentWidth:function () {
        if (this.isLarge){
          return 1190+'px'
        }
        return 990+'px'
      },
      carouselWidth:function () {
        if (this.isLarge){
          return 800+'px'
        }
        return 600+'px'
      }
    },
    created() {
      this.listData(),
        this.bannerListData(),
        this.bannerRightData(),
        this.hotKey(),
        this.headerTitle(),
        this.hotNews(),
        this.secKill()
    },
    methods:{
      handleChange(value){

      },
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
      hotKey(){
        var that = this
        getHotwords().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            let arr  = JSON.parse(str).data
            that.hotMutiKeys = arr.slice(7,arr.length)
            that.hotMutiKeys.unshift(arr.slice(0,1))
            that.hotKeys = arr.slice(1,7)
            that.placeholder = that.hotMutiKeys[1].n
            that.mutiKey = that.hotMutiKeys[0][0][0].n
          }
        })
      },
      headerTitle(){
        var that = this
        getHeaderTitle().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            let data = JSON.parse(str).data
            that.titles  = data['0302692'].data
          }
        })
      },
      secKill(){
        let that = this
        getSecKill().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
           let index = reader.result.indexOf('(')
            let str = reader.result.substring(index+1,reader.result.length-2)
            that.killList = JSON.parse(str)
          }
        })
      },
      hotNews(){
        var that = this
        getNews().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.news  =  JSON.parse(str).data
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
        this.$refs.carousel.next()
        this.$refs.carousel3.next()
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
        if (this.hotMutiKeys.length>0){
          let list = this.hotMutiKeys[0][0]
          if (Array.isArray(list)){
            for (let j = 0; j < list.length; j++) {
              let model1 = list[j]
              if (model1.n == this.mutiKey){
                if (j != list.length-1){
                  this.mutiKey = list[j+1].n
                }else {
                  this.mutiKey = list[0].n
                }
                break
              }
            }
          }
          if (this.hotMutiKeys.length>1){
            for (let k = 1; k < this.hotMutiKeys.length; k++) {
              let model2 = this.hotMutiKeys[k]
              if (model2.n === this.placeholder){
                if (k != this.hotMutiKeys.length-1){
                  this.placeholder = this.hotMutiKeys[k+1].n
                }else {
                  this.placeholder = this.hotMutiKeys[1].n
                }
                break
              }
            }
          }
        }
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

.ant-badge-count{
  width: 18px;
  height: 14px;
  line-height: 14px;
}
.seckill{
  position: relative;
  .right{
    .ant-carousel .slick-dots li button{
      width: 3px;
      border-radius: 50%;
      background: #999999;
    }
    .ant-carousel .slick-dots li.slick-active button{
      background: #e1251b;
    }
    .ant-carousel .slick-dots{
      bottom: 6px;
    }
  }
}

</style>
<style scoped lang="scss">
  @import "./src/styles/variables";

  .seckill .left .desc{
    font-size: 14px;margin-top: 90px;color: white;font-weight: 400;
    span{
      font-weight: bold;padding-right: 2px;font-size: 18px;vertical-align: middle
    }
  }
  .seckill .left .time{
    margin-right: auto;margin-right: auto;width: 100%;height: 30px;margin-top: 10px;
    span{
      width: 30px;height: 30px;background: #2f3430;margin-right: 20px;font-size: 20px;color: white
    }
    span:last-child{
      margin-right: 0;
    }
  }
  .seckill{
    height: 260px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
      width: $headerMinW;
      .left{
        width: $headerLeftW;
        background: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/4a15d8883775742e3efbb850ae14def7.png);
      }

      .center{
        flex: 1;
        height: 100%;
        background: #0086b3;

        .ant-carousel{
          height: 100%;
          width: 100%;
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
          .slick-slide{
            .slick-list{
              height: 260px;
            }
          }
          .item:after{
            content: 'ff';
            width: 1px;
            height: 200px;
            position: absolute;
            top: 50%;
            right: 0;
            display: block;
            transform: translateY(-50%);
            background: linear-gradient(180deg,white,#eeeeee,white);
          }
        }
      }
      .right{
        width: $headerLeftW;
        margin-left: 10px;
        background: white;
      }
  }
  .headerLargeContainer{
    width: $headerMaxW;
  }
  .header-container{
    width: $headerMinW;
    .header-left{
      width: $headerLeftW;
    }
    .header-right{
      width: $headerLeftW;
    }
  }

  .header-center{
    .search-container{
      margin-left: 30px;
      height: 80px;
      .input-button{
        height: 32px;
        width: 58px;background: red;border: none;border-radius: 0;
      }
      .input-container{
        float: left;
        margin-top: 20px;
        width: 490px;
        .input{
          border: 2px solid red;
        }
      }
      .cart-container{
        float: left;
        margin-top: 20px;
        width: 132px;
        height: 36px;
        margin-left: 20px;
        line-height: 36px;
        border: 1px solid #e3e4e5;
        a{
          margin-left: 10px;
        }
      }
      .search-hotKey{
        text-align: left;
        width: 490px;
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
      }
    }

    .title-container{
      width: 95%;
      height: 40px;
      float: left;
      a{
        line-height: 40px;
        height: 40px;
        margin-left: 20px;
        font-size: 15px;
        color: #333333;
      }
      a:nth-child(1){
        color: red;
      }
      a:nth-child(2){
        color: red;
      }
      a:hover{
        color: red;
      }
    }
  }

  .header{
    position: relative;
    .header-code{
      height: 66px;
      width: 66px;
      float: right;
      box-shadow: #2c3e50;
      background: #f6f6f6 url(data:image/png;base64,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) 50% no-repeat;
    }
  }

  .banner-container{
    z-index: 1;
    position: relative;
    width: $headerMinW;
    .banner-left{
      width: $headerLeftW;
    }
    .banner-right{
      width: $headerLeftW;

      .user-container{
        height: 102px;
        width: 100%;
        margin-top: 13px;
        .user{
          display: flex;
          align-content: center;
          justify-content: center;

        }
        .user-icon{
          border: 2px solid #ffffff;
          border-radius: 50%;
          overflow: hidden;
          width: 40px;
          height: 40px;
          margin-right: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }
      }
      .content{
        height: 88px;
        .item{
          height: 16px;
        }
      }
    }
  }
  .header-ad-a{
    width: $headerMinW;
    height: 100%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    background-image: url("https://img20.360buyimg.com/babel/jfs/t1/141091/19/12239/44306/5f966220E3976e77e/dc93b5b8960d7edd.png.webp");;
  }
  .nav-container{
    width: $headerMinW;
    height: 30px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;

  }
.nav-right{
  height: 100%;
  display: flex;
  padding-right: 10px;
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
    .ant-carousel{
      height: 100%;
      width: 590px;
    }
  }


</style>
<style scoped>

  .main-container{
    background: lightgray;
  }
  .header-ad{
    width: 100%;
    height: 80px;
    background: rgb(139,0,155);
  }
  .header-ad-b{
    width: 190px;
    height: 100%;
    float: left;
    background-image: url("//img13.360buyimg.com/img/jfs/t1/128768/1/15594/11305/5f8d3e38E02f2c1af/c6defae33727923e.jpg.webp");  }

  .header-container{
    height: 141px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    overflow: hidden;
  }
  .header{
    width: 100%;
    background: white;
  }

  .header-left{
    height: 120px;
  }
  .header-center{
    height: 120px;
    flex: 1;
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
    z-index: 0;
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
    margin-top: 10px;
    justify-content: center;
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
    display: flex;
    flex: 1;
    justify-content: start;
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
    background: white;
  }
  .ant-carousel >>> .slick-slide {
    text-align: center;
    overflow: hidden;
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
