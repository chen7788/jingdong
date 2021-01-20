<template>
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
</template>

<script>
import {getSuperBrand} from "../../api/home";
import {getParenthesesStr} from "../../util";

export default {
  name: "index",
  computed:{
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
  },
  methods:{
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
</style>
