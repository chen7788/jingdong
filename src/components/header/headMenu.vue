<template>
  <div class="nav-container">
    <div class="nav-content" :style="{width:contentWidth+'px'}">
      <div class="address">
        <a v-if="isShow">
          <i class="iconfont icon-position" style="color: red"></i>
          <span>京东首页</span>
        </a>
        <i class="iconfont icon-position" style="color: red;margin-left: 10px"></i>
        <span>广东</span>
      </div>
      <div class="nav-right">
        <el-link :underline="false" >你好，请登录</el-link>
        <el-link :underline="false" style="color: #e1251b;margin-left: 10px">免费注册</el-link>
        <div class="item" v-for="(item,index) in addressList" >
          <a-divider type="vertical" style="background-color: gray"></a-divider>
          <div class="content" @mouseover="specialPriceHover(index)" @mouseleave="specialPriceHover(-1)">
            <a :class="index==3?'text-b':'text-a'" :ref="item.url" v-if="item.isUrl" >{{item.name}}</a>
            <span  v-if="index!=addressList.length-1 && !item.isUrl">{{item.name}}</span>
            <pop-view  v-if="topIndex==index && item.icon" ></pop-view>
            <a-tooltip  v-if="index==addressList.length-1" placement="bottomRight" title="Prompt Text">
              <span >{{item.name}}</span>
            </a-tooltip>
            <a-icon v-if="item.icon" type="down"></a-icon>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import PopView from './PopView'
import getCurrentCityName from "../../util/getUserLocation";

export default {
  name: "headMenu",
  components:{PopView},
  props:{
    contentWidth:{
      default:0,
      type:Number
    },
    isShow:{
      default:false,
      type:Boolean
    }
  },
  data(){
    return{
      topIndex:-1,
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
          isUrl: true
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
          isUrl: true
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
    }
  },
  mounted() {
    this.getCurrentCity()
  },
  methods:{
    specialPriceHover(index) {
      this.topIndex = index
    },
    getCurrentCity(){
      getCurrentCityName().then((city) =>{
        console.log(city)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.nav-container{
  background-color: #e3e4e5;
  width: 100%;
}
.nav-content{
  width: $headerMinW;
  height: 30px;
  display: flex;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: #ddd 1px solid ;
  background-color: #e3e4e5;
.nav-right{
  height: 100%;
  display: flex;
  align-items: center;
.item{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
.content{
  padding-left: 5px;
  padding-right: 5px;
  z-index: 1;
.text-b{
  color: #e1251b;
}
.text-a{
  color: #333333;
}

}
.content:hover{
  padding-left: 5px;
  padding-right: 5px;
a{
  color: #e1251b;
}
}

i{
  margin-top: 5px;
}
}
}
.item:nth-child(4) ,.item:nth-child(6),.item:nth-child(7),.item:nth-child(8){
.content{
  border: 1px solid #e3e4e5;
  height: 30px;
  padding-top: 2px;
  z-index: 2;
}
.content:hover{
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0;
  background: white;
  border-left: #ccc 1px solid;
  border-right: #ccc 1px solid;
  border-top: #ccc 1px solid ;
  border-bottom: white 1px solid ;

}
}
}
</style>
