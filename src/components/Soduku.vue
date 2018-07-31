<template>
  <div class="soduku" v-if="isShow">
    <ul class="grid-box">
      <li v-for="(liX,liI) in 9" :key="liI">
        <span v-for="(spanX,spanI) in 9" :key="spanI" :id="liI+'-'+spanI">{{boxVal[liI][spanI]}}</span>
      </li>
    </ul>
    <button>完成</button>
    <button @click="init()">重置</button>
    <button>重玩本局</button>
  </div>
</template>

<script>
  export default {
    name: "Soduku",
    data() {
      return {
        boxVal: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        isShow: false,
        boxTotal: 9
      }
    },
    create() {
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let arr = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        try {
          // let arr = new Array(this.boxTotal);   //表格行
          let arrCol; // 存下每一列
          for (let i = 0; i < this.boxTotal; i++) {
            // arr[i] = new Array(this.boxTotal);    //每行
            // console.log(arr[i])
            for (let j = 0; j < this.boxTotal; j++) {
              let num;
              // do {
              //   num = this.randomNum(this.boxTotal);
              // } while ((arr[i].indexOf(num) > -1));
              // do {
              //   num = this.randomNum(this.boxTotal);
              // } while (!this.checkRow(arr,i,j));
              try {
                this.checkNine(arr, i, j, num)
                // console.log(this.isCorret(arr, i, j, num))
                do {
                  num = this.randomNum(this.boxTotal);
                } while (!this.isCorret(arr, i, j, num));
              } catch (e) {
                console.log(e)
              }
              arr[i][j] = num
            }
          }
          // (this.uniqueNumCol(num, i, j, arr) > -1)
          // console.log(arr)
          // console.log(this.createRandom2(9,1,9))
          this.uniqueNumCol(this.randomNum(this.boxTotal), 1, 1, arr)
          this.boxVal = arr;
          this.isShow = true;
        } catch (e) {
          console.log(e)
        }
      },
      randomNum(minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
          default:
            return 0;
            break;
        }
      }, // 生成[n,m]的随机整数
      uniqueNumRow(num, x, y, arr) {

      }, // 同行去重
      /**
       * 检测行是否符合标准
       * @param {} arr
       * @param {} row
       * @return {Boolean}
       */
      checkRow(arr, row, num) {
        if (arr[row].indexOf(num) > -1) {
          return false
        }
        // for (let j = 0; j < 8; j++) {
        //   if (arr[row][j] == 0) {
        //     continue;
        //   }
        //   for (let k = j + 1; k < 9; k++) {
        //     if (arr[row][j] == arr[row][k]) {
        //       return false;
        //     }
        //   }
        // }
        return true;
      },

      /**
       * 检测列是否符合标准
       * @param {} arr
       * @param {} col
       * @return {Boolean}
       */
      checkLine(arr, col, num) {
        for (let j = 0; j < this.boxTotal; j++) {
          if (arr[j][col] == 0) {
            continue;
          }
          if (arr[j][col] === num) {
            return false;
          }
          // if (arr[j][col] == 0) {
          //   continue;
          // }
          // for (let k = j + 1; k < 9; k++) {
          //   if (arr[j][col] == arr[k][col]) {
          //     return false;
          //   }
          // }
        }
        return true;
      },

      /**
       * 检测3X3是否符合标准
       * @param {} arr
       * @param {} row
       * @param {} col
       * @return {Boolean}
       */
      checkNine(arr, row, col, num) {
        // 获得左上角的坐标
        let j = Math.floor(row / 3) * 3;
        let k = Math.floor(col / 3) * 3;
        console.log(j,k)
        // 循环比较
        for (let i = 0; i < 8; i++) {
          if (arr[j + Math.floor(i / 3)][k + i % 3] == 0) {
            continue;
          }
          for (let m = i + 1; m < 9; m++) {
            if (arr[j + Math.floor(i / 3)][k + Math.round(i % 3)] == arr[j + Math.floor(m / 3)][k + Math.round(m % 3)]) {
              return false;
            }
          }
        }
        return true;
      },

      /**
       * 是否满足行、列和3X3区域不重复的要求
       * @param {} arr
       * @param {} row
       * @param {} col
       * @return {}
       */
      isCorret(arr, row, col, num) {
        // return (this.checkRow(arr, row,num) && this.checkLine(arr, col,num) && this.checkNine(arr, row, col,num));
        // return (this.checkRow(arr, row, num) && this.checkLine(arr, col, num))
        return (this.checkLine(arr, col, num))
      },
      uniqueNumCol(num, x, y, arr) {
        let newArr = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        let ret = -1;
        for (let i = 0; i < this.boxTotal; i++) {
          for (let j = 0; j < this.boxTotal; j++) {
            newArr[j][i] = arr[i][j]
          }
        }
        console.log(newArr, arr)
        // console.log(y)
        for (let i = 0; i < this.boxTotal; i++) {
          console.log(newArr[i])
          if ((newArr[i].indexOf(num) > -1)) {
            let a = newArr[i].indexOf(num)
            console.log('a', a, ' i', i, ' x', x, ' y', y, ' num', num, ' newArr', newArr[i], 999);
            if (a !== y) {
              // console.log(newArr[t], num, y, newArr[t].indexOf(num))
              ret = a
              break
            }
          }
          // if((newArr[t].indexOf(num)>-1)&&(newArr[t].indexOf(num)!==y)&&num!=0){
          //   // debugger
          //   console.log(newArr[t],num,y,(newArr[t].indexOf(num)))
          //   ret = -1
          //   break
          // }
        }
        // console.log(t,88888,ret)
        // console.log(arr,222)
        // console.log(newArr,111)
        return ret
      }, // 同列去重
    }
  }
</script>

<style lang="less" scoped>
  @boxSize: 40px;
  .soduku {
    .grid-box {
      width: @boxSize*9+22;
      margin: 20px auto;
      li {
        list-style: none;
        height: @boxSize;
        span {
          border: 1px dotted #3f94fc;
          height: @boxSize;
          width: @boxSize;
          line-height: @boxSize;
          display: inline-block;
          &:nth-of-type(3n) {
            border-right: 2px solid #3f94fc;
          }
          &:nth-of-type(9) {
            border-right: 1px dotted #3f94fc;
          }
        }
        &:nth-of-type(3n) {
          border-bottom: 2px solid #3f94fc;
        }
        &:nth-of-type(9) {
          border-bottom: none;
        }
      }
    }
  }
</style>
