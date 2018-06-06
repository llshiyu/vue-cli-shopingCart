<template>
  <div class="paging-container clearfix">
    <div class="cont-box"><span>共{{totalNumber}}条</span></div>
    <div class="cont-box"><span>共{{totalPages}}页</span></div>
    <div class="select-box cont-box">
      <span class="select-text">每页显示</span>
      <div class="select-box hide">
        <select name="select" v-model="selectShowNumber" @change="clickPage(1)">
          <option :value="item" v-for="(item,index) of selectShowNumberList" :key="index">{{item}}</option>
        </select>
      </div>
      <div class="page-size-box">
        <input type="number" value="selectShowNumber" v-model="selectShowNumber" min="pageShowTotal" max="50" step="10"
               class="page-input page-size" disabled>
        <img src="./triangle.png" class="top-icon" @click="addShowNumber()">
        <img src="./triangle.png" class="bottom-icon" @click="minusShowNumber()">
      </div>
      <span class="select-text">条</span>
    </div>
    <div class="li-box cont-box">
      <div class="clearfix">
        <div class="fl li-div" @click="clickPage(1)">首页</div>
        <div class="fl li-div" @click="clickPage(thisPage-1)">上一页</div>
        <div class="fl li-ul-box">
          <ul class="clearfix">
            <li class="fl" :class="{'active':showActiveIndex===item}" @click="clickPage(item)"
                v-for="(item, index) of showPageArr" :key="index">{{item}}
            </li>
          </ul>
        </div>
        <div class="fl li-div" @click="clickPage(thisPage+1)">下一页</div>
        <div class="fl li-div" @click="clickPage(totalPages)">尾页</div>
      </div>
    </div>
    <div class="input-box cont-box clearfix">
      <input type="number" class="fl" v-model="inputVal"/>
      <div class="btn-div fl" @click="clickPage(inputVal)">GO</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Paging',
    props: {
      totalNumber: {
        type: Number,
        default: 1
      }, // 总条数
      pageShowTotal: {
        type: Number,
        default: 10
      }, // 每页展示多少条数据 默认一页展示10条
      showMaxPages: {
        type: Number,
        default: 4
      }, // 最多展示几个页数的按钮
      showActivePageIndex: {
        type: Number,
        default: 1
      } // 父组件传来的页码样式index
    },
    data() {
      return {
        selectShowNumberList: [], // 选择一页展示多少条
        selectShowNumber: 10, // 默认一页展示10条,select框的value值
        // showActiveIndex: 1, // 页码样式index
        thisPage: 1, // 当前选中页数
        inputVal: 1, // 输入框指定去第几页
        showPageArr: [] // 展示哪些页码
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalNumber / this.selectShowNumber)
      }
    },
    watch: {
      totalNumber: function () {
        this.thisPage = 1
        // this.showActiveIndex = this.showActivePageIndex
        this.showActivePageIndex = 1
        this.inputVal = 1
        this.selectShowNumber = this.pageShowTotal
        this.computedTabArr(this.showActivePageIndex)
      }
    },
    methods: {
      init() {
        // this.showActiveIndex = this.showActivePageIndex
        this.selectShowNumber = this.pageShowTotal
        this.selectShowNumberList = [this.pageShowTotal, this.pageShowTotal * 2, this.pageShowTotal * 3]
        this.computedTabArr(this.showActivePageIndex)
      },
      addShowNumber() {
        if (this.selectShowNumber < 50) {
          this.selectShowNumber += 10
          this.clickPage(1)
        }
      },
      minusShowNumber() {
        if (this.selectShowNumber > 10) {
          this.selectShowNumber -= 10
          this.clickPage(1)
        }
      },
      clickPage(index) {
        this.thisPage = this.checkPage(index * 1)
        this.computedTabArr(this.checkPage(index * 1))

        this.showActivePageIndex = this.checkPage(index * 1)
        this.inputVal = this.checkPage(index * 1)

        if (index >= 1 && index <= this.totalPages) {
          this.$emit('callBack', this.thisPage, this.selectShowNumber)
        }
      },
      checkPage(index) {
        if (index < 1) {
          index = 1
        }
        if (index > this.totalPages) {
          index = this.totalPages
        }
        return index
      },
      computedTabArr(_thisPage) {
        this.showPageArr = []
        this.showPageArr[0] = _thisPage
        for (let i = 1; i < this.showMaxPages; i++) {
          if (this.showPageArr.length === this.showMaxPages) {
            break
          }
          if (this.isIn(_thisPage + i)) {
            this.showPageArr.push(_thisPage + i)
          }
          if (this.showPageArr.length === this.showMaxPages) {
            break
          }
          if (this.isIn(_thisPage - i)) {
            this.showPageArr.push(_thisPage - i)
          }
        }
        this.showPageArr.sort(this.sortNum)
      },
      isIn(index) {
        if (index >= 1 && index <= this.totalPages) {
          return true
        }
        return false
      },
      sortNum(a, b) {
        return a - b
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .hide {
    display: none !important;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  select::-ms-expand {
    display: none;
  }

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .paging-container {
    font-size: 14px;
    color: #777E8C;
    letter-spacing: 0;
    line-height: 30px;
    height: 30px;
    display: inline-block;
    .cont-box {
      float: left;
      margin-right: 8px !important;
    }
    .select-box {
      select {
        /*background: #FFFFFF;*/
        /*border: 1px solid #EAEDF1;*/
        /*border-radius: 2px;*/
        /*margin: 0 6px;*/
        /*height: 30px;*/
        /*text-align: center;*/
        /*width: 48px;*/
        /*padding-left: 10px;*/
      }
      .select-box {
        width: 48px;
        height: 30px;
        line-height: 30px;
        border-radius: 2px;
        position: relative;
        display: inline-block;
        border: 1px solid #EAEDF1;
        margin: 0 6px;
        text-align: center;
      }
      select {
        border: none;
        outline: none;
        width: 100%;
        max-height: 100%;
        margin: 0 auto;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-left: 8px;
      }
      //使用伪类给select添加自己想用的图标
      .select-box:after {
        content: "";
        width: 10px;
        height: 5px;
        background: url(./triangle.png) no-repeat center;
        position: absolute;
        right: 8px;
        top: 45%;
        pointer-events: none;
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
    .page-size-box {
      position: relative;
      display: inline-block;
      margin: 0 4px;
      .page-size {
        padding-left: 5px;
      }
      .page-input {
        font-size: 14px;
        color: #777e8c;
        width: 48px;
        height: 30px;
        line-height: 30px;
        background: #fff;
        border: 1px solid #eaedf1;
        border-radius: 2px;
      }
      .top-icon {
        right: 4px;
        top: 8px;
        cursor: pointer;
        position: absolute;
        width: 10px;
        height: 5px;
      }
      .bottom-icon {
        right: 4px;
        bottom: 8px;
        transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        cursor: pointer;
        position: absolute;
        width: 10px;
        height: 5px;
      }
    }
    .li-box {
      .li-div, li {
        list-style: none;
        padding: 0 8px;
        line-height: 30px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #EAEDF1;
        cursor: pointer;
      }
      .li-div:first-child {
        border-radius: 2px 0 0 2px;
      }
      .li-ul-box {
        ul {
          padding: 0;
          margin: 0;
          li.active {
            color: #3F94FC;
            border-color: #3F94FC;
          }
        }
      }
    }
    .input-box {
      input {
        width: 48px;
        height: 30px;
        text-align: center;
        margin-right: 6px;
        border: 1px solid #EAEDF1;
        border-radius: 2px;
      }
      .btn-div {
        background: #3F94FC;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
  }
</style>
