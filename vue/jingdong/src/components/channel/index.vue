<template>
  <div class="container">
    <div class="header">频道广场</div>
  </div>
</template>

<script>
export default {
  name: "index",
  props:{
    isLarge:{
      default:false,
      type:Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin-top: 20px;
}
.header{
    font-size: 28px;
    font-weight: 700;
    line-height: 45px;
  height: 45px;
}
</style>
