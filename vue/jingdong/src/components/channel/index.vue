<template>
  <div class="container" :style="{width:contentWidth+'px'}">
    <div class="header"><span >频道广场</span></div>
    <div class="content">
      <a-list :grid="{gutter:10,column:4}" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item,index">
          <div  v-if="index==0 || index==1" class="item-a">
            <img  :src="item.bigImg" width="100%" height="100%"/>
          </div>
          <div v-else class="item-b">
            <a :href="item.ext_columns.url" class="title">
              <div class="name">{{item.name}}</div>
              <div class="desc">{{item.desc}}</div>
            </a>
            <a :href="item.ext_columns.url" class="item-b-img">
                <img v-for="itemb in item.item" :src="'//img13.360buyimg.com/img/s200x200_'+itemb.img">
            </a>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import {getChannelList} from "@/api/home";
export default {
  name: "index",

  data(){
    return{
      data:[]
    }
  },
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
        this.channelData()
      }
    }
  },
  methods:{
    channelData() {
      let that = this
      getChannelList().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let index = reader.result.indexOf('(')
          let str = reader.result.substring(index + 1, reader.result.length - 1)
          that.data = JSON.parse(str).data
        }
      })
    },
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
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.header{
    font-size: 28px;
    font-weight: 700;
    line-height: 45px;
  height: 45px;
  position: relative;
}

.content{
    margin-top: 20px;
  .item-a{
    height: 306px;
    img:hover{
      opacity: 0.8;
    }
  }
  .item-b{
    height: 148px;
    background: white;
    .title{
      padding-top: 20px;
      padding-left: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .name{
        font-size: 16px;
        font-weight: 700;
        color: #333333;
      }
      .desc{
        font-size: 11px;
        color: #999999;
        margin-left: 5px;
      }
    }
    .item-b-img{
      margin-top: 10px;
      margin-left:20px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 75px;
        height: 75px;
      }
      img:hover{
        opacity: 0.8;
      }
      img:nth-child(2){
        margin-left: 10px;
      }
    }
  }
}
</style>
