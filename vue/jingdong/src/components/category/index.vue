<template>
  <div class="container" >
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
          </a-list-item>ant
        </a-list>
      </div>
      <div class="banner-center">
        <a-carousel ref="carousel" v-if="bannerList.length>0" effect="fade" arrows autoplay>
          <div
            slot="prevArrow"
            slot-scope="props"
            class="custom-slick-arrow"
            style="left: 0px;zIndex: 1"
          >
            <a-button type="primary" icon="left" class="left-button"/>嗯
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
          <div v-if="news.length>0" class="content" style="padding-left: 15px;padding-right: 15px">
            <div class="item" v-for="(item,index) in news" style="width: 100%;display: flex;margin-bottom: 6px">
              <div style="width: 35px;color: red;margin-right: 10px;font-size: 12px;background: rgba(225,37,27,.08)">{{item | newsTypeFilter(index)}}</div>
              <div style="font-size: 12px;flex: 1;;overflow: hidden;white-space: nowrap;text-overflow:ellipsis">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory,getFocusBanner,getFocusBannerRight} from "@/api/home";
import {getParenthesesStr} from "../../util";
export default {
  name: "index",

  filters:{
    newsTypeFilter(val, index) {
      if (index < 2) {
        return '推荐'
      } else {
        return '热门'
      }
      return ''
    },
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
  },
  props:{
    isLarge:{
      default:false,
      type:Boolean
    },
  },
  computed:{
    contentWidth: function () {
      if (this.isLarge) {
        return 1190 + 'px'
      }
      return 990 + 'px'
    },

  },
  data(){
    return {
      data:[],
      bannerList:[],
      bannerRightImages:[],
      news:[],
      listSplit:false,
      bannerTimer:null,
    };
  },
  created() {
      this.listData(),
      this.bannerListData(),
      this.bannerRightData()
  },
  mounted() {
    this.bannerTimer = setInterval(this.setBannerCenterRightData,2000)
  },
  methods:{
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
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.banner-container{
  z-index: 1;
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
  height: 460px;
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
