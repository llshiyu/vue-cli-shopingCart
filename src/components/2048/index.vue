<template>
  <div class="game-box">
    <div class="head">
      <h1>2048</h1>
      <Button type="primary" @click="init">New Game</Button>
      <p>score: <span :style="{color:(score>0?'#ff0000':'#000')}">{{score}}</span></p>
    </div>
    <div class="game">
      <ul v-for="(item,i) in numArr" v-if="i>0&&i<=mapSize" :key="i">
        <li class="grid-cell" v-if="j>0&&j<=mapSize" v-for="(num,j) in item" :key="j" :style="gridStyle(i,j,num)">
          <span class="number" v-if="num>0" :style="numberStyle(num)">{{num}}</span>
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
        score: 0, // 分数
        numArr: [],
        // numArr1: [],
        needNewPoint: 0, //需要几个新点
      }
    },
    created() {
      const u = navigator.userAgent;
      const isIos = /(iPhone|iPad|iPod|iOS)/i.test(u);
      const isAndroid = /(Android)/i.test(u);
      if (isAndroid || isIos) {
        this.mobileKey()
      } else {
        this.pcKey()
      }
    },
    computed: {
      gridStyle() {
        return (i, j, num) => {
          return {
            'top': (20 + (i - 1) * 110) + 'px',
            'left': (20 + (j - 1) * 110) + 'px',
            'backgroundColor': this.getNumberBackgroundColor(num)
          }
        }
      }, // 单元格样式
      getNumberBackgroundColor(){
        return (num)=>{
          switch (num) {
            case 2:
              return '#eee4da';
              break;
            case 4:
              return '#ede0c8';
              break;
            case 8:
              return '#f2b179';
              break;
            case 16:
              return '#f59563';
              break;
            case 32:
              return '#f67c5f';
              break;
            case 64:
              return '#f65e3b';
              break;
            case 128:
              return '#edcf72';
              break;
            case 256:
              return '#edcc61';
              break;
            case 512:
              return '#9c0';
              break;
            case 1024:
              return '#33b5e5';
              break;
            case 2048:
              return '#09c';
              break;
            case 4096:
              return '#a6c';
              break;
            case 8192:
              return '#93c';
              break;
            default:
              return '#ccc0b3';
              break;
          }
        }
      }, // 根据number不同背景色不同
      numberStyle() {
        return (num) => {
          let color, size;
          if (num <= 4) {
            color = '#776e65'
          } else {
            color = '#ffffff';
          }
          if (num > 100) {
            size = 40;
          } else if (num > 1000) {
            size = 30;
          } else {
            size = 50;
          }
          return {
            'color': color, 'fontSize': size + 'px'
          }
        }
      } // 数字样式
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let arr = new Array(this.mapSize + 2).fill(0);
        let row = [];
        for (let i = 0; i <= this.mapSize + 1; i++) {
          row = Object.assign([], arr);
          this.numArr.push(row);
        }

        // for(let i=0;i<=this.mapSize+1;i++){
        //   this.numArr1[i] = [];
        //   for(let j=0;j<=this.mapSize+1;j++){
        //     this.numArr1[i][j] = 0;
        //   }
        // }

        //边界
        for (let x = 0; x <= this.mapSize + 1; x++) {
          for (let y = 0; y <= this.mapSize + 1; y++) {
            if (x === 0 || y === 0 || x === this.mapSize + 1 || y === this.mapSize + 1) {
              this.numArr[x][y] = -11;
              // this.numArr1[x][y] = -11;
            }
          }
        }
        console.log(this.numArr);
        // console.log(this.numArr1);
        // this.$forceUpdate()
        this.generateOneNum();
        this.generateOneNum();
      },
      generateOneNum() {
        let randomNum, x, y;
        randomNum = parseInt(Math.random() * this.mapSize * this.mapSize);
        x = parseInt(randomNum / this.mapSize) + 1;
        y = parseInt(randomNum % this.mapSize) + 1;
        if (this.numArr[x][y] !== 0) {
          this.generateOneNum();
          return
        }
        setTimeout(() => {
          this.numArr[x][y] = Math.random() < 0.5 ? 2 : 4;
          this.$forceUpdate();
        }, 100);
      }, // 随机位置生成一个数
      pcKey() {
        document.onkeydown = (e) => {
          let key = window.event.keyCode;
          // console.log(e.keyCode, key);
          switch (key) {
            case 37:
              this.moveLeft();
              break;
            case 39:
              this.moveRight();
              break;
            case 38:
              this.moveUp();
              break;
            case 40:
              this.moveDown();
              break;
            default:
              break;
          }
          // console.log(this.needNewPoint, 999);
          if (this.needNewPoint === 1) {
            this.generateOneNum();
            this.needNewPoint = 0;
          }
          if (this.isGameOver()) {
            this.$message({
              message: 'Game Over!',
              type: 'info'
            });
          }
        }
      },
      mobileKey() {
        let startX, startY;
        //手指接触屏幕
        document.addEventListener('touchstart', (e) => {
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
        }, false);
        document.addEventListener('touchend', (e) => {
          let endX, endY;
          endX = e.changedTouches[0].pageX;
          endY = e.changedTouches[0].pageY;
          let direction = this.getDirection(startX, startY, endX, endY);
          switch (direction) {
            case 1://up
              this.moveUp();
              break;
            case 2://down
              this.moveDown();
              break;
            case 3: // left
              this.moveLeft();
              break;
            case 4://right
              this.moveRight();
              break;
            default:
              break;
          }
          // console.log(this.needNewPoint, 999);
          if (this.needNewPoint === 1) {
            this.generateOneNum();
            this.needNewPoint = 0;
          }
          if (this.isGameOver()) {
            this.$message({
              message: 'Game Over!',
              type: 'info'
            });
          }
        })
      },
      getDirection(startx, starty, endx, endy) {
        let angX = endx - startx;
        let angY = endy - starty;
        let result = 0;

        //如果滑动距离太短
        if (Math.abs(angX) < 2 && Math.abs(angY) < 2) {
          return result;
        }

        let angle = this.getAngle(angX, angY);
        if (angle >= -135 && angle <= -45) {
          result = 1;
        } else if (angle > 45 && angle < 135) {
          result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3;
        } else if (angle >= -45 && angle <= 45) {
          result = 4;
        }
        return result;
      }, // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
      getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI; // Math.atan2()返回从 x 轴到点 (x,y) 之间的角度
      }, // 获得角度
      moveLeft() {
        // console.log('left,y-1');
        this.move(this.mapSize + 1, this.mapSize + 1, 0, -1);
      },
      moveRight() {
        // console.log('right,y+1');
        this.move(0, 0, 0, 1);
      },
      moveUp() {
        // console.log('up,x-1');
        this.move(this.mapSize + 1, this.mapSize + 1, -1, 0);
      },
      moveDown() {
        // console.log('down,x+1');
        this.move(0, 0, 1, 0);
      },
      move(x, y, dx, dy) {
        for (let i = x; i < x + this.mapSize; i++) {
          for (let j = y; j < y + this.mapSize; j++) {
            this.moveAndMarge(Math.abs(i - this.mapSize), Math.abs(j - this.mapSize), dx, dy);
          }
        }
      },
      moveAndMarge(x, y, dx, dy) {
        // console.log('x',x,'y',y,'dx',dx,'dy',dy,this.numArr[x][y]);
        if (this.numArr[x][y] === 0) {
          return
        } // 目标是0不用移
        if (this.numArr[x + dx][y + dy] !== 0 && this.numArr[x][y] !== this.numArr[x + dx][y + dy]) {
          return
        } // 目标移动后不是0 并且移动后和移动前数字不一样 不用
        let num = this.numArr[x][y];
        this.needNewPoint = 1;

        while (this.numArr[x + dx][y + dy] === 0) {
          this.numArr[x][y] = 0;
          x += dx;
          y += dy;
          this.numArr[x][y] = num;
        } // 移动 直到目标点是0停止

        if (this.numArr[x + dx][y + dy] === this.numArr[x][y]) {
          this.numArr[x][y] = 0;
          x += dx;
          y += dy;
          this.numArr[x][y] += num;
          this.score+=2;
        } // 当前点和目标点一样合并

        this.$forceUpdate();
      },
      isGameOver() {
        for (let i = 1; i <= this.mapSize; i++) {
          for (let j = 1; j <= this.mapSize; j++) {
            if (this.numArr[i][j] === 0 || this.numArr[i][j] === this.numArr[i - 1][j] || this.numArr[i][j] === this.numArr[i][j - 1]) {
              return 0;
            }
          }
        }
        return 1;
      }
    },
    filter: {}
  }
</script>

<style lang="less" scoped>
  .game-box {
    margin-top: -30px;
    .head {
      h1 {
        font-size: 50px;
        font-weight: bold;
      }
      button {

      }
      p {
        font-size: 25px;
        margin: 20px auto;
        .score {

        }
      }
    }
    .game {
      width: 460px;
      height: 460px;
      padding: 20px;
      margin: 30px auto;
      background-color: #bbada0;
      border-radius: 10px;
      position: relative;
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 110px;
        .grid-cell {
          width: 90px;
          height: 90px;
          border-radius: 6px;
          background-color: #ccc0b3;
          position: absolute;
          .number {
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
