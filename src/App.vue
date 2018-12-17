<template>
  <div id="app">
    <!--<img src="./assets/img/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table {
  width: 80%;
  margin: 20px auto;
}

table th {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

table td {
  padding: 10px;
}

thead tr {
  background: #000000;
  color: #fff;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.table-footer {
  background: #f4f4f4;
  text-align: right;
}

.fl{
  float: left;
}

.fr{
  float: right;
}

.clearfix{
  clear:both;
}

.clearfix:after{
  display:table;
  content:"";
  clear:both;
}

.clearfix:before{
  display:table;
  content:"";
}
/*0.5边线*/
.hairline-top{position: relative;border:none;}
.hairline-top::before{content: '';position: absolute;left: 0;top: 0;background: #DDDEE3;width: 100%;height: 1px;-webkit-transform: scale(1,.5);transform: scale(1,.5);-webkit-transform-origin: center top;transform-origin: center top;}
.hairline-bottom{position: relative;border:none;}
.hairline-bottom::after{content: '';position: absolute;left: 0;bottom: 0;border-bottom: 1px solid #DDDEE3;width: 100%;-webkit-transform: scale(1,.5);transform: scale(1,.5);-webkit-transform-origin: center bottom;transform-origin: center bottom;z-index: 1;}
.hairline-left{position: relative;border:none;}
.hairline-left::before{content: '';position: absolute;top: 0;left: 0;border-right: 1px solid #DDDEE3;height:200%;-webkit-box-sizing: border-box;box-sizing: border-box;-webkit-transform: scale(0.5);transform: scale(0.5);-webkit-transform-origin: left top;transform-origin: left top;z-index: 1}
.hairline-right{position: relative;border:none;}
.hairline-right::after{content: '';position: absolute;top: 0;right: 0;border-left: 1px solid #DDDEE3;height:200%;-webkit-box-sizing: border-box;box-sizing: border-box;-webkit-transform: scale(0.5);transform: scale(0.5);-webkit-transform-origin: right top;transform-origin: right top;z-index: 1}
.hairline{position: relative;border:none;}
.hairline::after{content: '';position: absolute;top: 0;left: 0;border: 1px solid #DDDEE3;-webkit-box-sizing: border-box;box-sizing: border-box;width: 200%;height: 200%;-webkit-transform: scale(0.5);transform: scale(0.5);-webkit-transform-origin: left top;transform-origin: left top;}
.hairline-tb{position: relative;border:none;}
.hairline-tb:before{content: '';position: absolute;top: -50%;bottom: -50%;left: -50%;right: -50%;-webkit-transform: scale(0.5);transform: scale(0.5);border-top: 1px solid #dddee3;border-bottom: 1px solid #dddee3;}

</style>
