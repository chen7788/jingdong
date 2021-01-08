<template>
  <div class="special" :style="{width:contentWidth}">
    <div class="left">
      <div class="header">
        <a style="height: 32px;margin-left: 12px;width: 150px;display: flex;line-height: 32px">
          <h3 style="margin-right: 10px;font-size: 24px;font-weight: 700">每日特价</h3>
          <i class="iconfont icon-position" style="color: red"></i>
        </a>
        <div v-if="specialMenu != null" class="right">
          <div class="item" :class="specialIndex == index ? 'active':''" v-for="(item,index) in specialMenu.slice(0,specialMenu.length-1)" @mouseover="specialPriceHover(index)">
            <a href="//miaosha.jd.com/specialpricelist.html">{{item.tabText}}</a>
          </div>
        </div>
      </div>
      <div v-if="specialList != null" class="content">
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
        <div v-if="specialList.length>0" class="right">
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
      <div v-if="lightingBuyList != null"  class="content">
        <div v-if="lightingBuyList.hasOwnProperty('bigBrandView')"  class="left">
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
</template>

<script>
import {getLightingBuy, getSpecialPrice, getSpecialPriceMenu} from "../../api/home";
import {getParenthesesStr} from "../../util";

export default {
  name: "index",
  props:{
    isLarge:{
      default:false,
      type:Boolean
    },
    isLoad:{
      default:false,
      type:Boolean
    }
  },
  data(){
    return{
      specialList:null,
      lightingBuyList:null,
      specialIndex:0,
      specialMenu:null
    }
  },
  watch:{
    isLoad(val,oldVal){
      if (val){
        this.lightingBuy()
        this.specialPriceMenu()
      }
    }
  },
  computed:{
    contentWidth: function () {
      if (this.isLarge) {
        return 1190 + 'px'
      }
      return 990 + 'px'
    },
  },
  filters: {
    lowestPriceDaysInfoFilter(val) {
      if (typeof(val) == "undefined"){
        return ''
      }
      return val.substring(0, 4) + val.substring(val.length - 3, val.length)
    }
  },
  methods:{
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
  specialPriceMenu(id, num){
      var that = this
      getSpecialPriceMenu(id, num).then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        this.specialPrice(this.specialIndex)
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
    specialPriceHover(index) {
      this.specialIndex = index
      this.specialPrice(index)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.special{
  height: 305px;
  width: $headerMinW;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.special .left{
  width: calc(50% - 5px);
  height: 100%;
  background: white;
}
.special .left .header{
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.special .left .header .right{
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
.special .content{
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.special .content .left{
  width: 146px;
  margin-left: 10px;
  background: rgba(109,126,146,.05);
}
.special .content .right{
  flex: auto;
  padding: 0 10px;
}
.special .left .content .right .item{
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
.special .right{
  width: calc(50% - 5px);
  height: 100%;
  background: white;
}
.special .right .header{
  height: 60px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.special .right .content{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.special .right .content .left{
  width: 230px;
  height: 100%;
  background: linear-gradient(180deg,rgba(161,215,152,.05),rgba(31,102,26,.05));
}
.special .right .content .right{
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
</style>
