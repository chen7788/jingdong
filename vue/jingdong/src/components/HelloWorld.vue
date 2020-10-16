<template>
  <div class="main-container">
    <div style="width: 100%;height: 80px">
      <img src="https://img14.360buyimg.com/babel/jfs/t1/126959/9/14411/79600/5f7fda53E26c6c113/6d2718d98106dccd.jpg!q70.jpg.webp" width="100%" height="100%">
    </div>
    <div class="nav-container"></div>
    <div class="header">
      <div class="header-container">
        <div class="header-left">
          <img src="https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/sprite/header/sprite.png" width="100%" height="135%">
        </div>
        <div class="header-center">

        </div>
        <div class="header-right">
          <img src="https://img11.360buyimg.com/babel/jfs/t1/152412/13/1698/14614/5f7fdb4aE57cf41e6/40ed6cb6541f671e.png.webp" width="100%" height="100%">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        isLarge:true,
        screenWidth:0
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          console.log(document.body.clientWidth)
          if (document.body.clientWidth >1350){
            that.isLarge = true
          }else {
            that.isLarge = false
          }
          that.screenWidth = document.body.clientWidth
        })();
      };
    }
  }
</script>
<style>
  .main-container{
    height: 100vh;
    background: lightgray;
  }
  .nav-container{
    width: 100%;
    height: 30px;
    background: greenyellow;
  }
  .header{

    width: 100%;
    background: white;
  }
  .header-container{
    height: 141px;
    width: 1190px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
  .header-left{
    width: 190px;
    height: 120px;
    overflow: hidden;
  }
  .header-center{
    height: 120px;
    width: 100%;
    background: aliceblue;
  }
  .header-right{
    width: 190px;
    height: 120px;
  }
</style>
