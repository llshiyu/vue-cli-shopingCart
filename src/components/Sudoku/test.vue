<template>
  <div class="sudoku-box">
    <div class="tips">
      <p>数独规则</p>
      <p>1.每一行数字不重复</p>
      <p>2.每一列数字不重复</p>
    </div>
    <el-select v-model="difficulty" placeholder="请选择难度" @change="diffChange">
      <el-option
        v-for="item in difficultyList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="checkAnswer">交卷</el-button>
    <div class="list" @mouseleave="hoverJ=''" :class="{'shake':isShake}">
      <div class="row clearfix" v-for="(item,i) in rowList" :key="i">
        <!-- empty 填空
            hover-j 鼠标所在列
            click-empty 点击填空
            err 出错的
        -->
        <div class="col fl"
             :class="{'empty':num==='',
                      'hover-j':hoverJ===j,
                      'click-empty':emptyI===i && emptyJ===j,
                      'err':(errOption.x===i && errOption.y===j)||
                            (errRowOption.x===i && errRowOption.y===j)||
                            (errColOption.x===i && errColOption.y===j)}"
             @click="showOptions(i,j)" @mouseenter="hoverJ=j;"
             v-for="(num,j) in item" :key="j">
          {{showRowList[i][j]}}
        </div>
      </div>
      <ul class="answer clearfix" v-show="checkShow"
          :style="{'top':(emptyI<6?(emptyI+1):(emptyI-3))*60+'px',
                  'left':(emptyJ<6?(emptyJ+1):(emptyJ-3))*60+'px'}">
        <li @click="inputText(1)">1</li>
        <li @click="inputText(2)">2</li>
        <li @click="inputText(3)">3</li>
        <li @click="inputText(4)">4</li>
        <li @click="inputText(5)">5</li>
        <li @click="inputText(6)">6</li>
        <li @click="inputText(7)">7</li>
        <li @click="inputText(8)">8</li>
        <li @click="inputText(9)">9</li>
      </ul>
    </div>
    <el-button @click="showAnswer" class="show-answer">查看答案</el-button>
  </div>
</template>

<script>
  export default {
    name: "test",
    data() {
      return {
        emptyRowNum: 1, // 每行需要填空的个数
        numLen: 9, // 一行9个 9行
        rowList: [],
        showRowList: [], // 要展示的数
        answerList: [], // 答案
        hoverJ: null, // 鼠标指向的J 列
        emptyI: null, // 填空所在的行
        emptyJ: null, // 填空所在的列
        checkShow: false, //选答案
        isErr: false,
        isShake: false, //错误的动画
        errOption: {
          x: null,
          y: null
        }, // 当前选项错的
        errRowOption: {
          x: null,
          y: null
        }, // 行有错的
        errColOption: {
          x: null,
          y: null
        }, // 列有错的
        difficulty: '简单',
        difficultyList: [
          {
            label: '简单',
            value: 1
          },
          {
            label: '一般',
            value: 2
          },
          {
            label: '困难',
            value: 3
          },
          {
            label: '超神',
            value: 4
          },
          {
            label: '变态',
            value: 5
          }
        ], // 难度
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let _this = this;

        /************************初始化************************/
        _this.rowList = [];
        _this.showRowList = []; // 要展示的数
        _this.answerList = [];// 答案
        _this.checkShow = false;
        _this.emptyI = null;
        _this.emptyJ = null;

        /************************生成棋盘************************/
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let row = [], rowCol = 0;
        for (let i = 0; i < _this.numLen; i++) {
          row = Object.assign([], arr);
          _this.rowList.push(row);
          rowCol = arr.splice(0, 1)[0];
          arr.push(rowCol)
        } // 生成9*9二维数组 有序的

        //a<b a-b 从小到大升序,b-a 从大到小降序，
        //Math.random()产生一个随机数，小于0.5，升序，大于0.5 降序。
        _this.rowList.sort((a, b) => Math.random() - 0.5); // 打乱行

        let randomColArr = [], t = 0;
        for (let i = 0; i < _this.numLen; i++) {
          randomColArr = Object.assign([], _this.randomText()); // 随机生成两个列坐标
          for (let j = 0, len = _this.rowList.length; j < len; j++) {
            t = _this.rowList[j][randomColArr[0]];
            _this.rowList[j][randomColArr[0]] = _this.rowList[j][randomColArr[1]];
            _this.rowList[j][randomColArr[1]] = t;
          } // 遍历每一行，随机交换两列
        } // 打乱列

        /************************记录答案************************/
        _this.answerList = _this.deepCopy(_this.rowList); // 答案记录

        /************************记录坐标************************/
        let rowText = '', arrText = [];
        for (let i = 0; i < _this.numLen; i++) {
          rowText = '';
          for (let j = 0; j < _this.numLen; j++) {
            rowText += i + '-' + j + ',';
          }
          arrText.push(rowText.substr(0, rowText.length - 1))
        } // 记录坐标数组，一行一个字符串
        // console.log(arrText);

        /************************随机掏空************************/
        let nowItem = [], optionN, nowOption = [];
        for (let i = 0; i < _this.numLen; i++) {
          nowItem = arrText[i].split(',');
          nowOption = [];
          for (let j = 0; j < _this.emptyRowNum; j++) {
            optionN = Math.floor(Math.random() * nowItem.length);
            // console.log(i,nowItem,optionN)
            nowOption = nowItem.splice(optionN, 1)[0].split('-');
            this.rowList[nowOption[0]][nowOption[1]] = '';
          }
        } // 随机掏空

        /************************页面渲染************************/
        this.showRowList = this.deepCopy(this.rowList); // 通过json深拷贝
      },
      diffChange(e) {
        this.emptyRowNum = e;
        this.init();
      }, // 难度选择
      randomText() {
        let _this = this;
        let randomIndex = 0, randomIndexAfter = 0;
        randomIndex = Math.floor(Math.random() * _this.numLen); // 生成0-9随机数
        function randomDo() {
          randomIndexAfter = Math.floor(Math.random() * _this.numLen);
          if (randomIndexAfter === randomIndex) {
            randomDo();
          }
        }

        randomDo();
        return [randomIndex, randomIndexAfter]
      }, // 随机生成两个不一样的0-9随机数
      deepCopy(t) {
        return JSON.parse(JSON.stringify(t))
      }, // 深拷贝
      showOptions(i, j) {
        this.checkShow = false;
        this.emptyI = null;
        this.emptyJ = null;
        if (this.isErr && (i !== this.errOption.x || j !== this.errOption.y)) {
          return
        } // 有错误时只能改出错的那个
        if (this.rowList[i][j] !== '') {
          return
        }
        if (this.emptyI === i && this.emptyJ === j) {
          this.checkShow = false;
          this.emptyI = null;
          this.emptyJ = null;
        } else {
          this.checkShow = true;
          this.emptyI = i;
          this.emptyJ = j;
        }
      }, // 点击开始选答案
      inputText(n) {
        let _this = this;

        /************************初始化************************/
        let row = _this.emptyI, col = _this.emptyJ;
        _this.emptyI = null;
        _this.emptyJ = null;
        _this.errOption = {
          x: null,
          y: null
        }; // 当前选项错的
        _this.errRowOption = {
          x: null,
          y: null
        }; // 行有错的
        _this.errColOption = {
          x: null,
          y: null
        }; // 列有错的
        _this.checkShow = false;
        _this.isErr = false;
        _this.isShake = false;
        _this.showRowList[row][col] = n;

        /************************判断对错************************/

        let rowRepeat = _this.checkRow(n, row, col);
        let colRepeat = _this.checkCol(n, row, col);

        console.log(_this.answerList[row][col], rowRepeat, colRepeat)

        if (rowRepeat > -1 || colRepeat > -1) {
          _this.isErr = true;
          _this.isShake = true;
          _this.errOption = {
            x: row,
            y: col
          };// 输入错
          _this.errRowOption = {
            x: row,
            y: rowRepeat
          }; // 行有错的---行有和输入一样的数字
          _this.errColOption = {
            x: colRepeat,
            y: col
          }; // 列有错的---列有和输入一样的数字
        }

        if(_this.isErr){
          setTimeout(()=>{
            _this.isShake = false;
          },1000);
          return
        }

        _this.$forceUpdate();
      }, // 填空
      checkRow(n, row, col) {
        let _this = this;
        for (let i = 0; i < _this.numLen; i++) {
          if (_this.showRowList[row][i] === n && col !== i) {
            return i;
          }
        }
        return -1;
      }, // 检查每行中和输入的值一样的，返回列坐标
      checkCol(n, row, col) {
        let _this = this;
        for (let i = 0; i < _this.numLen; i++) {
          if (_this.showRowList[i][col] === n && row !== i) {
            return i;
          }
        }
        return -1;
      },// 检查每列中和输入的值一样的，返回行坐标
      checkAnswer() {
        let _this = this;
        let t = 0;
        for (let i = 0; i < _this.numLen; i++) {
          for (let j = 0; j < _this.numLen; j++) {
            if (_this.showRowList[i][j] === '') {
              t++;
            }
          }
        }
        if (t) {
          _this.$message.error('还差' + t + '个没有回答哦');
        } else {
          this.$message({
            message: '恭喜你，全部回答正确，真厉害！',
            type: 'success'
          });
        }
      }, // 检查答案--有没有空的
      showAnswer() {
        this.$confirm('不再努力一下了吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.showRowList = this.deepCopy(this.answerList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .sudoku-box {
    margin-top: -50px;
    .tips {
      p {
        line-height: 20px;
        margin: 0;
      }
    }
    .list {
      width: 540px;
      margin: 10px auto 0;
      border: 1px solid #ccc;
      position: relative;
      .row {
        .col {
          width: 60px;
          height: 60px;
          line-height: 60px;
          background: #58B7FF;
          color: #fff;
          font-size: 24px;
          font-weight: bold;
          border: 1px solid #ccc;
          box-sizing: border-box;
          text-align: center;
        }
        .empty {
          background: #ccc;
          border: 1px solid #fff;
          cursor: pointer;
          color: #000;
        }
        .hover-j {
          background: #0068b7;
        }
        &:hover {
          .col, .empty {
            background: #0068b7;
          }
          .click-empty {
            background: #ffffff;
          }
        }
        .click-empty {
          background: #ffffff;
        }
        .err {
          color: #ff0000;
        }
      }
      .answer {
        list-style-type: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 180px;
        box-shadow: 0 0 10px 0 #000;
        padding: 0;
        margin: 0;
        li {
          float: left;
          list-style-type: none;
          box-sizing: border-box;
          background: #fff;
          color: #58B7FF;
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          font-size: 24px;
          border: 1px solid #58B7FF;
          cursor: pointer;
          transition: all .5s;
        }
      }
    }
    .show-answer {
      margin-top: 10px;
    }


    .shake {
      animation: shake-opacity 500ms 1 ease-in-out;
    }
    @keyframes shake-opacity {
      0% {
        transform: translate(0px, 0px) rotate(0deg);
        opacity: 0.6;
      }
      10% {
        transform: translate(-2px, -1px) rotate(-0.5deg);
        opacity: 0.5;
      }
      20% {
        transform: translate(-4px, 4px) rotate(1.5deg);
        opacity: 0.4;
      }
      30% {
        transform: translate(-4px, -1px) rotate(-1.5deg);
        opacity: 0.8;
      }
      40% {
        transform: translate(-2px, -1px) rotate(-2.5deg);
        opacity: 0.3;
      }
      50% {
        transform: translate(-4px, 1px) rotate(-2.5deg);
        opacity: 0.5;
      }
      60% {
        transform: translate(-2px, 4px) rotate(0.5deg);
        opacity: 0.1;
      }
      70% {
        transform: translate(-3px, 1px) rotate(-0.5deg);
        opacity: 0.4;
      }
      80% {
        transform: translate(0px, 0px) rotate(-0.5deg);
        opacity: 0.5;
      }
      90% {
        transform: translate(2px, -1px) rotate(-2.5deg);
        opacity: 0.8;
      }
    }
  }
</style>
