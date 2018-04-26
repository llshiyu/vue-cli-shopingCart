<template>
  <div id="app">
    <img src="./assets/logo.png">
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

</style>
