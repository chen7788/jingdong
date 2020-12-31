<template>
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
        <a-carousel v-if="killList != null" ref="carousel2" effect="fade" arrows>
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
          <div v-for="item in killBannerList" style="width: 100%;height: 260px">
            <div style="display: flex;justify-content: space-between">
              <div class="item"  v-for="model in item">
                <a >
                  <img :src="model.imageurl" width="140px" height="140px">
                  <div class="name">{{model.wname}}</div>
                  <div class="price">
                    <span class="miao">{{model.miaoShaPrice}}</span>
                    <span class="origin">{{model.jdPrice}}</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </a-carousel>
      </div>
      <div  class="right" style="padding: 10px">
        <a-carousel v-if="killList != null&& killList.length>0" ref="carousel3" effect="fade" autoplay dotsClass="seckill-carousel-dots">
          <div style="width: 170px;height: 240px">
            <div style="width: 120px;height: 120px;margin-right: auto;margin-left: auto;margin-top: 20px">
              <img :src="killList.newBrandInfo.goodsInfo.imageurl" width="100%" height="100%">
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
      <div style="position: absolute;left: 50%;top: 0;height: 408px">
        <div style="width: 58px;margin-left: 625px;background: white;z-index: 1">
          <div v-for="item in rightMenus">
            <div v-if="item.name != null && item.icon == null" style="height: 45px;padding: 10px;line-height: 19px;font-size: 14px;text-align: center">
              {{item.name}}
            </div>
            <div v-if="item.name == null && item.icon == null" style="height: 58px;width: 100%">
              <img src="//m.360buyimg.com/babel/jfs/t1/146563/14/12376/93383/5f9a7f28Eaf7e5566/0ffc25de241a2cbc.gif" width="100%" height="100%">
            </div>
            <div v-if="item.icon != null" style="height: 45px;padding: 10px">
              <i class="iconfont icon-position" style="color: red"></i>
              <div>{{item.name}}</div>
            </div>
          </div>
          <div >

          </div>
        </div>
      </div>

    </div>
</template>

<script>
import {getSecKill} from "../../api/home";

export default {
  name: "index",
  props:{
    isLarge:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      killList:[],
      rightMenus:[],
    };
  },
  computed:{
    contentWidth: function () {
      if (this.isLarge) {
        return 1190 + 'px'
      }
      return 990 + 'px'
    },
    killBannerList: function () {
      if (this.killList == null) {
        return []
      }
      if (this.killList.length == 0){
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
  },
  created() {
    this.secKill()
  },
  methods:{
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
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

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
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-content: center;
  width: $headerMinW;
  .left{
    width: $headerLeftW;
    background: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/4a15d8883775742e3efbb850ae14def7.png);
  }

  .center{
    flex: 1;
    height: 100%;
    overflow: hidden;

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
      .item{
        width: 200px;
        height: 260px;
        padding-top: 30px;
        a img{
          margin: auto;
        }
        .name{
          margin-top: 13px;
          font-size: 12px;
          color: #333333;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 20px;
          margin-right: 20px;
          overflow: hidden;
        }
        .price{
          margin-top: 7px;
          height: 24px;
          line-height: 24px;
          border: 1px solid #e1251b;
          margin-left: 20px;
          margin-right: 20px;
          background: #e1251b;
          .miao{
            width: 92px;
            text-align: center;
            color: white;
            font-size: 16px;
            font-weight: 700;
            line-height: 22px;
            float: left;
            position: relative;

          }
          .miao:before{
            content: " ";
            height: 0;
            width: 0;
            border-color: transparent white transparent transparent;
            border-style: solid;
            border-width: 22px 8px 0 0;
            position: absolute;
            top: 0;
            left: 84px;
          }

          .origin{
            width: 66px;
            float: right;
            font-size: 12px;
            color: #999999;
            line-height: 22px;
            text-decoration: line-through;
            background: white;
          }
        }
      }
      .item:after{
        content: '';
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
