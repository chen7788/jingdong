<template>
  <div class="pop-container" :style="{width:contentWidth}">
    <a-list :grid="{ gutter: 10, column: 2 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a class="title">{{item}}</a>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import {getShortService,getShortSiteNav } from "@/api/home"
import {getParenthesesStr} from "../../util";
export default {
name: "PopView",
  props:{
    index:{
      default:0,
      type:Number
    },
    isShow:{
      default:false,
      type:Boolean
    }
  },
  data(){
    return {
      data: ['待处理订单','消息','返修退换货','我的问答','降价商品','我的关注','我的京豆','我的优惠券','我的白条','我的理财',],
    }
  },
  computed:{
    contentWidth(){
      return 200+'px'
    }
  },
  mounted() {
    //this.hotKey()
  },
  methods:{
    hotKey() {
      var that = this
      getShortService().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let str = getParenthesesStr(reader.result)
          that.data = JSON.parse(str).data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pop-container{
  width: 200px;
  position: absolute;
  margin-left: 17px;
  background: white;
  left: 0;
  top: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 1px 2px 1px rgba(0,0,0,.1);
  z-index: 1;
  .title{
    color: #333333;
  }
  .title:hover{
    color: #e1251b;
  }
}
</style>
