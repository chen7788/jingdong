<template>
  <div class="product" :style="{width:contentWidth+'px'}">
    <a-col :span="6"><div class="new">
      <div class="header">
        <a style="height: 32px;margin-left: 12px;width: 150px;display: flex;line-height: 32px">
          <h3 style="margin-right: 10px;font-size: 24px;font-weight: 700">新品首发</h3>
          <i class="iconfont icon-you" style="color: red"></i>
        </a>
      </div>
      <div class="carousel-container">
        <el-carousel :interval="5000" type="card" height="230px">
          <el-carousel-item v-for="item in list" :key="item.id">
            <a :href="item.ext_columns.url" class="mediun">
              <img :src="item.img" width="120px" height="120px" style="margin-top: 10px">
              <div class="name">{{item.name}}</div>
              <div class="tag">{{item.tag |tagFilter}}</div>
              <div class="price">1999起</div>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>

    </div></a-col>
    <a-col :span="6"><div class="rank">
      <div class="header">
        <a style="height: 32px;margin-left: 12px;width: 150px;display: flex;line-height: 32px">
          <h3 style="margin-right: 10px;font-size: 24px;font-weight: 700">排行榜</h3>
          <i class="iconfont icon-position" style="color: red"></i>
        </a>
      </div>
      <div class="content">
        <div v-if="titles != null" class="title">
          <div class="item" :class="cateId == item.cateId ? 'active':''" v-for="(item,index) in titles.slice(0,3)" :key="item.id" @mouseover="specialPriceHover(item.cateId)">{{item.cateName}}</div>
        </div>
        <div v-if="rankList != null"  class="list">
          <a class="item" v-for="(item,index) in rankList.products.slice(0,3)">
            <div class="left">
              <div class="title">Top</div>
              <div class="num">{{index}}</div>
            </div>
            <img :src="'//img14.360buyimg.com/mobilecms/s200x200_'+item.imgPath+'!q90.webp'" width="60" height="60">
            <div class="name">{{item.wareName}}</div>
          </a>
        </div>
      </div>
    </div></a-col>
    <a-col :span="6"><div class="shop">
      <div class="header">
        <a style="height: 32px;margin-left: 12px;width: 150px;display: flex;line-height: 32px">
          <h3 style="margin-right: 10px;font-size: 24px;font-weight: 700">逛好店</h3>
          <i class="iconfont icon-position" style="color: red"></i>
        </a>
      </div>
      <div class="content">
        <a class="item" v-for="item in gooShopList.slice(0,2)" :key="item.id">
          <div class="left">
            <div class="name">{{item.shopName}}</div>
            <div class="tag">自营</div>
            <div class="num">{{item.followCount | followCountFilter}}</div>
          </div>
          <div class="right">
            <img :src="item.shopPicUrl" width="75" height="75">
          </div>
        </a>
      </div>
    </div></a-col>
    <a-col :span="6"><div class="center">
      <div class="header">
        <a style="height: 32px;margin-left: 12px;width: 150px;display: flex;line-height: 32px">
          <h3 style="margin-right: 10px;font-size: 24px;font-weight: 700">领劵中心</h3>
          <i class="iconfont icon-position" style="color: red"></i>
        </a>

      </div>
      <div class="content">
        <div class="inner">
          <div class="item" v-for="item in couponList" :key="item.id">
            <a>
              <div class="price">{{'￥'+item.discount}}</div>
              <div class="title">{{item.quota}}</div>
              <div class="desc">{{item.title}}</div>
            </a>

          </div>
        </div>
      </div>
    </div></a-col>
  </div>
</template>

<script>
import {getNewProduct, getRankingList,getRankingTitles,getCoupon,getGoodShop} from "../../api/home";
import {bigNumberTransform} from "../../util";
var map = new Map()
export default {
  name: "index",
  props:{
    contentWidth:{
      default:0,
      type:Number
    },
    isLoad:{
      default:false,
      type:Boolean
    }
  },
  watch:{
    isLoad(val,oldVal){
      if (val){
        this.niceGoods()
        this.rankTitle()
        this.couponData()
        this.goodShopData()
      }
    }
  },
  data(){
    return {
      list:[],
      titles:null,
      rankListMap:map,
      rankList:null,
      cateId:0,
      couponList:[],
      gooShopList:[],
    }
  },
  filters:{
    tagFilter(val){
      if (val == ''){
        return '来这里发现更多新品'
      }
      return val
    },
    followCountFilter(val){
      return bigNumberTransform(val) +'人关注'
    }
  },
  methods:{
    niceGoods() {
      let that = this
      getNewProduct().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          that.list = JSON.parse(str).data
        }
      })
    },
    rankTitle() {
      let that = this
      getRankingTitles().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 2)
          that.titles = JSON.parse(str).cateList
          that.cateId = that.titles[0].cateId
          that.rankData(that.cateId)
        }
      })
    },
    couponData() {
      let that = this
      getCoupon().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          that.couponList = JSON.parse(str).data
        }
      })
    },
    goodShopData() {
      let that = this
      getGoodShop().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          that.gooShopList = JSON.parse(str).data
        }
      })
    },
    rankData() {
      let that = this
      getRankingList(that.cateId).then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 2)
          that.rankListMap.set(that.cateId,JSON.parse(str))
          that.rankList = JSON.parse(str)
        }
      })
    },
    specialPriceHover(index) {
      this.cateId = index
      if (this.rankListMap.has(index)){
        this.rankList = this.rankListMap.get(index)
      }else{
        this.rankData()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';


.product{
  width: $headerMinW;
  margin: 20px auto;
  height: 305px;
}
.product .new{
  background: white;
  height: 305px;
.header{
  height: 60px;
  display: flex;
  align-items: center;
}
.carousel-container{
  height: 230px;
  width: 240px;
  position: relative;
}
.el-carousel__item{
  margin-left: -20px;
  width: 160px;
}
.mediun{
  overflow: initial;
    .name{
      margin-top: 13px;
      font-size: 13px;
      margin-left: 5px;
      color: #333333;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  .tag{
    margin-top: 13px;
    font-size: 12px;
    color: #999999;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 20px;
    margin-right: 20px;
    overflow: hidden;
  }
  .price {
    margin-top: 7px;
    height: 24px;
    color: #e1251b;
    font-size: 15px;
    font-weight: bold;
    line-height: 24px;
    margin-left: 20px;
    margin-right: 20px;
  }
}
.el-carousel__item:nth-child(2n){
  background: white;
}
.el-carousel__item:nth-child(2n+1){
  background: white;
}
}
.product .rank{
  background: white;
  margin-left: 10px;
  height: 305px;
  position: relative;
  .header{
    height: 60px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .title{
    height: 25px;
    display: flex;
    justify-content: center;

    .item{
      color: #999999;
      line-height: 25px;
      border-radius: 15px;
      background: lightgray;
      width: 60px;
      font-size: 12px;
      cursor: pointer;
    }
    .item:nth-child(2){
      margin-left: 10px;
      margin-right: 10px;
    }
    .active{
      color: white;
      background: #e1251b;
    }
  }
  .list{
    height: 200px;
    margin-top: 15px;

    .item{
      display: flex;
      justify-content: left;
      align-items: center;
      margin: 10px;
      .left{
        color: white;
        width: 120px;
        height: 34px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAiCAMAAABySOkBAAAAaVBMVEVHcEzytDjztTj1uDz0uTr1uDn0tz350H7ztjf0uDbztTn4ujfytDn/sjPytDT1u0L50X761Yj5yGn61Inztjn60X760X30tjr71orysy/71YXysSzytDP704H4yWf1u0T2wFD6znT3xFzUfyWDAAAAFHRSTlMA+NdQMJwZ8vJxrSmMCue95vLm8RaVWo4AAAC4SURBVHjabdHpEoMgDATgeBfPHoiIUtu+/0NWxrFbIPv3m0k2E7pWXG53GpkooyaqGLBmu7CgPwsHSr/XlQFl7DZLAKJfi2RA6ecsAV5TFqwbxIEbBPCbMqCs2ZsCvJMlIGgKQNNxigBNAeEgAE5ePcBzMAiApgCcHACeEwCeEwCaRuCaMoCTI8AgD9A0gPM5SZHnRfIHx8mpKGlPKdITHm5BndEvWX3AKPu2IS9N20tJg+goSieGL1haOxWou0aaAAAAAElFTkSuQmCC);
        margin-right: 10px;
        .title{
          font-size: 12px;
          line-height: 16px;
          height: 16px;
        }
        .num{
          font-size: 16px;
          line-height: 18px;
          z-index: 1;
        }
      }
      .name{
        color: #333333;
        font-size: 12px;
        margin-top: 12px;
        margin-left: 10px;
        margin-right: 10px;
        height: 35px;
      overflow: hidden;//超出隐藏
        text-overflow: '';//超出文本设置为...
        display:-webkit-box;//将div1转换为盒子模型
        -webkit-line-clamp: 2;//设置div1的文本为2行
        -webkit-box-orient: vertical;//从顶部向底部垂直布置子元素
      }

    }
  }
}
.product .shop{
  background: white;
  margin-left: 10px;
  height: 305px;
  .header{
    height: 60px;
    display: flex;
    align-items: center;
  }
  .content{
    margin: 10px;
  }
}
.product .shop .content{
  .item{
    height: 113px;
    width: 100%;
    margin-bottom: 9px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .left{
      .name{
        color: #333333;
        font-size: 13px;
        height: 35px;
        overflow: hidden;//超出隐藏
        text-overflow: '';//超出文本设置为...
        display:-webkit-box;//将div1转换为盒子模型
        -webkit-line-clamp: 2;//设置div1的文本为2行
        -webkit-box-orient: vertical;//从顶部向底部垂直布置子元素
      }

      .tag{
        border-radius: 5px;
        border: 1px solid #e1251b;
        width: 40px;
        height: 20px;
        color: #e1251b;
        text-align: center;
        margin: auto;
        margin-top: 5px;
      }
      .num{
        font-size: 12px;
        color: #666666;
        margin-top: 10px;
      }
    }
    .right{
      margin-left: 20px;
      width: 85px;
      height: 85px;
      background: white;
    }
  }
  .item:nth-child(1){
    background: rgb(235,242,235);
  }
  .item:last-child{
    background: rgb(244,241,239);
  }
}

.product .center{
  background: white;
  margin-left: 10px;

  .header{
    height: 60px;
    display: flex;
    align-items: center;
  }
  .content{
    height: 245px;
    overflow: hidden;
    background-size: 100% auto;
    background: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/56b5d2b94458dedf75d696a8cad8a997.png);

    .inner{
      margin: 0 10px;
      background: transparent;
      height: 245px;
      .item{
        height: 72px;
        text-align: left;
        margin-left: 10px;
        overflow: hidden;
        position: relative;

        .price{
          margin-top: 8px;
          font-size: 20px;
          line-height: 24px;
          color: #e1251b;
          font-family: impact,sans-serif;
        }
        .title{
          font-size: 12px;
          color: #999999;
        }
        .desc{
          font-size: 13px;
          color: #333333;
        }
      }
    }
  }
}
</style>
