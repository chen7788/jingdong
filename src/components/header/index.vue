<template>
  <div class="header-container">
      <div v-show="isShow" class="header-affix">
        <div class="header">
          <a href="//www.jd.com" class="left">
            <div  class="logo"></div>
          </a>
          <div class="center">
            <div class="input-container">
              <div class="input-border">
                <a-input-search :placeholder="placeholder" size="large" @search="onSearch">
                  <i slot="suffix" class="iconfont icon-xiangji"></i>
                  <a-button slot="enterButton" type="primary" class="input-button" icon="search">
                  </a-button>
                </a-input-search>
              </div>
            </div>
            <a>
              <div class="cart">
                <a-badge count="0" show-zero style="width: 16px;height: 10px;">
                  <i class="iconfont icon-position" style="color: red"></i>
                </a-badge>
                <a ref="https://cart.jd.com/cart.action" style="color: red">我的购物车</a>
              </div>
            </a>
            <div>
            </div>
          </div>
        </div>
      </div>
    <div class="header-ad" :style="{width:contentWidth+'px'}">
      <div class="header-ad-a" :style="{width:contentWidth+'px'}">
        <a href="https://pro.jd.com/mall/active/7P8nSbxpPbTXJxvTSobyGWSjHAM/index.html?babelChannel=ttt3" class="header-ad-b">
        </a>
        <a-icon type="close" style="float: right;margin-top: 10px;margin-right: 10px;background: lightgray"></a-icon>
        <a style="float: right;margin-right: 10px;margin-top: 17px" ref="https://pro.jd.com/mall/active/3qEpS4aUfRjsa8cg4X3sKUTBQLdA/index.html">
          <img src="//img12.360buyimg.com/babel/jfs/t1/133936/21/12940/3424/5f8e9e23E336431f8/7c1d1877ae1bc9f5.png.webp">
        </a>
        <a style="float: right;margin-right: 10px;margin-top: 17px" ref="https://pro.jd.com/mall/active/G6dB2UyBBfwfTVCBp3iMQQQ6GHi/index.html">
          <img src="//img14.360buyimg.com/babel/jfs/t1/141432/3/11358/3473/5f8ed3fbE4ec417c8/db36e61bd2e973f8.png.webp">
        </a>
      </div>
    </div>
    <header-menu :contentWidth="contentWidth" :isShow="false"/>
    <div class="header-focus" :style="{width:contentWidth+'px'}">
      <div class="header" >
        <div class="header-left">
          <img src="//img10.360buyimg.com/img/jfs/t1/124600/14/15671/184916/5f8d7112E7f52db74/60ee6ba8e8e5ce3a.gif" style="display: block; height: 120px; margin: 0px auto; width: 100%;" >
        </div>
        <div class="header-center">
          <div class="search-container">
            <div class="input-container">
              <div class="input">
                <a-input-search :placeholder="placeholder" size="large" @search="onSearch">
                  <i slot="suffix" class="iconfont icon-xiangji"></i>
                  <a-button slot="enterButton" type="primary" class="input-button" icon="search">
                  </a-button>
                </a-input-search>
              </div>
              <div class="search-hotKey" >
                <span style="color: red">{{mutiKey}}</span>
                <span v-for="item in hotKeys" style="margin-left: 10px">{{item.n}}</span>
              </div>
            </div>
            <div class="cart-container">
              <a-badge count="0" show-zero style="width: 18px;height: 14px;">
                <i class="iconfont icon-position" style="color: red"></i>
              </a-badge>
              <a ref="https://cart.jd.com/cart.action" style="color: red">我的购物车</a>
            </div>
            <div v-if="isLarge == false"  class="header-code">
            </div>
            <div>
            </div>
          </div>
          <div class="title-container">
            <a v-for="item in titles" href="item.link">{{item.name}}</a>
          </div>
        </div>
        <div v-if="isLarge" class="header-right">
          <a href=""></a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getHotwords, getHeaderTitle} from "@/api/home"
import {getParenthesesStr} from "../../util";
import {getHelloService} from "../../api/home";
import '@/assets/font/iconfont.css'
import PopView from './PopView'
import HeaderMenu from './headMenu'
export default {

  name: "index",
  components:{PopView,HeaderMenu},
  props:{
    isLarge:{
      default:false,
      type:Boolean
    },
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
    return {
      mutiKey:'',
      titles:[],
      hotKeys:[],
      placeholder: '',
      hotMutiKeys:[],
      bannerTimer:null,

      topIsHover:false,
      leftIndex:-1
    };
  },
  created() {
      this.hotKey(),
      this.headerTitle()
  },
  computed:{
  },
  mounted() {
    this.bannerTimer = setInterval(this.setTimerData,2000)
  },
  methods:{

    hotKey() {
      var that = this
      getHotwords().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let str = getParenthesesStr(reader.result)
          let arr = JSON.parse(str).data
          that.hotMutiKeys = arr.slice(7, arr.length)
          that.hotMutiKeys.unshift(arr.slice(0, 1))
          that.hotKeys = arr.slice(1, 7)
          that.placeholder = that.hotMutiKeys[1].n
          that.mutiKey = that.hotMutiKeys[0][0][0].n
        }
      })
    },
    headerTitle() {
      var that = this
      getHeaderTitle().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'UTF-8')
        reader.onload = function (e) {
          let str = getParenthesesStr(reader.result)
          let data = JSON.parse(str).data
          that.titles = data['0302692'].data
        }
      })
    },
    setTimerData() {
      if (this.hotMutiKeys.length > 0) {
        let list = this.hotMutiKeys[0][0]
        if (Array.isArray(list)) {
          for (let j = 0; j < list.length; j++) {
            let model1 = list[j]
            if (model1.n == this.mutiKey) {
              if (j != list.length - 1) {
                this.mutiKey = list[j + 1].n
              } else {
                this.mutiKey = list[0].n
              }
              break
            }
          }
        }
        if (this.hotMutiKeys.length > 1) {
          for (let k = 1; k < this.hotMutiKeys.length; k++) {
            let model2 = this.hotMutiKeys[k]
            if (model2.n === this.placeholder) {
              if (k != this.hotMutiKeys.length - 1) {
                this.placeholder = this.hotMutiKeys[k + 1].n
              } else {
                this.placeholder = this.hotMutiKeys[1].n
              }
              break
            }
          }
        }
      }else {
        return
      }
    },
    onSearch(){

    },
    helloService() {
      var that = this
      getHelloService().then(response => {
        let reader = new FileReader()
        reader.readAsText(response.data, 'GBK')
        reader.onload = function (e) {
          let str = getParenthesesStr(reader.result)
          that.bannerRightList = JSON.parse(str).data
          that.bannerRightImages = that.bannerRightList.slice(0, 3)
        }
      })
    },
  },
}
</script>

<style lang="scss">
.ant-input{
  border-radius: 0;
  height: 32px;
  line-height: 32px;
  border: none;
  font-size: 13px;
}
.ant-input:focus{
  border: none;
  box-shadow: none;
}
::v-deep .ant-badge-count{

  padding-top: 0;
  padding-bottom: 0;
}
</style>
<style scoped lang="scss">
@import '../../styles/variables.scss';

.slide-fade-enter-active {
  transition: all .3s ease;
}

.header-container{
  width: 100%;
  .header-ad{
    width: $headerMinW;
    margin: 0 auto;
  }

  .header-left{
    width: $headerLeftW;
  }
  .header-right{
    width: $headerLeftW;
  }

}
.header-affix{
  z-index: 99;
  width: 100%;
  height: 50px;
  position: fixed;
  background: white;
  animation: fadeInDown 1s ease-in-out;
  -webkit-animation: fadeInDown;
  border-bottom: 2px solid #e1251b;
  .header{
    width: $headerMinW;
    margin: 0 auto;
    height: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
    .left{
      .logo{
        width: 125px;
        height: 40px;
        background-position: 0 -120px;
        background-image: url(//misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/sprite/header/sprite.png);
      }
    }
    .center{
      display: flex;
      justify-content: left;
      align-items: center;
      .input-container{
        float: left;
        width: 490px;
        background: #e1251b;
        .input-button{
          height: 32px;
          width: 58px;background: red;border: none;border-radius: 0;
        }
        .input-border{
          border: 2px solid red;
        }
      }
      .cart{
        margin-left: 20px;
        width: 132px;
        height: 36px;
        border: 1px solid #e3e4e5;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
          margin-left: 10px;
        }
      }
    }
  }
}
/*从上到下*/
@keyframes fadeInDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
.header-center{
  .search-container{
    margin-left: 30px;
    height: 80px;
    .input-button{
      height: 32px;
      width: 58px;background: red;border: none;border-radius: 0;
    }
    .input-container{
      float: left;
      margin-top: 20px;
      width: 490px;
      .input{
        border: 2px solid red;
      }
    }
    .cart-container{
      float: left;
      margin-top: 20px;
      width: 132px;
      height: 36px;
      margin-left: 20px;
      line-height: 36px;
      border: 1px solid #e3e4e5;
      a{
        margin-left: 10px;
      }
    }
    .search-hotKey{
      text-align: left;
      width: 490px;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
    }
  }

  .title-container{
    width: 95%;
    height: 40px;
    float: left;
    a{
      line-height: 40px;
      height: 40px;
      margin-left: 20px;
      font-size: 15px;
      color: #333333;
    }
    a:nth-child(1){
      color: red;
    }
    a:nth-child(2){
      color: red;
    }
    a:hover{
      color: red;
    }
  }
}
.header-focus{
  position: relative;
  width: $headerMinW;
  margin: auto;
  .header-code{
    height: 66px;
    width: 66px;
    float: right;
    box-shadow: #2c3e50;
    background: #f6f6f6 url(data:image/png;base64,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) 50% no-repeat;
  }
}

.header-ad-a{
  width: $headerMinW;
  margin: auto;
  height: 100%;
  align-items: center;
  background-image: url("https://img20.360buyimg.com/babel/jfs/t1/141091/19/12239/44306/5f966220E3976e77e/dc93b5b8960d7edd.png.webp");;
}

</style>
<style scoped>
.header-ad{
  width: 100%;
  height: 80px;
  background: rgb(139,0,155);
}
.header-ad-b{
  width: 190px;
  height: 100%;
  float: left;
  background-image: url("//img13.360buyimg.com/img/jfs/t1/128768/1/15594/11305/5f8d3e38E02f2c1af/c6defae33727923e.jpg.webp");  }
.header-container{
  margin: auto;
}
.header{
  height: 141px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.header-left{
  height: 120px;
}
.header-center{
  height: 120px;
  flex: 1;
}

.header-right{
  height: 120px;
  background-image: url(https://img13.360buyimg.com/babel/jfs/t1/134687/1/12919/39958/5f8e90a1E75455839/5de1c29e222dcd59.png.webp);
}
</style>
