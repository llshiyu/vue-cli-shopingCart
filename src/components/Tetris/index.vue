<template>
  <div class="tetris">
    <div class="head">
      <h1>俄罗斯方块</h1>
      <Button type="primary" @click="start">开始</Button>
      <Button type="primary" @click="stop">暂停</Button>
      <Button type="primary" @click="init">重置</Button>
      <p>score: <span :style="{color:(score>0?'#ff0000':'#000')}">{{score}}</span></p>
    </div>
    <div class="game">

    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        score: 0
      }
    },
    methods: {
      init() {

      },
      start() {

      },
      stop() {

      }
    }
  }
</script>

<style lang="less" scoped>
  .tetris {
    margin-top: -40px;
    .head {
      h1 {
        font-size: 40px;
        font-weight: bold;
      }
      button {
        margin-top: 10px;
      }
      p {
        font-size: 25px;
        margin: 10px auto;
        .score {

        }
      }
    }
  }
</style>
