<template>
  <div class="container" :style="{width:contentWidth+'px'}">
    <div class="header">为你推荐</div>
      <a-affix :offset-top="top">
        <div class="title">
        <div class="item" v-for="(item,index) in titles">
          <div class="name" :class="index==selectedIndex?'name-b':'name-a'" @click="handleIndex(index)">{{item.title}}</div>
          <div :class="index==selectedIndex?'desc-b':'desc'">{{item.desc}}</div>
          <div v-if="index != titles.length-1"  class="line"></div>
        </div>
        </div>
      </a-affix>

    <div class="content">
      <a-list :grid="{ gutter: 10,column: 5 }" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item,index">
          <div class="item" @click="handleItemPush">
              <img :src="'//img20.360buyimg.com/jdcms/s150x150_'+item.img" width="120" height="120">
              <div class="name">{{item.t}}</div>
              <div class="price">{{'￥'+item.jp}}</div>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import {getRecommendedList} from "@/api/home";
const titleList = [
  {
    title: '精选',
    desc: '猜你喜欢'
  },
  {
    title: '智能先锋',
    desc: '大电器城'
  },
  {
    title: '居家优品',
    desc: '品质生活'
  },
  {
    title: '超市百货',
    desc: '百货生鲜'
  },
  {
    title: '时尚达人',
    desc: '美妆穿搭'
  },
  {
    title: '进口好物',
    desc: '京东国际'
  },
];
export default {
  name: "index",
  props:{
    contentWidth:{
      default:0,
      type:Number
    },
    page:{
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
        this.channelData()
      }
    },
    page(val,oldVal){
      if (val > oldVal){
        this.channelData()
      }
    }
  },
  data(){
    return{
      titles:titleList,
      selectedIndex:0,
      data:[],
      top:30
    }
  },
  methods:{
    channelData() {
      let that = this
      getRecommendedList(that.page,1609221679730).then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          if (that.data.length>0){
            let arr = [].concat(that.data)
            that.data = arr.concat(JSON.parse(str).data)
          }else {
            that.data = JSON.parse(str).data
          }
        }
      })
    },
    handleIndex(index){
      this.selectedIndex = index
    },
    handleItemPush(){
      this.$router.push('/shop')
    }
  }
}
</script>

<style lang="scss">
.ant-list-grid .ant-col > .ant-list-item {
  margin-bottom: 10px;
}
</style>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.container{
  width: $headerMinW;
  margin: 20px auto;
}
.header{
  font-size: 28px;
  font-weight: 700;
  line-height: 45px;
  height: 45px;
  position: relative;
}
.title{
  margin-top: 20px;
  height: 60px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title .item{
  width: 150px;
  position: relative;
  cursor: pointer;
  .line{
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    margin: 10px 0;
    width: 1px;
    background: linear-gradient(180deg,white,#dfdfdf 51%,white);
  }
  .name{
    line-height: 27px;
    font-size: 16px;
    margin-top: 7px;
    height: 25px;
    color: #333333;
    font-weight: 700;
    margin-left: 30px;
    margin-right: 30px;
  }
  .name-b{
    background: #e1251b;
    border-radius: 14px;
    color: white;
  }
  .desc{
    margin-top: 5px;
    font-size: 14px;
    color: #999999;
  }
  .desc-b{
    color: #e1251b;
  }
}
.title .item:hover{
  .name-a{
    color: #e1251b;
  }
  .desc{
    color: #e1251b;
  }
}
.content{
  margin-top: 20px;
  .item{
    padding-top: 20px;
    height: 245px;
    background: white;
    .name{
      color: #333333;
      font-size: 12px;
      line-height: 20px;
      margin: 10px;
      padding-top: 10px;
      height: 50px;
      overflow: hidden;//超出隐藏
      text-overflow: '';//超出文本设置为...
      display:-webkit-box;//将div1转换为盒子模型
      -webkit-line-clamp: 2;//设置div1的文本为2行
      -webkit-box-orient: vertical;//从顶部向底部垂直布置子元素
    }
    .price{
      color: #e1251b;
      font-size: 16px;
      font-weight: 700;
      font-family: Arial,sans-serif;
    }
  }
}
</style>
