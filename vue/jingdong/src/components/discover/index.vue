<template>
  <div  class="nice-Goods" :style="{width:contentWidth+'px'}">
    <div class="left">
      <div class="logo">
        <div class="text">探索新生活</div>
        <a-icon type="right-circle"  style="color: white"/>
      </div>
    </div>
    <div  @mouseover.prevent="pauseFunc()" @mouseleave.prevent="beginFunc()"  class="right">
      <div  ref="moveContent" class="moveContent">
        <a  class="item" v-for="item in niceGoodList">
          <div class="title">{{item.recommendTheme}}</div>
          <div>
            <img :src="item.goodsPic" width="150px" height="150px">
          </div>
        </a>
      </div>
      <a-slider v-if="scrollBar"   :default-value="sliderValue" style="margin-bottom: 0px"
                :tooltipVisible='false' :min="0" :max="(niceGoodList.length * 200)" @change="sliderChangeHandle"></a-slider>
    </div>
  </div>
</template>

<script>
import {getNiceGoods} from "../../api/home";
import {getParenthesesStr} from "../../util";
import '@/lib/lunbo/liMarquee.css'
import '@/lib/lunbo/jquery-1.8.3.min'
import '@/lib/lunbo/jquery.liMarquee'

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
  data(){
    return {
      scrollBar:false,
      sliderValue:0,
      niceGoodList:null
    }
  },
  watch:{
    isLoad(val){
      if (val){
        this.niceGoods()
      }
    }
  },
  computed:{
    sliderMinValue:function () {
      if (this.niceGoodList.length>0){
        return this.niceGoodList.length * 200
      }
      return -1000
    },
  },
  methods:{
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
    beginFunc() {
      this.scrollBar = false
      $('.moveContent').liMarquee('play');

    },
    pauseFunc() {
      this.scrollBar = true
      $('.moveContent').liMarquee('pause');
      let point2 = document.getElementsByClassName('str_origin')
      let value = point2[0].offsetLeft
      if (point2 < -2000){
        value = point2 + 2000
      }
      let num =  value / -1
      this.sliderValue = num
    },
    specialPriceHover(index) {
      this.specialIndex = index
      this.specialPrice(index)
    },
    sliderChangeHandle(val){
      let obj = document.getElementsByClassName('str_origin');
      obj[0].style.left = val * (-1) +'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.nice-Goods{
  width: $headerMinW;
  height: 260px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}


.nice-Goods .left{
  width: 190px;
  height: 100%;
  background-image: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/c78710f134c8845d365aa5028230db9f.png);
}
.nice-Goods .left .logo{
  width: 160px;
  height: 90px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  display: flex;
  justify-content: left;
  background-image: url(data:image/png;base64,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);
}
.nice-Goods .left .logo .text{
  color: rgba(255,255,255,.8);
  font-size: 16px;
  padding-top: 55px;
  padding-bottom: 10px;
  text-align: left;
  padding-left: 20px;
}
.nice-Goods .left .logo i{
  height: 14px;
  padding-top: 59px;
  margin-left: 5px;
}
.nice-Goods .right{
  flex: 1;
  margin-left: 10px;
  background: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.nice-Goods .right .moveContent{
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  white-space: nowrap;
  display: block;
  background: white;


}
.nice-Goods .right .item{
  margin-top: 20px;
  width: 150px;
  margin-right: 50px;
  display: inline-block;
  vertical-align: top;
  img{
    transition: opacity .2s ease;
  }
}
.nice-Goods .right .item .title{
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333333;
  font-size: 14px;
  text-align: center;
  transition: color .2s ease;
}
.nice-Goods .right .scroll-bar{
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
