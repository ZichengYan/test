<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div class="png">
      这里是背景图
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped="">
@import "~ass/scss/1.scss";
/*.png{*/
  /*width:100px;*/
  /*height:100px;*/
  /*background: url(assets/logo.png);*/
  /*-webkit-background-size: contain;*/
  /*background-size: contain;*/
/*}*/

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
