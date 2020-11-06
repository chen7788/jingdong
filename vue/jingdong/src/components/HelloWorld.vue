<template>
  <div class="main-container">
    <div class="header-ad" >
      <div class="header-ad-a" :style="{width:contentWidth}">
        <a href="https://pro.jd.com/mall/active/7P8nSbxpPbTXJxvTSobyGWSjHAM/index.html?babelChannel=ttt3" class="header-ad-b">
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
      <a href="https://pro.jd.com/mall/active/7P8nSbxpPbTXJxvTSobyGWSjHAM/index.html?babelChannel=ttt3" style="width: 100%;height: 100%;">
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
        <div v-if="killList.length > 0" class="right" style="padding: 10px">
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
      <div style="position: absolute;right: -78px;top: 0;background: white;width: 58px;z-index: 1">
        <div v-for="item in rightMenus">
          <div v-if="item.name != null && item.icon == null" style="height: 38px;margin: 10px;line-height: 19px;font-size: 14px;text-align: center">
            {{item.name}}
          </div>
          <div v-if="item.name == null && item.icon == null" style="height: 58px;width: 100%">
            <img src="//m.360buyimg.com/babel/jfs/t1/146563/14/12376/93383/5f9a7f28Eaf7e5566/0ffc25de241a2cbc.gif" width="100%" height="100%">
          </div>
          <div v-if="item.icon != null" style="height: 58px;width: 100%">
            <i class="iconfont icon-position" style="color: red"></i>
            <div>{{item.name}}</div>
          </div>
        </div>
        <div >

        </div>
      </div>
    </div>
    <div class="activity-floor" :style="{height:floorHeight}">
      <div class="activity-floor-wrapper" :style="{width:floorWidth,backgroundImage:brandList.benefitImgw}">
          <div class="head" :style="{height:isLarge?'140px':'116px'}">
            <a class="link"  href="https://pro.jd.com/mall/active/7P8nSbxpPbTXJxvTSobyGWSjHAM/index.html?babelChannel=ttt3">
            </a>
          </div>
        <div class="content">
          <div class="left">
            <a class="item" :href="item.url" v-for="item in brandList.act" >
                <img :src="'//img10.360buyimg.com/img/s190x210_'+brandList.enjoy_info.enjoy.s2maketImg">
              <div class="sku-good">
                <img :src="'//img30.360buyimg.com/img/s130x130_'+item.imgUrl" height="108px" width="108px">
              </div>
              <div class="sku-desc" style="width: 145px;height: 25px">
                <img src="//img30.360buyimg.com/img/s172x30_jfs/t1/149249/28/11299/2847/5f8d3e89Ea1f0cbef/cea7d3bcfd905172.png!cc_172x30.webp" width="100%" height="100%">
                <span>{{item.desc}}</span>
              </div>
              <div class="sku-title">{{item.name}}</div>
            </a>
          </div>
          <div class="right" >
            <a v-for="item in brandList.shop" href="item.url"  style="margin-bottom: 8px;display: block">
                <img :src="item.imgUrl" width="100%" height="85px" style="border-radius: 5px">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="spec">
      <div class="core1">
          <div class="left">
            <div class="header">
              <a style="height: 32px;margin-left: 12px;width: 150px;display: flex;line-height: 32px">
                <h3 style="margin-right: 10px;font-size: 24px;font-weight: 700">每日特价</h3>
                <i class="iconfont icon-position" style="color: red"></i>
              </a>
              <div v-if="specialMenu" class="right">
                <div class="item" :class="specialIndex == index ? 'active':''" v-for="(item,index) in specialMenu.slice(0,specialMenu.length-1)" @mouseover="specialPriceHover(index)">
                  <a href="//miaosha.jd.com/specialpricelist.html">{{item.tabText}}</a>
                </div>
              </div>
            </div>
            <div v-if="specialList.length > 0" class="content">
              <div  class="left">
                <a>
                  <div style="width: 90px;color: white;height: 24px;font-size: 12px;line-height: 24px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAYBAMAAACIFvdWAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURfa3PfekAPesGfenC/a0MvewJ5uweioAAABjSURBVHjajdAxDYBQAMRQBhBwEggKsECCge9fDEwEaNLcmzt16i1b6nbekrTtSOp67Knr427b+lzzKEa8FCNQy4gPH/FnI8hGkI0gG0E2gmwEYYTCCIURCiMURiiMUBihMEJd/HcrFSr6YboAAAAASUVORK5CYII=)" >{{specialList[0].lowestPriceDaysInfo}}</div>
                  <div style="margin-top: 20px;margin-bottom: 10px">
                    <img :src="specialList[0].imageurl" width="100px" height="100px">
                  </div>
                  <div>
                    <div style="margin: 0 13px;white-space: nowrap;text-overflow: clip;overflow: hidden;color: #333333">{{specialList[0].wname}}</div>
                    <div>
                      <span style="color: #e1251b;font-weight: 700;font-size: 18px">￥<span>{{specialList[0].miaoShaPrice}}</span>
                      </span>
                      <span style="color: #999999;font-size: 12px;text-decoration:line-through">￥<span>{{specialList[0].jdPrice}}</span></span>
                    </div>
                  </div>
                </a>
              </div>
              <div class="right">
                <div class="item" v-for="item in specialList.slice(1,specialList.length)">
                  <a >
                    <div style="width: 74px;height: 74px;position: relative">
                      <img :src="item.imageurl" height="74px" width="74px">
                      <div style="position: absolute;bottom: 0;left: 0;width: 74px;color: white;height: 16px;font-size: 11px;line-height: 16px; background: rgba(0,0,0,.6)" >{{item.lowestPriceDaysInfo | lowestPriceDaysInfoFilter}}</div>
                    </div>
                    <div style="flex: 1;margin-left: 5px">
                      <span style="text-align: left;font-size: 12px;line-height: 16px;text-overflow: ellipsis;height: 32px;overflow: hidden;word-break: break-all;display:-webkit-box;color: #333333">{{item.wname}}</span>
                      <div style="text-align: left">
                        <span style="color: #e1251b;font-size: 14px;font-weight: 700">￥<span>{{specialList[0].miaoShaPrice}}</span></span>
                        <div style="color: #999999;text-decoration:line-through">￥<span>{{specialList[0].jdPrice}}</span></div>
                      </div>
                      <div style="color: #999999;text-align: left">{{item.alreadySoldInfoPcPre.substring(0,2)}}
                        <span style="color: #e1251b"> {{item.alreadySoldInfoPcNum}}</span>
                        {{item.alreadySoldInfoPcPre.substring(3,item.alreadySoldInfoPcPre.length)}}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="header">
              <a style="height: 32px;margin-left: 12px;width: 150px;display: flex;line-height: 32px">
                <h3 style="margin-right: 10px;font-size: 24px;font-weight: 700">品牌闪购</h3>
                <i class="iconfont icon-position" style="color: red"></i>
              </a>
            </div>
            <div class="content">
              <div  class="left">
                <a :href="lightingBuyList.bigBrandView[0].jumpUrl">
                  <img :src="lightingBuyList.bigBrandView[0].logoImg" width="50px" height="25px" style="margin-top: 25px">
                  <h6 style="height: 20px;line-height: 20px;font-size: 16px;font-weight: 700;color: #333333;margin-top: 6px">{{lightingBuyList.bigBrandView[0].title}}</h6>
                  <div style="color: #666666;margin-bottom: 8px;margin-top: 5px">{{lightingBuyList.bigBrandView[0].promotionInfo}}</div>
                  <img :src="lightingBuyList.bigBrandView[0].imgUrl" width="110px" height="110px">
                </a>
              </div>
              <div class="right">
                <div class="item" v-for="item in lightingBuyList.brandList">
                  <a>
                      <div >
                        <img :src="item.logoImg" height="40px" width="80px">
                      </div>
                    <div style="font-size: 12px;color: #333333">{{item.title}}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="nice-Goods">
          <div class="left">
            <div class="logo">
              <div class="text">探索新生活</div>
              <a-icon type="right-circle"  style="color: white"/>
            </div>
          </div>
          <div @mouseover="pauseFunc()" @mouseleave="beginFunc()"  class="right">
            <div class="moveContent" :style="{transform:`translate3d(${niceGoodX}px,0px,0px)`}">
              <a class="item" v-for="item in niceGoodList">
                <div class="title">{{item.recommendTheme}}</div>
                <div>
                  <img :src="item.goodsPic" width="150px" height="150px">
                </div>
              </a>
            </div>
            <div  class="scroll-bar" v-show="scrollBar">
              <span class="scroll-points"></span>
            </div>
          </div>
      </div>
      <div class="core2">

          <div class="top">

          </div>
          <div class="nice-shop">

          </div>
          <div class="coupon">

          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getCategory,getFocusBanner,getFocusBannerRight,getHelloService, getHotwords,
    getHeaderTitle,getNews,getSecKill,getSuperBrand,getSpecialPrice,getSpecialPriceMenu,
  getLightingBuy,getNiceGoods} from "../api/home";
  import {getParenthesesStr} from "../util";
  import '../assets/font/iconfont.css';

  import '../lib/lunbo/liMarquee.css'
  import '../lib/lunbo/jquery-1.8.3.min'
  import '../lib/lunbo/jquery.liMarquee'

  var  pause = 0;
  var pauseFlag = 0;
  var beginFlag = 0;
  var moveDiv = document.getElementsByTagName('moveContent')[0];
  var speed = 0.05;
  var intervalNum = 0.1;
  var niceGoodsTimer = null;

  export default {
    data() {
      return {
        isLarge: false,
        screenWidth: 0,
        listSplit: false,
        data: [],
        bannerList: [],
        bannerRightList: [],
        bannerRightImages: [],
        bannerTimer: '',
        toolbarIsOpen: true,
        dataSource: [],
        hotKeys: [],
        placeholder: '',
        mutiKey: '',
        titles: [],
        killList: [],
        news: [],
        rightMenus: [
          {
            name: '京东秒杀',
            icon: null
          },
          {
            name: null,
            icon: null
          }, {
            name: '特色优选',
            icon: null
          }, {
            name: '频道广场',
            icon: null
          }, {
            name: '为你推荐',
            icon: null
          }, {
            name: '客服',
            icon: ''
          }, {
            name: '反馈',
            icon: ''
          }

        ],
        hotMutiKeys: [],
        addressList: [
          {
            name: '我的订单',
            icon: false,
            isUrl: true,
            url: '//order.jd.com/center/list.action'
          },
          {
            name: '我的京东',
            icon: true,
            isUrl: false
          },
          {
            name: '京东会员',
            icon: false,
            isUrl: true,
            url: '//vip.jd.com/'
          },
          {
            name: '企业采购',
            icon: true,
            isUrl: false
          },
          {
            name: '客服服务',
            icon: true,
            isUrl: false
          },
          {
            name: '网站导航',
            icon: true,
            isUrl: false
          },
          {
            name: '手机京东',
            icon: false,
            isUrl: false
          },
        ],
        brandList: [],
        specialMenu: [],
        specialList: [],
        specialIndex: 0,
        lightingBuyList: [],
        niceGoodList: [],
        niceGoodX: 0,
        scrollBar:false
      }
    },
    filters: {
      filterItemName(val) {
        let name = ''
        if (Array.isArray(val.s)) {
          for (let item of val.s) {
            let arr = item.n.split('|')
            if (name !== '') {
              name += '/' + arr[1]
            } else {
              name += arr[1];
            }
          }
        } else {
          let arr = val.s.n.split('|')
          name = arr[1]
        }
        return name
      },
      newsTypeFilter(val, index) {
        if (index < 2) {
          return '推荐'
        } else {
          return '热门'
        }
        return ''
      },
      lowestPriceDaysInfoFilter(val) {

        return val.substring(0, 4) + val.substring(val.length - 3, val.length)
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          if (document.body.clientWidth > 1350) {
            that.isLarge = true
          } else {
            that.isLarge = false
          }
          that.screenWidth = document.body.clientWidth
        })();
      };
      this.bannerTimer = setInterval(that.setBannerCenterRightData, 2000);


    },
    ready(){

    },
    computed: {
      killBannerList: function () {
        if (this.killList.length == 0) {
          return []
        }
        if (this.killList.indexMiaoSha.length > 0) {
          let list = [].concat(this.killList.indexMiaoSha)
          let arr = []
          var num = 3
          let n = 0
          if (this.isLarge) {
            num = 4
          }
          let count = parseInt(list.length / num)
          for (let i = 1; i < count; i++) {
            let start = (i - 1) * num
            arr[n++] = list.slice(start, start + num)
          }
          let y = list.length - count * num;
          if (y > 0) {
            arr[n++] = list.slice(count * num);
          }
          return arr
        }
        return []
      },
      contentWidth: function () {
        if (this.isLarge) {
          return 1190 + 'px'
        }
        return 990 + 'px'
      },
      floorWidth: function () {

        if (this.isLarge) {
          return 1270 + 'px'
        }
        return 1057 + 'px'
      },
      floorHeight: function () {
        if (this.isLarge) {
          return 590 + 'px'
        }
        return 491 + 'px'
      },
      carouselWidth: function () {
        if (this.isLarge) {
          return 800 + 'px'
        }
        return 600 + 'px'
      },
    },
    created() {


      this.listData(),
        this.bannerListData(),
        this.bannerRightData(),
        this.hotKey(),
        this.headerTitle(),
        this.hotNews(),
        this.secKill(),
        this.superBrand(),
        this.specialPrice(this.specialIndex),
        this.specialPriceMenu(),
        this.lightingBuy(),
        this.niceGoods()
    },
    methods: {
      handleChange(value) {

      },
      listData() {
        var that = this
        getCategory().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.data = JSON.parse(str).data
          }
        })
      },
      hotKey() {
        var that = this
        getHotwords().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            let arr = JSON.parse(str).data
            that.hotMutiKeys = arr.slice(7, arr.length)
            that.hotMutiKeys.unshift(arr.slice(0, 1))
            that.hotKeys = arr.slice(1, 7)
            that.placeholder = that.hotMutiKeys[1].n
            that.mutiKey = that.hotMutiKeys[0][0][0].n
          }
        })
      },
      headerTitle() {
        var that = this
        getHeaderTitle().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            let data = JSON.parse(str).data
            that.titles = data['0302692'].data
          }
        })
      },
      secKill() {
        let that = this
        getSecKill().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let index = reader.result.indexOf('(')
            let str = reader.result.substring(index + 1, reader.result.length - 2)
            that.killList = JSON.parse(str)
          }
        })
      },
      hotNews() {
        var that = this
        getNews().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.news = JSON.parse(str).data
          }
        })
      },
      superBrand() {
        var that = this
        getSuperBrand().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.brandList = JSON.parse(str).data
          }
        })
      },
      specialPrice(index) {
        var that = this
        getSpecialPrice(index).then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.specialList = JSON.parse(str).data
          }
        })
      },
      specialPriceMenu(id, num) {
        var that = this
        getSpecialPriceMenu(id, num).then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.specialMenu = JSON.parse(str).data
          }
        })
      },
      lightingBuy() {
        var that = this
        getLightingBuy().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.lightingBuyList = JSON.parse(str).data
          }
        })
      },
      niceGoods() {
        var that = this
        getNiceGoods().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'UTF-8')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.niceGoodList = JSON.parse(str).data
            setTimeout(()=>{
              $('.moveContent').liMarquee();
            })
          }
        })
      },
      bannerListData() {
        var that = this
        getFocusBanner().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.bannerList = JSON.parse(str).data
          }
        })
      },
      bannerRightData() {
        var that = this
        getFocusBannerRight().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.bannerRightList = JSON.parse(str).data
            that.bannerRightImages = that.bannerRightList.slice(0, 3)
          }
        })
      },
      helloService() {
        var that = this
        getHelloService().then(response => {
          let reader = new FileReader()
          reader.readAsText(response.data, 'GBK')
          reader.onload = function (e) {
            let str = getParenthesesStr(reader.result)
            that.bannerRightList = JSON.parse(str).data
            that.bannerRightImages = that.bannerRightList.slice(0, 3)
          }
        })
      },
      setBannerCenterRightData() {
        // this.$refs.carousel.next()
        // this.$refs.carousel3.next()
        if (this.bannerRightImages.length == 0) {
          return
        }
        let model = this.bannerRightImages[2]
        let arr = []
        let index = this.bannerRightList.length
        for (let i = 0; i < this.bannerRightList.length; i++) {
          let item = this.bannerRightList[i]
          if (model.src === item.src) {
            index = i
          }
          if (i > index) {
            if (arr.length < 3) {
              arr.push(item)
            } else {
              break;
            }
          }
        }
        if (arr.length == 1) {
          arr.push(this.bannerRightList[0])
          arr.push(this.bannerRightList[2])
        }
        if (arr.length == 2) {
          arr.push(this.bannerRightList[0])
        }
        if (arr.length == 0) {
          arr.push(this.bannerRightList[0])
          arr.push(this.bannerRightList[1])
          arr.push(this.bannerRightList[2])
        }
        this.bannerRightImages = arr
        if (this.hotMutiKeys.length > 0) {
          let list = this.hotMutiKeys[0][0]
          if (Array.isArray(list)) {
            for (let j = 0; j < list.length; j++) {
              let model1 = list[j]
              if (model1.n == this.mutiKey) {
                if (j != list.length - 1) {
                  this.mutiKey = list[j + 1].n
                } else {
                  this.mutiKey = list[0].n
                }
                break
              }
            }
          }
          if (this.hotMutiKeys.length > 1) {
            for (let k = 1; k < this.hotMutiKeys.length; k++) {
              let model2 = this.hotMutiKeys[k]
              if (model2.n === this.placeholder) {
                if (k != this.hotMutiKeys.length - 1) {
                  this.placeholder = this.hotMutiKeys[k + 1].n
                } else {
                  this.placeholder = this.hotMutiKeys[1].n
                }
                break
              }
            }
          }
        }
      },
      specialPriceHover(index) {
        this.specialIndex = index
        this.specialPrice(index)
      },
      niceGoodsMove() {
        if (this.niceGoodList != null){
          let point =  this.niceGoodList.length * 200
          if (Math.abs(this.niceGoodX) > point){
            this.niceGoodX = 0
          }else {
            this.niceGoodX += -0.2
          }
        }
      },
      startMove() {
        niceGoodsTimer = setInterval(this.niceGoodsMove, intervalNum/speed)
      },
      beginFunc() {
        this.scrollBar = false
        $('.moveContent').liMarquee('play');

      },
      pauseFunc() {
        this.scrollBar = true
        $('.moveContent').liMarquee('pause');
      },
      onSearch(){

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
      background: #f6f6f6 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAC9FBMVEX/////DAD/CAD/AAD/GAD/EwD/kob/hXj/EQD/urT/nJL/JQ7/GQD/8e//4t//19L/rqf/Z2H/SUH/+Pf/paH/jIb/f3L/dmj/cGH/YVH/UD3/RTL/KiL/KxX/////////AAD/EwD/FwD/hXj/kob/fnD/cGH/GwP/5uP/oJbeAADjGxn/DQD/BgD/r6f/29b/Zlb/mo//bF3/YlH/Qy7/NiL/CgD/AwD/8/L/4d7/wLn/9/b/393/urP/EQD/DwD/tq7/pZz/h4b/W0r/RDH/Pir/GQH/7ez/vLX/iHz/Mx3/Hwj/+/v/6OX/4uH/jH//Y1P/X07/QC3/KRP//f3/1dH/RzXfBwb/8O7/6uj/3dr/0Mv/yMP/kIX/g3b/fXD/b1//VEH/JA3gCwr/xcD/rKT/jYL/gXP/dmj/MDD/JhD/0s//y8X/sqn/qqL/lov/cnH/c2T/WEf/ISHjHx3/+fj/2Nj1w8T/p5/0mpj/aVj/Tz3/LRfjFxXhFBLjEA7/CAj/9fL/497/pJr/l47/VFP/PDnjAQD/7+v/2NT/zcj/yMj0v8D0pKT/oaH/m5v0lpTzjov/j4L/em7zb2npUVD/QkLmMC7/Lxn/IQvbAAD/8fD/7Oj/ubj1qan/j4/yhILvcXD/a2n/YWH/TDn/SzXgAADX+fv/wb3/trX/sa70oaD/lYj/eHjvdnb0dnD/eWrmNjX/NjTiLCv/Ghn/FBLb1tj0u730t7j/qKf/p6f0np7/pJv/mJf/nZPxkpHwfXznaGjsXl3rWVn/U0jpRkb/R0X/TkLoPz7/LS3/Kij/OiX/GRn9Dg7nBgXj///6/v/u/P3Y6+zi6erP292s2Nr0zs/PzM+5u7zffH31fnn7aGH/Z1//XFThQD/dMjHrJCP/LiL/KR3qFRXrBgTI+frA8fPw7vHh3N/A2dn/zc35zMy8x8jfwMDMu7vHqqzXoaGhnqCinp/NdnbgcXHdUFDRS0rHQ0NlPT3/OCntKSbyGxnHzl75AAAAH3RSTlPy8vLy8vLy8vLy8vLl8vLy8vLy8vLy8vLy8vLy8vLlemk94QAACWJJREFUSMdtl2V0G0cQgM9WU2bmmbuILbJssWzZlgUmycyMMdXsmO00hjA2zGmSMjMzMzMzM//p3Pqsuk2/925/aPd7c3M7N7fijj8iKsIC2VHcsbIFsnM5jjtJdhzHHRctiz6Jm+Vs2ZHckbIFURGOOJ4TBD6CgAshFnmsAYACbAGo1Vt1RphFiXKQ4/zVAhfFO0vVWWq1OstRWk1yB9b0N/R4wSjKftvlpX2SbMZGkrNL3WyxurRcFcVFJdphjjSSaR7aMB1KRVmwkSphwjBNboQ58lXRFFkNpub4+NzmJFCQvLNVDU4sBIfe4/PpeAcA5DzZRmNoZRbJSgg258bHN3thB5OzIA9FYpksUk5yCRJ6vyjzGAQGk5NRJAOWSJHjURAETGZy+/TwsM+TMZ1dX18fTNSLctnl5ukD00mSbECeFlvA/j9yGGfJAwKxFESGEWnq/+VcknlcyuRYFPS5SXJbhtf7cM5FV7pA+ajXm4eKK0P/K2dBC4p0SLIVU6HEpkdEG4tOWNEYyXkpighSzg5IWpucfPfaUkkuXBukzcpLjk3k3zHvhPa16VbBM2w2X5rAZMfau5OT17ZDgOToxHyYYwOTuwBolzNYTBYxHXUZSDSRrIAIJC8QqhVzpDLZBMbOqpTGzip5RaIuC8KdjSkW65C8kJWnL7K4y380J8P5VFOVHYR2tACIGfsRwIMB8KERKkhW4Hxk3FEL53FNEMqvMUAQR8IbdRnhsKCrDG+zlcHSa9LSUkmuv2b+6qM4Dg7HgBKCCgk1ANQgsnznw0ly+x63WJZ72kBk+f4cXe0ipcCL7+vb+xv3hCAOh/c7xTd1T2xs7B4D2CcnY4+VZAsOsBdHCRL4FIBgFQSrB6j0k0heASJNKDIC+Szn0wdckLDGQvPla5qmKtesAPeaixrSSC4WZV2iWIBOkqvXLCfZOWUyDWP6mqXZ7wji01aDFfUk5+Ik3IvZoJFem2V61OsR7WDBcvAiYiXMEkAdbgNAGRVJCLo215Is35y2y4yL4CLM8Cr2Xw1wcPrgwdRC4zLT9OWXmzaPYAW4ryiAkisa9bxtZFdCzalUnmIRefFKGq9HRBPJQ8/fvuq21asHBwfXrV//5pvrBu9/KwgmKv4OzKGbI1Q8JgJHshsKVuZSZPdKRXPhjVeTrLhtu5Yo2k7XR8/MFNVt37sEKm4M13dRFTmbUwt91CtbMjm6bfFZe0jOQQ2IaHBosTZmfPxQ0ab7Vrm/+/23v0a1VwGxEVHqYUa9DhNdYmRngQV5koewqr+YZpKe3HCbduz9jx55FS57Dl585aU/67S7S1qX9zf15GEOtTiAVj3/5IE+jjvCj5io0qOBIkeK6CrtzBsvv/DC86+9/pkLXq0b0y6upEk5TKIevWJkzKCRZKG2xS+0PB2EjU/nPaNwBKAvsGS39v2Xv771ss9f++HH11/59eMYUVY9syEgv3kbyS5HwtPxgQB7YHZIx4RMAKDrarZVisWHHvjkvZtuveyyl7749KdDMSQ3UZeqwq7MSeyGBEzPdGAGk0sgdaIMMu2zbb8aBrB61aGbbnp2JuaN77/9Zt/H470x2lXhiWSSK6FhwgRBzIViTNx5AhdlVd1Slg/QTVkvRIFFPjhYN/5sb+/4s+++uGlmtJcir3YFhrAiPx/y6coM7ACjzVZ7HOWMWAAABzDWpUQdk+PX1cUQdTfc+twDMzGE9i4AM26AfzB6rPpo7kRHCwoT9VDiNt9SEVCQbEDfIMmj4zPv/vzLezOjoyTTPu9wL5qohIFbqoGg6AXUwzhIR8QEANrnSaq/LjEyyb1jW24YHx+94YYtW3qZDJSzEmKxBiSY7O53hFzsG1p7c2Woo8fcf/Fqbd3j61bvXvfItbc/smlT76h2VWxPO9hDxaDBOGZmffChcATJDCbbsBKSqfZht1b70Ff337/4wX279z50k7hVCrwXiIjsQJTk7OYyJl//ZdoTW9EE9r1FY1v2rb9r3+MPXrt49bVFMXV31eDW3PjmSUlefuMfgiDJtazHePFuaGQv5bLrioo2bXrgwS37Hnp875Zre8fq1o+gSLUklyP6/SSf+lgA4jF1cxss39W0uXLXIpL79m7XjhaNFWl7i8Zith8aK9p+X9sVwWAOVklymU1Hh5IF1IbckIqIQdYMKsFJsvOtS667hLjukuvWr191++C6+9xAKNAsyW6p6Z9scFFkwVMYFzeVdkfaVC7JxivVFzPcxprpprSaG3eCSMGdBUwumDLf0dBgMJzMcqbIjAHW/LwwjwwUKYM5kij6CsyTmv4p1cWQi1UajaYQC5WpOHxP46XKWd5eBJm1WKFJx4cvXQED7OcDunRlN8aTuqPrFJazilV3HIo0QRlGyAdEYCV4NXTjP9QCQTmfUWGHpSkOAEhIkcvlKQs7u9EiX6TjdbUpHQAdKYrOcEpFihGU2C0XMVktKQNQUrWfPrEc/Au20/GgppEHhg7VQJA8IJ2zhmi0s6d9pHweKfVQ3qno1ECos6pTkVIhlvxWLIMGFlkObSkJYEALLQxXbVScedjHfR6IQKSjHXwYBAXJZvRBOxJSA1wgZCvn8LHDVuk9CVByj0ZToeM7aBNarAs1T1mVmgMkBy9NpsgjyhxbHs0cS02/7598mbwBVVCP/0MyEDRlApAqLIoPgfNOg8Fwp0M6e9ZPpUEbejwZ2dn+RJ7vzo6Li6MrHU0NtKzher3vDs3Uwx5/zjmHH1wZTkRMB7Ah4rLIeVqPDJUHt0ImInDS8ZHn546PjitaxTJ+tBBHAHIefeyxLFixy0l06+mM4Rmp8SUKtJeBzTUJxxx2cG3CXBDJwhaQUKGITiVGHgIn6sSbotiyw+SGJ5qgeOVyaszbytn70LrS+0SGh+cFfmtqanMjbdW25pyVrbBMmD24bv1PzkloASMiJpawCiuBYfSorBiWJuOhFXUAttnI3h6LxdLTHpET0AeODz5EoRiM/b6bnaHsnm18Xk8yuELufk2PGUpv9vW3Ws4nuRjmSIvIqTSq9TyAHkO0GQlQg7GsBKzYDSLFKPRxJJerdyyx2+1Ldqq7/iUvs3rU6tqJYiicaIOuWwwAEEZ+ItterC5ZUoYCbZUgqCL4/yWHBKvOb3TlQx9dma5Mdlg3uxpsfnGpLc8F4t/B6DmOpr+DIsfIzqPxxCOiZNEncPM5UnYWTUYTUbILTrvwb/36Wy+HQLaLAAAAAElFTkSuQmCC) 50% no-repeat;
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

.activity-floor{
  height: 491px;
  width: 100%;
  min-width: 1057px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  transform: translate3d(0,0,0);
}
  .activity-floor .activity-floor-wrapper{
    position: relative;
    width: 1057px;

    height: 100%;
    margin-left: auto;
    margin-right: auto;
    background-image: url("//img30.360buyimg.com/babel/s1270x590_jfs/t1/135132/31/14108/232812/5f9c2f8cEbd99768c/c377ac7b2fb8e3e5.jpg");
    background-size: cover;
  }
  .activity-floor .activity-floor-wrapper .link{
    height: 100%;
    width: 100%;
    left: 20px;
    position: absolute;
  }
  .activity-floor .activity-floor-wrapper .head{
    height: 116px;
    width: 100%;
    position: relative;
  }
  .activity-floor .activity-floor-wrapper .content{
    display: flex;
    justify-content: center;
    padding-left: 31px;
    padding-right: 20px;
    height: 364px;
    width: 100%;
    position: relative;
    .left{
      flex: 1;
      height: 100%;
      .item{
        float: left;
        width: 157.5px;
        height: 177px;
        margin-right: 10px;
        margin-bottom: 10px;
        background: #55a532;
        border-radius: 5px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .sku-good{
          position: absolute;
          left: 25px;
          top: 6px;
          width: 108px;
          height: 108px;
        }
        .sku-desc{
          left: 6.5px;
          top: 120px;
          position: absolute;

          span{
            left: 0;
            width: 100%;
            top: 5.5px;
            position: absolute;
            text-align: center;
            line-height: 14px;
            color: white;
          }
        }
        .sku-title{
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          text-align: center;
          color: #e1251b;
        }
      }
      .item:last-child{
        margin-right: 0;
      }
    }
    .right{
      width: 158px;
      margin-right: 10px;
    }
  }

.spec{
  width: 100%;
  height: 910px;
}
  .spec .core1{
    height: 305px;
    width: $headerMinW;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }
  .spec .nice-Goods{
    width: $headerMinW;
    height: 260px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
  }
  .spec .core2{
    width: $headerMinW;
    height: 305px;
    margin: 20px auto;
    background: #55a532;
  }
  .spec .core1 .left{
    width: calc(50% - 5px);
    height: 100%;
    background: white;
  }
  .spec .core1 .left .header{
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
  .spec .core1 .left .header .right{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .item a{
      color: #999999;
      font-size: 14px;
      line-height: 19px;

      text-align: center;
      position: relative;
    }
    .active a{
      color: #e1251b;
      border-bottom: 2px solid #e1251b;
    }
  }
  .spec .core1 .content{
    height: calc(100% - 70px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .spec .core1 .content .left{
    width: 146px;
    margin-left: 10px;
    background: rgba(109,126,146,.05);
  }
  .spec .core1 .content .right{
    flex: auto;
    padding: 0 10px;
  }
  .spec .core1 .left .content .right .item{
    width: 50%;
    height: 50%;
    float: left;
    padding-top: 10px;
    a{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

  }
  .spec .core1 .right{
    width: calc(50% - 5px);
    height: 100%;
    background: white;
  }
  .spec .core1 .right .header{
    height: 60px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  .spec .core1 .right .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .spec .core1 .right .content .left{
    width: 230px;
    height: 100%;
    background: linear-gradient(180deg,rgba(161,215,152,.05),rgba(31,102,26,.05));
  }
  .spec .core1 .right .content .right{
    flex: 1;
    height: 100%;
    position: relative;
    margin-top: -40px;
    .item{
      width: 115px;
      height: 100px;
      display: block;
      position: relative;
      float: left;
      overflow: hidden;
      box-sizing: border-box;
    }
    .item:nth-child(2n - 1):after{
      content: '';
      width: 1px;
      height: 60px;
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -30px;
      display: block;
      transform: translateY(-50%);
      background: linear-gradient(180deg,white,#eeeeee,white);
    }
  }
  .spec .nice-Goods .left{
    width: 190px;
    height: 100%;
    background-image: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/c78710f134c8845d365aa5028230db9f.png);
  }
  .spec .nice-Goods .left .logo{
    width: 160px;
    height: 90px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    display: flex;
    justify-content: left;
    background-image: url(data:image/png;base64,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);
  }
  .spec .nice-Goods .left .logo .text{
    color: rgba(255,255,255,.8);
    font-size: 16px;
    padding-top: 55px;
    padding-bottom: 10px;
    text-align: left;
    padding-left: 20px;
  }
  .spec .nice-Goods .left .logo i{
    height: 14px;
    padding-top: 59px;
    margin-left: 5px;
  }
  .spec .nice-Goods .right{
    flex: 1;
    margin-left: 10px;
    background: white;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .spec .nice-Goods .right .moveContent{
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    white-space: nowrap;
    display: block;
    background: white;


  }
  .spec .nice-Goods .right .item{
    margin-top: 20px;
    width: 150px;
    margin-right: 50px;
    display: inline-block;
    vertical-align: top;
    img{
      transition: opacity .2s ease;
    }
  }
  .spec .nice-Goods .right .item .title{
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333333;
    font-size: 14px;
    text-align: center;
    transition: color .2s ease;
  }
  .spec .nice-Goods .right .scroll-bar{
    position: absolute;
    left: 15px;
    bottom: 10px;
    width: calc(100% - 30px);
    height: 3px;
    border-radius: 3px;
    background: #f3f3f3;
    transition: opacity .3s ease;

    span{
      width: 79px;
      height: 9px;
      background: #d8d8d8;
      position: absolute;
      top: 50%;
      margin-top: -4.5px;
      border-radius: 4px;
    }
  }
</style>
<style scoped>

  .main-container{
    background: rgb(242,242,242);
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
