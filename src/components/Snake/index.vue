<template>
  <div class="snake">
    <div class="head">
      <h1>贪吃蛇</h1>
      <Button type="primary" @click="start">Start</Button>
      <p>score: <span :style="{color:(score>0?'#ff0000':'#000')}">{{score}}</span></p>
    </div>
    <div class="game">
      <table>
        <tr v-for="(item,i) in mapSize" :key="i">
          <td v-for="(jtem,j) in mapSize" :key="j" :class="isFood(i,j)||isBody(i,j)?'active':''"></td>
        </tr>
      </table>
    </div>

    <Modal v-model="overModel" width="300">
      <div style="text-align:center">
        <p>Game Over!</p>
        <p>点确定重新开始,取消关闭弹出</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="init">重新开始</Button>
      </div>

    </Modal>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        score: 0,
        mapSize: 20, // 地图大小
        bodyLen: 4, // 初始身体长度
        bodyPosition: [], // 身体坐标
        foodPosition: [], // 食物坐标
        timer: null,
        direction: 1, // 方向 -1left 1right -2up 2down
        overModel: false
      }
    },
    created() {
      const u = navigator.userAgent;
      const isIos = /(iPhone|iPad|iPod|iOS)/i.test(u);
      const isAndroid = /(Android)/i.test(u);
      if (isAndroid || isIos) {
        this.$alert('请用电脑打开', '暂不支持手机端', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      } else {
        this.pcKey()
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        clearInterval(this.timer);
        this.direction = 1; // 方向 -1left 1right -2up 2down
        this.bodyLen = 4; // 初始身体长度
        this.bodyPosition = []; // 身体坐标
        this.foodPosition = []; // 食物坐标
        this.overModel = false;
        this.getInitBody();
        this.getFood();
      },
      start() {
        this.timer = setInterval(() => {
          this.autoRun()
        }, 300)
      },
      getInitBody() {
        for (let i = 0; i < this.bodyLen; i++) {
          this.bodyPosition.push([0, i])
        }
      },
      isBody(i, j) {
        for (let x = 0; x < this.bodyPosition.length; x++) {
          if (this.bodyPosition[x][0] === i && this.bodyPosition[x][1] === j) {
            return 1;
          }
        }
        return 0;
      },
      getFood() {
        let randomA, randomB;
        randomA = this.getRandomPosition();
        randomB = this.getRandomPosition();
        if (this.isBody(randomA, randomB)) {
          this.getFood();
          return;
        }
        this.foodPosition[0] = randomA;
        this.foodPosition[1] = randomB;
      },
      getRandomPosition() {
        return parseInt(Math.random() * this.mapSize)
      },
      isFood(i, j) {
        if (i === this.foodPosition[0] && j === this.foodPosition[1]) {
          return 1
        }
        return 0
      },
      change(t) { // t-移动方向 -1left 1right -2up 2down
        if (Math.abs(t) === Math.abs(this.direction)) { // 当前移动方向和上一次一样就不移动，上次往左这次就不能往右,上次往左这次再往左没意义
          return
        } else {
          this.direction = t;
          this.autoRun();
        }
      },
      autoRun() {
        let headX, headY; // 蛇头位置
        headX = this.bodyPosition[this.bodyLen - 1][0];
        headY = this.bodyPosition[this.bodyLen - 1][1];

        if (Math.abs(this.direction) === 1) { // 左右移动  左负右正
          this.direction > 0 ? headY++ : headY--;
        } else { // 上下移动 上负下正
          this.direction > 0 ? headX++ : headX--;
        }

        if (this.isGameOver(headX, headY)) {
          this.overModel = true;
        } else {
          this.bodyPosition.push([headX, headY]);
          if (headX === this.foodPosition[0] && headY === this.foodPosition[1]) {
            this.getFood();
          } else {
            this.bodyPosition.shift();
          }
          this.bodyLen = this.bodyPosition.length;
        }
      },
      pcKey() {
        document.onkeydown = (e) => {
          let key = window.event.keyCode;
          switch (key) {
            case 13: // 回车
              this.start();
              break;
            case 37: // left
              this.change(-1);
              break;
            case 39: // right
              this.change(1);
              break;
            case 38: // up
              this.change(-2);
              break;
            case 40: // down
              this.change(2);
              break;
            default:
              break;
          }
        }
      },
      isGameOver(headX, headY) {
        if (headX < 0 || headX >= this.mapSize || headY < 0 || headY >= this.mapSize || this.isBody(headX, headY)) {
          return 1
        }
        return 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .snake {
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
    .game {
      /*width: 500px;*/
      /*height: 500px;*/
      width: max-content;
      height: max-content;
      margin: 10px auto;
      background-color: #000;
      table {
        margin: 0;
        border-spacing: 0;
        td {
          border: 1px solid #bbada0;
          /*border-left: 1px solid #bbada0;*/
          /*border-top: 1px solid #bbada0;*/
        }
        .active {
          background-color: #f65e3b;
        }
      }
    }
  }
</style>
