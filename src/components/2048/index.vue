<template>
  <div class="game-box">
    <div class="head">
      <h1>2048</h1>
      <Button type="primary" @click="init">New Game</Button>
      <p>score: <span :style="{color:(score>0?'#ff0000':'#000')}">{{score}}</span></p>
    </div>
    <div class="game">
        <ul v-for="i in mapSize" :key="i">
          <li class="grid-cell" v-for="j in mapSize" :key="j" :style="gridStyle(i,j)">
            <span class="number">2</span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        mapSize: 4,
        score: 10
      }
    },
    computed:{
      gridStyle(){
        return (i,j)=>{
          return {'top':(20+(i-1)*110)+'px','left':(20+(j-1)*110)+'px'}
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init(){

      }
    }
  }
</script>

<style lang="less" scoped>
  .game-box{
    margin-top: -30px;
    .head{
      h1{
        font-size: 50px;
        font-weight: bold;
      }
      button{

      }
      p{
        font-size: 25px;
        margin: 20px auto;
        .score{

        }
      }
    }
    .game{
      width: 460px;
      height: 460px;
      padding: 20px;
      margin: 30px auto;
      background-color: #bbada0;
      border-radius: 10px;
      position: relative;
      ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 110px;
        .grid-cell{
          width: 90px;
          height: 90px;
          border-radius: 6px;
          background-color: #ccc0b3;
          position: absolute;
          .number{
            border-radius: 6px;
            font-weight: bold;
            font-size: 50px;
            line-height: 90px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
